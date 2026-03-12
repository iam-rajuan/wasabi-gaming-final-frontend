"use client";

import React from "react";
import { ICONS, IMAGES } from "@/assets";
import { useQuery } from "@tanstack/react-query";
import { getTeamMembers, TeamMemberProtocol, TeamResponse } from "@/lib/api/landing/teamApi";
import { Skeleton } from "@/components/ui/skeleton";

interface DisplayTeamMember {
    name: string;
    role: string;
    image: any;
    bgColor: string;
}

const COLORS = [
    "bg-[#FBFBD5]", // Founder
    "bg-[#EFCCE7]",
    "bg-[#EECDCE]",
    "bg-[#F5EAB4]",
    "bg-[#E3DAF8]",
];

const fallbackTeamMembers: DisplayTeamMember[] = [
    {
        name: "Nathania Olajide",
        role: "Founder",
        image: IMAGES.owner,
        bgColor: COLORS[0],
    },
    {
        name: "Afreen Ali",
        role: "Development Assistant",
        image: IMAGES.Afreen || ICONS.userOne,
        bgColor: COLORS[1],
    },
    {
        name: "Shaun Roberts",
        role: "Research Assistant",
        image: IMAGES.Shaun || ICONS.userOne,
        bgColor: COLORS[2],
    },
    {
        name: "Georgia Edwards",
        role: "Outreach Assistant",
        image: IMAGES.Georgia || ICONS.userOne,
        bgColor: COLORS[3],
    },
    {
        name: "Andrew Shahu",
        role: "Community Lead",
        image: IMAGES.Andrew || ICONS.userOne,
        bgColor: COLORS[4],
    },
];

const TeamSection = () => {
    const { data, isLoading } = useQuery<TeamResponse>({
        queryKey: ["teamMembers"],
        queryFn: getTeamMembers,
    });

    // Map API data to display format
    const apiMembers: DisplayTeamMember[] | undefined = data?.data?.data?.map((member, index) => ({
        name: member.name,
        role: member.profession,
        image: member.image,
        bgColor: COLORS[index % COLORS.length],
    }));

    const membersToDisplay = (apiMembers && apiMembers.length > 0) ? apiMembers : fallbackTeamMembers;

    // Find Founder
    const founderIndex = membersToDisplay.findIndex(member => member.role === "Founder");

    let founder: DisplayTeamMember;
    let teamMembers: DisplayTeamMember[];

    if (founderIndex !== -1) {
        founder = membersToDisplay[founderIndex];
        teamMembers = membersToDisplay.filter((_, index) => index !== founderIndex);
    } else {
        // Fallback if no Founder found (take the first one)
        founder = membersToDisplay[0];
        teamMembers = membersToDisplay.slice(1);
    }

    if (isLoading) {
        return (
            <div className="px-6 py-12 text-center mt-9 font-['Neuton']">
                <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>
                {/* Skeleton for Founder */}
                <div className="flex justify-center mb-12">
                    <div className="flex flex-col items-center p-8 rounded-2xl shadow-lg w-64 bg-slate-50">
                        <Skeleton className="w-40 h-40 rounded-full mb-6" />
                        <Skeleton className="h-8 w-40 mb-2" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                </div>
                {/* Skeleton Grid */}
                <div className="flex flex-wrap justify-center gap-8 mb-12 mx-auto max-w-6xl">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center p-6 rounded-2xl shadow-md w-60 bg-slate-50">
                            <Skeleton className="w-36 h-36 rounded-full mb-6" />
                            <Skeleton className="h-7 w-36 mb-2" />
                            <Skeleton className="h-5 w-28" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 py-12 text-center mt-9 font-['Neuton']">
            <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>

            {/* Top member (Founder) */}
            {founder && (
                <div className="flex justify-center mb-12">
                    <div className={`flex flex-col items-center group ${founder.bgColor} p-8 rounded-2xl shadow-lg w-64 hover:scale-105 transition-transform duration-300`}>
                        <img
                            src={typeof founder.image === 'string' ? founder.image : founder.image.src}
                            alt={founder.name}
                            className="object-cover w-40 h-40 mb-6 rounded-full border-4 border-white shadow-md"
                        />
                        <h3 className="text-2xl font-bold">{founder.name}</h3>
                        <p className="text-lg font-semibold text-[#FF9604] mt-2">
                            {founder.role}
                        </p>
                    </div>
                </div>
            )}

            {/* Grid for other members */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 mx-auto max-w-6xl">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center ${member.bgColor} p-6 rounded-2xl shadow-md w-60 hover:-translate-y-2 transition-transform duration-300`}
                    >
                        <div className="relative w-36 h-36 mb-6">
                            <img
                                src={typeof member.image === 'string' ? member.image : member.image.src}
                                alt={member.name}
                                className="w-full h-full object-cover rounded-full object-top shadow-sm border-2 border-white"
                            />
                        </div>
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-[#555555] font-medium mt-1">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSection;
