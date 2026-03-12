"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Building2,
  SquarePen,
  X,
  ExternalLink,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

interface EditApplyjobProps {
  id: string;
  statuss?: string;
}

type StatusOption =
  | "Applied"
  | "Applying"
  | "Psychometric Test"
  | "Interview"
  | "Researching Firm"
  | "Assessment Centre"
  | "Offer";

interface Job {
  _id: string;
  companyName: string;
  companyType: string | null;
  title: string;
  status: string;
  dateApplied?: string;
  contactPerson?: string;
  notes?: string;
  jobPostingUrl?: string;
  url?: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  "Applied",
  "Applying",
  "Psychometric Test",
  "Interview",
  "Researching Firm",
  "Assessment Centre",
  "Offer",
];

const STATUS_PROGRESS: Record<StatusOption, number> = {
  Applied: 10,
  Applying: 25,
  "Psychometric Test": 40,
  "Researching Firm": 50,
  "Assessment Centre": 70,
  Interview: 80,
  Offer: 100,
};

const normalizeStatus = (value?: string): StatusOption => {
  if (!value) return "Applied";

  const trimmed = value.trim();
  const lower = trimmed.toLowerCase();

  const exactMatch = STATUS_OPTIONS.find(
    (status) => status.toLowerCase() === lower,
  );
  if (exactMatch) return exactMatch;

  if (lower.includes("offer")) return "Offer";
  if (lower.includes("interview")) return "Interview";
  if (lower.includes("psychometric")) return "Psychometric Test";
  if (lower.includes("assessment")) return "Assessment Centre";
  if (lower.includes("research")) return "Researching Firm";
  if (lower.includes("applied")) return "Applied";
  if (lower.includes("apply")) return "Applying";

  return "Applied";
};

export default function EditApplyjob({ id, statuss }: EditApplyjobProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<StatusOption>(() =>
    normalizeStatus(statuss),
  );
  const [date, setDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const { data: sessionData } = useSession();
  const token = sessionData?.accessToken as string | undefined;
  const queryClient = useQueryClient();

  const {
    data: companyData,
    isLoading,
    error,
  } = useQuery<Job>({
    queryKey: ["companydata", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch job data");
      }

      const result = await res.json();
      return result.data as Job;
    },
    enabled: Boolean(id && isOpen),
  });

  useEffect(() => {
    if (!isOpen) {
      setStatus(normalizeStatus(statuss));
    }
  }, [statuss, isOpen]);

  useEffect(() => {
    if (!companyData) return;

    setStatus(normalizeStatus(companyData.status));
    setNotes(companyData.notes ?? "");

    if (companyData.dateApplied) {
      const parsedDate = new Date(companyData.dateApplied);
      if (!Number.isNaN(parsedDate.getTime())) {
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const day = String(parsedDate.getDate()).padStart(2, "0");
        setDate(`${year}-${month}-${day}`);
      } else {
        setDate("");
      }
    } else {
      setDate("");
    }
  }, [companyData]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error("No token found");
      }

      const normalizedOriginalStatus = normalizeStatus(companyData?.status);
      const trimmedNotes = notes.trim();
      const originalNotes = companyData?.notes ?? "";

      const payload: Partial<Pick<Job, "status" | "notes">> = {};

      if (status !== normalizedOriginalStatus) {
        payload.status = status;
      }

      if (trimmedNotes !== originalNotes) {
        payload.notes = trimmedNotes;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/application-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Failed to update application");
      }

      return res.json();
    },
    onSuccess: async () => {
      toast.success("Application updated successfully");

      await queryClient.invalidateQueries({
        queryKey: ["application-tracker"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["companydata", id],
      });

      setIsOpen(false);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Update failed");
    },
  });

  const progress = STATUS_PROGRESS[status];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!status) {
      toast.error("Please select a status");
      return;
    }

    updateMutation.mutate();
  };

  const jobPostingLink = companyData?.url || companyData?.jobPostingUrl || "";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open && companyData) {
          setStatus(normalizeStatus(companyData.status));
          setNotes(companyData.notes ?? "");
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="flex h-[36px] w-[36px] items-center justify-center rounded-[12px] border border-gray-300 transition hover:bg-gray-100">
          <SquarePen className="h-4 w-4 text-gray-600" />
        </button>
      </DialogTrigger>

      <DialogContent
        className="
          w-full
          max-w-[520px]
          border-none
          bg-transparent
          p-0
          shadow-2xl
          [&>button]:hidden
          sm:rounded-3xl
        "
      >
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="px-6 pb-6 pt-6">
            <div className="mb-[32px] flex items-center justify-between">
              <h2 className="text-[24px] font-semibold leading-[32px] text-[#1E1E1E]">
                Application Details
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {isLoading && (
              <p className="mb-4 text-sm text-gray-400">Loading...</p>
            )}

            {error && (
              <p className="mb-4 text-sm text-red-400">
                Failed to load job information
              </p>
            )}

            {companyData && (
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-[56px] w-[56px] flex-shrink-0 items-center justify-center rounded-2xl bg-gray-100">
                  <Building2 size={28} className="text-gray-500" />
                </div>

                <div>
                  <h3 className="text-[20px] font-semibold leading-[28px] text-[#1E1E1E]">
                    {companyData.companyName}
                  </h3>

                  <p className="text-base font-normal leading-[24px] text-[#4A5565]">
                    {companyData.title || companyData.companyType || "Position"}
                  </p>

                  <span className="mt-2 inline-flex items-center rounded-full border border-[#FFDF20] bg-yellow-100 px-3 py-2 text-xs font-semibold text-yellow-800">
                    {statuss}
                  </span>
                </div>
              </div>
            )}

            <div className="mb-5">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-500">
                  Application Progress
                </span>
                <span className="font-bold text-gray-800">{progress}%</span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#FFFF00] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="mb-2 block text-[14px] font-normal leading-[20px] text-[#4A5565]">
                  Update Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(normalizeStatus(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <p className="mb-2 text-[14px] font-normal leading-[20px] text-[#4A5565]">
                  Notes & Next Steps
                </p>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes here..."
                  className="h-[100px] w-full resize-none rounded-xl border-0 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>

              <div className="mb-5 rounded-2xl border-2 border-[#FFFF00] bg-[#FFFEF0] px-5 py-3.5 text-center">
                <p className="text-sm font-medium italic text-gray-700">
                  "You're one step closer to your goal — stay confident!"
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="h-[36px] w-[50%] rounded-xl bg-[#FFFF00] text-sm font-medium text-[#1E1E1E] transition hover:bg-[#f5f502] disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Updating..." : "Update Status"}
                </button>

                <Link
                  href={jobPostingLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-[36px] w-[50%] items-center justify-center gap-2 rounded-xl border-2 px-5 text-[14px] font-medium transition ${
                    jobPostingLink
                      ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                      : "pointer-events-none border-gray-100 text-gray-400"
                  }`}
                >
                  <ExternalLink className="h-4 w-4" />
                  View Job Posting
                </Link>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
