'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getPsychometricTestById, submitPsychometricAttempt, tryAgainPsychometricAttempt, getMyPsychometricAnswers } from '@/lib/api/psychometric/psychometricApi';
import Test from '@/components/student/psychometric/TestInterface';
import Results from '@/components/student/psychometric/Results';
import AILoader from '@/components/student/psychometric/AILoader';
import PsychometricSkeleton from '@/components/student/psychometric/PsychometricSkeleton';
import { toast } from 'sonner';
import { useStudentDashboardStore } from '@/store/studentDashboardStore';

export default function PsychometricTestPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    // @ts-ignore
    const token = session?.accessToken || session?.user?.accessToken || '';
    const testId = params.id as string;

    const [currentView, setCurrentView] = useState<'test' | 'results'>('test');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showAILoader, setShowAILoader] = useState(false);

    const { setPsychometricResult } = useStudentDashboardStore();

    const queryClient = useQueryClient();

    // Fetch Test Details
    const { data: testResponse, isLoading: isLoadingTest } = useQuery({
        queryKey: ['psychometricTest', testId, token],
        queryFn: () => getPsychometricTestById(testId, token),
        enabled: !!testId,
    });

    const activeTest = testResponse?.data || null;

    // Check existing attempts to see if this is a retry
    const { data: myAnswersData } = useQuery({
        queryKey: ['myPsychometricAnswers', token],
        queryFn: () => getMyPsychometricAnswers(token),
        enabled: !!token,
    });

    const existingAttempt = myAnswersData?.data?.find(a => a?.test?._id === testId);

    useEffect(() => {
        if (existingAttempt && activeTest) {
            const rawScore = existingAttempt.score || 0;
            const total = activeTest.allQuestions?.length || 0;
            const pct = total > 0 ? Math.round((rawScore / total) * 100) : 0;
            const insight = existingAttempt.keyStrength || '';
            setPsychometricResult(pct, insight);
        }
    }, [existingAttempt, activeTest, setPsychometricResult]);

    // Mutation for submission
    const submissionMutation = useMutation({
        mutationFn: async ({ testId, answers, isRetry }: { testId: string; answers: any[]; isRetry: boolean }) => {
            // Show AI Loader for at least 3 seconds for effect
            setShowAILoader(true);
            const minTime = new Promise(resolve => setTimeout(resolve, 3000));

            const submission = isRetry
                ? tryAgainPsychometricAttempt(testId, answers, token)
                : submitPsychometricAttempt(testId, answers, token);

            await Promise.all([submission, minTime]);
            return submission;
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['myPsychometricAnswers', token] });
            setShowAILoader(false);
            setCurrentView('results');
            toast.success("Test submitted successfully!");

            // Update Store
            const rawScore = response?.data?.score || 0;
            const total = activeTest?.allQuestions?.length || 0;
            const pct = total > 0 ? Math.round((rawScore / total) * 100) : 0;
            const insight = response?.data?.keyStrength || '';
            setPsychometricResult(pct, insight);
        },
        onError: (error: any) => {
            console.error("Submission failed:", error);
            setShowAILoader(false);

            // Extract meaningful error message
            let msg = error?.message || "An unexpected error occurred.";

            // Try to parse if it looks like a JSON string from backend
            if (msg.includes('{') || msg.includes('Error submitting test:') || msg.includes('Error retrying test:')) {
                try {
                    const jsonStr = msg.replace('Error submitting test: ', '').replace('Error retrying test: ', '');
                    const parsed = JSON.parse(jsonStr);

                    if (parsed.message) msg = parsed.message;

                    if (parsed.stack || (parsed.message && parsed.message.includes('Cannot read properties'))) {
                        msg = "We couldn't generate your full report right now. Please try again or contact support.";
                    }
                } catch (e) {
                    if (msg.includes('Cannot read properties')) {
                        msg = "We couldn't generate your full report right now. Please try again later.";
                    }
                }
            }

            toast.error(msg);
        }
    });

    const handleAnswerSelect = useCallback((value: number) => {
        setSelectedAnswer(value);
    }, []);

    const handleNext = useCallback(() => {
        // Use currently selected answer OR the one already saved in state (for retries/navigation)
        const currentAnswerValue = selectedAnswer ?? answers[currentQuestion];

        if (currentAnswerValue === null || currentAnswerValue === undefined || !activeTest) return;

        const updatedAnswers = { ...answers, [currentQuestion]: currentAnswerValue };
        setAnswers(updatedAnswers);

        // IMPORTANT: We reset selectedAnswer for the UI state of the *next* question.
        setSelectedAnswer(null);

        const totalQuestions = activeTest.allQuestions?.length || 0;

        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // Finished - Submit
            const formattedAnswers = activeTest.allQuestions.map((q, idx) => ({
                questionId: q._id,
                userAnswer: q.options[updatedAnswers[idx] ?? 0],
                timeTakenSec: q.timeTakenSec || 15,
            }));

            const isRetry = !!existingAttempt;

            submissionMutation.mutate({
                testId: activeTest._id,
                answers: formattedAnswers,
                isRetry
            });
        }
    }, [activeTest, currentQuestion, selectedAnswer, answers, existingAttempt, submissionMutation]);

    const handlePrevious = useCallback(() => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
            setSelectedAnswer(answers[currentQuestion - 1] ?? null);
        }
    }, [currentQuestion, answers]);


    if (isLoadingTest || !activeTest) {
        return <PsychometricSkeleton />;
    }

    if (showAILoader) {
        return <AILoader />;
    }

    if (currentView === 'results') {
        const rawScoreCount = submissionMutation.data?.data?.score || 0;
        const totalCount = activeTest.allQuestions.length;
        const percentage = Math.round((rawScoreCount / totalCount) * 100);

        return (
            <Results
                score={percentage}
                correctCount={rawScoreCount}
                totalCount={totalCount}
                activeTest={activeTest}
                keyStrength={submissionMutation.data?.data?.keyStrength}
                areaImprovements={submissionMutation.data?.data?.areaImprovements}
                overallFeedback={submissionMutation.data?.data?.overallFeedback}
                answers={submissionMutation.data?.data?.answers}
                totalTime={submissionMutation.data?.data?.totalTime}
                onTryAgain={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setSelectedAnswer(null);
                    setCurrentView('test');
                }}
                onBackToDashboard={() => router.push('/dashboard/psychometric-test')}
            />
        );
    }

    return (
        <Test
            activeTest={activeTest}
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            answers={answers}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
            onPrevious={handlePrevious}
        />
    );
}
