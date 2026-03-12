"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface Applicant {
    _id: string;
    email: string;
}

interface Job {
    _id: string;
    title: string;
    location: string;
    companyName: string;
    jobStatus: string;
    applicationDeadline: string;
    applicants: Applicant[];
}

interface ApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
    };
    data: Job[];
}

export default function AppliedJobs() {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;


    const { data: sessionData } = useSession();
    const token = sessionData?.accessToken;

    const { data, isLoading, isError } = useQuery<ApiResponse>({
        queryKey: ["applied-job"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/applied-job`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to load jobs");
            return res.json();
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Something went wrong</p>;

    const allJobs = data.data;

    // Pagination logic
    const totalPages = Math.ceil(allJobs.length / jobsPerPage);
    const startIndex = (currentPage - 1) * jobsPerPage;
    const currentJobs = allJobs.slice(startIndex, startIndex + jobsPerPage);

    const goToPage = (page: number) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
    };

    return (
        <div className="p-8 bg-white border rounded-xl mx-auto shadow-sm">
            <h2 className="text-xl mb-6">Applied Jobs</h2>

            <div className="border rounded-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="px-4 py-4 font-bold">Job title</TableHead>
                            <TableHead className="px-4 py-4 font-bold">Company</TableHead>
                            <TableHead className="px-4 py-4 font-bold text-center">Deadline</TableHead>
                            <TableHead className="px-4 py-4 font-bold text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentJobs.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50 border-b">
                                <TableCell className="px-4 py-6">{job.title}</TableCell>
                                <TableCell className="px-4 py-6">{job.companyName}</TableCell>
                                <TableCell className="px-4 py-6 text-center">{job.applicationDeadline}</TableCell>
                                <TableCell className="px-4 py-6 text-right">
                                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${job.jobStatus === "Open" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                                        {job.jobStatus}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t">
                    <p className="text-xs text-gray-400">
                        Showing {startIndex + 1} to {Math.min(startIndex + jobsPerPage, allJobs.length)} of {allJobs.length} results
                    </p>

                    <Pagination className="w-auto mx-0">
                        <PaginationContent className="gap-1">
                            <PaginationItem>
                                <PaginationPrevious onClick={() => goToPage(currentPage - 1)} className="h-8 w-8 p-0 border border-gray-200 rounded text-gray-600" />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => goToPage(page)}
                                        isActive={currentPage === page}
                                        className={`h-8 w-8 border rounded ${currentPage === page ? "bg-[#C69345] text-white border-none" : "border-gray-200 text-gray-600 hover:bg-gray-100"}`}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext onClick={() => goToPage(currentPage + 1)} className="h-8 w-8 p-0 border border-gray-200 rounded text-gray-600" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
