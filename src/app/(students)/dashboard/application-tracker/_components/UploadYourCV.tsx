"use client";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Briefcase, MapPin, Calendar, DollarSign } from "lucide-react"; // assuming you're using lucide icons
import { cn } from "@/lib/utils"; // assuming you have this utility
import { Button } from "@/components/ui/button"; // assuming shadcn/ui or similar
import { toast } from "sonner";

// You can define a proper type based on your API response
type Job = {
  vacancy_id: string;
  title: string;
  url: string;
  employer: string;
  location: string;
  start_date: string;
  training_course: string;
  wage: string;
  closing_text: string;
  posted_date: string;
  disability_confident: boolean;
};

function UploadYourCV() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);           // ← store matched jobs here
  const [showJobs, setShowJobs] = useState(false);       // ← control what to show

  const session = useSession();
  const TOKEN = session?.data?.accessToken || "";
  const params = useParams<{ id: string }>();
  const jobId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  // =========================
  // Upload Mutation
  // =========================
  const uploadCV = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("cvUrl", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cv/apply/${jobId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "CV apply failed");
      return result;
    },

    onSuccess: (response) => {
      toast.success(response?.message || "CV applied successfully");
      setShowJobs(false);
    },

    onError: (error: Error) => {
      toast.error(error.message || "Upload failed. Please try again.");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!jobId) {
      toast.error("Job id is missing in URL");
      return;
    }

    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      uploadCV.mutate(file);
    }
  };

  // Optional: Reset / try again
  const handleTryAgain = () => {
    setShowJobs(false);
    setSelectedFile(null);
    setJobs([]);
  };

  // =========================
  // Render
  // =========================
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {!showJobs ? (
          // ── Upload view ──
          <>
            <div className="mb-10 ">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Applied Your Perfect Job
              </h1>
              <p className="text-gray-600">
                Upload your CV and get matched with opportunities that fit your skills.
              </p>
            </div>

            <div className="bg-[#FEFCE8] border-2 border-[#FFFF00] rounded-2xl p-10 md:p-12 w-full mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-[#FFFF00] w-16 h-16 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-4">Upload Your CV</h2>
              <p className="text-gray-600 text-center mb-8">
                Get personalized job recommendations based on your experience.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <label className="cursor-pointer w-full sm:w-auto">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="bg-[#FFFF00] hover:bg-[#FFFF00] text-gray-900 font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg w-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {uploadCV.isPending ? "Uploading..." : "Choose File"}
                  </div>
                </label>

                <span className="text-gray-500 font-medium hidden sm:block">or</span>

                <Link href="/dashboard/cv-builder" className="w-full sm:w-auto">
                  <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-gray-300 shadow-sm hover:shadow-md w-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Build Resume
                  </button>
                </Link>
              </div>

              <p className="text-gray-500 text-xs text-center">
                Supported: PDF, DOC, DOCX • Max 2MB
              </p>

              {selectedFile && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                  <p className="text-green-700">✓ {selectedFile.name}</p>
                </div>
              )}

              {uploadCV.isSuccess && (
                <p className="text-green-600 text-center mt-4 font-medium">
                  CV processed successfully — showing matched jobs...
                </p>
              )}

              {uploadCV.isError && (
                <p className="text-red-600 text-center mt-4">
                  Upload failed. Please try again.
                </p>
              )}
            </div>
          </>
        ) : (
          // ── Jobs grid view ──
          <>
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Jobs Matched to Your CV
              </h1>
              <p className="text-gray-600">
                Here are opportunities that best match your skills and experience.
              </p>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border">
                <p className="text-gray-600">No matching jobs found at the moment.</p>
                <Button variant="outline" className="mt-4" onClick={handleTryAgain}>
                  Try Another CV
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <div
                    key={job.vacancy_id}
                    className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all bg-white flex flex-col h-full cursor-pointer"
                    onClick={() => window.open(job.url, "_blank")}
                  >
                    <div className="flex justify-between items-start mb-5">
                      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                        <Briefcase className="w-7 h-7 text-gray-600" />
                      </div>
                      <div className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#FFFF00] text-gray-900">
                        Open
                      </div>
                    </div>

                    <h3 className="font-bold text-xl mb-2 line-clamp-2">{job.title}</h3>
                    <p className="text-gray-700 font-medium mb-4">{job.employer}</p>

                    <div className="space-y-3 text-sm text-gray-600 mb-6 flex-grow">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Closes: {job.closing_text.replace("Closes in ", "")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.wage}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-full"
                        onClick={() => window.open(job.url, "_blank")}
                      >
                        View Details
                      </Button>
                      <Button className="flex-1 rounded-full bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-black">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 text-center">
              <Button variant="outline" className="bg-[#FFFF00] border-none rounded-[8px] hover:bg-[#FFFF00]/90" onClick={handleTryAgain}>
                Upload Another CV
              </Button>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 Aspiring – Your Path to Professional Growth</p>
        </div>
      </div>
    </div>
  );
}

export default UploadYourCV;
