'use client'

import React, { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Clock,
  CircleCheckBig,
  Play,
  Brain,
  BarChart,
  Lightbulb,
  Users,
} from 'lucide-react'
import PsychometricAssessmentSkeleton from './PsychometricAssessmentSkeleton'
import {
  getAllPsychometricTests,
  getMyPsychometricAnswers,
  UserAttempt,
} from '@/lib/api/psychometric/psychometricApi'

// Helper to map API category to icons
const getTestIcon = (category: string) => {
  const cat = category?.toLowerCase() || ''
  if (cat.includes('verbal'))
    return <Brain className="w-6 h-6 text-[#8200DB]" />
  if (cat.includes('numerical'))
    return <BarChart className="w-6 h-6 text-[#8200DB]" />
  if (cat.includes('abstract'))
    return <Lightbulb className="w-6 h-6 text-[#8200DB]" />
  if (cat.includes('situational') || cat.includes('sjt'))
    return <Users className="w-6 h-6 text-[#8200DB]" />
  return <Brain className="w-6 h-6 text-[#8200DB]" />
}

const PsychometricAssessment = () => {
  const router = useRouter()
  const { data: session } = useSession()
  // @ts-ignore
  const token = session?.accessToken || session?.user?.accessToken || ''

  // Queries
  const { data: testsData, isLoading: isLoadingTests } = useQuery({
    queryKey: ['psychometricTests'],
    queryFn: getAllPsychometricTests,
  })

  const { data: myAnswersData, isLoading: isLoadingMyAnswers } = useQuery({
    queryKey: ['myPsychometricAnswers', token],
    queryFn: () => getMyPsychometricAnswers(token),
    enabled: !!token,
  })

  // Merge Tests with User Attempts
  const dashboardTests = useMemo(() => {
    if (!testsData?.data) return []
    return testsData?.data?.map(test => {
      const attempt = myAnswersData?.data?.find(
        (a: UserAttempt) => a?.test?._id === test?._id,
      )
      const totalQuestions = test?.allQuestions?.length || 0
      const rawScore = attempt?.score || 0
      const percentageScore =
        totalQuestions > 0 ? Math.round((rawScore / totalQuestions) * 100) : 0

      return {
        ...test,
        status: attempt ? 'completed' : 'available',
        userScore: attempt ? percentageScore : null,
        icon: getTestIcon(test?.category),
        description: `Assess your ${test?.category} skills.`,
        duration: '15-20 min',
      }
    })
  }, [testsData, myAnswersData])

  const handleStartTest = (testId: string) => {
    if (testId) {
      router.push(`/dashboard/psychometric-test/${testId}`)
    }
  }

  if (isLoadingTests || isLoadingMyAnswers) {
    return <PsychometricAssessmentSkeleton />
  }

  const getStatusStyle = (status: string) => {
    const s = status?.toLowerCase()
    if (s === 'completed') {
      return 'bg-[#DCFCE7] text-[#016630] border border-[#7BF1A8]'
    } else if (s === 'available') {
      return 'bg-[#FEF9C2] text-[#894B00] border border-[#FFDF20]'
    }
    return 'bg-blue-100 text-blue-800'
  }

  const getStatusLabel = (status: string) => {
    const s = status?.toLowerCase()
    if (s === 'completed') return 'Completed'
    if (s === 'available') return 'Available'
    return status
  }

  return (
    <div className="min-h-screen bg-white py-4 md:py-8 font-poppins">
      <div className="container mx-auto px-2 md:px-3 space-y-12 pb-20">
        <header className="mt-10">
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E]">
              Psychometric Assessment
            </h1>
            <p className="text-base text-[#4A5565] font-normal">
              Discover your cognitive strengths and ideal career paths.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {dashboardTests?.map(test => (
            <div
              key={test?._id}
              className="bg-white rounded-[20px] border-[2px] border-[#E5E7EB] p-6 hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D4FF] p-3 rounded-[24px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                  {test?.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-[#1E1E1E] mb-1">
                    {test?.category}
                  </h3>
                  <p className="text-sm text-[#4A5565] line-clamp-2">
                    {test?.description}
                  </p>
                </div>

                <span
                  className={`flex items-center gap-2 text-xs font-medium px-2 py-[2px] rounded-full ${getStatusStyle(test.status)}`}
                >
                  {test?.status === 'completed' && (
                    <CircleCheckBig className="w-3 h-3" />
                  )}
                  {getStatusLabel(test.status)}
                </span>
              </div>

              {test?.status === 'completed' && test?.userScore !== null ? (
                <div className="mt-auto">
                  <div className="mb-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-[#4A5565]">
                        Your Score
                      </span>
                      <span className="text-lg font-bold text-[#1E1E1E]">
                        {test?.userScore}
                        <span className="text-[#9CA3AF] text-sm font-normal">
                          /100
                        </span>
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFFF00] rounded-full"
                        style={{ width: `${test?.userScore}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartTest(test?._id)}
                    className="w-full flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold py-2 bg-[#FFFF00] text-[#1E1E1E] hover:opacity-90"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 text-sm text-[#4A5565]">
                      <Clock size={16} />
                      {test?.duration}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => handleStartTest(test?._id)}
                      className="w-full flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold py-2 bg-[#FFFF00] text-[#1E1E1E] hover:opacity-90"
                    >
                      <Play className="w-4 h-4 ml-0.5 fill-current" /> Start
                      Test
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <section className="bg-gradient-to-br from-[#FAF5FF] to-[#FFFFFF] border-[2px] border-[#E9D4FF] rounded-[20px] p-4 md:p-8">
          <div className="flex items-start gap-3">
            <div className="bg-[#AD46FF] p-4 rounded-[20px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#1E1E1E] mb-2">
                Why Take Psychometric Tests?
              </h2>
              <ul className="space-y-2">
                {[
                  'Discover your natural cognitive strengths and abilities',
                  'Get personalised career recommendations based on your results',
                  'Stand out to employers with verified test scores on your profile',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CircleCheckBig className="w-5 h-5 text-[#9810FA] flex-shrink-0" />
                    <span className="text-sm md:text-base text-[#364153] font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PsychometricAssessment
