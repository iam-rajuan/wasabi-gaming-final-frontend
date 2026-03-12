"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import moment from "moment";
import CloseJobViewDetailsModal from "./CloseJobViewDetailsModal";
import ReadyToNextStep from "./ready-to-next-step";
import {
  BookmarkedJobsApiResponse,
  BookmarkedJob,
} from "./saved-jobs-data-type";

const formatDeadline = (deadline?: string) => {
  if (!deadline) return "N/A";
  const parsed = moment(deadline);
  return parsed.isValid() ? parsed.format("MMM DD, YYYY") : deadline;
};

const SavedJobsContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const session = useSession();
  const token = session?.data?.accessToken;

  const { data } = useQuery<BookmarkedJobsApiResponse>({
    queryKey: ["saved-jobs", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-mark?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.json();
    },
  });

  const savedJobs = data?.data?.data || [];

  const totalPages = data?.data?.meta
    ? Math.ceil(data.data.meta.total / data.data.meta.limit)
    : 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const applideMutation = useMutation({
    onMutate: (jobId: string) => {
      setApplyingJobId(jobId);
    },
    mutationFn: async (jobId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/applied-job/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to apply");
      }

      return result;
    },

    onSuccess: (response) => {
      const redirectUrl = response?.data?.job?.url;

      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
        return;
      }
    },

    onError: (error: any) => {
      console.error("Apply failed:", error.message);
    },
    onSettled: () => {
      setApplyingJobId(null);
    },
  });

  const handleApply = (jobId: string) => {
    if (!jobId) return;
    applideMutation.mutate(jobId);
  };

  return (
    <div>
      {/* Job Cards */}
      {savedJobs?.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-xl">
          No matching opportunities found.
          <p className="text-base mt-3">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((bookmark: BookmarkedJob) => {
              const job = bookmark.job;
              return (
                <div
                  key={bookmark._id}
                  className="border-[2px] border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl transition-all bg-white flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-[20px] flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-[#4A5565]" />
                    </div>
                    <button
                      className="h-[34px] rounded-[14px] py-1 px-3 font-medium leading-[16px] border bg-[#FFFF00] border-[#E5E500] text-[#1E1E1E]"
                    >
                      {job?.jobStatus}
                    </button>
                  </div>

                  <h3 className="font-semibold text-base leading-[24px] text-[#1E1E1E] mb-2 line-clamp-2">
                    {job?.title}
                  </h3>
                  <p className="text-[#4A5565] text-sm font-normal mb-4">
                    {job?.companyName}
                  </p>

                  <div className="border-b border-[#F3F4F6]">
                    <div className="flex items-center gap-3 pb-4">
                      <Calendar className="w-4 h-4 text-[#6A7282]" />
                      <span className="text-[#6A7282] text-sm leading-[20px] font-normal">
                        {formatDeadline(job?.applicationDeadline)}
                      </span>
                    </div>

                    <div className="">
                      {job?.notes && (
                        <span className="h-10 bg-[#F9FAFB] rounded-[16px] text-xs text-[#4A5565] font-normal leading-[16px] p-3">
                          {job?.notes}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
                    <CloseJobViewDetailsModal id={job?._id || ""} />

                    <Button
                      onClick={() => handleApply(job?._id || "")}
                      disabled={
                        applideMutation.isPending && applyingJobId === job?._id
                      }
                      className="w-full h-[32px] rounded-[14px] hover:border-[1.5px] border-[#FFFF00] bg-[#FFFF00] hover:bg-transparent text-sm leading-[20px] text-[#1E1E1E] font-medium"
                    >
                      {applideMutation.isPending && applyingJobId === job?._id
                        ? "Applying..."
                        : "Apply Now"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-gray-300"
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "min-w-[40px]",
                      currentPage === page
                        ? "bg-[#FFFF00] hover:bg-[#FFFF00] text-black border-none"
                        : "border-gray-300",
                    )}
                  >
                    {page}
                  </Button>
                ),
              )}

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-gray-300"
              >
                Next
              </Button>
            </div>
          )}

          <div className="text-center text-gray-600 mt-6">
            Showing {savedJobs?.length} of 10 opportunities{" "}
            {`(Page ${currentPage} of ${totalPages})`}
          </div>
        </>
      )}

      {/* Ready to Take the Next Step? section  */}

      <section className="pt-8">
        <ReadyToNextStep />
      </section>
    </div>
  );
};

export default SavedJobsContainer;
