"use client";
import { useInterviewSessionStore } from "@/zustand/useInterviewSessionId";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import {
  CheckCircle2,
  Lightbulb,
  PlayCircle,
  ChevronRight,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const RadialProgress = ({ value, label }: { value: number; label: string }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center justify-between p-6 bg-[#FFFFF0] rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800">{label}</h3>
      <div className="relative flex items-center justify-center">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#A3B12D"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-semibold text-gray-600">
          {value}%
        </span>
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className="max-w-5xl p-6 mx-auto space-y-6 animate-pulse">
    <div className="w-full h-16 bg-gray-200 rounded-lg" />
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-gray-100 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="h-64 bg-gray-50 rounded-xl" />
      <div className="h-64 bg-gray-50 rounded-xl" />
    </div>
  </div>
);

export default function InterviewSummary() {
  const { id } = useParams();
  const { interviewSessionId } = useInterviewSessionStore();
  const { data: session } = useSession();
  const token = session?.accessToken || "";

  const { data, isLoading } = useQuery({
    queryKey: ["interview-summery", interviewSessionId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-interview-session/average-score/${interviewSessionId}`,
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

  if (isLoading) return <Skeleton />;
  if (!data) return <div className="p-10 text-center">No data found.</div>;

  const { averageScores, feedback } = data;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-[#1A1A1A] text-white p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-700 rounded-md">
            <Trophy className="w-5 h-5 text-gray-300" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest">
              Interview Crushed!
            </p>
            <h2 className="text-xl font-bold">
              {averageScores?.interview_crushed}/100
            </h2>
          </div>
        </div>
      </div>

      {/* Score Breakdown Section */}
      <div className="p-8 border border-gray-200 rounded-2xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-gray-100 p-1.5 rounded text-gray-600">
            <PlayCircle size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold leading-tight text-gray-900">
              Score Breakdown
            </h2>
            <p className="text-xs font-medium text-gray-500">
              Mock Interview: Skills & Performance Review
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RadialProgress
            label="Communication & Clarity"
            value={averageScores?.communication_and_clarity}
          />
          <RadialProgress
            label="Commercial Awareness"
            value={averageScores?.commercial_awareness}
          />
          <RadialProgress
            label="Problem Solving"
            value={averageScores?.problem_solving}
          />
          <RadialProgress
            label="Professionalism & Presence"
            value={averageScores?.professionalism_and_presence}
          />
        </div>
      </div>

      {/* Strengths & Areas for Improvement */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Strengths */}
        <div className="bg-[#F0F9F4] border border-[#B7E4C7] rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6 text-[#2D6A4F]">
            <CheckCircle2 size={20} />
            <h3 className="text-lg font-bold">Strengths</h3>
          </div>
          <ul className="space-y-4">
            {feedback?.strength?.map((item: string, idx: number) => (
              <li
                key={idx}
                className="flex gap-3 text-sm text-[#2D6A4F] leading-relaxed"
              >
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-[#FFF5F2] border border-[#FAD2C0] rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6 text-[#94412D]">
            <Lightbulb size={20} />
            <h3 className="text-lg font-bold">Areas for Improvement</h3>
          </div>
          <ul className="space-y-4">
            {feedback?.areas_for_improvement?.map((item: string, idx: number) => (
              <li
                key={idx}
                className="flex gap-3 text-sm text-[#94412D] leading-relaxed"
              >
                <span className="text-lg leading-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Action CTA */}
      <div className="bg-gradient-to-r from-[#E6E905] to-[#8C931B] rounded-3xl p-12 text-center space-y-4 shadow-lg">
        <div className="flex justify-center">
          <PlayCircle className="w-12 h-12 text-gray-800 opacity-80" />
        </div>
        <h2 className="text-3xl font-black text-gray-900">
          Ready to See Your Performance?
        </h2>
        <p className="max-w-lg mx-auto text-sm font-medium text-gray-800">
          Watch your recorded responses, get detailed feedback on each question
          and see analysis of your body language and communication
        </p>
        <Link
          href={`/dashboard/mock-interview/${id}/interview-summery/review-interview`}
        >
          {" "}
          <button className="flex items-center gap-2 px-8 py-3 mx-auto mt-4 font-bold text-gray-900 transition-colors bg-white shadow-sm rounded-xl hover:bg-gray-50">
            Review Your Performance <ChevronRight size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}
