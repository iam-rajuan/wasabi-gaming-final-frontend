import React from "react";
import { IMAGES } from "@/assets";

const SchoolFounder = () => {
    return (
        <div className="flex flex-col items-center justify-between gap-16 py-10 space-y-6 lg:flex-row md:px-16 md:space-y-0 -scroll-mt-7">
            {/* Left side: Video/Image */}
            <div className="relative w-full h-auto overflow-hidden bg-[#FFD700] rounded-lg lg:w-1/2 flex items-center justify-center p-4">
                <div className="relative w-full aspect-square md:aspect-video rounded-xl overflow-hidden">
                    <img
                        src={IMAGES.owner.src}
                        alt="Founder"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer">
                        <div className="w-16 h-16 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-full border border-white/50 transition-transform group-hover:scale-110">
                            <span className="text-3xl text-white ml-1">▶</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side: Text */}
            <div className="w-full p-8 bg-white shadow-xl lg:w-1/2 rounded-2xl inter">
                <h2 className="mb-6 text-3xl font-bold">Our Founder</h2>
                <p className="text-[#5A5A5A] text-lg lg:text-xl leading-relaxed">
                    Hi, I’m Nathania, founder of The Aspiring Legal Network and currently
                    a solicitor apprentice. When I was in sixth form, I remember feeling
                    lost. I wanted to explore a career in law but there was no clear
                    advice or support to help me find work experience or understand what
                    steps to take next. It was confusing, overwhelming, and honestly quite
                    isolating.
                </p>
                <p className="text-[#5A5A5A] text-lg lg:text-xl mt-6 leading-relaxed">
                    That is why I decided to create this community. I wanted to build a
                    space where anyone with an interest in law no matter their background
                    could find practical resources, real-life insights, and a supportive
                    network. My hope is that by sharing knowledge and opportunities we can
                    help future legal professionals feel confident and prepared as they
                    take their first steps into the legal world. If you are interested in
                    law or want to learn more, please join us and be part of a community
                    that is here to support you every step of the way.
                </p>
            </div>
        </div>
    );
};

export default SchoolFounder;
