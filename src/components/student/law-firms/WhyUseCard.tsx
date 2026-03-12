import { CheckCircle } from "lucide-react";

const features = [
    {
        title: "Comprehensive Profiles",
        desc: "Detailed information about each firm's practice areas, culture, and opportunities",
    },
    {
        title: "Verified Reviews",
        desc: "Authentic reviews from current and former employees",
    },
    {
        title: "Direct Applications",
        desc: "Apply directly to firms through our integrated system",
    },
    {
        title: "Career Insights",
        desc: "Access salary data, career progression paths, and insider tips",
    },
];

const WhyUseCard = () => {
    return (
        <div
            className="rounded-3xl p-4 md:p-6 lg:p-8 border-2"
            style={{
                borderColor: "#ffff00",
                background: "linear-gradient(135deg, #FEFCE8 0%, #FFF7ED 100%)",
            }}
        >
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                        background: "linear-gradient(135deg, #FEFCE8 0%, #FFF7ED 100%)"
                    }}
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        className="w-5 h-5 md:w-8 md:h-8"
                    >
                        <path
                            d="M29.0681 13.3353C29.6771 16.3237 29.2431 19.4305 27.8386 22.1377C26.4341 24.8448 24.144 26.9887 21.3502 28.2117C18.5563 29.4347 15.4276 29.663 12.4859 28.8584C9.5441 28.0539 6.96705 26.2651 5.1845 23.7905C3.40195 21.3159 2.52163 18.3049 2.69035 15.2598C2.85907 12.2147 4.06664 9.31939 6.11167 7.05683C8.1567 4.79427 10.9156 3.30118 13.9282 2.82654C16.9409 2.35191 20.0252 2.92442 22.6668 4.44861"
                            stroke="#1E1E1E"
                            strokeWidth="2.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 14.6654L16 18.6654L29.3333 5.33203"
                            stroke="#1E1E1E"
                            strokeWidth="2.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div className="flex-1">
                    <h4 className="mb-4 md:mb-6 text-lg md:text-xl font-normal text-[#1E1E1E]">
                        Why Use Our Law Firm Directory?
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((f, i) => (
                            <div key={i} className="flex gap-3 items-start">
                                <div className="mt-1 flex-shrink-0">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <span className="block text-sm md:text-base font-normal text-[#1E1E1E]">
                                        {f.title}
                                    </span>
                                    <span className="block text-xs md:text-sm text-gray-600 mt-0.5">
                                        {f.desc}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUseCard;
