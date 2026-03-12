"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Briefcase, Calendar, Eye, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { ClosedJobsApiResponse, ClosedJob } from "./closed-jobs-data-type";
import moment from "moment";
import JobDetailsModal from "./JobViewDetailsModal";
import ReadyToNextStep from "./ready-to-next-step";

const getStatusColor = (status: string) => {
  const lower = status.toLowerCase();
  if (lower === "active" || lower === "open")
    return "bg-green-100 text-[#1E1E1E]";
  if (lower === "inactive" || lower === "closed")
    return "bg-[#FFFF00] text-[#1E1E1E]";
  return "bg-gray-100 text-gray-600";
};

const isJobClosed = (deadline: string) => {
  if (!deadline) return true;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return deadlineDate < today;
};

const canApplyToJob = (job: ClosedJob) => {
  return job.status === "active" && !isJobClosed(job.applicationDeadline);
};

const ClosedJobsContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const token = session?.data?.accessToken;
  console.log(token);

  const { data, isLoading, isError, error } = useQuery<ClosedJobsApiResponse>({
    queryKey: ["closed-jobs", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/not-my-applied-job?jobStatus=Closed&status=active&page=${currentPage}&limit=10`,
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

  console.log(data);

  const totalPages = data?.meta
    ? Math.ceil(data.meta.total / data.meta.limit)
    : 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div>
      {/* Job Cards */}
      {data?.data?.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-xl">
          No matching opportunities found.
          <p className="text-base mt-3">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((app) => (
              <div
                key={app.jobId}
                className="border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-xl transition-all bg-white flex flex-col h-full cursor-pointer"
                // onClick={() => {
                //   setSelectedJob(app);
                //   setIsJobModalOpen(true);
                // }}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-[20px] flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-[#4A5565]" />
                  </div>
                  <button
                    className={`h-[34px] rounded-[14px] py-1 px-3 font-medium leading-[16px] border
                      ${
                        app?.status === "Interview"
                          ? "bg-[#FFFF00] border-[#E5E500] text-[#1E1E1E]"
                          : app?.status === "Applied"
                            ? "bg-[#FEF9C2] border-[#FFDF20] text-[#894B00]"
                            : "bg-[#F3F4F6] border-[#D1D5DC] text-[#4A5565]"
                      }
                     `}
                  >
                    {app?.jobStatus}
                  </button>
                </div>

                <h3 className="font-semibold text-base leading-[24px] text-[#1E1E1E] mb-2 line-clamp-2">
                  {app.title}
                </h3>
                <p className="text-[#4A5565] text-sm font-normal  mb-4">
                  {app.companyName}
                </p>

                <div className="space-y-3 text-sm text-gray-600 mb-6 flex-grow">
                  <div className="flex items-center gap-3 pb-4">
                    <Calendar className="w-4 h-4 text-[#6A7282]" />
                    <span className="text-[#6A7282] text-sm leading-[20px] font-normal">
                      {moment(app?.applicationDeadline).format("MMM DD, YYYY")}
                    </span>
                  </div>

                  <div className="">
                    {app?.notes && (
                      <span className="h-10 bg-[#F9FAFB] rounded-[16px] text-xs text-[#4A5565] font-normal leading-[16px] p-3">
                        {app?.notes}
                      </span>
                    )}
                  </div>
                  {/* <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {new Date(app.applicationDeadline).toLocaleDateString("en-GB")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{app.salaryRange}</span>
                      </div> */}
                </div>

                <div className="flex gap-3 mt-auto">
                  {/* <Button
                    variant="outline"
                    className="w-full h-[32px] flex items-center gap-2 bg-transparent border border-[#E5E500]  py-2 font-medium text-[#1E1E1E] leading-[20px] hover:bg-[#FFFF00]/90 rounded-[14px]"
                  >
                    <Eye className="w-4 h-4 text-[#1E1E1E]" /> View Details
                  </Button> */}
                  <JobDetailsModal id={app?._id} />

                  {/* {canApplyToJob(app) && (
                    <Link href="/dashboard/application-tracker/cv-uplode">
                      <Button className="flex-1 rounded-[8px] bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-black font-medium">
                        Apply
                      </Button>
                    </Link>
                  )} */}
                </div>
              </div>
            ))}
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
            Showing {data?.data?.length} of 10 opportunities{" "}
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

export default ClosedJobsContainer;
