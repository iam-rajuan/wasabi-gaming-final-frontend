"use client";
import { Brain, CircleCheckBig } from 'lucide-react'
import { AssessmentCard } from './_components/assessment-card'
import { AiAssessmentsApiResponse } from './_components/ai-assessment-data-type'
import { useQuery } from '@tanstack/react-query'
import { AssessmentGridLoader } from './_components/assessment-card-skeleton'
import { ErrorContainer } from './_components/ai-assessment-error-container'
import SubscriptionGuard from "@/components/shared/SubscriptionGuard";

export default function Home() {
  // ai assessment api integration
  const { data, isLoading, isError, refetch } =
    useQuery<AiAssessmentsApiResponse>({
      queryKey: ['ai-assessment-all'],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/aiassessment/?sortOrder=asc`,
        )

        if (!res.ok) {
          throw new Error('Failed to fetch invitations')
        }

        return res.json()
      },
    })

  console.log(data?.data)

  return (
    <SubscriptionGuard requireSubscription={true} requireLogin={true} requiredPlan="premium" message="This AI feature requires a Premium membership">
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="container mx-auto px-2 md:px-3 pt-12 lg:pt-16 pb-20">
            <div className="space-y-2 mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E]">
                Assessment Centre Suite
              </h1>
              <p className="text-base text-[#4A5565] font-normal">
                Discover your cognitive strengths and ideal career paths.
              </p>
            </div>

            {/* LOADER */}
            {isLoading && <AssessmentGridLoader />}

            {/* ERROR */}
            {isError && (
              <ErrorContainer
                message="Unable to load AI assessments. Please try again."
                onRetry={() => refetch()}
              />
            )}

            {/* DATA */}
            {!isLoading && !isError && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {data?.data?.map(assessment => (
                  <AssessmentCard key={assessment._id} data={assessment} />
                ))}
              </div>
            )}


            {/* Benefits Section */}
            <section className="bg-gradient-to-br from-[#FAF5FF] to-[#FFFFFF] border-[2px] border-[#E9D4FF] rounded-[20px] p-4 md:p-8">
              <div className="flex items-start gap-3">
                <div className="bg-[#AD46FF] p-4 rounded-[20px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-[#1E1E1E] mb-2">
                    Why Use Our Assessment Centre Suite?
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <CircleCheckBig className="w-5 h-5 text-[#9810FA] flex-shrink-0" />
                      <span className="text-sm md:text-base text-[#364153] font-normal">
                        Experience realistic law firm assessment tasks powered by
                        AI
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CircleCheckBig className="w-5 h-5 text-[#9810FA] flex-shrink-0" />
                      <span className="text-sm md:text-base text-[#364153] font-normal">
                        Strengthen your problem-solving, analysis, and
                        communication skills
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CircleCheckBig className="w-5 h-5 text-[#9810FA] flex-shrink-0" />
                      <span className="text-sm md:text-base text-[#364153] font-normal">
                        Stand out to employers with verified test scores on your
                        profile
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </section>
        </main>
      </div>
    </SubscriptionGuard>
  )
}
