'use client';

import React from "react";
import { PsychometricQuestion } from "@/lib/api/psychometric/psychometricApi";
import { cn } from "@/utils/cn";

const letters = ["A", "B", "C", "D", "E", "F"];

export const OptionCard = ({
    label,
    letter,
    checked,
    onChange,
    value
}: {
    label: string;
    letter: string;
    checked: boolean;
    onChange: (value: number) => void;
    value: number
}) => (
    <div
        onClick={() => onChange(value)}
        className={cn(
            "group flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 bg-white",
            checked
                ? "border-[#FFFF00] bg-[#FFFF00]/10 shadow-sm"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
        )}
    >
        <div
            className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border shrink-0 transition-colors",
                checked
                    ? "border-gray-900 bg-white text-black"
                    : "border-gray-300 text-gray-500 group-hover:border-gray-400"
            )}
        >
            {letter}
        </div>

        <span className={cn(
            "text-base font-medium flex-1",
            checked ? "text-gray-900" : "text-gray-600"
        )}>
            {label}
        </span>
    </div>
);

interface QuestionProps {
    question: PsychometricQuestion;
    selectedAnswer: number | null;
    onAnswerSelect: (index: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, selectedAnswer, onAnswerSelect }) => {
    if (!question) return null;

    return (
        <div className="font-poppins space-y-8">
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100">
                <h3 className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                    {question?.question}
                </h3>
            </div>

            <div className="space-y-3">
                {question?.options?.map((option, index) => (
                    <OptionCard
                        key={index}
                        letter={letters[index] || "?"}
                        label={option}
                        checked={selectedAnswer === index}
                        onChange={onAnswerSelect}
                        value={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Question;
