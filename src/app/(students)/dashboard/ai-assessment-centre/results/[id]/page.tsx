


'use client'

import { useParams, useRouter } from 'next/navigation'

import { CheckCircle2, Check, AlertCircle, Lightbulb, FileText, ArrowRight, BookOpen, FileCheck } from 'lucide-react'
import { WrittenAiAssessmentApiResponse } from '../../_components/written-assessment-data-type'
import { useQuery } from '@tanstack/react-query'

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()

  const assessmentId = params.id as string

  console.log(assessmentId)



    // written case study get api
    const { data, isLoading, isError } =
    useQuery<WrittenAiAssessmentApiResponse>({
      queryKey: ["written-case-study", assessmentId],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/writtencasestudy/${assessmentId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch invitations");
        }

        return res.json();
      },
    });

//     console.log(data)

    const writtentData = data?.data

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Navbar /> */}

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E] flex items-center gap-2">
                Assessment Centre Suite Result   🎉
              </h1>
              <p className="text-[#4A5565] font-normal font-sm md:text-base">
                Great job! Here's how you performed in this Written Case Study session.
              </p>
            </div>
            <button
              onClick={() => router.push('/dashboard/ai-assessment-centre')}
              className="bg-[#FFFF00] rounded-[16px] px-4 py-2 border-[2px] border-[#131313] text-[#131313] font-bold hover:bg-muted transition-colors"
            >
              Case Study
            </button>
          </div>

          {/* Score Box */}
          <div className="bg-[#18181B] rounded-[12px] p-6 mb-8 flex items-start justify-between gap-4 border-l-4 border-[#FFFF00]">


            <div className="flex items-center gap-4 mb-3">
              <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                <FileText className="text-[#0A0A0A]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#FFFF00] mb-1">Assessment Subject</p>
                <h2 className="text-base font-medium text-white">Brief Email About A Recent Client Case Study</h2>
              </div>
            </div>

            <div className="bg-[#27272A] border border-[#3F3F46] rounded-[12px] py-2 px-4 text-right flex">
              <p className="text-xl md:text-2xl font-bold text-white">{writtentData?.totalScore} </p>
              <sub className="text-sm text-white"> /100</sub>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className=" mb-8 bg-white p-6 border border-[#F4F4F5] rounded-[12px]">

            <div className="flex items-center gap-4 mb-3">
              <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                <FileText className="text-[#0A0A0A]" />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-[#18181B] mb-[2px]">Written assessment</p>
                <h2 className="text-sm font-medium text-[#71717A]">Artoon Project Management Degree Apprenticeship</h2>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#18181B]">Words Completed</span>
                  <span className="text-sm font-bold text-[#18181B]">{writtentData?.wordsCompleted || 0}</span>
                </div>
                <div className="w-full bg-[#E4E4E7] rounded-full h-3">
                  <div
                    className="bg-[#EAB308] h-3 rounded-full transition-all"
                    style={{ width: `${writtentData?.wordsCompleted}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#18181B]">Completion Rate</span>
                  <span className="text-sm font-bold text-[#18181B]">{writtentData?.completionRate || 0}</span>
                </div>
                <div className="w-full bg-[#E4E4E7] rounded-full h-3">
                  <div
                    className="bg-[#EAB308] h-3 rounded-full transition-all"
                    style={{ width: `${writtentData?.completionRate}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#18181B]">Writing Speed</span>
                  <span className="text-sm font-bold text-[#18181B]">{writtentData?.writingSpeed || 0}</span>
                </div>
                <div className="w-full bg-[#E4E4E7] rounded-full h-3">
                  <div
                    className="bg-[#EAB308] h-3 rounded-full transition-all"
                    style={{ width: `${writtentData?.writingSpeed}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#18181B]">Overall Grade</span>
                  <span className="text-sm font-bold text-[#18181B]">{writtentData?.overallGrade || ""}</span>
                </div>
                <div className="w-full bg-[#E4E4E7] rounded-full h-3">
                  <div
                    className="bg-[#EAB308] h-3 rounded-full transition-all"
                    style={{ width: `${writtentData?.overallGrade}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Feedback & Recommendations */}
          <div className="bg-[#FEFCE8] rounded-[12px] p-6 mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-foreground" />
              <h3 className="text-base font-bold text-[#18181B]">AI Feedback & Recommendations</h3>
            </div>

            <ul className="space-y-3">
              {writtentData?.feedback?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[#27272A] font-normal text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <ul className="space-y-3">
              {writtentData?.recommendations?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[#27272A] font-normal text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Success Tips */}
          <div className="bg-[#FAFAFA] border border-[#E4E4E7] rounded-[12px] p-6 mb-8 space-y-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                <Lightbulb className="text-[#0A0A0A]" />
              </div>
              <div>
                <p className="text-base font-bold text-[#18181B]">Written Case Study Success Tips Success Tips</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {writtentData?.successTips?.map((tip, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check  className="w-5 h-5 text-[#FFFF00] flex-shrink-0" />
                    <h4 className="font-bold text-[#18181B] text-sm">{tip}</h4>
                  </div>
                  {/* <p className="text-sm text-muted-foreground ml-7">{tip.description}</p> */}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#FFFF00] to-[#828200] rounded-[16px] p-6 md:p-8 lg:p-12 text-center space-y-4">
           <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                <FileCheck  className="text-[#0A0A0A]" />
              </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Ready to Participate again?</h2>
            <p className="text-[#FFFFE6] font-normal text-sm md:text-base max-w-2xl mx-auto">
              Watch your recorded responses, get detailed feedback on each question and see full analysis
              of your body language and communication
            </p>
            <button
              onClick={() => router.push('/dashboard/ai-assessment-centre')}
              className="inline-flex items-center gap-2 bg-[#FFFF00] hover:bg-[#FFFF00]/80 text-sm text-black font-semibold px-3 md:px-5 lg:px-6 py-3 rounded-[12px] "
            >
              Start Assessment Centre Suite
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
