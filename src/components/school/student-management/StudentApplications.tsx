'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Calendar,
    MapPin,
    CircleDollarSign,
    X,
    BookOpen,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";

// Mock applications with full job details
const studentApplications: Record<string, any[]> = {
    "1": [
        {
            key: 1,
            jobTitle: "Legal Assistant Apprentice",
            company: "JIES LEGAL SERVICES LIMITED",
            appliedDate: "2025-10-15",
            endDate: "2026-01-10",
            jobId: "9040",
            status: "Offered",
            level: "Level 6",
            location: "South East",
            industry: "Law",
            salary: "$15,704.00 - $15,704.00 Yearly",
            startDate: "1/5/2026",
            deadline: "1/10/2026",
            description:
                "Reporting directly to JLES' Legal Services Manager, you will take on responsibilities to manage and oversee legal hindrances to highway and sewer adoptions! Liaising with local authorities, clients and third parties' legal teams as required. Negotiating legal requirements with local authorities, researching alternative approaches, and assisting presenting these findings and solutions to both internal and external clients.",
            keyResponsibilities: "Unknown",
            skills: "Education Level",
            acceptBTEC: false,
        },
    ],
};

const JobDetailsModal = ({ isOpen, onClose, job }: { isOpen: boolean; onClose: () => void; job: any }) => {
    if (!job) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto font-poppins p-0 rounded-3xl border-none">
                <div className="bg-white">
                    {/* Header */}
                    <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Job details</h2>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[#1e1e1e] mb-1">
                                    {job.jobTitle}
                                </h3>
                                <p className="text-gray-500 font-medium">{job.level}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 font-bold rounded-full w-fit">
                                Open
                            </Badge>
                        </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-8 space-y-10">
                        {/* Compnay & Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-gray-100 p-8 rounded-2xl bg-white shadow-sm">
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Company</span>
                                    <span className="text-base font-bold text-gray-900">{job.company}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Industry</span>
                                    <span className="text-base font-bold text-gray-900">{job.industry}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                                        <MapPin className="w-3 h-3" /> Location
                                    </span>
                                    <span className="text-base font-bold text-gray-900">{job.location}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                                        <CircleDollarSign className="w-3 h-3" /> Salary
                                    </span>
                                    <span className="text-base font-bold text-gray-900">{job.salary}</span>
                                </div>
                            </div>
                        </div>

                        {/* Dates Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-2xl">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase">Start Date</span>
                                <p className="font-bold text-gray-900">{job.startDate}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase">Deadline</span>
                                <p className="font-bold text-gray-900">{job.deadline}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase">Job ID</span>
                                <p className="font-bold text-gray-900">{job.jobId}</p>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-8">
                            <section>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-yellow-400 pl-4 uppercase tracking-wider">About The Job</h4>
                                <p className="text-gray-600 leading-relaxed text-base font-medium">
                                    {job.description}
                                </p>
                            </section>

                            <Separator />

                            <section className="space-y-6">
                                <h4 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-yellow-400 pl-4 uppercase tracking-wider">Requirements</h4>

                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-gray-400 uppercase">Key Responsibilities</p>
                                    <p className="text-gray-700 font-medium">{job.keyResponsibilities}</p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-gray-400 uppercase">Skills & Education</p>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="w-5 h-5 text-yellow-500" />
                                        <span className="font-bold text-gray-900">{job.skills}</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 italic">
                                        {job.acceptBTEC
                                            ? "Yes, we accept Education Level qualifications."
                                            : "No, we do not accept Education Level qualifications."}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const StudentApplications = () => {
    const params = useParams();
    const studentId = params?.studentId as string;
    const applications = studentApplications[studentId] || [];
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = (job: any) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    return (
        <div className="p-8 md:px-16 font-poppins min-h-screen bg-gray-50/30">
            <header className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Student Application History
                </h1>
                <p className="text-lg text-gray-500 font-medium">
                    Total Applications: <span className="text-black font-bold">{applications.length}</span>
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {applications.length === 0 ? (
                    <div className="col-span-full py-20 bg-white border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center">
                        <span className="text-6xl mb-4">📭</span>
                        <p className="text-xl font-bold text-gray-400">No applications found for this student.</p>
                    </div>
                ) : (
                    applications.map((app) => (
                        <Card key={app.key} className="group border-2 rounded-3xl hover:border-yellow-400 hover:shadow-xl transition-all duration-300 bg-white overflow-hidden flex flex-col">
                            <CardHeader className="p-6 pb-2">
                                <div className="flex items-start justify-between">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center border transition-colors group-hover:bg-yellow-50 group-hover:border-yellow-200">
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                            <path d="M11.6667 14H16.3334" stroke="#4A5565" strokeWidth="2.333" />
                                            <path d="M11.6667 9.33203H16.3334" stroke="#4A5565" strokeWidth="2.333" />
                                            <path d="M16.3334 24.5013V21.0013C16.3334 20.3825 16.0876 19.789 15.65 19.3514C15.2124 18.9138 14.6189 18.668 14.0001 18.668C13.3812 18.668 12.7878 18.9138 12.3502 19.3514C11.9126 19.789 11.6667 20.3825 11.6667 21.0013V24.5013" stroke="#4A5565" strokeWidth="2.333" />
                                            <path d="M6.99992 11.668H4.66659C4.04775 11.668 3.45425 11.9138 3.01667 12.3514C2.57908 12.789 2.33325 13.3825 2.33325 14.0013V22.168C2.33325 22.7868 2.57908 23.3803 3.01667 23.8179C3.45425 24.2555 4.04775 24.5013 4.66659 24.5013H23.3333C23.9521 24.5013 24.5456 24.2555 24.9832 23.8179C25.4208 23.3803 25.6666 22.7868 25.6666 22.168V10.5013C25.6666 9.88246 25.4208 9.28897 24.9832 8.85139C24.5456 8.4138 23.9521 8.16797 23.3333 8.16797H20.9999" stroke="#4A5565" strokeWidth="2.333" />
                                            <path d="M7 24.5V5.83333C7 5.21449 7.24583 4.621 7.68342 4.18342C8.121 3.74583 8.71449 3.5 9.33333 3.5H18.6667C19.2855 3.5 19.879 3.74583 20.3166 4.18342C20.7542 4.621 21 5.21449 21 5.83333V24.5" stroke="#4A5565" strokeWidth="2.333" />
                                        </svg>
                                    </div>
                                    <Badge
                                        className={cn(
                                            "px-4 py-1 font-bold rounded-full border-none",
                                            app.status === "Offered" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                                        )}
                                    >
                                        {app.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-4 space-y-6 flex-1 flex flex-col">
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors">
                                        {app.company}
                                    </h4>
                                    <p className="text-base text-gray-500 font-medium">{app.jobTitle}</p>
                                </div>

                                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wider">
                                    <Calendar className="w-4 h-4" />
                                    <span>Applied: {app.appliedDate}</span>
                                </div>

                                <Button
                                    onClick={() => handleViewDetails(app)}
                                    className="mt-auto bg-transparent border-2 border-yellow-400 text-black rounded-2xl h-14 font-bold hover:bg-yellow-400 transition-all duration-300"
                                >
                                    View Full Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <JobDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                job={selectedJob}
            />
        </div>
    );
};

export default StudentApplications;
