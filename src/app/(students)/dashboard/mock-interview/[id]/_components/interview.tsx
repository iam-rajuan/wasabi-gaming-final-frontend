"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface Answer {
  questionIndex: number;
  question: string;
  videoUrl: string;
  timestamp: string;
  submitted: boolean;
}

interface Question {
  questionText: string;
  order: number;
}

interface SessionData {
  _id: string;
  category: string;
  questions: Question[];
}

interface InterviewProps {
  sessionData: SessionData | null;
  onBack: () => void;
  isLoading?: boolean; // Add loading prop
}

// Skeleton Loader Component
const InterviewSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col font-sans text-[#444] p-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="w-48 h-8 bg-gray-200 rounded-lg"></div>
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-20 h-10 bg-gray-200 rounded-lg"></div>
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Question Navigation Skeleton */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[1, 2, 3, 4, 5].map((_, idx) => (
          <div key={idx} className="w-16 h-10 bg-gray-200 rounded-lg"></div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* LEFT PANEL SKELETON */}
        <div className="lg:w-[60%] border-[3px] border-gray-200 rounded-2xl p-6 flex flex-col justify-between relative">
          <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 rounded-2xl text-center relative overflow-hidden min-h-[500px]">
            {/* Camera placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-gray-300">📷</div>
            </div>

            {/* Preparation placeholder */}
            <div className="z-10 p-6">
              <div className="mb-6 text-4xl text-gray-300">🧠</div>
              <div className="w-64 h-8 mx-auto mb-3 bg-gray-200 rounded"></div>
              <div className="w-48 h-4 mx-auto mb-10 bg-gray-200 rounded"></div>

              {/* Circular progress skeleton */}
              <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center rounded-full border-[8px] border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="w-32 h-4 mx-auto mt-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Navigation Buttons Skeleton */}
          <div className="flex justify-between gap-2 mt-6">
            <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
          </div>

          {/* Footer Status Skeleton */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="w-32 h-5 bg-gray-200 rounded"></div>
              <div className="w-48 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL SKELETON */}
        <div className="flex-1 border-[3px] border-gray-200 rounded-2xl p-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Question skeleton */}
            <div className="space-y-3">
              <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
              <div className="w-full h-8 bg-gray-200 rounded"></div>
              <div className="w-2/3 h-8 bg-gray-200 rounded"></div>
            </div>

            {/* Tips Box Skeleton */}
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-5 flex gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="w-24 h-5 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((_, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preparation Box Skeleton */}
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-5 flex gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="w-32 h-5 bg-gray-200 rounded"></div>
                <div className="w-48 h-4 bg-gray-200 rounded"></div>
                <div className="w-full h-3 bg-gray-200 rounded-full"></div>
                <div className="flex justify-between">
                  <div className="w-20 h-3 bg-gray-200 rounded"></div>
                  <div className="w-20 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            {/* Progress Summary Skeleton */}
            <div className="p-5 border border-gray-200 bg-gray-50 rounded-xl space-y-3">
              <div className="w-32 h-5 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-gray-200 rounded-full"></div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-48 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Start Recording Button Skeleton */}
          <div className="mt-8 space-y-3">
            <div className="w-full h-14 bg-gray-200 rounded-xl"></div>
            <div className="w-48 h-4 mx-auto bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Shimmer effect for smoother loading animation
const ShimmerSkeleton: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <InterviewSkeleton />
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Add shimmer animation to global styles */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

const Interview: React.FC<InterviewProps> = ({
  sessionData,
  onBack,
  isLoading = false,
}) => {
  const { data: session } = useSession();
  const token = session?.accessToken || "";
  const router = useRouter();
  const { id } = useParams();

  // Max recording time = 2 minutes
  const MAX_RECORDING_TIME = 2 * 60; // 120 seconds
  const PREP_TIME = 20; // 20 seconds preparation time

  // State management
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [prepTimer, setPrepTimer] = useState<number>(PREP_TIME);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [isVideoRecorded, setIsVideoRecorded] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [showRecordingComplete, setShowRecordingComplete] =
    useState<boolean>(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sessionId = sessionData?._id || "";
  const questions: Question[] = sessionData?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Show skeleton while loading
  if (isLoading) {
    return <ShimmerSkeleton />;
  }

  // Progress calculation (overall completion only, by submitted questions)
  const calculateProgress = (): number => {
    const totalQuestions = questions.length;
    if (totalQuestions === 0) return 0;

    const submittedAnswers = answers.filter((a) => a.submitted).length;
    const totalProgress = (submittedAnswers / totalQuestions) * 100;

    return Math.min(totalProgress, 100);
  };

  // Progress update effect
  useEffect(() => {
    setProgress(calculateProgress());
  }, [
    answers,
    questions.length,
  ]);

  // Start camera function
  const startCamera = async (): Promise<MediaStream | null> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Media devices API is not supported in this browser");
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

  // Validate video file
  const isValidVideoFile = (blob: Blob | null): boolean => {
    return !!blob && blob.type.startsWith("video/");
  };

  // Get supported MIME type
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

  // Get file extension based on MIME type
  const getFileExtension = (mimeType: string): string => {
    if (mimeType.includes("mp4")) return "mp4";
    if (mimeType.includes("webm")) return "webm";
    return "mp4";
  };

  // Save answer to server
  const saveAnswer = async (videoUrl: string, blob: Blob) => {
    if (!isValidVideoFile(blob)) {
      console.error("Invalid video file");
      setApiError("Invalid video file format");
      return;
    }

    if (!sessionId) {
      console.error("No session ID");
      setApiError("Session ID is missing");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const formData = new FormData();
      const mimeType = getSupportedMimeType();
      const extension = getFileExtension(mimeType);

      formData.append(
        "videoPath",
        blob,
        `question-${currentQuestionIndex + 1}.${extension}`,
      );
      formData.append("sessionId", sessionId);
      formData.append("questionIndex", currentQuestionIndex.toString());
      formData.append("question", currentQuestion?.questionText || "");
      formData.append("segment", `question-${currentQuestionIndex + 1}`);

      const answer: Answer = {
        questionIndex: currentQuestionIndex,
        question: currentQuestion?.questionText || "",
        videoUrl: videoUrl,
        timestamp: new Date().toISOString(),
        submitted: false,
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!apiUrl) {
        throw new Error("API base URL is not configured");
      }

      const response = await fetch(
        `${apiUrl}/mock-interview-session/start-interview`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to save answer");
      }

      answer.submitted = true;

      setAnswers((prev) => {
        const newAnswers = [...prev];
        const existingIndex = newAnswers.findIndex(
          (a) => a.questionIndex === currentQuestionIndex,
        );
        if (existingIndex >= 0) {
          newAnswers[existingIndex] = answer;
        } else {
          newAnswers.push(answer);
        }
        return newAnswers;
      });

      toast.success("Answer saved successfully!");
    } catch (error) {
      console.error("Error saving answer:", error);
      setApiError(
        error instanceof Error ? error.message : "Failed to save answer",
      );
      toast.error("Failed to save answer. Please try again.");

      const answer: Answer = {
        questionIndex: currentQuestionIndex,
        question: currentQuestion?.questionText || "",
        videoUrl: videoUrl,
        timestamp: new Date().toISOString(),
        submitted: false,
      };

      setAnswers((prev) => {
        const newAnswers = [...prev];
        const existingIndex = newAnswers.findIndex(
          (a) => a.questionIndex === currentQuestionIndex,
        );
        if (existingIndex >= 0) {
          newAnswers[existingIndex] = answer;
        } else {
          newAnswers.push(answer);
        }
        return newAnswers;
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start recording function
  const startRecording = async () => {
    // Clear timers
    if (prepTimerRef.current) {
      clearInterval(prepTimerRef.current);
      prepTimerRef.current = null;
    }
    setShowRecordingComplete(false);

    if (!streamRef.current) {
      const stream = await startCamera();
      if (!stream) return;
    }

    if (!streamRef.current) {
      console.error("No stream available");
      return;
    }

    if (!window.MediaRecorder) {
      toast.error("MediaRecorder API is not supported in this browser");
      return;
    }

    const mimeType = getSupportedMimeType();

    if (!mimeType) {
      toast.error("No supported video format found in this browser");
      return;
    }

    try {
      const options: MediaRecorderOptions = { mimeType };
      const mediaRecorder = new MediaRecorder(streamRef.current, options);

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
            console.error("No video data recorded");
            setApiError("No video data recorded");
            return;
          }

          const blob = new Blob(chunksRef.current, {
            type: mimeType,
          });

          if (!isValidVideoFile(blob)) {
            console.error("Invalid video blob");
            setApiError("Invalid video format");
            return;
          }

          const videoUrl = URL.createObjectURL(blob);
          setRecordedVideoUrl(videoUrl);
          setIsVideoRecorded(true);
          setShowRecordingComplete(true);

          if (videoRef.current) {
            videoRef.current.srcObject = null;
            videoRef.current.src = videoUrl;
            videoRef.current.muted = false;
            videoRef.current.controls = true;
            videoRef.current.load();
          }

          await saveAnswer(videoUrl, blob);
        } catch (error) {
          console.error("Error processing recording:", error);
          setApiError("Error processing recording");
        }
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);

      // Use a ref to track if we've already shown the max time toast
      let hasShownMaxTimeToast = false;

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            // Only stop recording and show toast once
            if (!hasShownMaxTimeToast) {
              hasShownMaxTimeToast = true;
              stopRecording();
              toast.info("Maximum recording time reached (2 minutes)");
            }
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      setApiError("Error starting recording: " + (error as Error).message);
    }
  };

  // Stop recording function
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
  // Setup auto timers
  const setupAutoTimers = () => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);

    setPrepTimer(PREP_TIME);

    // Preparation timer - updates every second
    prepTimerRef.current = setInterval(() => {
      setPrepTimer((prev) => {
        if (prev <= 1) {
          if (prepTimerRef.current) {
            clearInterval(prepTimerRef.current);
            prepTimerRef.current = null;
          }
          if (!isRecording && !isVideoRecorded) {
            startRecording();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetRecordingState();
    } else {
      handleInterviewComplete();
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      resetRecordingState();

      const prevAnswer = answers.find(
        (a) => a.questionIndex === currentQuestionIndex - 1,
      );
      if (prevAnswer) {
        setRecordedVideoUrl(prevAnswer.videoUrl);
        setIsVideoRecorded(true);

        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = prevAnswer.videoUrl;
          videoRef.current.muted = false;
          videoRef.current.controls = true;
          videoRef.current.load();
        }
      }
    }
  };

  // Reset recording state
  const resetRecordingState = () => {
    setIsRecording(false);
    setIsCameraActive(false);
    setIsVideoRecorded(false);
    setRecordedVideoUrl(null);
    setRecordingTime(0);
    setPrepTimer(PREP_TIME);
    setApiError(null);
    setShowRecordingComplete(false);

    if (prepTimerRef.current) {
      clearInterval(prepTimerRef.current);
      prepTimerRef.current = null;
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = "";
      videoRef.current.controls = false;
    }

    setupAutoTimers();
  };

  // Handle retake recording
  const handleRetake = () => {
    resetRecordingState();
    startCamera();
  };

  // Handle interview completion
  const handleInterviewComplete = () => {
    const submittedCount = answers.filter((a) => a.submitted).length;
    toast.success(
      `Interview completed! ${submittedCount} of ${questions.length} responses have been recorded successfully.`,
    );
    router.push(`/dashboard/mock-interview/${id}/interview-summery`);
  };

  // Handle manual recording start
  const handleStartRecording = () => {
    startRecording();
    setPrepTimer(PREP_TIME);
  };

  // Initialize timers
  useEffect(() => {
    setupAutoTimers();

    return () => {
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [currentQuestionIndex]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Check if current question has been answered
  const isCurrentQuestionAnswered = answers.some(
    (a) => a.questionIndex === currentQuestionIndex && a.submitted,
  );

  if (!sessionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">
          No session data found. Please start again.
        </p>
        <button
          onClick={onBack}
          className="px-4 py-2 mt-4 text-blue-500 transition border border-blue-500 rounded-lg hover:bg-blue-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col font-sans text-[#444] p-4">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{sessionData.category}</h1>
          <p className="text-sm text-gray-600">
            Session  ID: {sessionId?.slice(-8) || "N/A"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 transition border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            ← Back
          </button>

          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {questions.map((q: Question, idx: number) => {
          const isAnswered = answers.some(
            (a) => a.questionIndex === idx && a.submitted,
          );
          const isCurrent = idx === currentQuestionIndex;

          return (
            <button
              key={idx}
              onClick={() => {
                if (idx !== currentQuestionIndex) {
                  setCurrentQuestionIndex(idx);
                  resetRecordingState();
                }
              }}
              className={`px-4 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-2 ${
                isCurrent
                  ? "bg-[#FAFF00] font-bold shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              } ${isAnswered ? "border-2 border-green-500" : ""}`}
            >
              Q{idx + 1}
              {isAnswered && <span className="text-green-500">✓</span>}
            </button>
          );
        })}
      </div>

      {apiError && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-300 rounded-lg">
          <p className="font-medium">Error: {apiError}</p>
          <p className="mt-1 text-sm">
            Please try recording again or contact support if the issue persists.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        {/* LEFT PANEL - PREPARATION & RECORDING AREA */}
        <div className="lg:w-[60%] border-[3px] border-[#FAFF00] rounded-2xl p-6 flex flex-col justify-between relative">
          <div className="flex-grow flex flex-col items-center justify-center bg-[#CCCCCC] rounded-2xl text-center relative overflow-hidden min-h-[500px]">
            {/* Video element */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isCameraActive || isVideoRecorded ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Recording indicator - Top right corner */}
            {isRecording && (
              <div className="absolute z-30 top-4 right-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-full animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span className="font-bold">REC</span>
                    <span className="font-mono">
                      {formatTime(recordingTime)} / 2:00
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Stop Recording button - Bottom center when recording */}
            {isRecording && (
              <div className="absolute z-30 transform -translate-x-1/2 bottom-6 left-1/2">
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-6 py-3 text-white transition-all bg-red-600 rounded-full shadow-lg hover:bg-red-700 animate-pulse"
                >
                  <span className="text-xl">⏹️</span>
                  <span className="font-bold">Stop Recording</span>
                </button>
              </div>
            )}

            {/* Default content - No camera */}
            {!isCameraActive && !isVideoRecorded && !isRecording && (
              <div className="z-10 p-6">
                <div className="mb-6 text-4xl">🧠</div>
                <h2 className="serif-font text-2xl font-bold mb-3 text-[#333]">
                  Prepare Your Answer
                </h2>
                <p className="text-sm mb-10 text-[#555] max-w-md">
                  Read the question and think about your response
                </p>

                <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center rounded-full border-[8px] border-[#FAFF00]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#FAFF00]">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm serif-font italic text-[#555]">
                  Recording starts automatically in {prepTimer}s
                </p>
              </div>
            )}

            {/* Camera active but not recording - with real-time progress bar */}
            {isCameraActive && !isRecording && !isVideoRecorded && (
              <div className="z-10 w-full max-w-md p-6">
                <div className="mb-4 text-4xl">📹</div>
                <h2 className="mb-3 text-2xl font-bold text-white drop-shadow-lg">
                  Camera Ready
                </h2>
                <p className="mb-8 text-lg text-white drop-shadow-lg">
                  Click below to start recording your answer
                </p>

                {/* Real-time progress bar for preparation time */}
                <div className="w-full mx-auto mb-4">
                  <div className="flex justify-between mb-2 text-sm text-white">
                    <span>Preparation Time: {prepTimer}s</span>
                    <span>Auto-start: {prepTimer}s</span>
                  </div>
                  <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-[#FAFF00] transition-all duration-300 ease-linear"
                      style={{
                        width: `${((PREP_TIME - prepTimer) / PREP_TIME) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-white/80">
                    <span>0s</span>
                    <span>{prepTimer}s remaining</span>
                    <span>{PREP_TIME}s</span>
                  </div>
                </div>
              </div>
            )}

            {/* Control buttons */}
            <div className="z-20 flex flex-col items-center gap-4 mt-6">
              {!isVideoRecorded && !isRecording && (
                <button
                  onClick={handleStartRecording}
                  className="flex items-center gap-3 px-8 py-4 bg-[#FAFF00] hover:bg-[#e6e600] text-black font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
                  disabled={isSubmitting}
                >
                  <span className="text-2xl">▶</span>
                  <span className="text-lg">Start Recording Now</span>
                </button>
              )}

              {isCameraActive && !isRecording && !isVideoRecorded && (
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
                  className="px-6 py-3 text-white transition bg-gray-700 rounded-lg hover:bg-gray-800"
                >
                  Close Camera
                </button>
              )}
            </div>
          </div>

          {/* Recording complete section - MOVED OUTSIDE video area */}
          {isVideoRecorded && !isRecording && (
            <div className="p-4 mt-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h3 className="font-bold text-green-800">
                      Recording Complete!
                    </h3>
                    <p className="text-sm text-green-600">
                      Your {formatTime(recordingTime)} response has been
                      recorded
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (recordedVideoUrl) {
                        const a = document.createElement("a");
                        a.href = recordedVideoUrl;
                        a.download = `question-${currentQuestionIndex + 1}.mp4`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                    disabled={!recordedVideoUrl}
                  >
                    <span>💾</span> Download
                  </button>
                  <button
                    onClick={handleRetake}
                    className="flex items-center gap-2 px-4 py-2 text-white transition rounded-lg bg-amber-500 hover:bg-amber-600"
                  >
                    <span>🔄</span> Retake
                  </button>
                </div>
              </div>
              {isSubmitting && (
                <p className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                  <span className="animate-spin">⏳</span>
                  Saving your answer to server...
                </p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-2 mt-6">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-3 rounded-xl transition flex items-center gap-2 flex-1 justify-center ${
                currentQuestionIndex === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-800"
              }`}
            >
              ← Previous Question
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={!isCurrentQuestionAnswered}
              className={`px-6 py-3 rounded-xl transition flex items-center gap-2 flex-1 justify-center ${
                !isCurrentQuestionAnswered
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#FAFF00] text-black hover:bg-[#e6e600]"
              }`}
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question →"
                : "Complete Interview"}
            </button>
          </div>

          {/* Footer Status */}
          <div className="flex items-center gap-4 mt-6">
            <div className="p-3 text-white bg-black rounded-lg">
              {isRecording
                ? "⏺️"
                : isVideoRecorded
                  ? "✅"
                  : isCameraActive
                    ? "📹"
                    : "🎙️"}
            </div>
            <div>
              <h4 className="text-lg font-bold leading-none">
                {isRecording
                  ? "Recording..."
                  : isVideoRecorded
                    ? "Recording Complete"
                    : isCameraActive
                      ? "Camera Ready"
                      : "Ready"}
              </h4>
              <p className="text-sm italic text-gray-600">
                {isRecording
                  ? `${formatTime(recordingTime)} of 2:00`
                  : isVideoRecorded
                    ? "Your response has been recorded"
                    : isCameraActive
                      ? `Preparation: ${prepTimer}s • Auto-start: ${prepTimer}s`
                      : 'Click "Start Recording Now"'}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - QUESTION & TIPS */}
        <div className="flex-1 border-[3px] border-[#FAFF00] rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h1 className="serif-font text-2xl md:text-3xl font-bold leading-tight mb-8 text-[#333]">
              {currentQuestion?.questionText || "Loading question..."}
            </h1>

            {/* Tips Box */}
            <div className="bg-[#E5E5E5] border border-black rounded-xl p-5 flex gap-4 mb-6">
              <div className="p-3 text-xs text-white bg-black rounded-lg h-fit">
                🎙️
              </div>
              <div>
                <h5 className="mb-3 font-bold">Quick Tips:</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <span className="opacity-80">
                      Use STAR: Situation, Task, Action, Result
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <span className="opacity-80">
                      You have 2 minutes to answer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <span className="opacity-80">
                      Speak clearly and confidently
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <span className="opacity-80">
                      Structure your answer logically
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Preparation Box - Real-time progress */}
            <div className="bg-[#E5E5E5] border border-black rounded-xl p-5 flex gap-4">
              <div className="p-3 text-xs text-white bg-black rounded-lg h-fit">
                🧠
              </div>
              <div className="w-full">
                <h5 className="mb-2 font-bold">
                  {isRecording ? "Recording Time:" : "Preparation Time:"}
                </h5>
                <p className="mb-3 text-sm italic">
                  {isRecording
                    ? `Recording in progress... ${formatTime(recordingTime)} / 2:00`
                    : isVideoRecorded
                      ? "Recording completed!"
                      : isCameraActive
                        ? `Prepare your answer. Recording starts automatically in ${prepTimer}s`
                        : `Think about your answer. Recording starts in ${prepTimer}s`}
                </p>

                {/* Progress Bar - Real-time update every second */}
                <div className="w-full h-3 overflow-hidden bg-gray-300 rounded-full">
                  <div
                    className="bg-[#007185] h-full transition-all duration-300 ease-linear"
                    style={{
                      width: isRecording
                        ? `${(recordingTime / MAX_RECORDING_TIME) * 100}%`
                        : isVideoRecorded
                          ? "100%"
                          : `${Math.min(
                              Math.max(
                                ((PREP_TIME - prepTimer) / PREP_TIME) * 100,
                                0,
                              ),
                              100,
                            )}%`,
                    }}
                  ></div>
                </div>

                {/* Time remaining display */}
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span className="font-medium">
                    {isRecording
                      ? `Elapsed: ${formatTime(recordingTime)}`
                      : `Preparation: ${prepTimer}s remaining`}
                  </span>
                  <span className="font-medium">
                    {isRecording && "Max: 2:00"}
                    {isCameraActive && !isRecording && `Auto in: ${prepTimer}s`}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="p-5 mt-8 border border-gray-200 bg-gray-50 rounded-xl">
              <h5 className="mb-3 font-bold">Overall Progress</h5>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-3 overflow-hidden bg-gray-200 rounded-full">
                  <div
                    className="h-full transition-all duration-500 bg-green-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">
                  {Math.round(progress)}%
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {answers.filter((a) => a.submitted).length} of{" "}
                {questions.length} questions completed
              </p>
              {isSubmitting && (
                <p className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                  <span className="animate-spin">⏳</span>
                  Saving your answer...
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleStartRecording}
              disabled={isRecording || isVideoRecorded || isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 shadow-sm transition-all ${
                isRecording || isVideoRecorded || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#FFF34E] hover:brightness-95 active:scale-[0.98] hover:shadow-md"
              }`}
            >
              <span className="text-xl">▶</span>
              {isRecording
                ? "Recording..."
                : isVideoRecorded
                  ? "Recording Complete"
                  : isSubmitting
                    ? "Saving..."
                    : "Start Recording Now"}
            </button>
            <p className="mt-3 text-sm font-bold opacity-80">
              {isRecording
                ? `Recording... ${formatTime(recordingTime)} / 2:00`
                : isVideoRecorded
                  ? "You can download or retake your recording"
                  : isCameraActive
                    ? `Recording starts automatically in ${prepTimer}s`
                    : `Or wait ${prepTimer}s for recording to start automatically`}
            </p>
          </div>
        </div>
      </div>

      {/* Custom Font */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,600;0,700;1,400&display=swap");
        .serif-font {
          font-family: "Source Serif Pro", serif;
        }
      `}</style>
    </div>
  );
};

export default Interview;
