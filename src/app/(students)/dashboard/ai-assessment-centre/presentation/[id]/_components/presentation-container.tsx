
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Clock, X, Send, Video, Camera, StopCircle, RotateCcw } from "lucide-react";
import { PresentationPromptSection } from "../../../_components/presentation-prompt-section";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { PresentationTaskApiResponse } from "../../../_components/written-presentation-data-type";
import AILoader from "@/components/student/psychometric/AILoader";

export default function PresentationTaskPage({ id }: { id: string }) {
  const assessmentId = id;
  const router = useRouter();
  const session = useSession();
  const token = session?.data?.accessToken;

  // Timer state
  const [timeLeft, setTimeLeft] = useState(3599); // 59:59
  const MAX_RECORDING_TIME = 300; 

  // Video recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [isVideoRecorded, setIsVideoRecorded] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [showRetakeOption, setShowRetakeOption] = useState<boolean>(false);

  // Video refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      // Cleanup video resources
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  // Auto-stop recording when max time reached
  useEffect(() => {
    if (isRecording && recordingTime >= MAX_RECORDING_TIME) {
      stopRecording();
      toast.info("Maximum recording time (5 minutes) reached");
    }
  }, [recordingTime, isRecording]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeWarning = timeLeft < 300; // 5 minutes

  // Format recording time as MM:SS
  const formatRecordingTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Fetch presentation data
  const { data, isLoading, isError } = useQuery<PresentationTaskApiResponse>({
    queryKey: ["presentation-task", assessmentId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/presentationtask/${assessmentId}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch presentation data");
      }
      return res.json();
    },
  });

  const writtentData = data?.data;

  // Submit mutation
  const { mutate, isPending } = useMutation({
    mutationKey: ["presentation-task-submit", assessmentId],
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/presentationtask/${assessmentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      return res.json();
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Presentation submitted successfully");
      setTimeout(() => {
        router.push(
          `/dashboard/ai-assessment-centre/presentation/results/${assessmentId}`,
        );
      }, 1500);
    },
    onError: (error) => {
      toast.error("Failed to submit presentation");
      console.error("Submission error:", error);
    },
  });

  // Video recording functions
  const startCamera = async (): Promise<MediaStream | null> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Media devices API is not supported");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });

      streamRef.current = stream;
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play().catch(console.error);
      }

      return stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error(
        "Camera access failed. Please allow camera and microphone permissions.",
      );
      return null;
    }
  };

  const getSupportedMimeType = (): string => {
    const types = [
      "video/mp4",
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return "";
  };

  const startRecording = async () => {
    if (!streamRef.current) {
      const stream = await startCamera();
      if (!stream) return;
    }

    if (!window.MediaRecorder) {
      toast.error("MediaRecorder API is not supported");
      return;
    }

    const mimeType = getSupportedMimeType();
    if (!mimeType) {
      toast.error("No supported video format found");
      return;
    }

    try {
      const mediaRecorder = new MediaRecorder(streamRef.current!, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          if (chunksRef.current.length === 0) {
            setApiError("No video data recorded");
            return;
          }

          const blob = new Blob(chunksRef.current, { type: mimeType });
          setVideoBlob(blob);

          const videoUrl = URL.createObjectURL(blob);
          setRecordedVideoUrl(videoUrl);
          setIsVideoRecorded(true);
          setShowRetakeOption(true);

          if (videoRef.current) {
            videoRef.current.srcObject = null;
            videoRef.current.src = videoUrl;
            videoRef.current.muted = false;
            videoRef.current.controls = true;
            videoRef.current.load();
            
            // Pause the video by default
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.pause();
              }
            }, 100);
          }
        } catch (error) {
          console.error("Error processing recording:", error);
          setApiError("Error processing recording");
        }
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      setShowRetakeOption(false);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      setApiError("Error starting recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
        setIsRecording(false);

        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
      } catch (error) {
        console.error("Error stopping recording:", error);
        setApiError("Error stopping recording");
      }
    }
  };

  const handleRetake = () => {
    setIsRecording(false);
    setIsVideoRecorded(false);
    setRecordedVideoUrl(null);
    setVideoBlob(null);
    setRecordingTime(0);
    setApiError(null);
    setShowRetakeOption(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = "";
      videoRef.current.controls = false;
    }

    startCamera();
  };

  const handleSubmit = () => {
    if (!isVideoRecorded || !videoBlob) {
      toast.error("Please record a video before submitting");
      return;
    }

    const formData = new FormData();
    const mimeType = getSupportedMimeType();
    const extension = mimeType.includes("mp4") ? "mp4" : "webm";

    formData.append("video", videoBlob, `presentation.${extension}`);
    formData.append("assessmentId", assessmentId);

    mutate(formData);
  };

  const handleAutoSubmit = () => {
    if (isVideoRecorded && videoBlob) {
      handleSubmit();
    } else {
      toast.error("Time's up! But no video was recorded.");
      router.push(
        `/dashboard/ai-assessment-centre/presentation/results/${assessmentId}`,
      );
    }
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this assessment?")) {
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FAFF00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading presentation task...</p>
        </div>
      </div>
    );
  }

  if (isError || !writtentData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-lg text-red-600">
          Failed to load presentation data
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-[#FAFF00] rounded-xl font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {isPending && <AILoader />}
      <main className="flex-1 w-full px-6 py-8 mx-auto max-w-7xl">
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#0A0A0A]">
              Assessment Module 01
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#0A0A0A]">
              Video Presentation Task
            </h1>
          </div>
          <div
            className={`rounded-[12px] border-2 border-[#131313] px-4 py-2 flex items-center gap-3 ${isTimeWarning ? "border-red-500 bg-red-50" : "border-primary bg-[#FFFF00]"}`}
          >
            <div className="bg-[#0A0A0A] p-[6px] rounded-[8px] flex-shrink-0 inline-flex items-center justify-center">
              <Clock
                className={`w-5 h-5 ${isTimeWarning ? "text-red-600" : "text-[#FBBF24]"}`}
              />
            </div>
            <span
              className={`font-bold text-base ${isTimeWarning ? "text-red-600" : "text-[#0A0A0A]"}`}
            >
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Prompt */}
          <div className="space-y-6">
            <PresentationPromptSection
              title="Ventara Automotive"
              description={
                writtentData?.ventaraMobility || "No description available"
              }
              objectives={[
                "Identify key points for your presentation",
                "Structure your response clearly",
                "Deliver with confidence",
              ]}
              proTip="Focus on clarity and structure. Record yourself presenting your response to the prompt."
            />
          </div>

          {/* Right Column - Video Recording */}
          <div className="space-y-6">
            {/* Video Recording Section */}
            <div className="border-[3px] border-[#FAFF00] rounded-2xl p-6 bg-white">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-bold">
                <Video className="w-5 h-5" /> Record Your Presentation
              </h3>

              {/* Video Container */}
              <div className="relative bg-[#CCCCCC] rounded-2xl overflow-hidden min-h-[400px] mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isCameraActive || isVideoRecorded
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />

                {/* Recording Indicator with Timer */}
                {isRecording && (
                  <div className="absolute z-30 top-4 right-4">
                    <div className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-full animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="font-bold">
                        REC {formatRecordingTime(recordingTime)} / 05:00
                      </span>
                    </div>
                  </div>
                )}

                {/* Max Time Warning */}
                {isRecording && recordingTime >= MAX_RECORDING_TIME - 30 && (
                  <div className="absolute z-30 top-4 left-4">
                    <div className="px-4 py-2 text-white bg-yellow-600 rounded-full">
                      <span className="font-bold">30 seconds remaining</span>
                    </div>
                  </div>
                )}

                {/* Default Content */}
                {!isCameraActive && !isVideoRecorded && !isRecording && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <Camera className="w-20 h-20 mb-4 text-gray-600" />
                    <p className="text-lg font-medium text-center text-gray-700">
                      Ready to start your presentation?
                    </p>
                    <p className="mt-2 text-sm text-center text-gray-500">
                      Click "Start Camera" to begin
                    </p>
                  </div>
                )}

                {/* Camera Active but not recording */}
                {isCameraActive && !isRecording && !isVideoRecorded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="p-6 text-center bg-white rounded-xl">
                      <p className="mb-4 text-lg font-bold">Camera Ready</p>
                      <p className="mb-4 text-gray-600">
                        Click "Start Recording" when you're ready to begin
                      </p>
                      <button
                        onClick={startRecording}
                        className="px-6 py-3 bg-[#FAFF00] rounded-xl font-bold hover:bg-[#e6e600] transition"
                      >
                        Start Recording Now
                      </button>
                    </div>
                  </div>
                )}

                {/* Stop Recording Button */}
                {isRecording && (
                  <div className="absolute z-30 transform -translate-x-1/2 bottom-6 left-1/2">
                    <button
                      onClick={stopRecording}
                      className="flex items-center gap-2 px-8 py-4 text-white transition-all bg-red-600 rounded-full shadow-lg hover:bg-red-700 animate-pulse"
                    >
                      <StopCircle className="w-6 h-6" />
                      <span className="text-lg font-bold">Stop Recording</span>
                    </button>
                  </div>
                )}

                {/* Recording Complete Message - Small and unobtrusive */}
                {isVideoRecorded && !isRecording && (
                  <div className="absolute z-30 top-4 right-4">
                    <div className="px-4 py-2 text-green-800 bg-green-100 rounded-full">
                      <span className="text-sm font-semibold">
                        Recording Complete • {formatRecordingTime(recordingTime)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Controls */}
              {!isRecording && !isVideoRecorded && !isCameraActive && (
                <button
                  onClick={startCamera}
                  className="w-full px-6 py-4 bg-[#FAFF00] text-black rounded-xl font-bold hover:bg-[#e6e600] transition flex items-center justify-center gap-3 text-lg"
                >
                  <Camera className="w-6 h-6" /> Start Camera
                </button>
              )}

              {isCameraActive && !isRecording && !isVideoRecorded && (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (streamRef.current) {
                        streamRef.current
                          .getTracks()
                          .forEach((track) => track.stop());
                        streamRef.current = null;
                        setIsCameraActive(false);
                      }
                    }}
                    className="flex-1 px-4 py-3 text-gray-800 transition bg-gray-200 rounded-xl hover:bg-gray-300"
                  >
                    Close Camera
                  </button>
                  <button
                    onClick={startRecording}
                    className="flex-1 px-4 py-3 bg-[#FAFF00] text-black rounded-xl hover:bg-[#e6e600] transition flex items-center justify-center gap-2"
                  >
                    <Video className="w-5 h-5" /> Start Recording
                  </button>
                </div>
              )}

              {/* Recorded Video Controls */}
              {isVideoRecorded && !isRecording && (
                <div className="flex gap-3">
                  {showRetakeOption && (
                    <button
                      onClick={handleRetake}
                      className="flex-1 px-4 py-3 text-white transition bg-amber-500 rounded-xl hover:bg-amber-600 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" /> Retake Video
                    </button>
                  )}
                  {recordedVideoUrl && (
                    <a
                      href={recordedVideoUrl}
                      download={`presentation-${assessmentId}.mp4`}
                      className="flex-1 px-4 py-3 text-white transition bg-green-600 rounded-xl hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      Download Video
                    </a>
                  )}
                </div>
              )}

              {apiError && (
                <p className="mt-2 text-sm text-red-600">{apiError}</p>
              )}

              {/* Recording Tips */}
              <div className="p-4 mt-4 bg-gray-50 rounded-xl">
                <h4 className="mb-2 font-bold">Recording Tips:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Speak clearly and at a moderate pace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Look at the camera to maintain eye contact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Maximum recording time: 5 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>You can retake the recording if needed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-end gap-4 pt-6 pb-6 pr-4 bg-white md:flex-row">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 border-[2px] border-[#0A0A0A] text-[#0A0A0A] rounded-[12px] text-sm font-bold hover:bg-gray-50 transition"
              >
                <X /> Cancel Assessment
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending || !isVideoRecorded}
                className={`flex items-center gap-2 px-6 py-3 rounded-[12px] text-[#0A0A0A] text-sm font-semibold transition-opacity ${
                  isVideoRecorded
                    ? "bg-[#FFFF00] hover:opacity-90"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Presentation <Send />
                  </>
                )}
              </button>
            </div>

            {/* Status Message */}
            {!isVideoRecorded && !isRecording && (
              <p className="text-sm text-center text-gray-500">
                Please record your video presentation before submitting
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}