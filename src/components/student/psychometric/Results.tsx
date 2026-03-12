'use client';

import React from "react";
import { IMAGES } from "../../../assets";
import { PsychometricTest } from "@/lib/api/psychometric/psychometricApi";
import { Button, Card, CircularProgress } from "./PsychometricUI";
import { CheckCircle2, RotateCcw, LayoutDashboard, Sparkles, TrendingUp, Target, Users, Brain, BarChart, BookOpen, AlertCircle, Clock, Check, X } from "lucide-react";
import { cn } from "@/utils/cn";

export interface AnswerResult {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeTakenSec: number;
}

interface ResultsProps {
  score: number;
  correctCount: number;
  totalCount: number;
  activeTest: PsychometricTest | null;
  keyStrength?: string;
  areaImprovements?: string;
  overallFeedback?: string;
  answers?: AnswerResult[];
  totalTime?: number;
  onTryAgain: () => void;
  onBackToDashboard: () => void;
}

const Results: React.FC<ResultsProps> = ({
  score,
  correctCount,
  totalCount,
  activeTest,
  keyStrength,
  areaImprovements,
  overallFeedback,
  answers = [],
  totalTime = 0,
  onTryAgain,
  onBackToDashboard
}) => {
  // Format total time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-poppins text-black">
      <div className="container mx-auto max-w-7xl space-y-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Your Psychometric Test Results
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            Gain insights into your strengths and areas for growth.
          </p>
        </header>

        {/* Hero Score Card */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden relative p-8 md:p-14">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#FFFF00]"></div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-10 text-sm font-semibold uppercase tracking-wider text-gray-400">
              <span>Practice Questions</span>
              <span className="text-[#d8d806]">Question {totalCount} of {totalCount} (All Answered)</span>
            </div>

            <div className="w-28 h-28 rounded-full border-[8px] border-[#FFFF00]/20 flex items-center justify-center mb-8 relative">
              <div className="w-20 h-20 rounded-full bg-[#FFFF00] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,0,0.4)]">
                <CheckCircle2 className="w-10 h-10 text-black" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Test Completed!
            </h2>
            <p className="text-xl text-gray-500 font-medium mb-10">
              You scored <span className="text-black font-bold">{correctCount} out of {totalCount}</span> questions correctly.
            </p>

            <div className="flex gap-4">
              <Button onClick={onTryAgain} className="h-12 px-10 rounded-full bg-[#FFFF00] hover:bg-[#eae600] text-black font-bold border-none shadow-sm text-base">
                Try Again
              </Button>
              <Button variant="outline" onClick={onBackToDashboard} className="h-12 px-10 rounded-full border-gray-200 text-gray-600 font-bold hover:bg-gray-50 text-base">
                Review Answers
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Performance */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-10">
          <h3 className="text-lg font-bold text-gray-900 mb-8 uppercase tracking-wider">Overall Performance Summary</h3>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
              {/* Custom Circle Progress simulating the look */}
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="#f3f4f6" strokeWidth="16" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="transparent"
                  stroke="#FFFF00"
                  strokeWidth="16"
                  strokeDasharray={439}
                  strokeDashoffset={439 - (439 * score) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#d8d806]">{score}%</span>
                <span className="text-sm text-gray-400 font-medium">Complete</span>
              </div>
            </div>
            <div className="space-y-4 flex-1 text-center md:text-left">
              <p className="text-2xl font-bold text-[#d8d806]">
                Score: {correctCount} out of {totalCount} correct
              </p>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>Total Time: <strong>{formatTime(totalTime)}</strong></span>
                </div>
              </div>
              <p className="text-lg text-gray-500 leading-relaxed">
                {overallFeedback || "You've completed the test. While your score shows room for improvement, this is a great opportunity to build stronger analytical and reasoning skills."}
              </p>
            </div>
          </div>
        </div>

        {/* Key Strengths & Areas to Improve Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {keyStrength && (
            <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#FFFF00]/20 p-8 md:p-10 relative overflow-hidden group hover:border-[#FFFF00] transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFFF00]/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-[#FFFF00]/10"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#FFFF00] rounded-2xl flex items-center justify-center text-black shadow-[0_4px_20px_rgba(255,255,0,0.3)]">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Key Strengths</h3>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">AI Analysis</p>
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">
                    {keyStrength}
                  </p>
                </div>
              </div>
            </div>
          )}

          {areaImprovements && (
            <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-100 p-8 md:p-10 relative overflow-hidden group hover:border-pink-300 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-pink-500/10"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 shadow-sm">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Areas to Improve</h3>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-pink-400 uppercase tracking-wider">Recommendation</p>
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">
                    {areaImprovements}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>


        {/* AI Powered Feedback - Fallback */}
        {!keyStrength && !areaImprovements && (
          <div className="bg-[#FFFFE0]/40 rounded-[24px] border border-[#FFFF00]/30 p-10">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#d8d806]" />
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">AI-Powered Feedback</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed flex-1">
                Psychometric skills are highly trainable. Focus on understanding the reasoning behind each question type and applying systematic problem-solving strategies. With consistent practice, you can significantly enhance your performance.
              </p>
              <div className="w-40 h-24 md:w-56 md:h-32 rounded-xl overflow-hidden bg-gray-200 shrink-0 shadow-sm border-2 border-white">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Learning" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* Quote */}
        <div className="bg-[#FFFF00] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="p-2">
            <span className="text-6xl font-serif text-black/20">"</span>
          </div>
          <div className="flex-1">
            <p className="text-xl font-bold text-black mb-2">"Every great achiever was once a beginner. Keep learning, keep growing."</p>
            <p className="text-base text-black/60 font-medium italic">— Aspiring Legal Network Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

