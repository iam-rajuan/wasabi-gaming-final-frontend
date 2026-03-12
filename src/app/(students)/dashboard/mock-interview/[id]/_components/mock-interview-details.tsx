"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const MockInterviewDetails = ({ onProceed }: { onProceed: any }) => {
  const { id } = useParams();
  const { data: session } = useSession();
  const token = session?.accessToken || "";

  const [isSessionDetailsOpen, setIsSessionDetailsOpen] = useState(true);

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["mock-interview", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-interview/${id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.json();
    },
    enabled: !!id && !!token,
  });

  const interview = apiResponse?.data;

  const handleProceedClick = () => {
    onProceed({
      token,
      interviewId: id,
      role: interview?.role,
      duration: interview?.duration,
    });
  };

  if (isLoading) return <DetailsSkeleton />;

  return (
    <div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <section>
            <h2 className="mb-3 text-lg font-bold">Dear Candidate,</h2>
            <p className="text-sm leading-relaxed text-gray-600">
              {interview?.description}
            </p>
          </section>

          <section>
            <h3 className="mb-3 font-bold text-md">
              Instructions for the Assessment:
            </h3>
            <ul className="pl-5 space-y-3 text-sm text-gray-600 list-disc">
              {interview?.instruction?.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <section>
            <h3 className="mb-3 font-bold text-md">
              Essential Equipment & Environment Check:
            </h3>
            <ul className="pl-5 space-y-4 text-sm text-gray-600 list-disc">
              <li>
                Ensure your camera and microphone are functioning correctly.
              </li>
              <li>Find a quiet, well-lit space free from distractions.</li>
              <li>
                Sit upright, and maintain eye contact with your camera as you
                deliver your responses.
              </li>
            </ul>
          </section>
          <p className="text-sm leading-relaxed text-gray-600">
            Please ensure you have at least {interview?.duration} of
            uninterrupted time to complete this session.
          </p>
        </div>
      </div>

      {/* Session Details Box */}
      <div className="mt-12 bg-[#FFFDF0] border border-[#F0E68C] rounded-xl p-6 max-w-2xl">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsSessionDetailsOpen(!isSessionDetailsOpen)}
        >
          <h4 className="text-[#003366] font-bold text-sm mb-4">
            Select Session Details
          </h4>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isSessionDetailsOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isSessionDetailsOpen && (
          <div className="space-y-4">

            <div className="flex justify-between text-xs text-gray-500">
              <span>Duration</span>
              <span className="font-medium text-gray-800">
                {interview?.duration}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Interviewer</span>
              <span className="font-medium text-gray-800">AI Simulation</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Button
        onClick={handleProceedClick}
        className="w-[200px] mt-8 rounded-3xl text-lg font-semibold"
      >
        Proceed
      </Button>
    </div>
  );
};

const DetailsSkeleton = () => (
  <div className="max-w-5xl p-8 mx-auto animate-pulse">
    <div className="w-64 h-8 mb-4 bg-gray-200 rounded" />
    <div className="h-4 mb-6 bg-gray-100 rounded w-96" />
    <hr className="mb-8" />
    <div className="grid grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="w-full h-4 bg-gray-100 rounded" />
        <div className="w-full h-4 bg-gray-100 rounded" />
        <div className="w-full h-32 rounded bg-gray-50" />
      </div>
      <div className="space-y-4">
        <div className="w-full h-32 rounded bg-gray-50" />
        <div className="w-40 h-4 bg-gray-100 rounded" />
      </div>
    </div>
    <div className="w-full h-40 max-w-2xl mt-12 bg-gray-100 rounded-xl" />
  </div>
);

export default MockInterviewDetails;
