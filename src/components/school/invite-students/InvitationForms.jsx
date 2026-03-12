    import { Card } from "antd";
    import { useState } from "react";

    export function InvitationTabs({ onTabChange }) {
    const [activeTab, setActiveTab] = useState("single");

    const handleTabChange = (type) => {
        setActiveTab(type);
        if (onTabChange) onTabChange(type);
    };

    return (
        <div className="w-full">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Invite Students</h1>
            <p className="text-gray-500">Quickly onboard students to your platform with personalised invitations</p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Single Invitation Card */}
            <Card
            className={`p-6 cursor-pointer transition-all border-2 ${
                activeTab === "single" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white hover:border-yellow-300"
            }`}
            onClick={() => handleTabChange("single")}
            >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">S</span>
                </div>
                <h2 className="text-lg font-semibold">Single Invitation</h2>
            </div>
            <p className="text-sm text-gray-500">Invite one student at a time</p>
            </Card>

            {/* Bulk Invitation Card */}
            <Card
            className={`p-6 cursor-pointer transition-all border-2 ${
                activeTab === "bulk" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white hover:border-yellow-300"
            }`}
            onClick={() => handleTabChange("bulk")}
            >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">B</span>
                </div>
                <h2 className="text-lg font-semibold">Bulk Invitation</h2>
            </div>
            <p className="text-sm text-gray-500">Upload CSV file or paste emails</p>
            </Card>
        </div>
        </div>
    );
    }