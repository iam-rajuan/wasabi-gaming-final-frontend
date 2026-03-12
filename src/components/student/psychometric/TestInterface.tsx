'use client';

import React from "react";
import { Card, ProgressBar } from "./PsychometricUI";
import { Button } from "@/components/ui/button";
import Question from "./Question";
import { PsychometricTest } from "@/lib/api/psychometric/psychometricApi";
import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface TestProps {
    activeTest: PsychometricTest | null;
    currentQuestion: number;
    selectedAnswer: number | null;
    answers: Record<number, number>;
    onAnswerSelect: (index: number) => void;
    onNext: () => void;
    onPrevious: () => void;
}

const Test: React.FC<TestProps> = ({
    activeTest,
    currentQuestion,
    selectedAnswer,
    answers,
    onAnswerSelect,
    onNext,
    onPrevious,
}) => {
    if (!activeTest) return null;

    const questions = activeTest?.allQuestions || [];
    const progress = ((currentQuestion + 1) / (questions?.length || 1)) * 100;
    const question = questions?.[currentQuestion];

    return (

        <div className="min-h-screen bg-gray-50/30 p-4 md:p-8 font-poppins flex flex-col items-center">
            <div className="w-full max-w-[1116.5px]">
                <div className="mb-12 text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Answer Your Psychometric Test Questions
                    </h2>
                    <p className="text-gray-500 font-medium">
                        Gain insights into your strengths and areas for growth.
                    </p>
                </div>

                <div className="relative">
                    <Card className="shadow-xl bg-white overflow-hidden relative z-10 p-0"
                        style={{
                            borderWidth: "1.81px",
                            borderColor: "#FFFF0033",
                            borderRadius: "14.5px",
                        }}
                    >
                        <div className="flex justify-between items-center border-b border-gray-100"
                            style={{ padding: "21.75px" }}
                        >
                            <h3 className="font-semibold text-gray-700">Practice Questions</h3>
                            <span className="text-sm font-medium text-gray-400">
                                Question {currentQuestion + 1} of {questions?.length} <span className="text-[#d8ac26]">({Object.keys(answers).length}/{questions?.length} answered)</span>
                            </span>
                        </div>

                        <div style={{ padding: "21.75px" }}>
                            <Question
                                question={question}
                                selectedAnswer={selectedAnswer}
                                onAnswerSelect={onAnswerSelect}
                            />
                        </div>

                        <div className="flex justify-between items-center bg-white"
                            style={{ padding: "0 21.75px 21.75px 21.75px" }}
                        >
                            <Button
                                variant="outline"
                                onClick={onPrevious}
                                disabled={currentQuestion === 0}
                                className="w-32 rounded-xl h-11"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                            </Button>

                            <div className="flex gap-2">
                                {questions?.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                                            idx === currentQuestion
                                                ? "bg-[#FFFF00] text-black"
                                                : answers[idx] !== undefined
                                                    ? "bg-gray-100 text-gray-600"
                                                    : "bg-gray-50 text-gray-300"
                                        )}
                                    >
                                        {idx + 1}
                                    </div>
                                ))}
                            </div>

                            <Button
                                onClick={onNext}
                                disabled={selectedAnswer === null}
                                className="w-32 rounded-xl h-11 font-bold"
                            >
                                {currentQuestion === (questions?.length || 0) - 1
                                    ? "Finish"
                                    : <>Next <ChevronRight className="w-4 h-4 ml-1" /></>}
                            </Button>
                        </div>


                        <div className="h-1.5 bg-gray-50 w-full">
                            <div
                                className="h-full bg-[#FFFF00] transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

};

export default Test;
