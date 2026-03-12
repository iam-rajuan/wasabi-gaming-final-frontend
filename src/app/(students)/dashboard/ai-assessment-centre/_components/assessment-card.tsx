'use client';

import React from "react";
import { Brain, CircleCheckBig, Clock, Play, ChartColumn, Lightbulb, Target } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AiAssessment } from "./ai-assessment-data-type";
import { useRouter } from "next/navigation";
import AILoader from "@/components/student/psychometric/AILoader";

/* ----------------------------------
   SERVICE CONFIG (API + ROUTE)
-----------------------------------*/
const assessmentServiceConfig = {
  WRITTEN_CASE: {
    api: (id: string) => `/writtencasestudy/creat/${id}`,
    route: (_id: string) =>
      `/dashboard/ai-assessment-centre/${_id}`,
  },

  PRESENTATION: {
    api: (id: string) => `/presentationtask/create/${id}`,
    route: (id: string) =>
      `/dashboard/ai-assessment-centre/presentation/${id}`,
  },

  EMAIL_EXERCISE: {
    api: (id: string) => `/intrayemail/create/${id}`,
    route: (id: string) =>
      `/dashboard/ai-assessment-centre/email-exercise/${id}`,
  },

  DUTY_OF_CARE: {
    api: (id: string) => `/careanalysis/create/${id}`,
    route: (id: string) =>
      `/dashboard/ai-assessment-centre/case-study/${id}`,
  },
} as const;

interface AssessmentCardProps {
  data: AiAssessment;
}

export function AssessmentCard({ data }: AssessmentCardProps) {
  const router = useRouter();
  const session = useSession();
  const token = session?.data?.accessToken

  // console.log(token)

  // console.log(data)

  const statusConfig = {
    AVAILABLE: {
      badge: "Available",
      badgeClass: "bg-[#FEF9C2] text-[#894B00] border border-[#FFDF20]",
    },
    COMPLETED: {
      badge: "Completed",
      badgeClass: "bg-[#DCFCE7] text-[#016630] border border-[#7BF1A8]",
    },
    PENDING: {
      badge: "Pending",
      badgeClass: "bg-blue-100 text-blue-800",
    },
  };

  const config = statusConfig[data.status];

  /* ----------------------------------
     SINGLE GENERIC MUTATION
  -----------------------------------*/
  const { mutate: startAssessment, isPending } = useMutation({
    mutationKey: ["start-assessment"],
    mutationFn: async ({
      assessmentId,
      type,
    }: {
      assessmentId: string;
      type: keyof typeof assessmentServiceConfig;
      // type : "WRITTEN_CASE"
    }) => {
      const service = assessmentServiceConfig[type];

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${service.api(
          assessmentId
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to start assessment");
      }

      return res.json();
    },

    onSuccess: (data, variables) => {
      console.log("variables", data)
      console.log(variables)

      toast.success(data?.data?.message || "Assessment started successfully");

      const service = assessmentServiceConfig[variables.type];
      router.push(service.route(data?.data?._id));
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  // const handleStartAssessment = () => {
  //   startAssessment({
  //     assessmentId: data._id,
  //     type: data.type,
  //   });
  // };

  const handleStartAssessment = () => {
    if (!data?._id) {
      toast.error("Invalid assessment");
      return;
    }

    if (!data?.type) {
      toast.error("Assessment type missing");
      return;
    }

    if (!token) {
      toast.error("Please login again");
      return;
    }

    startAssessment({
      assessmentId: data?._id,
      type: data?.type,
    });
  };


  return (
    <>
      {isPending && <AILoader />}

      <div className="bg-white rounded-[20px] border-[2px] border-[#E5E7EB] p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D4FF]
 p-3 rounded-[24px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
            {
              data?.type === "WRITTEN_CASE" ? (
                <Brain className="text-[#8200DB]" />
              ) : data?.type === "PRESENTATION" ? (
                <ChartColumn className="text-[#8200DB]" />
              ) : data?.type === "EMAIL_EXERCISE" ? (
                <Lightbulb className="text-[#8200DB]" />
              ) : (
                <Target className="text-[#8200DB]" />
              )
            }


          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-base text-[#1E1E1E] mb-1">
              {data.title}
            </h4>
            <p className="text-sm text-[#4A5565]">
              {data.discription}
            </p>
          </div>

          <span
            className={`flex items-center gap-2 text-xs font-medium px-2 py-[2px] rounded-full ${config.badgeClass}`}
          >
            {data.status === "COMPLETED" && (
              <CircleCheckBig className="w-3 h-3" />
            )}
            {config.badge}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#4A5565] mb-4">
          <Clock size={16} />
          {data.duration} minutes
        </div>

        <button
          onClick={handleStartAssessment}
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold py-2 bg-[#FFFF00] text-[#1E1E1E] hover:opacity-90 disabled:opacity-50"
        >
          <Play size={18} />
          {isPending ? "Starting..." : "Start Test"}
        </button>
      </div>
    </>
  );
}

