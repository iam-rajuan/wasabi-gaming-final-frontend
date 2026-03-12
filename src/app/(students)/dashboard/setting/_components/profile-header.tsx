"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, MapPin, Mail, Phone, Calendar, Upload } from "lucide-react";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function ProfileHeader() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { data: sessionData } = useSession();
    const token = sessionData?.accessToken;
    //  const id = sessionData?.user?.id;

    const { data: profile } = useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) throw new Error("Failed to load profile");
            return res.json();
        },
    });

    const changeProfilePic = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("profileImage", file);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update profile");
            }

            return data;
        },

        onSuccess: () => toast.success("Profile changed successfully"),
        onError: (err: any) =>
            toast.error(err.message || "Something went wrong"),
    });

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);

        changeProfilePic.mutate(file);
    };

    const initials = profile?.data?.data?.name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();


    return (
        <Card className="p-6 border-2 border-[#FFFF00] bg-gradient-to-br from-[#FEFCE8] to-white rounded-xl relative">
            <div className="flex flex-col sm:flex-row gap-6 items-start relative">

                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-2 relative shrink-0">
                    <div className="w-24 h-24 border-[#FFFF00] border-2 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),_0px_10px_15px_-3px_rgba(0,0,0,0.1)] rounded-full overflow-hidden bg-[#FFFF00] flex items-center justify-center text-2xl font-bold relative">

                        {changeProfilePic.isPending && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                                <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                            </div>
                        )}

                        {preview || profile?.data?.data?.profileImage ? (
                            <Image
                                src={preview || profile?.data?.data?.profileImage}
                                width={900}
                                height={900}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            initials || "JD"
                        )}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border border-[#FFFF00] bg-[#FFFFFF] rounded-3xl"
                        onClick={handleUploadClick}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                    </Button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1 w-full">

                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-[#1E1E1E] text-[20px] sm:text-[24px] break-words">
                                {profile?.data?.data?.firstName}{" "}
                                {profile?.data?.data?.lastName}
                            </h2>

                            <p className="text-[#4A5565] text-[16px] break-words">
                                {profile?.data?.data?.company}
                            </p>
                        </div>
                    </div>

                    <p className="mt-3 text-[14px] sm:text-[16px] text-[#364153] max-w-2xl break-words">
                        {profile?.data?.data?.bio}
                    </p>

                    <p className="mt-3 text-[14px] sm:text-[16px] text-[#364153] max-w-2xl break-words">
                        {profile?.data?.data?.grade}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-sm text-gray-500">

                        <div className="flex items-center gap-2 break-all">
                            <Mail className="w-4 h-4" />
                            {profile?.data?.data?.email}
                        </div>

                        <div className="flex items-center gap-2 break-all">
                            <Phone className="w-4 h-4" />
                            {profile?.data?.data?.phone}
                        </div>

                        <div className="flex items-center gap-2 break-all">
                            <MapPin className="w-4 h-4" />
                            {profile?.data?.data?.address}
                        </div>

                        <div className="flex items-center gap-2 break-all">
                            <Calendar className="w-4 h-4" />
                            {profile?.data?.data?.createdAt
                                ? new Date(
                                    profile.data.data.createdAt
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                                : "-"}
                        </div>

                    </div>

                </div>

            </div>
        </Card>
    );
}
