'use client';

import React, { useState, ChangeEvent } from "react";
import { FileText } from "lucide-react";
// import TipsPanel from "../cvBuild/TipsPanel";
import CoverLetterPreview from "./CoverLetterPreview";
import TextEditor from "./TextEditor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function CoverLetterBuilder() {
    const [jobDescription, setJobDescription] = useState("");
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [coverLetterContent, setCoverLetterContent] = useState(`OLIVIA WILSON
Account Manager
+123-456-7890
hello@reallygreatsite.com
123 Anywhere St., Any City

16th August 2026

Helena Poquet
Hiring Manager, Really Great Place
+123-456-7890
hello@reallygreatsite.com
123 Anywhere St., Any City

JOB REFERENCE: SENIOR ACCOUNT MANAGER

Dear Helena,

I am writing to express my strong interest in the Senior Account Manager position advertised. My comprehensive background in account management, paired particularly with the requirements outlined for this role, I possess a demonstrated capability in building and maintaining client relationships, driving revenue growth, and leading efforts to achieve organizational objectives. My professional trajectory validates a consistent commitment to excellence in client satisfaction and strategic sales.

Furthermore, my professional experiences encompass a robust understanding of market dynamics and proactive approach to problem-solving. I am adept in leveraging data-driven insights to inform strategic decisions and coordinate positions to unmet business performance. My soft to adding the skill set includes the ability to articulate complex ideas clearly, work collaboratively with diverse teams, and operate with an eye toward achieving goals by the specifications made on my ideal candidate for this opportunity.

Sincerely,
Olivia Wilson`);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCvFile(e.target.files[0]);
        }
    };

    const handleBuildCoverLetter = () => {
        setShowPreview(true);
    };

    const handleEdit = () => {
        setShowPreview(false);
        setShowEditor(true);
    };

    const handleSaveContent = (newContent: string) => {
        setCoverLetterContent(newContent);
    };

    return (
        <div className="p-8 inter ">
            <div className="mx-auto mb-24 ">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-semibold main-color inter">
                        Cover letter Builder
                    </h1>
                    <p className="text-[#4A5565] inter">
                        Create a professional cover letter that stands out to employers.
                    </p>
                </div>

                {/* Main Card */}
                <div className="max-w-6xl p-8 mx-auto bg-white border border-gray-500 shadow-sm rounded-2xl ">
                    {/* Card Header */}
                    <div className="flex items-start gap-4 mb-8">
                        <div className="flex-shrink-0 p-3 rounded-full yellow">
                            <FileText className="w-6 h-6 text-gray-900" />
                        </div>
                        <div>
                            <h2 className="mb-1 text-xl font-semibold text-gray-900">
                                Build Your Cover letter
                            </h2>
                            <p className="text-sm text-gray-600">
                                Upload your resume and job description details.
                            </p>
                        </div>
                    </div>

                    {/* Job Description Input */}
                    <div className="mb-6">
                        <Label htmlFor="job-description" className="block mb-2 text-sm font-medium text-[#364153]">
                            Upload Your Job description
                        </Label>
                        <Textarea
                            id="job-description"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Input your job description here...."
                            className="w-full px-4 py-3 border border-gray-500 resize-none rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:yellow focus:border-transparent"
                            rows={4}
                        />
                    </div>

                    {/* CV Upload */}
                    <div className="mb-6">
                        <Label htmlFor="resume-upload" className="block mb-2 text-sm font-medium text-gray-700">
                            Upload Resume
                        </Label>
                        <div className="relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="resume-upload"
                                accept=".pdf,.doc,.docx"
                            />
                            <Label
                                htmlFor="resume-upload"
                                className="flex items-center w-full gap-2 px-4 py-3 transition-colors border border-gray-500 cursor-pointer rounded-2xl bg-gray-50 hover:bg-gray-100"
                            >
                                <FileText className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                    {cvFile ? cvFile.name : "upload your resume"}
                                </span>
                            </Label>
                        </div>
                    </div>

                    {/* Build Button */}
                    <Button
                        onClick={handleBuildCoverLetter}
                        className="yellow hover:bg-yellow-100 text-gray-900 font-medium px-6 py-2.5 rounded-md transition-colors"
                    >
                        Build cover letter with AI
                    </Button>
                </div>
            </div>
            {/* <TipsPanel /> */}
            <CoverLetterPreview
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                onEdit={handleEdit}
            />
            <TextEditor
                isOpen={showEditor}
                onClose={() => setShowEditor(false)}
                content={coverLetterContent}
                onSave={handleSaveContent}
            />
        </div>
    );
}
