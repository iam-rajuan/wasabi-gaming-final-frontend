"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, Calendar } from "lucide-react";
import moment from "moment";
import CloseJobViewDetailsModal from "./CloseJobViewDetailsModal";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import your apply mutation/hook if needed
// import { useApplyMutation } from "...";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  applicationDeadline: string | null;
  jobStatus: string;
  url?: string;
  notes?: string;
  // ... other fields you need
}

interface RecommendedJobsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RecommendedJobsModal({ open, onOpenChange }: RecommendedJobsModalProps) {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const session = useSession();
  const token = session?.data?.accessToken;

  // const applyMutation = useApplyMutation(); // if you have react-query or similar

  useEffect(() => {
    if (!open || !token) return;

    const fetchRecommendedJobs = async () => {
      setLoading(true);
      setError(null);

      try {
      
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/recommended-jobs`, { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch recommended jobs");

        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          setJobs(result.data);
        } else {
          setError(result.message || "Something went wrong");
        }
      } catch (err: any) {
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedJobs();
  }, [open, token]);

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
    onSuccess: (response, jobId) => {
      const job = jobs.find((item) => item._id === jobId);
      const redirectUrl = response?.data?.job?.url || job?.url;

      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
        return;
      }

      // router.push(`/dashboard/application-tracker/cv-uplode/${jobId}`);
    },
    onError: (error: any) => {
      console.error("Apply failed:", error.message);
    },
    onSettled: () => {
      setApplyingJobId(null);
    },
  });

  const handleApply = (jobId: string) => {
    applideMutation.mutate(jobId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6 bg-white !rounded-[12px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#1E1E1E]">
            Recommended Jobs
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="border-2 border-[#E5E7EB] rounded-[20px] p-6 bg-white/50 animate-pulse h-80"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No recommended jobs found at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border-[2px] border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl transition-all bg-white flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-[20px] flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-[#4A5565]" />
                  </div>
                  <button
                    className={`h-[34px] rounded-[14px] py-1 px-3 font-medium leading-[16px] border bg-[#FFFF00] border-[#E5E500] text-[#1E1E1E]`}
                  >
                    {job.jobStatus}
                  </button>
                </div>

                <h3 className="font-semibold text-base leading-[24px] text-[#1E1E1E] mb-2 line-clamp-2">
                  {job.title}
                </h3>
                <p className="text-[#4A5565] text-sm font-normal mb-4">
                  {job.companyName}
                </p>

                <div className="border-b border-[#F3F4F6]">
                  <div className="flex items-center gap-3 pb-4">
                    <Calendar className="w-4 h-4 text-[#6A7282]" />
                    <span className="text-[#6A7282] text-sm leading-[20px] font-normal">
                      {job.applicationDeadline
                        ? moment(job.applicationDeadline).format("MMM DD, YYYY")
                        : "No deadline"}
                    </span>
                  </div>

                  {job.notes && (
                    <div className="pb-4">
                      <span className="inline-block h-10 bg-[#F9FAFB] rounded-[16px] text-xs text-[#4A5565] font-normal leading-[16px] px-3 py-2">
                        {job.notes}
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
                  <CloseJobViewDetailsModal id={job._id} />

                  <button
                    onClick={() => handleApply(job._id)}
                    disabled={applideMutation.isPending}
                    className="w-full h-[32px] rounded-[14px] hover:border-[1.5px] border-[#FFFF00] bg-[#FFFF00] hover:bg-transparent text-sm leading-[20px] text-[#1E1E1E] font-medium"
                  >
                    {applideMutation.isPending && applyingJobId === job._id
                      ? "Applying..."
                      : "Apply Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
