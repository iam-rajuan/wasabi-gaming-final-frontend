"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, CheckCircle2, Award, X, XCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type Quiz = {
    _id: string;
    title: string;
    options: string[];
    answer: string;
};

type Lesson = {
    _id: string;
    title: string;
    url: string;
    time: string;
    quiz: Quiz[];
};

interface QuizModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    currentLesson: Lesson | null;
    courseId: string;
}

type QuizResult = {
    quiz: string;
    userAnswer: string;
    isCorrect: boolean;
    questionTitle: string;
};

export default function QuizModal({
    open,
    setOpen,
    courseId,
    currentLesson,
}: QuizModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [quizResult, setQuizResult] = useState<{
        score: number;
        total: number;
        results: QuizResult[];
    } | null>(null);
    const queryClient = useQueryClient();

    const { data: sessionData } = useSession();
    const token = sessionData?.accessToken;

    const questions = currentLesson?.quiz || [];
    const totalSteps = questions.length;

    const submitMutation = useMutation({
        mutationFn: async () => {
            if (!token) throw new Error("Authentication token missing");

            const payload = {
                answers: Object.entries(userAnswers).map(([quizId, userAnswer]) => ({
                    quizId,
                    userAnswer,
                })),
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/course-quizzes/courses/${courseId}/videos/${currentLesson?._id}/quizzes/submit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to submit quiz");
            }

            return response.json();
        },

        onSuccess: (data: any) => {
            toast.success("Quiz submitted successfully!");

            // prepare results for SuccessModal
            const results = questions.map((q) => {
                const userAnswerObj = data.data.quizzes.find(
                    (item: any) => item.quiz === q._id
                );
                return {
                    quiz: q._id,
                    questionTitle: q.title,
                    userAnswer: userAnswerObj?.userAnswer || "Not answered",
                    isCorrect: userAnswerObj?.isCorrect || false,
                };
            });

            setQuizResult({
                score: data.data.score,
                total: questions.length,
                results,
            });
            queryClient.invalidateQueries({ queryKey: ["single-course"] });

            setOpen(false); // close quiz modal
            setSuccessModalOpen(true); // open success modal
        },

        onError: (err: any) => {
            toast.error(err.message || "Something went wrong");
            console.error(err);
        },
    });

    if (!currentLesson || totalSteps === 0) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[450px] p-8 text-center">
                    <DialogTitle className="text-xl font-bold text-slate-800 mb-4">
                        No Quiz Available
                    </DialogTitle>
                    <p className="text-slate-600 mb-6">
                        This lesson doesn't have any questions yet.
                    </p>
                    <Button
                        onClick={() => setOpen(false)}
                        className="bg-[#FFFF00] text-slate-900 rounded-xl"
                    >
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        );
    }

    const progressValue = (currentStep / totalSteps) * 100;
    const currentQuestion = questions[currentStep - 1];

    const handleSelect = (option: string) => {
        setUserAnswers((prev) => ({
            ...prev,
            [currentQuestion._id]: option,
        }));
    };

    const allQuestionsAnswered = questions.every((q) => !!userAnswers[q._id]);

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else if (allQuestionsAnswered) {
            submitMutation.mutate();
        }
    };

    return (
        <>
            {/* QUIZ MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none rounded-3xl bg-white shadow-lg">
                    <DialogHeader className="p-6 pb-0 flex justify-between">
                        <DialogTitle className="text-xl font-bold text-slate-800">
                            Final Course Quiz
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-6 pt-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Question {currentStep} of {totalSteps}
                        </p>

                        <div
                            className="py-4 px-6 rounded-3xl"
                            style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 100%)" }}
                        >
                            <div className="flex gap-3 mb-6 items-center ">
                                <div className="w-10 h-10 shrink-0 bg-[#FFFF00] rounded-full flex items-center justify-center font-bold text-slate-900">
                                    {currentStep}
                                </div>
                                <p className="text-sm font-semibold text-slate-800 pt-1 leading-snug">
                                    {currentQuestion?.title}
                                </p>
                            </div>

                            <div className="space-y-3 mb-8">
                                {currentQuestion?.options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleSelect(option)}
                                        className={`w-full text-left p-4 rounded-xl text-xs border transition-all ${userAnswers[currentQuestion._id] === option
                                            ? "border-[#FFFF00] bg-[#FFFEF0] shadow-sm ring-1 ring-[#FFFF00]"
                                            : "border-slate-100 bg-[#FFFFFF] hover:border-slate-200 text-slate-600"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6 mt-5">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                    <span>Progress</span>
                                    <span>{currentStep}/{totalSteps}</span>
                                </div>
                                <Progress
                                    value={progressValue}
                                    className="h-1.5 bg-slate-100 [&>div]:bg-[#FFFF00]"
                                />
                            </div>

                            <div className="flex gap-3">
                                <DialogClose asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex-1 text-[#1E1E1E] border border-[#0000001A] rounded-3xl text-xs font-bold hover:bg-transparent"
                                    >
                                        Cancel Quiz
                                    </Button>
                                </DialogClose>

                                <Button
                                    onClick={handleNext}
                                    disabled={
                                        currentStep < totalSteps
                                            ? !userAnswers[currentQuestion._id]
                                            : !allQuestionsAnswered
                                    }
                                    className="flex-[1.5] bg-[#FFFF00] hover:bg-[#FFFF00]/90 border border-[#0000001A] text-slate-900 font-bold rounded-3xl text-xs"
                                >
                                    {currentStep === totalSteps ? "Submit Quiz" : "Next Question"}
                                    {currentStep !== totalSteps && (
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {quizResult && (
                <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
                    <DialogContent className="sm:max-w-[440px] text-center  bg-[#FFFFFF]  p-0 overflow-hidden rounded-3xl">
                        <DialogHeader className="p-6 flex ">
                            <DialogTitle className="text-xl font-bold text-slate-800">
                                Final Course Quiz
                            </DialogTitle>
                            <DialogDescription className="text-[10px] font-bold text-[#717182] uppercase ">
                                Here are your results
                            </DialogDescription>
                        </DialogHeader>

                        <div className="px-6 pb-6 space-y-6 text-center">
                            <div className="bg-[#F0FFF4] border-2 border-[#B9F8CF] rounded-3xl p-8 mx-auto w-full space-y-4">
                                <div className="mx-auto w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                                    <Award className="w-8 h-8 text-[#22C55E]" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#166534]">Congratulations! 🎉</h2>
                                <p className="text-[#22C55E] font-semibold">
                                    You scored {quizResult.score} out of {quizResult.total}
                                </p>
                                <p className="text-slate-500 text-xs leading-relaxed max-w-[240px] mx-auto">
                                    You've successfully completed this quiz!
                                </p>
                            </div>

                            <div className="space-y-3 text-left">
                                <h3 className="text-sm font-bold text-slate-700">Answer Review</h3>
                                {quizResult.results.map((q) => (
                                    <div
                                        key={q.quiz}
                                        className="flex items-center gap-3 p-4 bg-[#F0FFF4] border-2 border-[#B9F8CF] rounded-2xl"
                                    >

                                        {q.isCorrect ? (
                                            <CheckCircle2
                                                className={`w-5 h-5 shrink-0 text-[#22C55E] `}
                                            />
                                        ) : (
                                            <XCircle
                                                className={`w-5 h-5 shrink-0 text-[#EF4444] `}
                                            />
                                        )

                                        }


                                        <p className="text-[13px] text-slate-600 font-medium truncate">
                                            {q.questionTitle}: {q.userAnswer} ({q.isCorrect ? "Correct" : "Wrong"})
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <DialogClose asChild>
                                <Button className="w-full bg-white border border-[#0000001A] text-slate-600 hover:bg-slate-50 font-bold rounded-xl h-12">
                                    Close
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
