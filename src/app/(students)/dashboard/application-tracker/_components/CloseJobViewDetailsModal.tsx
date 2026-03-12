"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Neuton } from "next/font/google";
import Link from "next/link";
import { toast } from "sonner";

interface JobDetailsModalProps {
  id: string;
}

/* ✅ Neuton Font */
const neuton = Neuton({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function CloseJobViewDetailsModal({ id }: JobDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const token = session?.data?.accessToken;

  const { data: singleJobData } = useQuery({
    queryKey: ["singleJob", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch job details");
      }

      return res.json();
    },
    enabled: isOpen && !!id && !!token,
  });

  const jobData = singleJobData?.data;

  const addSaveBookmarkMutation = useMutation({
    mutationFn: async (body: { jobId: string }) => {
      if (!token) throw new Error("No token found");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-mark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save bookmark");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Saved successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to save");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-[32px] flex items-center gap-2 bg-transparent border border-[#E5E500]  py-2 font-medium text-[#1E1E1E] leading-[20px] hover:bg-[#FFFF00]/90 rounded-[14px]"
        >
          <Eye className="w-4 h-4 text-[#1E1E1E]" /> View Details
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`
          ${neuton.className}
          fixed right-0 top-0 bottom-0 left-auto
          w-full sm:w-[600px] md:w-[700px] lg:w-[900px]
          h-[85vh]
          translate-x-0 translate-y-0
          rounded-none
          border-l
          shadow-2xl
          overflow-y-auto
          p-0
          bg-white
          data-[state=open]:slide-in-from-right
          data-[state=closed]:slide-out-to-right
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-5 px-5 border-b border-b-[#E6E6E6]">
          <h2 className="text-[20px] font-normal text-[#000000] leading-[28px]">
            Job details
          </h2>
        </div>

        {/* Title & Status */}
        <div className="px-5 pt-6">
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <h1 className="lg:text-[32px] md:text-[24px] text-[20px] font-normal text-[#364153]">
              {jobData?.title || "Loading..."}
            </h1>

            <span className="px-3 h-[35px] flex items-center bg-[#DCFCE7] text-[#00A63E] rounded-full text-base font-normal">
              {jobData?.status || "Open"}
            </span>

            {jobData?.level && (
              <span className="inline-flex items-center px-3 h-9 bg-[#EEF4FF] text-[#8200DB] rounded-full text-xs font-medium">
                {jobData.level}
              </span>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="px-5">
          <div className="border border-[#D9D9D9] rounded-[8px] p-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
              <div>
                <p className="text-[#737373] text-[14px] mb-1.5 leading-[22px]">
                  Company
                </p>
                <p className="font-bold text-[#4A5565] text-[15px] leading-[22px]">
                  {jobData?.companyName || "JELS LEGAL SERVICES LIMITED"}
                </p>
              </div>

              <div>
                <p className="text-[#737373] text-[14px] mb-1.5 leading-[22px]">
                  Location
                </p>
                <p className="font-bold text-[#4A5565] text-[15px] leading-[22px]">
                  {jobData?.location || "South east"}
                </p>
              </div>

              <div>
                <p className="text-[#737373] text-[14px] mb-1.5 leading-[22px]">
                  Start date
                </p>
                <p className="font-bold text-[#4A5565] text-[15px] leading-[22px]">
                  {jobData?.startDate
                    ? new Date(jobData.startDate).toLocaleDateString("en-GB")
                    : "24/08/2026"}
                </p>
              </div>

              <div>
                <p className="text-[#737373] text-[14px] mb-1.5 leading-[22px]">
                  Application deadline
                </p>
                <p className="font-bold text-[#4A5565] text-[15px] leading-[22px]">
                  {jobData?.applicationDeadline
                    ? new Date(jobData.applicationDeadline).toLocaleDateString(
                        "en-GB",
                      )
                    : "15/03/2026"}
                </p>
              </div>

              <div>
                <p className="text-[#737373] text-[14px] mb-1.5 leading-[22px]">
                  Job ID
                </p>
                <p className="font-bold text-[#4A5565] text-[15px] leading-[22px]">
                  {jobData?.jobId || "VAC2000014743"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - NO spacing above or below */}
        <div className="px-5 mt-5 flex gap-3">
          {jobData?.url && (
            <Link target="_blank"  href={jobData.url} className="flex-1">
              <Button className="w-full h-12 bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#1E1E1E] text-base font-semibold rounded-full border-2 border-[#FFFF00]">
                Apply
              </Button>
            </Link>
          )}
          <Button
            onClick={() =>
              addSaveBookmarkMutation.mutate({ jobId: jobData?._id })
            }
            variant="outline"
            className="flex-1 h-12 border-2 border-[#FFFF00] text-[#1E1E1E] text-base font-semibold rounded-full hover:bg-[#FFFF00]/10"
          >
            Save
          </Button>
        </div>

        {/* Description Sections */}
        <div className="px-5 pt-8 pb-10 space-y-6">
          {jobData?.description && (
            <Section title="About The Job">{jobData.description}</Section>
          )}

          {jobData?.education && (
            <Section title="Education">{jobData.education}</Section>
          )}

          {jobData?.responsibilities && (
            <Section title="Key Responsibilities">
              {Array.isArray(jobData.responsibilities) ? (
                <ul className="space-y-2">
                  {jobData.responsibilities.map(
                    (item: string, index: number) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                jobData.responsibilities
              )}
            </Section>
          )}

          {jobData?.skills && (
            <Section title="Skills">
              {Array.isArray(jobData.skills)
                ? jobData.skills.join(", ")
                : jobData.skills}
            </Section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ✅ Reusable Section Component */
function Section({ title, children }: any) {
  return (
    <div>
      <h3 className="text-lg font-bold text-[#1E1E1E] mb-3">{title}</h3>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
