import React from 'react';
import { ArrowRight } from "lucide-react";

const HeaderBanner = () => {
    return (
        <div
            className="container mx-auto relative p-6 md:p-8 lg:p-12 rounded-3xl border-2 border-[#FFFF00] overflow-hidden"
            style={{
                background:
                    "linear-gradient(117deg, #FEFCE8 0%, #FFFFFF 50%, #EFF6FF 100%)",
            }}
        >
            <div className="absolute top-4 left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 flex items-center gap-2 bg-[#ffff00] text-black text-xs font-medium px-3 py-1 md:px-4 md:py-1.5 rounded-full">
                {/* Simple SVG icon inline */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 11V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Law Firm Directory
            </div>

            <div className="mt-8 md:mt-10 lg:mt-12 ">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-3 md:mb-4 max-w-4xl">
                    Discover Top Law Firms for Your Legal Career
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
                    Explore leading law firms, learn about their practice areas,
                    culture, and opportunities. Find the perfect match for your legal
                    career aspirations.
                </p>
            </div>
        </div>
    );
};

export default HeaderBanner;
