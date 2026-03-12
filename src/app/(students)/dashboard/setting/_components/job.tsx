"use client";

import React, { useState } from "react";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import JobDetailsModal from "./JobDetailsModal";
import { useSession } from "next-auth/react";

export default function JobsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);


  const { data: sessionData } = useSession();
  const token = sessionData?.accessToken;


  const { data, isLoading, isError } = useQuery({
    queryKey: ["match-jobs"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/match-job`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch jobs");

      return res.json();
    },
  });

  // ================= API DATA =================
  const apiJobs = data?.data?.data || [];

  // ================= PAGINATION =================
  const totalPages = Math.ceil(apiJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = apiJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };


  const handleView = (id: string) => {
    setSelectedJobId(id);
    setOpenModal(true);
  };

  // ================= STATES =================
  if (isLoading) return <p className="p-6">Loading jobs...</p>;

  if (isError)
    return <p className="p-6 text-red-500">Failed to load jobs</p>;

  // ================= UI =================
  return (
    <div className="p-8 bg-white border border-[#0000001A] rounded-xl mx-auto shadow-sm">
      <h2 className="text-xl mb-6">Jobs</h2>

      <div className="border border-[#B6B6B6] rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-[#B6B6B6]">
              <TableHead className="font-bold px-4 py-4">
                Job title
              </TableHead>
              <TableHead className="font-bold px-4 py-4">
                Job Type
              </TableHead>
              <TableHead className="font-bold px-4 py-4 text-center">
                Deadline date
              </TableHead>
              <TableHead className="font-bold px-4 py-4 text-right pr-12">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentJobs.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-400"
                >
                  No jobs found
                </TableCell>
              </TableRow>
            )}

            {currentJobs.map((job: any) => (
              <TableRow
                key={job._id}
                className="hover:bg-transparent border-b border-[#B6B6B6]"
              >
                <TableCell className="font-medium px-4 py-6">
                  {job.title}
                </TableCell>

                <TableCell className="text-gray-500 px-4">
                  {job.level}
                </TableCell>

                <TableCell className="text-gray-500 text-center px-4">
                  {job.applicationDeadline}
                </TableCell>

                <TableCell className="text-right py-4 px-4">
                  <div className="flex justify-center items-center gap-2">
                    {/* <Button
                      onClick={() => handleApply(job.title)}
                      className="bg-[#FFFF00] hover:bg-[#FFFF00] text-[#131313] h-7 px-3 rounded-full"
                    >
                      Apply Now
                    </Button> */}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(job._id)}
                      className="h-7 w-8 bg-[#12382B] rounded-[6px] hover:bg-[#25413c] text-white"
                    >
                      <Eye size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ============ PAGINATION ============ */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#B6B6B6]">
          <p className="text-xs text-gray-400">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + jobsPerPage, apiJobs.length)} of{" "}
            {apiJobs.length} results
          </p>

          <Pagination className="w-auto mx-0">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(currentPage - 1)}
                />
              </PaginationItem>

              {Array.from(
                { length: totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => goToPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <JobDetailsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        jobId={selectedJobId}
        token={token as string}
      />
    </div>
  );
}
