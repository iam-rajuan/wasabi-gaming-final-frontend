'use client'

import React from 'react'
import {
  CheckCircle,
  ChevronRight,
  MessageCircle,
  FileText,
  Calendar,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { LuBrain } from 'react-icons/lu'
import { CiCircleCheck } from 'react-icons/ci'
import { FiAward } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

import iconImage from '@/assets/images/Icon.png'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/lib/api/profileApi'
import { useStudentDashboardStore } from '@/store/studentDashboardStore';
import { IUser } from '@/types/profile'
import RecommendedJobsModal from './application-tracker/_components/RecommendedJobsModal'

const recentActivity = [
  { icon: CheckCircle, text: 'Applied to TechCo Inc.', time: '2 hours ago' },
  {
    icon: FileText,
    text: 'Completed Resume Reviewing Tool',
    time: '1 day ago',
  },
  { icon: Calendar, text: 'Updated Resume', time: '3 days ago' },
]

export default function CareerDashboard() {
  const router = useRouter()
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false)

  const { data: session } = useSession()
  // @ts-ignore
  const token = session?.accessToken || session?.user?.accessToken || ''

  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ['profile', token],
    queryFn: () => getProfile(token),
    enabled: !!token,
  })

  // @ts-ignore
  const userData: IUser = profileResponse?.data?.data || {}
  const jobs = userData?.applicationJob || []

  /*
  // Calculate CV Completion (Deprecated - using store)
  const calculateCVCompletion = () => {
    let completed = 0
    let total = 4 // Basic Info, Education, Experience, Skills

    if (userData.firstName && userData.email && userData.phone) completed++
    if (userData.education && userData.education.length > 0) completed++
    if (userData.experience && userData.experience.length > 0) completed++
    if (userData.skills && userData.skills.length > 0) completed++

    return Math.round((completed / total) * 100)
  }

  const cvCompletion = calculateCVCompletion()
  */
  const { cvCompletionPercentage } = useStudentDashboardStore();
  const cvCompletion = cvCompletionPercentage;
  const applicationsSent = jobs.length
  // Calculate Interview Rate based on "Interview" status count vs total applications
  const interviewsScheduled = jobs.filter(
    job => job.status === 'Interview',
  ).length
  const interviewRate =
    applicationsSent > 0
      ? Math.round((interviewsScheduled / applicationsSent) * 100)
      : 0

  // Determine Profile Strength based on CV completion
  const getProfileStrength = (completion: number) => {
    if (completion >= 75) return 'Excellent'
    if (completion >= 50) return 'Good'
    if (completion >= 25) return 'Fair'
    return 'Needs Work'
  }

  const profileStrength = getProfileStrength(cvCompletion)

  const stats = [
    {
      id: 1,
      title: 'CV Completion',
      value: `${cvCompletion}%`,
      width: `${cvCompletion}%`,
    },
    {
      id: 2,
      title: 'Applications Sent',
      value: applicationsSent.toString(),
      width: `${Math.min(applicationsSent * 5, 100)}%`, // Example scaling
    },
    {
      id: 3,
      title: 'Interview Rate', // Changed from rate to count if desired, but user asked for "percentage like image"?? Waittt...
      // User said: "image er mto kore interview percantange ber kore dw" -> Calculate interview percentage like image.
      // But image shows "Interviews Scheduled: 3".
      // Current card title is "Interview Rate" and value is percentage.
      // I will keep percentage for now as "Rate" implies %.
      // If user meant "Interviews Scheduled" and "Count", I should change title and value logic.
      // But preserving existing design (progress bars) usually means %, so rate fits better.
      // I will add a comment if needed.
      value: `${interviewRate}%`,
      width: `${interviewRate}%`,
    },
    // Adding Profile Strength as 4th card logic but grid only shows slice(0,3) in original code.
    // I will show top 3.
  ]

  const quickActions = [
    {
      id: 1,
      title: 'Build Your CV',
      subtitle: `${cvCompletion}% Complete`,
      icon: <FileText className="w-5 h-5 text-black" />,
      bg: 'bg-[#FEF9C2]',
      hoverBg: 'hover:bg-yellow-100',
      iconHoverBg: 'group-hover:bg-yellow-300',
      link: '/dashboard/cv-builder',
    },
    {
      id: 2,
      title: 'Take Psychometric Test',
      subtitle: 'Discover your strengths',
      icon: <LuBrain className="w-5 h-5 text-[#9810FA]" />,
      bg: 'bg-purple-200',
      hoverBg: 'hover:bg-purple-100',
      iconHoverBg: 'group-hover:bg-purple-300',
      link: '/dashboard/psychometric-test',
    },
    {
      id: 3,
      title: 'Track Applications',
      subtitle: `${applicationsSent} active applications`,
      icon: <MessageCircle className="w-5 h-5 text-[#155DFC]" />,
      bg: 'bg-blue-200 border border-[#0000001A]',
      hoverBg: 'hover:bg-blue-100',
      iconHoverBg: 'group-hover:bg-blue-300',
      link: '/dashboard/application-tracker',
    },
  ]

  const handleNavigate = (link: string) => {
    if (link) router.push(link)
  }

  return (
    <div className="min-h-screen container mx-auto px-1 py-4 md:p-4 bg-transparent">
      {/* Hero Banner */}
      <div
        className="relative p-4 mb-8 overflow-hidden rounded-3xl md:p-12"
        style={{
          background: 'linear-gradient(135deg, #FFFF00 0%, #E6E600 100%)',
        }}
      >
        <div className="flex items-start gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-gray-800" />
          <span className="text-base font-semibold text-gray-800">
            Welcome back!
          </span>
        </div>

        <h1 className="mb-3 text-3xl font-bold main-color md:text-5xl inter">
          Ready to Advance Your
          <br />
          Career?
        </h1>

        <p className=" mb-6 text-2xl text-[#525252] ">
          Track your progress, build your resume, and discover opportunities
          tailored to your insights.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => router.push('/dashboard/cv-builder')}
            className="bg-white main-color px-6 py-2.5 rounded-full text-base flex items-center gap-2 hover:bg-gray-100 transition-colors inter"
          >
            <FileText className="w-5 h-5 text-black" />
            Complete Your Resume
          </button>
          <button
            onClick={() => router.push('/dashboard/application-tracker')}
            className="bg-transparent border-[2px] border-gray-800 text-gray-900 px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-900 hover:text-white transition-colors main-color inter"
          >
            View Applications
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-1 mx-auto md:px-6">
        {/* Progress Cards */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
          {stats.map(item => (
            <div
              key={item.id}
              // onClick={() => handleNavigate(item.link || "")} // No link in original data for stats
              className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base text-gray-600 inter ">{item.title}</h3>

                {/*  Same icon image for all */}
                <div className="p-2 ">
                  <Image src={iconImage} alt="icon" className="w-5 h-5" />
                </div>
              </div>

              <div className="mb-2 text-3xl font-bold text-gray-900">
                {item.value}
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 transition-all duration-500 rounded-full yellow"
                  style={{ width: item.width }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full neuton">
          {/* Quick Actions */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <h2 className="mb-6 text-xl font-bold main-color">Quick Actions</h2>

            <div className="space-y-3">
              {quickActions.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.link)}
                  className={`flex items-center justify-between w-full p-4 transition-colors border border-[#0000001A]  rounded-xl group ${item.hoverBg}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 transition-colors rounded-lg ${item.bg} ${item.iconHoverBg}`}
                    >
                      {item.icon}
                    </div>

                    <h1 className="flex flex-col items-start text-lg font-semibold main-color">
                      {item.title}
                      {item.subtitle && (
                        <span className="text-[#4A5565] font-normal text-base">
                          {item.subtitle}
                        </span>
                      )}
                    </h1>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Career Strengths Section */}
        <div className="p-4 md:p-6 mt-6 bg-[#EFF6FF] shadow-sm border border-[#BEDBFF]  rounded-2xl">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full">
              <FiAward className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold main-color inter">
                Your Career Strength
              </h3>
              <p className="mb-4 text-base text-[#4A5565]">
                Based on your answers/personality/interests you would at
                analysing/thinking and problem solving. We believe it has job
                opportunities that match your strength.
              </p>
              <Button
                onClick={() => setIsRecommendModalOpen(true)}
                className="px-6 py-2.5 rounded-full font-normal text-base transition-all duration-300 hover:scale-105 active:scale-95 main-color"
                style={{ backgroundColor: '#FFFF00' }}
              >
                View Recommended Jobs
              </Button>
            </div>
          </div>
        </div>

        {/* Success Quote */}
        <div className="max-w-5xl p-4 md:p-8 mx-auto mt-12 text-center border border-[#FFFF00] bg-yellow-100/20 rounded-3xl inter">
          <p className="max-w-3xl mx-auto text-lg italic text-[#1E1E1E]">
            “Success is the sum of small efforts repeated day in and day out.”
          </p>
        </div>
      </div>

      <RecommendedJobsModal
        open={isRecommendModalOpen}
        onOpenChange={setIsRecommendModalOpen}
      />
    </div>
  )
}
