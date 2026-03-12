'use client';

import { useState } from "react";
import { psychometricData, PsychometricTest } from "./data";

export const usePsychometric = () => {
    const [currentView, setCurrentView] = useState<"dashboard" | "test" | "results">("dashboard");
    const [activeTest, setActiveTest] = useState<PsychometricTest | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleStartTest = (testId: number) => {
        const test = psychometricData.tests.find((t) => t.id === testId);
        if (!test) return;
        setActiveTest(test);
        setCurrentQuestion(0);
        setAnswers({});
        setSelectedAnswer(null);
        setCurrentView("test");
    };

    const handleAnswerSelect = (value: number) => setSelectedAnswer(value);

    const handleNext = () => {
        if (selectedAnswer === null || !activeTest) return;
        setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
        setSelectedAnswer(null);
        if (currentQuestion < activeTest.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentView("results");
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(answers[currentQuestion - 1] ?? null);
        }
    };

    const calculateScore = () => {
        if (!activeTest) return 0;
        let correct = 0;
        Object.entries(answers).forEach(([idx, ans]) => {
            if (ans === activeTest.questions[Number(idx)].correctAnswer) correct++;
        });
        return Math.round((correct / activeTest.questions.length) * 100);
    };

    const goToDashboard = () => setCurrentView("dashboard");

    return {
        currentView,
        activeTest,
        currentQuestion,
        answers,
        selectedAnswer,
        psychometricData,
        handleStartTest,
        handleAnswerSelect,
        handleNext,
        handlePrevious,
        calculateScore,
        goToDashboard,
    };
};
