'use client';

import React, { useState } from "react";
import {
    Calendar,
    Check,
    X,
    Trash2,
    Edit2,
    MapPin,
    Globe,
    Info,
    Lock,
    Mail,
    Phone,
    Upload,
    User,
    Linkedin,
    Github,
    Award,
    ShieldCheck,
    ChevronRight,
    Crown,
} from "lucide-react";
import { IMAGES } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils/cn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useUserProfile } from "@/hooks/useUserProfile";
import Link from "next/link";

const ProfileSettingsSection = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { hasActiveSubscription } = useUserProfile();

    // Mock user data
    const userData = {
        name: "John Doe",
        title: "Final Year Law Student",
        company: "University of Westminster",
        bio: "Passionate about commercial law and legal tech. Currently focusing on SQE preparation and seeking training contract opportunities at global firms.",
        email: "john.doe@gmail.com",
        phone: "+44 7700 900000",
        location: "London, UK",
        memberSince: "January 2024",
        website: "johndoe.legal",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
        profileCompletion: 85,
    };

    const [formData, setFormData] = useState(userData);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(userData);
        setIsEditing(false);
    };

    const renderPersonalInfo = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Edit Mode Notice */}
            {isEditing && (
                <Card className="bg-yellow-50 border-yellow-200 rounded-3xl overflow-hidden shadow-sm">
                    <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shrink-0">
                                <Info className="w-5 h-5 text-black" />
                            </div>
                            <p className="text-gray-900 font-bold">You are currently editing your profile.</p>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Button variant="outline" onClick={handleCancel} className="flex-1 bg-white border-gray-200 font-bold h-11 px-6">
                                Cancel
                            </Button>
                            <Button onClick={handleSave} className="flex-1 bg-black hover:bg-black/90 text-white font-bold h-11 px-6 border-none shadow-md">
                                Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Basic Information */}
            <Card className="border-none ring-1 ring-gray-100 rounded-[32px] overflow-hidden shadow-sm bg-white">
                <CardContent className="p-10">
                    <h3 className="text-2xl font-bold text-black mb-8 border-l-4 border-yellow-400 pl-4">Personal Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">First Name</label>
                            <Input
                                value={formData.name.split(" ")[0]}
                                onChange={(e) => handleInputChange("name", `${e.target.value} ${formData.name.split(" ")[1] || ""}`)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Last Name</label>
                            <Input
                                value={formData.name.split(" ")[1] || ""}
                                onChange={(e) => handleInputChange("name", `${formData.name.split(" ")[0]} ${e.target.value}`)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    disabled={!isEditing}
                                    className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white pl-12"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    disabled={!isEditing}
                                    className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white pl-12"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Job Title / Role</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Institution / Firm</label>
                            <Input
                                value={formData.company}
                                onChange={(e) => handleInputChange("company", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="mt-8 space-y-2 text-left">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl text-base font-bold bg-gray-50/50 border-gray-100 focus:bg-white pl-12"
                            />
                        </div>
                    </div>

                    <div className="mt-8 space-y-2 text-left">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Professional Summary</label>
                        <Textarea
                            value={formData.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            disabled={!isEditing}
                            rows={4}
                            className="rounded-xl text-base font-medium leading-relaxed bg-gray-50/50 border-gray-100 focus:bg-white p-4"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-none ring-1 ring-gray-100 rounded-[32px] overflow-hidden shadow-sm bg-white">
                <CardContent className="p-10">
                    <h3 className="text-2xl font-bold text-black mb-8 border-l-4 border-yellow-400 pl-4">Digital Identity</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative text-left">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Personal Website</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    value={formData.website}
                                    onChange={(e) => handleInputChange("website", e.target.value)}
                                    disabled={!isEditing}
                                    className="h-14 rounded-xl font-bold bg-gray-50/50 border-gray-100 pl-12"
                                />
                            </div>
                        </div>
                        <div className="relative text-left">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">LinkedIn Profile</label>
                            <div className="relative">
                                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    value={formData.linkedin}
                                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                                    disabled={!isEditing}
                                    className="h-14 rounded-xl font-bold bg-gray-50/50 border-gray-100 pl-12"
                                />
                            </div>
                        </div>
                        <div className="relative text-left">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Github Portfolio</label>
                            <div className="relative">
                                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    value={formData.github}
                                    onChange={(e) => handleInputChange("github", e.target.value)}
                                    disabled={!isEditing}
                                    className="h-14 rounded-xl font-bold bg-gray-50/50 border-gray-100 pl-12"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderSecurity = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none ring-1 ring-gray-100 rounded-[32px] overflow-hidden shadow-sm bg-white">
                <CardContent className="p-10">
                    <h3 className="text-2xl font-bold text-black mb-8 border-l-4 border-yellow-400 pl-4">Account Security</h3>
                    <div className="max-w-md space-y-6 text-left">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Password</label>
                            <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">New Password</label>
                            <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Confirm New Password</label>
                            <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                        </div>
                        <Button className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-lg rounded-2xl border-none shadow-lg mt-4">
                            Update Password
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none ring-1 ring-gray-100 rounded-[32px] overflow-hidden shadow-sm bg-white">
                <CardContent className="p-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-left">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xl font-bold text-gray-900 leading-none">Two-Factor Authentication</h4>
                            <p className="text-gray-500 font-medium text-sm">Add an extra layer of protection to your profile data.</p>
                        </div>
                    </div>
                    <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-2 shrink-0">Enable 2FA</Button>
                </CardContent>
            </Card>

            <Card className="border-none ring-1 ring-red-100 rounded-[32px] overflow-hidden shadow-sm bg-red-50/10">
                <CardContent className="p-10 flex flex-col sm:flex-row justify-between items-center gap-8 text-left">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-red-600">Danger Zone</h3>
                        <p className="text-gray-500 font-medium">Permanently delete your profile and all associated career data. This action is final.</p>
                    </div>
                    <Button variant="destructive" className="h-14 px-10 rounded-2xl font-black text-lg shrink-0">
                        <Trash2 className="w-5 h-5 mr-3" /> Delete My Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/10 font-poppins pt-8 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl font-black text-black italic tracking-tighter">
                            Profile Settings
                        </h1>
                        <p className="text-lg text-gray-400 font-bold">
                            Tailor your professional identity for Law Firm visibility.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {hasActiveSubscription ? (
                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none px-6 py-2 rounded-full font-black flex items-center gap-3 shadow-sm animate-bounce">
                                <Crown className="w-5 h-5" /> PREMIUM ACCOUNT
                            </Badge>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none px-6 py-2 rounded-full font-black flex items-center gap-3 shadow-sm">
                                    <Award className="w-5 h-5" /> FREE PLAN
                                </Badge>
                                <Link href="/plans">
                                    <Button className="bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-black font-bold px-6 py-2 rounded-full border border-[#CACA00] shadow-md hover:shadow-lg transition-all">
                                        <Crown className="w-4 h-4 mr-2" /> Upgrade Plan
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                {/* Profile Card */}
                <Card className="border-none overflow-hidden rounded-[40px] shadow-2xl bg-white mb-12 ring-2 ring-yellow-400/20">
                    <div className="h-44 bg-black relative">
                        <img src={IMAGES.portfolioBanner.src} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute -bottom-16 left-12 w-36 h-36 bg-yellow-400 rounded-3xl flex items-center justify-center text-black text-5xl font-black shadow-2xl border-4 border-white rotate-3 group transition-transform hover:rotate-0 duration-500">
                            JD
                        </div>
                    </div>
                    <CardContent className="pt-24 pb-12 px-12 text-left">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                            <div className="flex-1 space-y-6">
                                <div className="space-y-1">
                                    <h2 className="text-4xl font-black text-black tracking-tight">{formData.name}</h2>
                                    <p className="text-gray-500 font-black text-xl italic">{formData.title}</p>
                                </div>
                                <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-3xl">
                                    {formData.bio}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                    <div className="flex items-center gap-3 text-gray-500 font-bold text-base">
                                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        {formData.location}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 font-bold text-base">
                                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        {formData.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 font-bold text-base">
                                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        {formData.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 font-bold text-base">
                                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        Member since {formData.memberSince}
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => setIsEditing(!isEditing)}
                                className={cn(
                                    "h-16 px-10 rounded-2xl font-black text-xl transition-all shadow-xl border-none shrink-0",
                                    isEditing ? "bg-gray-100 text-gray-500 hover:bg-gray-200" : "bg-yellow-400 text-black hover:bg-yellow-500"
                                )}
                            >
                                {isEditing ? <><X className="w-6 h-6 mr-3" /> STOP EDITING</> : <><Edit2 className="w-6 h-6 mr-3" /> EDIT PROFILE</>}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs Control */}
                <Tabs defaultValue="personal-info" className="w-full">
                    <TabsList className="bg-transparent h-16 p-1 gap-4 mb-12 flex justify-start overflow-x-auto">
                        <TabsTrigger
                            value="personal-info"
                            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:shadow-lg rounded-2xl h-14 px-10 font-black text-lg transition-all text-gray-400"
                        >
                            <User className="w-5 h-5 mr-3" /> Personal Info
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:shadow-lg rounded-2xl h-14 px-10 font-black text-lg transition-all text-gray-400"
                        >
                            <Lock className="w-5 h-5 mr-3" /> Security
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal-info">
                        {renderPersonalInfo()}
                    </TabsContent>
                    <TabsContent value="security">
                        {renderSecurity()}
                    </TabsContent>
                </Tabs>

                {/* Strength Analytics */}
                <div className="mt-20 bg-black rounded-[40px] p-12 relative overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-400/5 to-transparent pointer-events-none" />
                    <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-2xl relative z-10">
                                <User className="w-16 h-16" />
                            </div>
                            <div className="absolute -inset-4 bg-yellow-400/20 rounded-full animate-pulse" />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div>
                                <h3 className="text-3xl font-black text-white italic tracking-tight mb-2">Profile Integrity</h3>
                                <p className="text-gray-400 text-lg font-medium max-w-2xl">
                                    A complete profile significantly boosts your match rate with leading Law Firms by <span className="text-yellow-400 font-bold">58%</span>.
                                </p>
                            </div>
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Global Visibility Score</span>
                                    <span className="text-4xl font-black text-yellow-400">{formData.profileCompletion}%</span>
                                </div>
                                <Progress value={formData.profileCompletion} indicatorClassName="bg-yellow-400 h-full transition-all duration-1000" className="h-4 bg-white/5 rounded-full" />
                            </div>
                            <div className="flex items-center gap-4 text-xs font-black text-gray-500 tracking-widest uppercase">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> SECURE</div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500" /> PUBLIC</div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> VERIFIED</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettingsSection;
