"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface Props {
    open: boolean;
    onClose: () => void;
    jobId: string | null;
    token: string;
}

export default function JobDetailsModal({
    open,
    onClose,
    jobId,
    token,
}: Props) {
    const { data, isLoading } = useQuery({
        queryKey: ["single-job", jobId],
        enabled: !!jobId,
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch job");
            }

            return res.json();
        },
    });

    const job = data?.data;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden">
                {/* HEADER */}
                <div className="border-2 border-[#FFFF00] bg-gradient-to-br from-[#FEFCE8] to-white  p-6 text-white">
                    <DialogHeader className="text-black">
                        <DialogTitle className="text-2xl">
                            {isLoading ? "Loading..." : job?.title}
                        </DialogTitle>
                        <p className="text-sm opacity-80">
                            {job?.companyName} • {job?.location}
                        </p>
                    </DialogHeader>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-6 bg-white">
                    {isLoading ? (
                        <p>Loading job details...</p>
                    ) : (
                        <>
                            {/* META GRID */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Level</p>
                                    <p className="font-medium">{job?.level}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Salary</p>
                                    <p className="font-medium">{job?.salaryRange}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Start Date</p>
                                    <p className="font-medium">{job?.startDate}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Deadline</p>
                                    <p className="font-medium">
                                        {job?.applicationDeadline}
                                    </p>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <h4 className="font-semibold mb-1">Description</h4>
                                <p className="text-gray-600">{job?.description}</p>
                            </div>

                            {/* SKILLS */}
                            <div>
                                <h4 className="font-semibold mb-2">
                                    Required Skills
                                </h4>

                                <div className="flex flex-wrap gap-2">
                                    {job?.requiredSkills?.map((skill: string) => (
                                        <Badge key={skill} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* FOOTER BUTTONS */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
