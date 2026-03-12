import Image from "next/image"
import type React from "react"

interface Feature {
    title: string
    description: string
    imageSrc: string // new property for image
}

const features: Feature[] = [
    {
        title: "Track Student Progress",
        description:
            "Monitor engagement, skills development, and application readiness across cohorts, with clear visibility of each student's journey.",
        imageSrc: "/icon.png",
    },
    {
        title: "Targeted Careers Support",
        description:
            "Provide structured guidance through practical legal experiences, mentoring, and tailored resources that support informed career decisions.",
        imageSrc: "/icon1.png",
    },
    {
        title: "Measure Careers Impact",
        description:
            "Generate clear reports on participation, skills gained, and post 16 and post 18 progression to evidence impact and support inspections.",
        imageSrc: "/icon2.png",
    },
]

export function FeaturesSection() {
    return (
        <section className="w-full bg-background py-12 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold lg:!leading-[60px] mb-3">
                        Why Schools Choose The <span className="text-[#E4E403]">Aspiring Legal </span>
                        <br className="sm:block hidden" />
                        <span className="text-[#E4E403]">Network?</span>
                    </h3>
                    <p className="text-base md:text-lg text-[#666666] max-w-2xl mx-auto text-balance">
                        Everything you need to track and enhance student career outcomes
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[linear-gradient(180deg,#FFEE35_0%,#FFFABF_100%)] rounded-2xl p-6 md:p-8  flex flex-col items-center transition-transform duration-300 hover:shadow-lg hover:scale-105"
                        >
                            {/* Image Container */}
                            <div className="bg-white/40  backdrop-blur-sm  w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                                <Image
                                    src={feature.imageSrc}
                                    alt={feature.title}
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-sm md:text-base text-[#666666] leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
