import { PlayCircle, CheckCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Interview {
    id: number;
    type: string;
    description: string;
    duration?: string;
    status: "completed" | "available";
    score?: number;
    icon: string;
}

const interviews: Interview[] = [
    {
        id: 1,
        type: "Behavioural Interview",
        description:
            "Practise reflecting on real experiences and demonstrate skills like teamwork, adaptability, and leadership.",
        duration: "15-20 minutes",
        status: "completed",
        score: 85,
        icon: "👥",
    },
    {
        id: 2,
        type: "Technical Interview",
        description:
            "Test your legal knowledge and commercial awareness with realistic, firm-style interview questions.",
        duration: "15-20 minutes",
        score: 85,
        status: "completed",
        icon: "📊",
    },
    {
        id: 3,
        type: "Situational Interview",
        description:
            "Respond to real workplace scenarios and show sound judgement, professionalism, and problem-solving.",
        duration: "15-20 minutes",
        score: 92,
        status: "completed",
        icon: "🎯",
    },
    {
        id: 4,
        type: "Motivational Interview",
        description:
            "Test your motivation and passion for law through tailored interview questions.",
        duration: "15-20 minutes",
        status: "available",
        icon: "💡",
    },
];

interface AvailableInterviewsProps {
    onStartTest: (interview: Interview) => void;
}

export default function AvailableInterviews({ onStartTest }: AvailableInterviewsProps) {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="">
                {/* ---------- Header ---------- */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Mock Interview Simulation
                    </h1>
                    <p className="text-gray-600">
                        Practice real law‑firm‑style interviews, build confidence, and
                        improve your performance.
                    </p>
                </div>

                {/* ---------- Interview Cards ---------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {interviews.map((itv) => (
                        <Card key={itv.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${itv.status === "completed"
                                                ? "bg-purple-100"
                                                : "bg-pink-100"
                                            }`}
                                    >
                                        {itv.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {itv.type}
                                        </h3>
                                        <p className="text-sm text-gray-500">{itv.description}</p>
                                    </div>
                                </div>

                                {/* Status badge */}
                                {itv.status === "completed" ? (
                                    <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-3 py-1 rounded-full">
                                        <CheckCircle className="w-3 h-3" /> Completed
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-yellow-600 text-xs font-medium bg-yellow-50 px-3 py-1 rounded-full">
                                        <PlayCircle className="w-3 h-3" /> Available
                                    </span>
                                )}
                            </div>

                            {/* Duration */}
                            {itv.duration && (
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                    <Clock className="w-4 h-4" />
                                    <span>{itv.duration}</span>
                                </div>
                            )}

                            {/* Score (only for completed) */}
                            {itv.score !== undefined && (
                                <div className="mb-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">Your Score</span>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {itv.score}/100
                                        </span>
                                    </div>
                                    <Progress value={itv.score} className="h-3" />
                                </div>
                            )}

                            {/* Action button */}
                            <Button
                                variant={itv.status === "completed" ? "outline" : "default"}
                                size="lg"
                                className="w-full"
                                onClick={() => onStartTest(itv)}
                            >
                                {itv.status === "available" && <PlayCircle className="w-4 h-4 mr-2" />}
                                {itv.status === "completed"
                                    ? "View Details & Try Again"
                                    : "Start Test"}
                            </Button>
                        </Card>
                    ))}
                </div>

                {/* ---------- Why Take a Mock Interview? ---------- */}
                <Card className="bg-purple-50 border-0 p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-[20px] bg-purple-500 flex items-center justify-center text-white text-2xl flex-shrink-0 p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <path
                                    d="M16 23.9993V6.66602"
                                    stroke="white"
                                    strokeWidth="2.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20 17.3333C18.8464 16.9961 17.8331 16.2942 17.112 15.3327C16.3909 14.3712 16.0007 13.2019 16 12C15.9993 13.2019 15.6091 14.3712 14.888 15.3327C14.1669 16.2942 13.1536 16.9961 12 17.3333"
                                    stroke="white"
                                    strokeWidth="2.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Why Take a Mock Interview?
                            </h3>
                            <div className="space-y-2">
                                {[
                                    "Discover your natural cognitive strengths and abilities",
                                    "Get personalized career recommendations based on your results",
                                    "Stand out to employers with verified scores on your profile",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-purple-600 mt-1">
                                            <CheckCircle className="w-5 h-5" />
                                        </span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
