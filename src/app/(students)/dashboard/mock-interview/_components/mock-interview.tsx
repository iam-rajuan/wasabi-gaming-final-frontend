"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Clock, Play, CircleCheckBig, Brain, ChartColumn, Lightbulb, Target } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import MockSkeleton from "./mock-skeleton";
import Link from "next/link";

interface Interview {
  _id: string;
  title: string;
  role: string;
  duration: string;
  description: string;
  instruction: string[];
  interviewer_crushed: number;
  score: string;
  category: string;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  data: {
    data: Interview[];
    meta: {
      total: number;
      page: number;
      limit: number;
    };
  };
}

const getInterviewIcon = (title: string) => {
  switch (title) {
    case "Motivational Interview":
      return <Target className="text-[#8200DB]" />;
    case "Situational Interview":
      return <Lightbulb className="text-[#8200DB]" />;
    case "Technical Interview":
      return <ChartColumn className="text-[#8200DB]" />;
    case "Behavioural Interview":
      return <Brain className="text-[#8200DB]" />;
    default:
      return <Brain className="text-[#8200DB]" />;
  }
};

const MockInterview = () => {
  const { data: session } = useSession();
  const token = session?.accessToken || "";

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["mock-interview"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-interview`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <MockSkeleton key={index} />
        ))}
      </div>
    );
  }

  const interviews = data?.data?.data || [];

  if (interviews.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-4 border-2 border-gray-300/50 rounded-xl">
          <div className="py-8 text-center">
            <p className="text-gray-700">No interviews available</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusStyle = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "completed") {
      return "bg-[#DCFCE7] text-[#016630] border border-[#7BF1A8]";
    } else if (s === "available") {
      return "bg-[#FEF9C2] text-[#894B00] border border-[#FFDF20]";
    }
    return "bg-blue-100 text-blue-800";
  };

  const getStatusLabel = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'completed') return 'Completed';
    if (s === 'available') return 'Available';
    return status;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {interviews.map((interview: Interview) => (
        <div
          key={interview._id}
          className="bg-white rounded-[20px] border-[2px] border-[#E5E7EB] p-6 hover:shadow-lg transition-shadow flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D4FF] p-3 rounded-[24px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
              {getInterviewIcon(interview.title)}
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-base text-[#1E1E1E] mb-1">
                {interview.title}
              </h4>
              <p className="text-sm text-[#4A5565] line-clamp-2">
                {interview.description}
              </p>
            </div>

            <span
              className={`flex items-center gap-2 text-xs font-medium px-2 py-[2px] rounded-full ${getStatusStyle(interview.status)}`}
            >
              {interview.status?.toLowerCase() === "completed" && (
                <CircleCheckBig className="w-3 h-3" />
              )}
              {getStatusLabel(interview.status)}
            </span>
          </div>

          <div className="pb-4">
            <div className="flex items-center gap-2 text-sm text-[#4A5565]">
              <Clock size={16} />
              {interview.duration}
            </div>
          </div>

          <div className="mt-auto">
            <Link href={`/dashboard/mock-interview/${interview._id}`} className="w-full block">
              <button className="w-full flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold py-2 bg-[#FFFF00] text-[#1E1E1E] hover:opacity-90">
                <Play size={18} />
                Start Test
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MockInterview;
