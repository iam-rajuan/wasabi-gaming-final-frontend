"use client";
import { useInterviewSessionStore } from "@/zustand/useInterviewSessionId";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Volume2,
  Maximize2,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ReviewSkeleton = () => (
  <div className="grid grid-cols-1 gap-8 p-6 mx-auto max-w-7xl animate-pulse lg:grid-cols-3">
    <div className="space-y-6 lg:col-span-2">
      <div className="bg-gray-200 aspect-video rounded-3xl" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="h-32 bg-gray-100 rounded-2xl" />
      </div>
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-24 bg-gray-100 rounded-xl" />
      ))}
    </div>
  </div>
);

const ReviewInterview = () => {
  const { id } = useParams();
  const { interviewSessionId } = useInterviewSessionStore();
  const { data: session } = useSession();
  const token = session?.accessToken || "";

  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["interview-summery", interviewSessionId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-interview-session/${interviewSessionId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const json = await res.json();
      return json.data;
    },
    enabled: !!token && !!interviewSessionId,
  });

  // Handle video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef?.current?.currentTime);
    }
  };

  // Get video duration
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef?.current?.duration);
    }
  };

  // Format time (0:00)
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Function to handle play/pause
  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef?.current.pause();
      } else {
        videoRef?.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Reset play state when changing questions
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef?.current.load();
    }
  }, [activeIdx]);

  if (isLoading) return <ReviewSkeleton />;
  if (!data) return <div className="p-10 text-center">Session not found.</div>;

  const currentAnswer = data?.session?.answers[activeIdx];
  const feedback = currentAnswer?.aiResult?.feedback;
  const feedbackTimeline = currentAnswer?.aiResult?.feedback_timeline;
  const openingHookSecond = feedbackTimeline?.opening_hook?.secound;
  const openingHookSecondLabel =
    openingHookSecond !== undefined && openingHookSecond !== null
      ? `${openingHookSecond}s`
      : "0s";
  const openingHookText = feedbackTimeline?.opening_hook?.text;
  const fillerWordsText = feedbackTimeline?.filler_words;
  const strongerAnswerText = feedbackTimeline?.stronger_answer;
  console.log(strongerAnswerText)

  return (
    <div className="pb-8 border-b border-black">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Video & Key Feedback */}
        <div className="space-y-6 lg:col-span-2">
          <div className="relative">
            <div className="aspect-video bg-[#FDF2E9] rounded-[40px] overflow-hidden relative shadow-sm border border-orange-100">
              <video
                ref={videoRef}
                key={currentAnswer?.videoUrl}
                src={currentAnswer?.videoUrl}
                className="object-cover w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                playsInline
              />

              {/* Custom Overlay Play Button */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
              >
                <button
                  onClick={handleTogglePlay}
                  className="bg-[#FF6B2C] p-6 rounded-full text-white shadow-xl hover:scale-105 transition-transform cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause fill="currentColor" size={32} />
                  ) : (
                    <Play fill="currentColor" size={32} />
                  )}
                </button>
              </div>

              {/* Functional Progress Bar & Controls */}
              <div className="absolute px-4 py-2 rounded-full bottom-6 left-6 right-6 bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-4 text-white">
                  <button onClick={handleTogglePlay}>
                    {isPlaying ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} fill="currentColor" />
                    )}
                  </button>
                  <span className="text-xs font-medium min-w-[70px]">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <div className="flex-1 h-1.5 bg-white/30 rounded-full relative overflow-hidden">
                    {/* Functional Progress Fill */}
                    <div
                      className="h-full bg-[#FF6B2C] rounded-full transition-all duration-100"
                      style={{
                        width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <Volume2 size={18} className="cursor-pointer" />
                  <Maximize2 size={18} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Improvements Boxes */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="p-6 bg-[#F8FDFB] border border-[#E8F5F1] rounded-2xl">
              <div className="flex items-center gap-2 text-[#2D6A4F] mb-4">
                <CheckCircle2 size={18} />
                <h3 className="font-bold">Key Strengths</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D084] mt-1.5 shrink-0" />
                  {feedback?.strength || "No data provided"}
                </li>
               
              </ul>
            </div>

            <div className="p-6 bg-[#FFF9F8] border border-[#FDEEE9] rounded-2xl">
              <div className="flex items-center gap-2 text-[#94412D] mb-4">
                <div className="w-5 h-5 rounded-full border border-[#94412D] flex items-center justify-center text-[10px] font-bold">
                  !
                </div>
                <h3 className="font-bold">Areas to Improve</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] mt-1.5 shrink-0" />
                  {feedback?.areas_for_improvement || "No feedback available"}
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href={`/dashboard/mock-interview/${id}`}>
              <button className="flex items-center gap-2 px-8 py-3 bg-[#0F172A] text-white rounded-xl font-bold hover:bg-black transition-colors">
                <RotateCcw size={18} /> Practice Again
              </button>
            </Link>
            <button
              onClick={() => {
                if (activeIdx < data.session.questions.length - 1) {
                  setActiveIdx(activeIdx + 1);
                }
              }}
              className="flex items-center gap-2 px-8 py-3 bg-[#FCFF52] text-black rounded-xl font-bold hover:bg-[#eff140] transition-colors shadow-sm"
            >
              Next Question <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Column: Timeline & Analysis */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#FF6B2C]">
            <MessageSquare size={20} />
            <h2 className="text-lg font-bold">Feedback Timeline</h2>
          </div>

          <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <h1 className="text-lg font-bold text-gray-500">Overall Score</h1>

            <h1><span className="text-4xl text-[#223a8a] font-bold">{data?.sessionAverageScore}</span>/<span className="opacity-75">10</span></h1>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 size={18} className="text-[#00D084]" />
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono">
                  {openingHookSecondLabel}
                </span>
                <h4 className="text-sm font-bold">Great opening hook!</h4>
              </div>
              <p className="text-xs leading-relaxed text-gray-500 ml-7">
                {openingHookText || "No opening hook feedback available."}
              </p>
            </div>

            <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb size={18} className="text-[#FF6B2C]" />
                <h4 className="text-sm font-bold">Watch the filler words</h4>
              </div>
              <p className="text-xs leading-relaxed text-gray-500 ml-7">
                {fillerWordsText || "No filler words feedback available."}
              </p>
            </div>
          </div>

          {/* Stronger Answer Example Box */}
          <div className="p-6 bg-[#FFFBEB] border border-[#FEF3C7] rounded-[32px] relative overflow-hidden">
            <div className="flex items-center gap-2 text-[#B45309] mb-4">
              <Lightbulb size={20} />
              <h3 className="font-bold">Example of a Stronger Answer</h3>
            </div>
            <p className="text-xs text-[#92400E] leading-loose italic mb-4">
              {strongerAnswerText
                ? `"${strongerAnswerText}"`
                : "No stronger answer example available."}
            </p>
            <div className="bg-[#FEFCE8] text-[#854D0E] text-[10px] font-bold py-2 px-4 rounded-full inline-flex items-center gap-2">
              ✨ Try this structure in your next attempt!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewInterview;
