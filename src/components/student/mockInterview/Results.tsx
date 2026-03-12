import {
    CheckCircle,
    XCircle,
    RotateCcw,
    Sparkles,
    Check,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultsProps {
    sessionData: any;
    interview: any;
    onPracticeAgain: () => void;
}

export default function Results({ sessionData, interview, onPracticeAgain }: ResultsProps) {
    if (!sessionData) return null;

    // Dynamic data from session
    const aiFeedback = sessionData.aiFeedback || [
        { type: "positive", text: "Great use of specific examples and metrics in your answers" },
        { type: "positive", text: "Your answers followed the STAR method effectively" },
        { type: "improvement", text: "Try to be more concise - aim for 1-2 minute responses" },
        { type: "improvement", text: "Consider adding more details about collaboration" },
    ];

    const successTips = [
        {
            title: "Use the STAR Method",
            desc: "Structure your answers with Situation, Task, Action, Result",
        },
        {
            title: "Be Specific",
            desc: "Use concrete examples and quantify your achievements",
        },
        {
            title: "Practice Out Loud",
            desc: "Speaking your answers helps build confidence and fluency",
        },
        {
            title: "Time Management",
            desc: "Keep answers concise, aim for 1-2 minutes per response",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card
                className="relative w-full max-w-[771px] rounded-[16px] shadow-sm p-8"
            >
                {/* Close Button */}
                <div className="absolute top-4 right-6">
                    <X
                        className="w-4 h-4 text-gray-900 opacity-70 cursor-pointer hover:opacity-100"
                        onClick={onPracticeAgain}
                    />
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h2 className="mb-2 text-[28px] font-bold text-gray-900">
                        Interview Practice Complete! 🎉
                    </h2>
                    <p className="mt-2 text-base text-gray-600">
                        Great job! Here&apos;s how you performed in this mock interview session.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="mb-4 sm:mb-0">
                        <Card
                            className="h-full rounded-[20px] border border-[#b8f7cf] bg-gradient-to-br from-green-50 to-green-50/50 p-5 text-center shadow-none"
                        >
                            <h1 className="text-[#008235] mb-2 text-4xl font-bold">
                                {sessionData.questionsAnswered || 2}
                            </h1>
                            <p className="text-sm text-gray-900">Questions Answered</p>
                        </Card>
                    </div>
                    <div className="mb-4 sm:mb-0">
                        <Card
                            className="h-full rounded-[20px] border border-[#bddaff] bg-gradient-to-br from-blue-50 to-blue-50/50 p-5 text-center shadow-none"
                        >
                            <h1 className="text-[#1447e6] mb-2 text-4xl font-bold">
                                {sessionData.completionRate || 100}%
                            </h1>
                            <p className="text-sm text-gray-900">Completion Rate</p>
                        </Card>
                    </div>
                    <div className="mb-4 sm:mb-0">
                        <Card
                            className="h-full rounded-[20px] border border-[#e9d4ff] bg-gradient-to-br from-purple-50 to-purple-50/50 p-5 text-center shadow-none"
                        >
                            <h1 className="text-[#8200db] mb-2 text-4xl font-bold">
                                {sessionData.grade || "C"}
                            </h1>
                            <p className="text-sm text-gray-900">Overall Grade</p>
                        </Card>
                    </div>
                </div>

                {/* AI Feedback Card */}
                <Card
                    className="mb-6 rounded-[20px] border border-[#feef85] bg-gradient-to-br from-yellow-50 to-orange-50 p-6 shadow-none"
                >
                    <div className="flex items-center mb-5">
                        <span className="text-xl mr-2">✿</span>
                        <h3 className="text-lg font-bold text-gray-900">
                            AI Feedback & Recommendations
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {aiFeedback.map((item: any, index: number) => (
                            <div key={index} className="flex items-start">
                                {item.type === "positive" ? (
                                    <CheckCircle className="w-4 h-4 text-gray-900 mr-3 mt-1 shrink-0" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-gray-900 mr-3 mt-1 shrink-0" />
                                )}
                                <p className="text-sm text-gray-900 leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Interview Success Tips Card */}
                <Card
                    className="mb-8 rounded-[20px] border border-[#e9d4ff] bg-gradient-to-br from-purple-50 to-blue-50 p-6 shadow-none"
                >
                    <div className="flex items-center mb-5">
                        <span className="text-xl mr-2">✨</span>
                        <h3 className="text-lg font-bold text-gray-900">
                            Interview Success Tips
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {successTips.map((tip, index) => (
                            <div key={index} className="flex items-start mb-2">
                                <CheckCircle className="w-4 h-4 text-gray-900 mr-3 mt-1 shrink-0" />
                                <div>
                                    <strong className="block text-sm text-gray-900 mb-1">
                                        {tip.title}
                                    </strong>
                                    <p className="text-[13px] text-gray-600 leading-snug">
                                        {tip.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Practice Again Button */}
                <div className="flex justify-center">
                    <Button
                        className="bg-[#ffff00] text-black hover:bg-[#e6e600] h-12 px-8 text-base font-semibold rounded-full"
                        onClick={onPracticeAgain}
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Practice Again
                    </Button>
                </div>
            </Card>
        </div>
    );
}
