"use client";
import React, { useState, useEffect } from "react";
import ProfileHeader from "./_components/profile-header";
import ProfileTabs from "./_components/profile-tabs";
import PersonalInfo from "./_components/personalInfo";
import { Sparkles, LogOut } from "lucide-react";
import AccountSettings from "./_components/security";
import JobsTable from "./_components/job";
import { signOut } from "next-auth/react";
import LogoutModal from "@/components/shared/LogoutModal";
import SettingHaders from "./_components/settingHaders";


export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("personal-info");
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const confirmLogout = async () => {
        await signOut({ callbackUrl: "/" });
        setIsLogoutModalOpen(false);
    };


    return (
        <div className="container mx-auto p-6 space-y-6">
           
      <SettingHaders setIsLogoutModalOpen={setIsLogoutModalOpen} />
            {/* Header Card Component */}
            <ProfileHeader  />

            {/* Tabs Navigation Component */}
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Conditional Rendering based on Tab */}
            <div className="mt-6">
                {activeTab === "personal-info" && <PersonalInfo />}
                {/* {activeTab === "preferences" && <Preferences  data={userData} />} */}
                {activeTab === "security" && <AccountSettings />}
                {activeTab === "invited" && <JobsTable />}
                {/* {activeTab === "applied" && <AppliedJobs />} */}
                {/* {activeTab === "applied" && <AppliedJobs />} */}
                {/* Baki tabs gulo eivabe add korte hobe */}
            </div>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onLogout={confirmLogout}
            />
        </div>
    );
}