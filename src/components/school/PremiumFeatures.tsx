'use client'

import React, { useState } from 'react'
import {
  BarChart3,
  Bell,
  Users,
  Headphones,
  Zap,
  Cog,
  CheckCircle2,
} from 'lucide-react'
import { ICONS, IMAGES } from '@/assets'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import Image from 'next/image'

import Features from '../marketing-students-school/school/Features'

export function PremiumFeatures() {
  const [isYearly, setIsYearly] = useState(false)

  const premiumPrice = isYearly ? '£150' : '£15'
  const premiumPeriod = isYearly ? '/year' : '/month'

  const features = [
    {
      icon: BarChart3,
      title: 'Student Progress Tracking',
      description:
        'Monitor student performance across CV building, mock interviews, psychometric tests, and assessment centres with detailed analytics.',
    },
    {
      icon: Bell,
      title: 'Application Monitoring',
      description:
        'Track student applications to law firms and training contracts with real-time updates and milestone notifications.',
    },
    {
      icon: Users,
      title: 'Unlimited Student Management',
      description:
        'Manage unlimited students across your institution with no restrictions on cohort size or program types.',
    },
    {
      icon: Headphones,
      title: 'Priority Support',
      description:
        'Get dedicated support with faster response times and a dedicated account manager for your institution.',
    },
    {
      icon: Zap,
      title: 'Law Firm Insights',
      description:
        'Access comprehensive law firm profiles, application statistics, and career pathway recommendations for your students.',
    },
    {
      icon: Cog,
      title: 'Automated Communications',
      description:
        'Send bulk invitations, progress reports, and reminders to students with automated email workflows.',
    },
  ]

  return (
    <div className="w-full font-poppins ">
      {/* Header Section */}
      <section className="bg-[#FFFF00] py-10 md:py-14 lg:py-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-[#1E1E1E] rounded-[24px] flex items-center justify-center shadow-xl">
              <img
                src="/images/premium-icon.png"
                alt="icon"
                className="w-12 h-12"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#1E1E1E] mb-4">
            Premium Features
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-[#1E1E1ECC]/80 max-w-2xl mx-auto font-medium">
            Unlock powerful tools and insights to maximise student success and
            streamline your institutional workflow.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 md:py-12 lg:py-16 px-4 md:px-0 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#1E1E1E] mb-4">
              Everything You Need to Excel
            </h2>
            {/* <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6" /> */}
            <p className="text-[#666666] text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-normal">
              Premium features designed to help you track, support, and report
              on student careers more effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="border-[2px] border-[#E5E5E5] ring-1 ring-gray-100 rounded-[32px] hover:shadow-2xl hover:ring-yellow-400 transition-all duration-500 group overflow-hidden"
              >
                <CardContent className="p-8 flex flex-col items-start text-left">
                  <div className="size-16 bg-[#FFFF00] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center mb-8 group-hover:bg-yellow-400 transition-all duration-300 rounded-full">
                    <feature.icon className="size-8 text-[#1E1E1E]" />
                  </div>

                  <h3 className="text-lg md:text-xl font-normal text-[#1E1E1E] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#666666] font-normal text-sm md:text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Features />
      </section>

      {/* <section className="bg-gray-50/50 py-24 px-6 border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-4 tracking-tight">
                            Choose Your Plan
                        </h2>
                        <p className="text-gray-500 text-lg font-medium">
                            Flexible pricing to match your institution's specific needs.
                        </p>
                    </div>

                    <div className="flex justify-center mb-16">
                        <div className="bg-yellow-400 p-1.5 rounded-full inline-flex shadow-inner">
                            <button
                                onClick={() => setIsYearly(false)}
                                className={cn(
                                    "px-8 py-3 rounded-full text-sm font-bold transition-all",
                                    !isYearly ? "bg-white text-[#1E1E1E] shadow-md" : "text-[#1E1E1E]/60 hover:text-[#1E1E1E]"
                                )}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setIsYearly(true)}
                                className={cn(
                                    "px-8 py-3 rounded-full text-sm font-bold transition-all",
                                    isYearly ? "bg-white text-[#1E1E1E] shadow-md" : "text-[#1E1E1E]/60 hover:text-[#1E1E1E]"
                                )}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <Card className="rounded-[32px] border-2 border-gray-100 shadow-sm bg-white overflow-hidden order-2 lg:order-1">
                            <CardContent className="p-10 space-y-8">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-4">Free Plan</h3>
                                    <p className="text-gray-500 font-medium text-sm">Perfect for getting started.</p>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Community Access",
                                        "Access to Legal Opportunities",
                                        "Limited Firm Profiles",
                                        "Application Tracker",
                                        "CV Builder (1 use/24h)",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-bold">Standard Access</Button>
                            </CardContent>
                        </Card>

                        <Card className="rounded-[40px] border-4 border-yellow-400 shadow-2xl bg-white relative overflow-hidden order-1 lg:order-2 lg:scale-105 z-10">
                            <div className="absolute top-0 right-0 bg-yellow-400 text-[#1E1E1E] px-6 py-2 rounded-bl-3xl font-black text-xs uppercase tracking-tighter">Most Popular</div>
                            <CardContent className="p-10 space-y-8">
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-[#1E1E1E] mb-2 italic">Premium Plan</h3>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-5xl font-black text-[#1E1E1E]">{premiumPrice}</span>
                                        <span className="text-lg font-bold text-gray-400 uppercase">{premiumPeriod}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Unlimited AI CV Builder",
                                        "Full Law Firm Access",
                                        "Educational Video Courses",
                                        "Unlimited Mock Interviews",
                                        "Assessment Centre Suite",
                                        "Full Test Suite Access",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-base font-bold text-gray-800">
                                            <CheckCircle2 className="w-5 h-5 text-yellow-500" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full h-16 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-[#1E1E1E] font-black text-lg shadow-lg border-none mt-4">Upgrade Now</Button>
                            </CardContent>
                        </Card>

                        <Card className="rounded-[32px] border-2 border-gray-100 shadow-sm bg-white overflow-hidden order-3">
                            <CardContent className="p-10 space-y-8">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-4">Schools Plan</h3>
                                    <p className="text-gray-500 font-medium text-sm">Empower your entire cohort.</p>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Everything in Premium",
                                        "School Dashboard Access",
                                        "Cohort Analytics",
                                        "Progress Tracking",
                                        "Priority Human Support",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-bold">Contact For Demo</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section> */}

      {/* Advantage Section */}
      <section className="py-10 md:py-14 lg:py-20 bg-white px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-center text-[#1E1E1E] mb-4">
            The Premium Advantage
          </h2>
          <p className="text-[#666666] text-base md:text-lg lg:text-xl text-center font-normal mb-4">
            See how premium features deliver measurable results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="space-y-3 border-[2px] border-[#E5E5E5] bg-[#FFFEF0] rounded-[24px] p-6 md:p-8">
              <p className="text-[#CCCC00] text-3xl md:text-4xl lg:text-5xl font-normal ">
                3x
              </p>
              <h3 className="text-lg md:text-xl font-normal text-[#1E1E1E] ">
                Faster Student Tracking
              </h3>
              <p className="text-[#666666] font-normal text-sm">
                Automated workflows save hours every week
              </p>
            </div>
            <div className="space-y-3 border-[2px] border-[#E5E5E5] bg-[#FFFEF0] rounded-[24px] p-6 md:p-8">
              <p className="text-[#CCCC00] text-3xl md:text-4xl lg:text-5xl font-normal ">
                25%
              </p>
              <h3 className="text-lg md:text-xl font-normal text-[#1E1E1E] ">
                Automated workflows save hours every week
              </h3>
              <p className="text-[#666666] font-normal text-sm">
                AI matching improves student outcomes
              </p>
            </div>
            <div className="space-y-3 border-[2px] border-[#E5E5E5] bg-[#FFFEF0] rounded-[24px] p-6 md:p-8">
              <p className="text-[#CCCC00] text-3xl md:text-4xl lg:text-5xl font-normal ">
                10hrs
              </p>
              <h3 className="text-lg md:text-xl font-normal text-[#1E1E1E] ">
                Saved Per Week
              </h3>
              <p className="text-[#666666] font-normal text-sm">
                Automation reduces manual tasks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* gdst section  */}
      <section className="bg-[#FFFEF0] py-10 md:py-14 lg:py-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="">
              {/* <Image src="/images/gdst.png" alt="icon" width={120} height={120} className="w-16 h-16 object-cover" /> */}
              <Image
                src="/images/gdst.png"
                alt="icon"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1E1E1E] mb-4">
            "A HUGE thank you! The Aspiring Legal Network's energy and
            enthusiasm was truly inspirational to helping support and share
            advice with our current WHS students!"
          </h1>
          <p className="text-sm text-[#666666] text-center font-normal">
            Wimbledon High School
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FFFF00] py-10 md:py-14 lg:py-20 px-4 md:px-0">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-center text-[#1E1E1E] mb-4">
            Ready to Upgrade?
          </h2>
          <p className="text-[#1E1E1ECC]/80 text-base md:text-lg lg:text-xl text-center font-normal mb-4">
            Unlock all premium features and empower your students today.
          </p>
          <div className="h-[40px] w-full flex items-center justify-center pt-4">
            <a href="/plans">
              <button className="text-[#1E1E1E] text-sm font-semibold py-2 px-6 md:px-8 border-[2px] border-[#1E1E1E] bg-white rounded-[16px] hover:bg-gray-50 transition-colors">
                Purchase Premium Plan
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
