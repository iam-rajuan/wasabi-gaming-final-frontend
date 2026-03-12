'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const steps = [
  {
    number: 1,
    title: 'Create your profile',
    description:
      'Showcase your skills, experience, and achievements. Let others know what makes you unique.',
    icon: '/aln-icon1.png',
  },
  {
    number: 2,
    title: 'Build mock applications',
    description:
      'Create realistic applications for practice and testing. Turn ideas into functional mock solutions.',
    icon: '/aln-icon2.png',
  },
  {
    number: 3,
    title: 'Prepare for interviews',
    description:
      'Practice real interview questions and scenarios. Build confidence and ace your interviews.',
    icon: '/aln-icon3.png',
  },
  {
    number: 4,
    title: 'Connect to your career',
    description:
      'Align your skills with the right opportunities. Take the next step in your career journey.',
    icon: '/aln-icon4.png',
  },
]

const HowALNWorks = () => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-[#FFFEF0] py-16 relative overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-base md:text-lg font-semibold main-font text-gray-800 mb-5">
            Simple Steps
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: "'Neuton', serif" }}
          >
            How ALN Works
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-12 md:gap-20 items-center">
          {/* Left Side - Images */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative max-w-[600px] border shadow-md rounded-lg border-gray-200 ">
              {/* Main Image */}
              <div className=" w-full">
                <Image
                  src="/aln2.png"
                  alt="Woman presenting"
                  width={480}
                  height={650}
                  className="w-full h-auto rounded-3xl"
                  priority
                />
              </div>

              {/* Floating Card */}
              {/* <div className="absolute -bottom-8 lg:-right-16 -right-6  z-20 shadow-[0_8px_16px_0_#00000014] bg-white rounded-2xl p-4 lg:max-w-xs max-w-[240px]">
                <Image
                  src="/aln2.png"
                  alt="Application preview"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </div> */}

              {/* CTA Button */}
              {/* <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-30">
                <button className="bg-[#FFEE00] text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#FFD700] transition-all">
                  Sign Up
                </button>
              </div> */}
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-6 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-4 p-6 rounded-2xl transition-all duration-500 ${activeStep === index ? ' shadow-lg' : 'bg-transparent'
                  }`}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${activeStep === index
                    ? 'bg-green-500 shadow-lg'
                    : 'bg-gray-200'
                    }`}
                >
                  <Image
                    src={step.icon}
                    alt={`Step ${step.number}`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className={`text-xl font-bold mb-2 transition-colors duration-500 ${activeStep === index ? 'text-green-800' : 'text-gray-900'
                      }`}
                    style={{ fontFamily: "'Neuton', serif" }}
                  >
                    Step-{step.number}:{' '}
                    <span className="text-gray-700">{step.title}</span>
                  </h3>

                  <p
                    className={`text-sm leading-relaxed transition-colors duration-500 ${activeStep === index ? 'text-gray-800' : 'text-gray-700'
                      }`}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[52px] bottom-[-12px] w-0.5 h-12 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowALNWorks
