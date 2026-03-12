'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, CheckCircle2, FileText, Loader2 } from 'lucide-react'

interface CareAnalysisResult {
  _id: string
  aiassigmentId: {
    title: string
    discription: string
    type: string
    logo?: string
  }
  precedentSummary: string
  pretendCase: string
  applicant: {
    firstName: string
    lastName: string
    email: string
    profileImage?: string
  }
  caseLinking?: string
  legalIssue?: string
  summaryQuality?: string[] | string
  yourResponse?: string
  createdAt: string
  updatedAt: string
  completionRate?: number
  contentScore?: number
  grade?: string
  wordCount?: number
  typeSpreed?: number
}

interface CareAnalysisResponse {
  success: boolean
  message?: string
  data?: CareAnalysisResult
}

function clampPercent(value?: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0
  return Math.max(0, Math.min(100, value))
}

function gradeToPercent(grade?: string) {
  if (!grade) return 0
  const normalized = grade.trim().toUpperCase()
  const map: Record<string, number> = {
    A: 90,
    'A+': 95,
    'A-': 88,
    B: 80,
    'B+': 85,
    'B-': 78,
    C: 70,
    'C+': 75,
    'C-': 68,
    D: 60,
    E: 50,
    F: 40,
  }
  return map[normalized] ?? 0
}

export default function CaseStudyResultPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const token = session?.accessToken as string | undefined

  const assessmentId = params.id as string

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const { data, isLoading, isError, error } = useQuery<CareAnalysisResponse>({
    queryKey: ['careanalysis-result', assessmentId],
    enabled: Boolean(assessmentId && token),
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/careanalysis/${assessmentId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`)
      }

      return res.json()
    },
  })

  const caseData = data?.data
  const summaryItems = Array.isArray(caseData?.summaryQuality)
    ? caseData?.summaryQuality
    : caseData?.summaryQuality
    ? [caseData?.summaryQuality]
    : []

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-yellow-600" />
          <p className="mt-4 text-gray-600">Loading case analysis...</p>
        </div>
      </div>
    )
  }

  if (isError || !caseData || data?.success === false) {
    const message =
      (error as Error | undefined)?.message ||
      data?.message ||
      'Case not found'

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const {
    aiassigmentId,
    precedentSummary,
    pretendCase,
    yourResponse,
    legalIssue,
    caseLinking,
    applicant,
    completionRate,
    contentScore,
    grade,
    wordCount,
    typeSpreed,
  } = caseData

  const MAX_WORDS = 200
  const wordsCompletedPercent = clampPercent((wordCount ?? 0) / MAX_WORDS * 100)
  const overallGradePercent =
    typeof grade === 'string' ? gradeToPercent(grade) : 0

  const showResponse =
    yourResponse && yourResponse.trim() && yourResponse.trim().toLowerCase() !== 'dfasdf'

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E] flex items-center gap-2">
                Case Study Result 🎉
              </h1>
              <p className="text-[#4A5565] font-normal font-sm md:text-base">
                Great job! Here's how you performed in this case study session.
              </p>
            </div>
            <button
              onClick={() => router.push('/dashboard/ai-assessment-centre')}
              className="bg-[#FFFF00] rounded-[16px] px-4 py-2 border-[2px] border-[#131313] text-[#131313] font-bold hover:bg-muted transition-colors"
            >
              Case Study
            </button>
          </div>

          <div className="bg-[#18181B] rounded-[12px] p-6 flex items-start justify-between gap-4 border-l-4 border-[#FFFF00]">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                <FileText className="text-[#0A0A0A]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#FFFF00] mb-1">Assessment Subject</p>
                <h2 className="text-base font-medium text-white">
                  {aiassigmentId.title || 'Case Law Analysis'}
                </h2>
              </div>
            </div>

            <div className="bg-[#27272A] border border-[#3F3F46] rounded-[12px] py-2 px-4 text-right flex">
              <p className="text-xl md:text-2xl font-bold text-white">{contentScore ?? 0} </p>
              <sub className="text-sm text-white"> /100</sub>
            </div>
          </div>

          <div className="bg-white p-6 border border-[#F4F4F5] rounded-[12px]">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                <FileText className="text-[#0A0A0A]" />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-[#18181B] mb-[2px]">Written assessment</p>
                <h2 className="text-sm font-medium text-[#71717A]">
                  {aiassigmentId.type?.replace('_', ' ') || 'Case Study'}
                </h2>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#18181B]">Words Completed</span>
                  <span className="text-sm font-bold text-[#18181B]">{wordCount ?? 0}</span>
                </div>
                <div className="w-full bg-[#E4E4E7] rounded-full h-3">
                  <div
                    className="bg-[#EAB308] h-3 rounded-full transition-all"
                    style={{ width: `${wordsCompletedPercent}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#18181B]">Completion Rate</span>
                  <span className="text-sm font-bold text-[#18181B]">{completionRate ?? 0}</span>
                </div>
                <div className="w-full bg-[#E4E4E7] rounded-full h-3">
                  <div
                    className="bg-[#EAB308] h-3 rounded-full transition-all"
                    style={{ width: `${clampPercent(completionRate)}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#18181B]">Writing Speed</span>
                  <span className="text-sm font-bold text-[#18181B]">{typeSpreed ?? 0}</span>
                </div>
                <div className="w-full bg-[#E4E4E7] rounded-full h-3">
                  <div
                    className="bg-[#EAB308] h-3 rounded-full transition-all"
                    style={{ width: `${clampPercent(typeSpreed)}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#18181B]">Overall Grade</span>
                  <span className="text-sm font-bold text-[#18181B]">{grade || ''}</span>
                </div>
                <div className="w-full bg-[#E4E4E7] rounded-full h-3">
                  <div
                    className="bg-[#EAB308] h-3 rounded-full transition-all"
                    style={{ width: `${overallGradePercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-10 space-y-10">

            <section>
              <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#000000] pl-4">
                Precedent Summary
              </h2>
              <div className="prose max-w-none text-gray-800 leading-relaxed">
                {precedentSummary.split('\n').map((line, i) => (
                  <p key={i} className="mb-4 text-base text-[#374151] font-normal">
                    {line}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-4">
                Pretend / Fictional Case
              </h2>
              <div className="prose max-w-none text-gray-800 leading-relaxed">
                {pretendCase.split('\n').map((line, i) => (
                  <p key={i} className="mb-4 text-base text-[#374151] font-normal">
                    {line}
                  </p>
                ))}
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Response</h2>
              {showResponse ? (
                <div className="prose max-w-none text-gray-700">
                  {yourResponse?.split('\n').map((line, i) => (
                    <p key={i} className="mb-3">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No meaningful response submitted yet.</p>
              )}
            </section>

            {summaryItems.length > 0 && (
              <section className="bg-[#FEFCE8] p-6 rounded-xl border border-[#FACC15]">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-[#000000]" />
                  <h2 className="text-2xl font-bold text-[#000000]">
                    AI Feedback / Summary Quality
                  </h2>
                </div>
                <ul className="space-y-3">
                  {summaryItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[#374151] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(legalIssue || caseLinking) && (
              <section className="grid md:grid-cols-2 gap-6">
                {legalIssue && (
                  <div className="bg-white p-5 border border-gray-200 rounded-[12px] shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">Legal Issue</h3>
                    <p className="text-[#374151] text-base font-normal">{legalIssue}</p>
                  </div>
                )}
                {caseLinking && (
                  <div className="bg-white p-5 rounded-[12px] border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">Case Linking</h3>
                    <p className="text-[#374151] text-base font-normal">{caseLinking}</p>
                  </div>
                )}
              </section>
            )}

            <section className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Submitted by</h3>
              <div className="flex items-center gap-4">
                {applicant.profileImage && (
                  <img
                    src={applicant.profileImage}
                    alt={`${applicant.firstName} ${applicant.lastName}`}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                  />
                )}
                <div>
                  <p className="font-medium">
                    {applicant.firstName} {applicant.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{applicant.email}</p>
                </div>
              </div>
            </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
