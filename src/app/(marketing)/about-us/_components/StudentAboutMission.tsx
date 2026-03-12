import React from "react";
import { Star, Zap, Landmark, Users, Goal } from "lucide-react";
import Icon from "@/components/shared/icon/Icon";

const stats = [
    {
        icon: <Star className="w-8 h-8 text-[#FFD700]" />,
        number: "100%",
        title: "Satisfaction rate",
    },
    {
        icon: <Zap className="w-8 h-8 text-[#FFD700]" />,
        number: "10+",
        title: "Optimised Interactive Tools",
    },
    {
        icon: <Landmark className="w-8 h-8 text-[#FFD700]" />,
        number: "10+",
        title: "Law Firm & School Partners",
    },
    {
        icon: <Users className="w-8 h-8 text-[#FFD700]" />,
        number: "10K+",
        title: "Aspiring Legal Professionals",
    },
];

const StudentAboutMission = () => {
    return (
        <div className="mt-16">
            <div className="max-w-[950px] mx-auto flex flex-col items-center rounded-2xl py-10 px-5 md:px-16 space-y-2 shadow-xl bg-white">
                <div className="w-16 h-16 bg-[#FFFFB0] rounded-full flex items-center justify-center mb-4">
                    <Goal className="w-8 h-8 text-black" />
                </div>
                <h1 className="text-3xl font-bold">Our mission</h1>
                <p className="text-[#5A5A5A] text-lg lg:text-xl text-center pt-14 inter">
                    ALN brings together aspiring lawyers, current apprentices, and legal
                    professionals united by a shared goal: to make the path into law
                    clearer, more inclusive, and more achievable for everyone. With our
                    events, mentoring, and AI-powered platform, we’ve created an
                    innovative space where you can refine your applications, prepare for
                    interviews, and gain the confidence to succeed. From AI mock
                    interviews to our assessment centre suite, we help you build the
                    skills that set you apart.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-10 px-4 md:px-16 mt-10 md:grid-cols-2 lg:grid-cols-4 font-['Neuton']">
                {stats.map((info, index) => (
                    <div key={index} className="flex flex-col items-center py-8 bg-white rounded-lg shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                            {info.icon}
                        </div>
                        <h4 className="text-center text-4xl font-bold text-[#1E1E1E] mt-8">
                            {info.number}
                        </h4>
                        <p className="pt-2 text-base inter text-center">{info.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentAboutMission;
