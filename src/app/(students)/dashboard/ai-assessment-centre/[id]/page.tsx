'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { AlertCircle, Clock, ChevronRight, Briefcase, PenTool } from 'lucide-react'
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { WrittenAiAssessmentApiResponse } from "../_components/written-assessment-data-type"
import AILoader from "@/components/student/psychometric/AILoader"

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const session = useSession();
  const token = session?.data?.accessToken
  const [timeLeft, setTimeLeft] = useState(45 * 60)
  const [yourResponse, setYourResponse] = useState('')
  const [wordCount, setWordCount] = useState(0)



  // console.log(content)

  const assessmentId = params.id as string
  const content = {
     instructions: [
      'Summarise the main issues',
      'Explain potential impact on client relationship',
      'Suggest two next steps',
    ],
    requirements: [
      'Use at least 300 words',
      'Use a professional tone',
      'Structure clearly',
    ]
}


  console.log(assessmentId)



  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setYourResponse(text)
    setWordCount(text.trim().split(/\s+/).filter((word) => word.length > 0).length)
  }


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

    console.log(data)

    const writtentData = data?.data



    // written case study put api 
  const { mutate, isPending } = useMutation({
    mutationKey: ["written-case-study-put", assessmentId],
    mutationFn: async (values: { yourResponse: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/writtencasestudy/${assessmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values)
      })
      return res.json()
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return 0;
      }
      toast.success(data?.message || "Written Case Study updated successfully")
       setTimeout(() => {
      router.push(`/dashboard/ai-assessment-centre/results/${assessmentId}`)
    }, 1500)
    }
  })





  const handleSubmit = () => {

    // 🔥 console data
    // console.log("===== ASSESSMENT SUBMISSION =====");
    // console.log("Assessment ID:", assessmentId);
    // console.log("Response Text:", yourResponse);
    // console.log("Word Count:", wordCount);
    // console.log("Submitted At:", new Date().toISOString());
    // console.log("================================");

    mutate({yourResponse})


   
  }

  const handleCancel = () => {
    router.push('/')
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isTimeWarning = timeLeft < 300





  return (
    <div className="min-h-screen flex flex-col bg-background">

      {isPending && <AILoader />}

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#0A0A0A]">Assessment Module 01</p>
              <h1 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#0A0A0A]">Written Assessment</h1>
            </div>
            <div className={` rounded-[12px] border-2 border-[#131313] px-4 py-2 flex items-center gap-3 ${isTimeWarning ? ' border-red-500 bg-red-50' : 'border-primary bg-[#FFFF00]'}`}>
              <div className="bg-[#0A0A0A] p-[6px] rounded-[8px] flex-shrink-0 inline-flex items-center justify-center">
                <Clock className={`w-5 h-5 ${isTimeWarning ? 'text-red-600' : 'text-[#FBBF24]'}`} />
              </div>
              <span className={`font-bold text-base ${isTimeWarning ? 'text-red-600' : 'text-[#0A0A0A]'}`}>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Case Brief */}
            <div className="lg:col-span-1 bg-white shadow rounded-[20px] border border-gray-200">
              {/* Case Briefing */}
              <div className="bg-[#0A0A0A] rounded-t-[20px] py-6 px-8 text-white border-b-[4px] border-[#FBBF24]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-[#FBBF24] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                    <Briefcase className="text-[#0A0A0A]" />
                  </div>
                  <h3 className="font-bold">Case Briefing</h3>
                </div>
              </div>

              <div className="p-6">
                {/* Role Context */}
                <div className="bg-[#FEF3C7] border-[2px] border-[#FBBF244D]/30 rounded-[12px] p-5">
                  <h4 className="font-bold text-[#0A0A0A] text-xs mb-2">Role Context</h4>
                  <p className="text-xs text-medium text-[#0F172A]">{writtentData?.roleContext || "N/A"}</p>
                </div>

                {/* Case Description */}
                <div className="space-y-3 pt-6 md:pt-7 lg:pt-8">
                  <h3 className="text-lg md:text-xl font-bold text-[#0A0A0A] border-b-[3px] border-[#FBBF24]">Ventara Automotive</h3>
                  <p className="text-xs text-[#64748B] font-normal pb-6 md:pb-7 lg:pb-8">
                    {writtentData?.ventaraAutomotive || "N/A"}
                  </p>

                  {/* Instructions */}
                  <div className="bg-[#F9FAFB] border-[2px] border-[#E5E7EB] rounded-[12px] p-5 md:p-6 space-y-3">
                    <p className="font-semibold text-foreground text-sm">
                      In your email to your manager:
                    </p>
                    <ul className="space-y-2">
                      {content.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="bg-[#FBBF24] p-1 rounded-[8px] flex-shrink-0 inline-flex items-center justify-center">
                            <ChevronRight className="text-[#0A0A0A] w-4 h-4 " />
                          </div>
                          <span className="text-[#64748B] text-xs font-medium">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>


              </div>
            </div>

            {/* Right Column - Response Area */}
            <div className="lg:col-span-2 space-y-6 rounded-[16px] border border-gray-200 shadow">
              {/* Response Header */}
              <div className="bg-[#FEF3C7] rounded-t-[16px] p-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-[#FBBF24] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                    <PenTool className="text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A0A0A] text-base">Your Response</h3>
                    <p className="text-xs text-[#64748B] font-semibold">Internal Email Draft</p>
                  </div>

                </div>
                <span className="text-sx font-semibold text-[#64748B] bg-white border-[2px] border-[#FBBF244D] py-2 px-3 rounded-[12px]">
                  {wordCount}/300  words
                </span>
              </div>

              {/* Text Editor */}
              <textarea
                value={yourResponse}
                onChange={handleResponseChange}
                placeholder={`Dear [Manager],\nStart typing your email here...`}

                className="w-full h-80 py-1 rounded-lg focus:outline-none px-4 bg-white text-foreground resize-none"
              />

              {/* Requirements Section */}
              <div className="bg-[#FEF3C7] border-t-[3px] border-[#FBBF2480] p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-foreground" />
                  <h4 className="font-bold text-[#0A0A0A] text-sm">Requirements</h4>
                </div>
                <div className="flex flex-wrap gap-4">
                  {content.requirements.map((req, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="requirements"
                        defaultChecked={idx === 0}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-[#64748B] font-semibold">{req}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-muted rounded-full h-1 w-full">
                <div
                  className="bg-primary h-1 rounded-full transition-all"
                  style={{ width: `${Math.min((wordCount / 300) * 100, 100)}%` }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end pb-6 pt-2 pr-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border-[2px] border-[#0A0A0A] text-[#0A0A0A] rounded-[12px] text-sm font-bold"
                >
                  Cancel Assessment
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="px-6 py-3 bg-[#FFFF00] rounded-[12px] text-[#0A0A0A] text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {isPending ? 'Submitting...' : 'Submit Response'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}



