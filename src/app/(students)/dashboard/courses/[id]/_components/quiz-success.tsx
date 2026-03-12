"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, X } from "lucide-react";

type QuizResult = {
  quiz: string;
  userAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
  questionTitle: string;
};

interface SuccessModalProps {
  open: boolean;

  setOpen: (open: boolean) => void;
  score: number;
  total: number;
  results: QuizResult[];
}

export default function SuccessModal({
  open,
  setOpen,
  score,
  total,
  results,
}: SuccessModalProps) {
  console.log(results)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[440px] p-0 bg-[#FFFFFF] overflow-hidden rounded-3xl">
        <DialogHeader className="p-6 flex justify-between items-center">
          <DialogTitle className="text-xl font-bold text-slate-800">
            Quiz Submitted
          </DialogTitle>
          <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-slate-100 transition-colors">
            <X className="h-4 w-4 text-slate-400" />
          </DialogClose>
        </DialogHeader>

        <div className="p-6 space-y-6 text-center">
          <div className="bg-[#F0FFF4] border border-[#DCFCE7] rounded-3xl p-8 mx-auto w-full space-y-4">
            <div className="mx-auto w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-[#22C55E]" />
            </div>
            <h2 className="text-2xl font-bold text-[#166534]">Congratulations! 🎉</h2>
            <p className="text-[#22C55E] font-semibold">
              You scored {score} out of {total}
            </p>
            <p className="text-slate-500 text-xs leading-relaxed max-w-[240px] mx-auto">
              You've successfully completed this quiz!
            </p>
          </div>

          <div className="space-y-3 text-left">
            <h3 className="text-sm font-bold text-slate-700">Answer Review</h3>
            {results.map((q) => (
              <div
                key={q.quiz}
                className="flex items-start gap-3 p-4 bg-[#F0FFF4] border border-[#DCFCE7] rounded-2xl"
              >
                <CheckCircle2
                  className={`w-5 h-5 shrink-0 ${q.isCorrect ? "text-[#22C55E]" : "text-red-500"
                    }`}
                />

                <div className="space-y-1">
                  <p className="text-[13px] text-slate-700 font-medium">
                    {q.questionTitle}
                  </p>

                  <p className="text-[12px] text-slate-600">
                    Your Answer:{" "}
                    <span
                      className={q.isCorrect ? "text-green-600" : "text-red-500"}
                    >
                      {q.userAnswer}
                    </span>
                  </p>

                  {!q.isCorrect && (
                    <p className="text-[12px] text-green-600">
                      Correct Answer: {q.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            ))}

          </div>

          <DialogClose asChild>
            <Button className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl h-12">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
