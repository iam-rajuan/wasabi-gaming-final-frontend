'use client';

import React, { useState, useEffect, useRef } from "react";
import {
    Calendar,
    Edit2,
    MapPin,
    Lock,
    Mail,
    Phone,
    Upload,
    User,
    LogOut,
    Sparkles,
    CheckCircle2,
    Eye,
    EyeOff,
    Building2,
    Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/lib/api/profileApi";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/utils/cn";
import LogoutModal from "@/components/shared/LogoutModal";
import Image from "next/image";

const SchoolProfile = () => {
    const queryClient = useQueryClient();
    const { data: session, update: updateSession } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Password visibility states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // @ts-ignore
    const token = session?.accessToken || session?.user?.accessToken || '';

    const { data: profileResponse, isLoading } = useQuery({
        queryKey: ["profile", token],
        queryFn: () => getProfile(token),
        enabled: !!token,
    });

    const [formData, setFormData] = useState<any>({
        firstName: "",
        lastName: "",
        schoolName: "",
        schoolType: "",
        schoolCategory: "",
        jobTitle: "",
        company: "",
        aboutSchool: "",
        email: "",
        phone: "",
        address: "",
        bio: "",
        profileImage: "",
    });

    useEffect(() => {
        if (profileResponse?.data?.data) {
            const user = profileResponse.data.data;
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                schoolName: user.schoolName || "",
                schoolType: user.schoolType || "",
                schoolCategory: user.schoolCategory || "",
                jobTitle: user.jobTitle || "",
                company: user.company || "",
                aboutSchool: user.aboutSchool || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                bio: user.bio || "",
                profileImage: user.profileImage || "",
            });
        }
    }, [profileResponse]);

    const updateProfileMutation = useMutation({
        mutationFn: (data: FormData) => updateProfile(data, token),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            toast.success("Profile updated successfully");
            setIsEditing(false);

            // Update session with new data if available
            if (data?.data?.data) {
                updateSession({
                    ...session,
                    user: {
                        ...session?.user,
                        name: data.data.data.schoolName,
                        image: data.data.data.profileImage,
                    }
                });
            }
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update profile");
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = new FormData();
            data.append("profileImage", file);
            updateProfileMutation.mutate(data);
        }
    };

    const handleSave = () => {
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key !== "profileImage") {
                data.append(key, formData[key]);
            }
        });
        updateProfileMutation.mutate(data);
    };

    const confirmLogout = async () => {
        await signOut({ callbackUrl: "/" });
        setIsLogoutModalOpen(false);
    };

    if (isLoading || !session) {
        return (
            <div className="min-h-screen bg-transparent pt-8 pb-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-64 rounded-xl" />
                            <Skeleton className="h-6 w-96 rounded-lg" />
                        </div>
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-32 rounded-2xl" />
                            <Skeleton className="h-12 w-32 rounded-2xl" />
                        </div>
                    </div>
                    <div className="border-[3px] border-slate-100 rounded-[40px] p-8 md:p-12 mb-10 bg-white">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="flex flex-col items-center gap-6">
                                <Skeleton className="w-40 h-40 rounded-full" />
                                <Skeleton className="h-11 w-32 rounded-2xl" />
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="space-y-2">
                                    <Skeleton className="h-12 w-1/2 rounded-xl" />
                                    <Skeleton className="h-8 w-1/3 rounded-lg" />
                                </div>
                                <Skeleton className="h-24 w-full rounded-2xl" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                                    <Skeleton className="h-14 rounded-2xl" />
                                    <Skeleton className="h-14 rounded-2xl" />
                                    <Skeleton className="h-14 rounded-2xl" />
                                    <Skeleton className="h-14 rounded-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Skeleton className="h-16 w-1/3 rounded-[24px] mb-10" />
                    <Skeleton className="h-96 w-full rounded-[40px]" />
                </div>
            </div>
        );
    }

    const user = profileResponse?.data?.data;

    return (
        <div className="min-h-screen bg-transparent pt-8 pb-20 px-4 md:px-6 font-poppins">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Settings</h1>
                        <p className="text-gray-500 text-lg mt-1 font-medium italic">Manage your account information and preferences</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        {user?.isSubscription && (
                            <div className="bg-[#f3f0ff] text-[#7c3aed] px-5 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm">
                                <Sparkles size={16} fill="#7c3aed" /> Premium account
                            </div>
                        )}
                        <Button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="bg-[#FFFF00] hover:bg-[#ecec00] text-black font-black h-12 px-8 rounded-2xl flex items-center gap-3 shadow-md border-none transition-all active:scale-95"
                        >
                            <LogOut size={20} strokeWidth={2.5} /> Logout
                        </Button>
                    </div>
                </div>

                {/* Main Profile Card */}
                <div className="border-[2px] border-[#FFFF00] rounded-[32px] p-6 md:p-8 mb-10 relative bg-white shadow-lg shadow-yellow-100/20 group transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                        {/* Profile Image Column */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-yellow-50">
                                <Image
                                    src={user?.profileImage || "https://avatar.iran.liara.run/public/26.png"}
                                    alt="Profile"
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    unoptimized
                                />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                                className="border-2 border-slate-200 text-gray-700 hover:border-[#FFFF00] hover:bg-[#FFFF00] hover:text-black rounded-2xl text-sm font-bold h-11 px-6 flex items-center gap-3 transition-all"
                            >
                                <Upload size={18} /> Upload Photo
                            </Button>
                        </div>

                        {/* Profile Info Column */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-black flex items-center gap-3">
                                        {user?.firstName || user?.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : user?.schoolName || "New User"}
                                        {user?.verified && <CheckCircle2 className="text-blue-500" size={24} fill="currentColor" fillOpacity={0.1} />}
                                    </h2>
                                    <p className="text-base text-gray-500 font-medium mt-1">{user?.schoolName}</p>
                                </div>
                            </div>

                            <p className="text-gray-600 max-w-3xl text-sm leading-relaxed font-normal">
                                {user?.bio || user?.aboutSchool || "Welcome to your profile. Add a bio to tell students and others about your mission and expertise."}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12 pt-6">
                                <div className="flex items-center gap-4 text-gray-600 bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-gray-400"><Mail size={18} /></div>
                                    <span className="font-medium text-sm text-gray-500">{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-gray-400"><Phone size={18} /></div>
                                    <span className="font-medium text-sm text-gray-500">{user?.phone || "Phone not set"}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-gray-400"><MapPin size={18} /></div>
                                    <span className="font-medium text-sm text-gray-500">{user?.address || "Location not set"}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-gray-400"><Calendar size={18} /></div>
                                    <span className="font-medium text-sm text-gray-500">Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}</span>
                                </div>
                            </div>
                        </div>

                        {!isEditing && (
                            <Button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#FFFF00] hover:bg-[#ecec00] text-black font-black rounded-2xl h-12 px-10 absolute top-8 right-8 shadow-lg border-none hidden lg:flex items-center gap-3 transition-all active:scale-95"
                            >
                                <Edit2 size={18} /> Edit Profile
                            </Button>
                        )}
                    </div>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="bg-slate-100/80 p-1.5 h-16 rounded-[24px] mb-10 flex justify-start w-fit border border-slate-200/50">
                        <TabsTrigger
                            value="personal"
                            className="data-[state=active]:bg-[#FFFF00] data-[state=active]:text-black data-[state=active]:shadow-lg rounded-[18px] px-10 h-full font-black text-slate-500 transition-all border-none"
                        >
                            <User size={20} className="mr-3" /> Personal Info
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="data-[state=active]:bg-[#FFFF00] data-[state=active]:text-black data-[state=active]:shadow-lg rounded-[18px] px-10 h-full font-black text-slate-500 transition-all border-none"
                        >
                            <Lock size={20} className="mr-3" /> Security
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {isEditing ? (
                            <Card className="border-none shadow-2xl rounded-[40px] p-10 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    {/* Row 1 */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">First Name</label>
                                        <Input
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            placeholder="Enter first name"
                                            className="h-14 rounded-2xl border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Last Name</label>
                                        <Input
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            placeholder="Enter last name"
                                            className="h-14 rounded-2xl border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30"
                                        />
                                    </div>

                                    {/* Row 2 */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">School Name</label>
                                        <Input
                                            value={formData.schoolName}
                                            onChange={(e) => handleInputChange("schoolName", e.target.value)}
                                            placeholder="Institution Name"
                                            className="h-14 rounded-2xl border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">School Type</label>
                                        <Input
                                            value={formData.schoolType}
                                            onChange={(e) => handleInputChange("schoolType", e.target.value)}
                                            placeholder="e.g. University, High School"
                                            className="h-14 rounded-2xl border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30"
                                        />
                                    </div>

                                    {/* Row 3 */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">School Category</label>
                                        <Input
                                            value={formData.schoolCategory}
                                            onChange={(e) => handleInputChange("schoolCategory", e.target.value)}
                                            placeholder="e.g. Law, Medicine, Tech"
                                            className="h-14 rounded-2xl border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Phone</label>
                                        <Input
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            placeholder="Contact number"
                                            className="h-14 rounded-2xl border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30"
                                        />
                                    </div>

                                    {/* Row 4 */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Job Title</label>
                                        <Input
                                            value={formData.jobTitle}
                                            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                                            placeholder="Your role (e.g. Dean, Professor)"
                                            className="h-14 rounded-2xl border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Company / Branch</label>
                                        <Input
                                            value={formData.company}
                                            onChange={(e) => handleInputChange("company", e.target.value)}
                                            placeholder="Specific branch or company"
                                            className="h-14 rounded-2xl border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Address</label>
                                        <Input
                                            value={formData.address}
                                            onChange={(e) => handleInputChange("address", e.target.value)}
                                            placeholder="Full address"
                                            className="h-14 rounded-2xl border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Bio / About School</label>
                                        <Textarea
                                            value={formData.bio}
                                            onChange={(e) => handleInputChange("bio", e.target.value)}
                                            placeholder="Write a brief bio about yourself or your school..."
                                            className="rounded-[24px] min-h-[160px] border-slate-200 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00] text-lg font-medium bg-slate-50/30 p-5 leading-relaxed"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-5 mt-12">
                                    <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-2xl h-14 px-10 font-bold border-2 hover:bg-slate-50 transition-all">Cancel</Button>
                                    <Button
                                        onClick={handleSave}
                                        className="bg-black text-white hover:bg-zinc-800 rounded-2xl h-14 px-12 font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-70"
                                        disabled={updateProfileMutation.isPending}
                                    >
                                        {updateProfileMutation.isPending ? "Validating & Saving..." : "Save Profile Changes"}
                                    </Button>
                                </div>
                            </Card>
                        ) : (
                            <Card className="border-none shadow-2xl rounded-[40px] p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><User size={14} /> Personal Details</h4>
                                    <p className="text-lg font-medium text-gray-800 tracking-tight">{user?.firstName || "—"} {user?.lastName || "—"}</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Mail size={14} /> Email Identity</h4>
                                    <p className="text-lg font-medium text-gray-800 tracking-tight">{user?.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Building2 size={14} /> Institution & Type</h4>
                                    <p className="text-lg font-medium text-gray-800 tracking-tight">{user?.schoolName || "Self-Managed"} <span className="text-gray-400 font-medium ml-2 text-sm">({user?.schoolType || "N/A"})</span></p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Briefcase size={14} /> Role & Company</h4>
                                    <p className="text-lg font-medium text-gray-800 tracking-tight">{user?.jobTitle || "Member"} <span className="text-gray-400 font-medium ml-2 text-sm">@ {user?.company || "Main Office"}</span></p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Phone size={14} /> Member Status</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                                        <p className="text-lg font-medium text-gray-800 capitalize leading-none tracking-tight">{user?.status || "Active"}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Sparkles size={14} /> Category</h4>
                                    <p className="text-lg font-medium text-gray-800 tracking-tight">{user?.schoolCategory || "General"}</p>
                                </div>
                                <div className="md:col-span-2 space-y-1 border-t border-slate-100 pt-8">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><MapPin size={14} /> Primary Address</h4>
                                    <p className="text-lg font-medium text-gray-800 tracking-tight">{user?.address || "Remote / Global"}</p>
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full md:w-fit bg-[#FFFF00] hover:bg-[#ecec00] text-black font-black rounded-2xl h-14 px-12 shadow-lg border-none mt-4 transition-all active:scale-95"
                                    >
                                        Modify Current Details
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="security" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-none shadow-2xl rounded-[40px] p-10 bg-white">
                            <h3 className="text-xl font-bold mb-8 text-gray-900 border-l-[6px] border-[#FFFF00] pl-5 uppercase tracking-tight">Security & Privacy</h3>
                            <div className="max-w-xl space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[13px] font-bold text-gray-700 uppercase tracking-widest ml-1">Current Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showCurrentPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-12 rounded-2xl border-slate-200 text-base font-medium bg-slate-50/30 pr-12 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[13px] font-bold text-gray-700 uppercase tracking-widest ml-1">New Secure Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-12 rounded-2xl border-slate-200 text-base font-medium bg-slate-50/30 pr-12 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[13px] font-bold text-gray-700 uppercase tracking-widest ml-1">Verify New Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-12 rounded-2xl border-slate-200 text-base font-medium bg-slate-50/30 pr-12 focus:outline-none focus:border-[#FFFF00] focus:ring-1 focus:ring-[#FFFF00]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <Button className="bg-[#FFFF00] hover:bg-[#ecec00] text-black font-bold h-12 px-12 rounded-2xl mt-6 shadow-xl border-none transition-all active:scale-95">Update Security Protocol</Button>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onLogout={confirmLogout}
            />
        </div>
    );
};

export default SchoolProfile;
