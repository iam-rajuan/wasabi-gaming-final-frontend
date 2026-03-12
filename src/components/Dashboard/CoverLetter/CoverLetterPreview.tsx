'use client';

import React from "react";
import {
    X,
    Edit2,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CoverLetterPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: () => void;
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ isOpen, onClose, onEdit }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-hidden p-0">
                {/* Modal Header */}
                <DialogHeader className="px-6 py-4 border-b border-gray-200">
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                        Cover letter Preview - Modern Style
                    </DialogTitle>
                </DialogHeader>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    {/* Edit Button */}
                    <div className="flex justify-end mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onEdit}
                            className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit
                        </Button>
                    </div>

                    {/* Cover Letter Document */}
                    <div
                        className="p-12 mx-auto bg-white border border-gray-200 shadow-lg"
                        style={{ maxWidth: "650px" }}
                    >
                        {/* Header */}
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 text-3xl font-light tracking-wide">
                                OLIVIA WILSON
                            </h1>
                            <p className="mb-1 text-sm text-gray-700">Account Manager</p>
                            <div className="space-y-1 text-xs text-gray-600">
                                <p>+123-456-7890</p>
                                <p>hello@reallygreatsite.com</p>
                                <p>123 Anywhere St., Any City</p>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="mb-6 text-xs text-gray-600">16th August 2026</div>

                        {/* Recipient */}
                        <div className="mb-8 text-xs text-gray-700">
                            <p className="font-semibold">Helena Poquet</p>
                            <p>Hiring Manager, Really Great Place</p>
                            <p className="mt-2">+123-456-7890</p>
                            <p>hello@reallygreatsite.com</p>
                            <p>123 Anywhere St., Any City</p>
                        </div>

                        {/* Subject */}
                        <div className="mb-6">
                            <p className="text-xs font-semibold tracking-wide text-gray-800">
                                JOB REFERENCE: SENIOR ACCOUNT MANAGER
                            </p>
                        </div>

                        {/* Salutation */}
                        <p className="mb-4 text-xs text-gray-700">Dear Helena,</p>

                        {/* Body Paragraphs */}
                        <div className="space-y-4 text-xs leading-relaxed text-gray-700">
                            <p>
                                I am writing to express my strong interest in the Senior Account
                                Manager position advertised. My comprehensive background in
                                account management, paired particularly with the requirements
                                outlined for this role, I possess a demonstrated capability in
                                building and maintaining client relationships, driving revenue
                                growth, and leading efforts to achieve organizational
                                objectives. My professional trajectory validates a consistent
                                commitment to excellence in client satisfaction and strategic
                                sales.
                            </p>

                            <p>
                                Furthermore, my professional experiences encompass a robust
                                understanding of market dynamics and proactive approach to
                                problem-solving. I am adept in leveraging data-driven insights
                                to inform strategic decisions and coordinate positions to unmet
                                business performance. My soft to adding the skill set includes
                                the ability to articulate complex ideas clearly, work
                                collaboratively with diverse teams, and operate with an eye
                                toward achieving goals by the specifications made on my ideal
                                candidate for this opportunity.
                            </p>
                        </div>

                        {/* Closing */}
                        <div className="mt-6 text-xs text-gray-700">
                            <p className="mb-1">Sincerely,</p>
                            <p className="mb-4">Olivia Wilson</p>
                            <p className="font-serif text-lg italic">Olivia Wilson</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CoverLetterPreview;
