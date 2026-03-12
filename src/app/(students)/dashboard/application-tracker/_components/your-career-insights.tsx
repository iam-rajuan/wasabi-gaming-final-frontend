"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp } from "lucide-react"
import { useStudentDashboardStore } from "@/store/studentDashboardStore"

const YourCareerInsights = () => {
  const { cvCompletionPercentage, psychometricScore, psychometricInsights } = useStudentDashboardStore();

  return (
    <div>
      <Card className="bg-gradient-to-br from-[#FEFCE8] to-white border-[2px] border-[#FFFF00] rounded-[20px] shadow-sm">
        <CardContent className="p-6 md:p-8 space-y-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
            <div className="bg-[#FFFF00] p-4 rounded-[20px]">
              <Brain className="w-8 h-8 text-[#1E1E1E]" />
            </div>
            <div className="w-full">
              <h2 className="text-lg md:text-xl font-semibold text-[#1E1E1E] leading-[28px]">
                Your Career Insights
              </h2>
              {/* Progress Section */}
              <div className="grid md:grid-cols-2 gap-6 py-2 w-full">

                {/* Resume Completion */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-normal leading-[20px] text-[#4A5565]">Resume Completion</span>
                    <span className="text-base font-semibold leading-[24px] text-[#1E1E1E]">{cvCompletionPercentage}%</span>
                  </div>

                  <Progress
                    value={cvCompletionPercentage}
                    className="h-2 rounded-full bg-[#FFFF0033] [&>div]:bg-[#FFFF00] [&>div]:rounded-full"
                  />

                  <p className="text-xs text-[#6A7282] font-normal leading-[16px]">
                    {cvCompletionPercentage < 100 ? "Complete your profile to reach 100%" : "Profile complete!"}
                  </p>
                </div>

                {/* Psychometric Score */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-normal leading-[20px] text-[#4A5565]">Psychometric Score</span>
                    <span className="text-base font-semibold leading-[24px] text-[#1E1E1E]">{psychometricScore}/100</span>
                  </div>

                  <Progress
                    value={psychometricScore}
                    className="h-2 rounded-full bg-[#FFFF0033] [&>div]:bg-[#FFFF00] [&>div]:rounded-full"
                  />

                  <p className="text-xs text-[#6A7282] font-normal leading-[16px]">
                    {psychometricInsights ? `Strong in ${psychometricInsights}` : "Take the test to see your strengths"}
                  </p>
                </div>
              </div>

              {/* Tips Box */}
              <div className="border border-[#E5E500] rounded-xl p-4 flex items-start gap-3 bg-white mt-4">
                <TrendingUp className="w-5 h-5 text-[#1E1E1E] mt-1 shrink-0" />
                <p className="text-sm text-[#1E1E1E] leading-[20px] font-normal">
                  <span className="font-medium">Organised Tips:</span> {psychometricInsights ? `Based on your psychometric results, you're strong in ${psychometricInsights} — perfect for analytical roles! Consider applying to more data-focused positions.` : "Complete the Psychometric Test to get personalized career tips."}
                </p>
              </div>
            </div>

          </div>



        </CardContent>
      </Card>
    </div>
  )
}

export default YourCareerInsights