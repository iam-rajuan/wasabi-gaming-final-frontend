import React from "react";
import StudentAboutHeader from "./_components/StudentAboutHeader";
import StudentAboutMission from "./_components/StudentAboutMission";
import SchoolFounder from "./_components/SchoolFounder";
import TeamSection from "./_components/SchoolTeam";
import ValuesSection from "./_components/ValuesSection";

const AboutUsPage = () => {
    return (
        <div className="bg-[#EBEBEB] min-h-screen py-16">
            <div className="container mx-auto px-4 space-y-20">
                <StudentAboutHeader />
                <StudentAboutMission />
                <SchoolFounder />
                <TeamSection />
                <ValuesSection />
            </div>
        </div>
    );
};

export default AboutUsPage;
