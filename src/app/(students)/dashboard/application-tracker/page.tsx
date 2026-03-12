"use client";

import React, { useState, useMemo } from "react";
import { Calendar, MapPin, DollarSign, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

import ClosedJobsContainer from "./_components/closed-jobs-container";
import ApplicationTrackerContainer from "./_components/application-tracker-container";
import OpenApplicationContainer from "./_components/open-application-container";
import ApplicationTrackerCart from "./_components/application-tracker-cart";
import SavedJobsContainer from "./_components/saved-jobs-container";

// ─── Types ────────────────────────────────────────────────────────────────

interface Application {
  id: string;
  company: string;
  position: string;
  date: string;
  status: string;
  level?: string;
  location: string;
  salary?: string;
  deadline: string;
  description?: string;
  applied: boolean;
  canApply: boolean;
}

import { Neuton } from "next/font/google";

const neuton = Neuton({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "800"],
});

// ─── Helpers ──────────────────────────────────────────────────────────────

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

const canApplyToJob = (job: Application) => {
  return job.status === "active" && !isJobClosed(job.deadline) && !job.applied;
};

// ─── Job Details Modal ────────────────────────────────────────────────────

function JobDetailsModal({
  isOpen,
  onClose,
  job,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  job: Application | null;
  onApply: () => void;
}) {
  if (!job) return null;
  const isApplicable = canApplyToJob(job);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl border-none shadow-2xl p-0">
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 px-8 py-6 border-b border-gray-100">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-3xl font-bold text-gray-900 tracking-tight">
              {job.position}
            </DialogTitle>

            <div className="flex flex-wrap items-center gap-3">
              <div
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-semibold",
                  getStatusColor(job.status),
                )}
              >
                {job.status === "active" ? "Open Position" : "Closed"}
              </div>

              {job.level && (
                <div className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {job.level}
                </div>
              )}

              <div className="text-sm text-gray-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Posted: {job.date}
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-8 py-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500 font-medium">Company</p>
              <p className="font-semibold text-gray-900">{job.company}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 font-medium">Location</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="font-medium text-gray-900">{job.location}</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 font-medium">Salary</p>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <p className="font-medium text-gray-900">
                  {job.salary || "Not specified"}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 font-medium">
                Application Deadline
              </p>
              <p className="font-medium text-gray-900">
                {new Date(job.deadline).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Job Description</h3>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
              <p className="whitespace-pre-line">
                {job.description ||
                  "No detailed description available at this time."}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none border-gray-300 hover:bg-gray-100"
              onClick={onClose}
            >
              Close
            </Button>

            {isApplicable && (
              <Button
                className="flex-1 sm:flex-none bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-6 text-lg shadow-md"
                onClick={onApply}
              >
                Apply Now
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function ApplicationTrackerPage() {
  const [activeTab, setActiveTab] = useState<"op" | "at" | "cj" | "sj">("op");

  const [selectedJob, setSelectedJob] = useState<Application | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  console.log(activeTab);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-6 pt-10 max-w-7xl">
        {/* Header */}
        <div className={`${neuton.className} mb-10`}>
          <h4 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1E1E1E] leading-[40px] mb-3">
            Explore Legal Opportunities
          </h4>
          <p className="text-sm md:text-base text-[#4A5565] leading-[24px]">
            Discover apprenticeships, training contracts, newly qualified roles
            and more.
          </p>
        </div>

        {/* Tabs */}
        <div className={`${neuton.className} flex gap-10 border-b border-[#FEF9C2] mb-8 overflow-x-auto`}>
          {(["op", "at", "sj", "cj"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "p-2 font-normal text-base md:text-lg lg:text-xl border-b",
                activeTab === tab
                  ? "border-[#B2B200] text-[#1E1E1E]"
                  : "border-transparent text-[#1E1E1E]",
              )}
            >
              {tab === "op"
                ? "Open Applications"
                : tab === "at"
                  ? "Application Tracker"
                  : tab === "sj"
                    ? "Save Jobs"
                    : "Closed Jobs"}
            </button>
          ))}
        </div>

        {/* header cart  */}
        <div className="pb-8 md:pb-10">
          <ApplicationTrackerCart />
        </div>

        {/* new page  */}

        <div>
          {activeTab === "op" && (
            <div>
              <OpenApplicationContainer />
            </div>
          )}
          {activeTab === "at" && (
            <div>
              <ApplicationTrackerContainer />
            </div>
          )}
          {activeTab === "sj" && (
            <div>
              <SavedJobsContainer />
            </div>
          )}
          {activeTab === "cj" && (
            <div>
              <ClosedJobsContainer />
            </div>
          )}
        </div>

        <JobDetailsModal
          isOpen={isJobModalOpen}
          onClose={() => setIsJobModalOpen(false)}
          job={selectedJob}
          onApply={() => {
            toast.success("Application process started!");
            setIsJobModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}
