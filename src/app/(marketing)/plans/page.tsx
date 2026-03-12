'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { createPaymentSession, getPlansByCategory, getPremiumById } from '@/lib/api/subscriptionApi'
import { getProfile } from '@/lib/api/profileApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function PlansPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [plans, setPlans] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  const currentInterval = isYearly ? 'yearly' : 'monthly'

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true)
        let fetchedPlans: any[] = []

        if (!session) {
          // Logged out: Fetch student plans
          const studentRes = await getPlansByCategory('students')
          fetchedPlans = studentRes.data || []

          // Add static Contact card for schools
          fetchedPlans.push({
            _id: 'contact-school',
            name: 'Schools Plan',
            description: 'Empower your students with The Aspiring Legal Network',
            price: 'Custom',
            subscriptionCategory: 'school',
            features: [
              'Everything included in the Premium plan',
              'School dashboard access',
              'Cohort management and analytics',
              'Student progress tracking',
              'School workshops and events',
              'Dedicated support'
            ],
            buttonText: 'Contact Us'
          })
        } else if (session.user?.role === 'student') {
          // Student: Fetch only student plans
          const studentRes = await getPlansByCategory('students')
          fetchedPlans = studentRes.data || []
        } else if (session.user?.role === 'school') {
          // School: Fetch user profile first to get the latest subscription ID
          const profileRes = await getProfile((session as any)?.accessToken || (session.user as any)?.accessToken)

          if (profileRes.success && profileRes.data?.data) {
            const userData = profileRes.data.data as any
            // The user pointed out subscription field in profile data
            const subId = userData.subscription || userData.subscribedSchool?._id

            if (subId) {
              const schoolPlanRes = await getPremiumById(subId)
              if (schoolPlanRes.success && schoolPlanRes.data) {
                fetchedPlans = [schoolPlanRes.data]
              }
            }
          }
        }

        setPlans(fetchedPlans)
      } catch (error) {
        console.error('Error fetching plans:', error)
        toast.error('Failed to load subscription plans')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlans()
  }, [session])

  // Filter plans based on the selected interval
  // Free plans (price 0) or Custom plans are shown in both
  const filteredPlans = plans.filter(plan => {
    if (plan.price === 0 || plan.price === 'Custom') return true
    return plan.type === currentInterval
  })

  // Handle Subscription
  const handleSubscribe = async (plan: any) => {
    if (plan.price === 'Custom') {
      router.push('/contact-us')
      return
    }

    if (!session) {
      router.push('/login')
      return
    }

    try {
      setProcessingPlanId(plan._id)
      const response = await createPaymentSession(plan._id)

      if (response.success && response.data?.url) {
        window.location.href = response.data.url
      } else {
        toast.error(response.message || 'Failed to initiate payment')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setProcessingPlanId(null)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-1 md:px-8 bg-gradient-to-b from-[#FEE64D] to-[#FFFFD4]">
      {/* Header */}
      <div className="text-center mb-12 space-y-4 container mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
          Unlock Your Legal Future With The Aspiring Legal Network
        </h1>
        <p className="text-lg text-gray-600">
          Smart tools and support for aspiring solicitors and apprentices
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center mt-8">
          <div className="bg-white rounded-[50px] border border-gray-200 flex items-center shadow-sm w-[360px] h-[50px] relative p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`flex-1 h-full rounded-[50px] text-sm font-semibold transition-all duration-200 z-10 ${!isYearly
                ? 'bg-transparent text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`flex-1 h-full rounded-[50px] text-sm font-semibold transition-all duration-200 z-10 ${isYearly
                ? 'bg-transparent text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              Yearly
            </button>

            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#f3db40] rounded-[50px] transition-transform duration-300 shadow-sm ${isYearly ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
                }`}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2 font-medium">
          Save 2 months when you buy a yearly membership
        </p>
      </div>

      {/* Content Area */}
      <div className="container mx-auto w-full min-h-[400px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-yellow-600" />
            <p className="text-gray-500 font-medium">Loading plans...</p>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">No plans found</h2>
            <p className="text-gray-500">We couldn't find any {currentInterval} plans at the moment.</p>
            <Button variant="outline" onClick={() => setIsYearly(!isYearly)}>
              Switch to {isYearly ? 'Monthly' : 'Yearly'}
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl items-start py-12">
            {filteredPlans.map((plan: any, index) => {
              const isSchool = plan.subscriptionCategory === 'school'
              const isHighlighted = plan.name === 'premium'

              const categoryLabel =
                plan.subscriptionCategory === 'students'
                  ? 'Student'
                  : plan.subscriptionCategory === 'school'
                    ? 'School'
                    : 'Student'

              const isProcessing = processingPlanId === plan._id

              return (
                <div
                  key={index}
                  className={`relative flex flex-col p-5 lg:p-7 rounded-2xl transition-all hover:-translate-y-1 duration-300 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[300px] max-w-[380px] ${isHighlighted
                    ? `bg-gradient-to-b from-[#FEE64D] to-[#FFFFD4] shadow-2xl z-10 border border-[#FEE64D] ${!session ? 'lg:scale-110 lg:z-20' : ''}`
                    : isSchool
                      ? 'bg-slate-50 border border-slate-200 shadow-xl'
                      : 'bg-white border border-gray-200 shadow-xl'
                    }`}
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                    <span
                      className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${isHighlighted
                        ? 'bg-black text-[#FEE64D] border border-[#FEE64D]'
                        : isSchool
                          ? 'bg-slate-800 text-white border border-slate-700'
                          : 'bg-[#FEE64D] text-black border border-white'
                        }`}
                    >
                      {categoryLabel}
                    </span>
                  </div>

                  {/* Plan Header */}
                  <div className="text-center mb-5 mt-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 capitalize">
                      {plan.name} Plan
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-extrabold text-gray-900">
                        {typeof plan.price === 'number' && plan.price === 0
                          ? 'Free'
                          : typeof plan.price === 'number'
                            ? `£${plan.price}`
                            : plan.price}
                      </span>
                      {typeof plan.price === 'number' && plan.price > 0 && (
                        <span className="text-gray-600 text-xs font-medium">
                          /{plan.type === 'yearly' ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 space-y-5">
                    <ul className="space-y-3">
                      {plan.features?.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-left">
                          <div
                            className={`mt-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center ${isHighlighted ? 'bg-green-700 text-[#FFFF00]' : 'bg-green-700 text-white'}`}
                          >
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span
                            className={`text-[13px] leading-tight ${isHighlighted ? 'text-gray-800 font-normal' : isSchool ? 'text-slate-700 font-normal' : 'text-gray-600'}`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className={`w-full rounded-full py-6 font-bold text-base mt-8 ${'bg-[#f3db40] text-black hover:bg-[#dfc836] border-2 border-[#f3db40]'}`}
                    onClick={() => handleSubscribe(plan)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.buttonText || (session?.user?.role === 'school' ? 'Upgrade Plan' : plan.price === 0 ? 'Get Started' : 'Upgrade Now')
                    )}
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
