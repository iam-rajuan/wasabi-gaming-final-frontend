"use client";
import { User, Settings, Lock, Briefcase, FileCheck } from "lucide-react";

export default function ProfileTabs({ activeTab, setActiveTab }: any) {
    const tabs = [
        { id: "personal-info", label: "Personal Info", icon: User },
        // { id: "preferences", label: "Preferences", icon: Settings },
        { id: "security", label: "Security", icon: Lock },
        { id: "invited", label: "Invited Jobs", icon: Briefcase },
        // { id: "applied", label: "Applied Jobs", icon: FileCheck },
    ];

    return (
        <div className="flex gap-2 border border-[#0000001A] p-2 rounded-2xl overflow-x-auto">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center rounded-full gap-2 px-6 py-3 text-sm font-medium transition-all ${activeTab === tab.id
                        ? "bg-[#FFFF00]"
                        : "text-gray-500 hover:text-black"
                        }`}
                >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                </button>
            ))}
        </div>
    );
}