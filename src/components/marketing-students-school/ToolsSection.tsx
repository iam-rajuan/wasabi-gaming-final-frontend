'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

const ToolsSection = () => {
  // 👉 API integration
  const { data: apiData, isLoading } = useQuery({
    queryKey: ['dynamic-websites', 'student'],
    queryFn: async () => {
      const res = await api.get('/dynamic-website?category=student')
      return res.data
    },
  })

  // Fallback data
  const fallbackButtons = [
    { name: 'Application Tracker', image: '/project1.png' },
    { name: 'Law Firm Profiles', image: '/law-firm-profiles1.png' },
    { name: 'Mock Interview', image: '/Mock-Interview1.png' },
    { name: 'Assessment Centre', image: '/assessment-centre1.png' },
    { name: 'Courses', image: '/courses1.png' },
    { name: 'Cover Letter Builder', image: '/cover-letter-builder1.png' },
    { name: 'CV Builder', image: '/cv-builder1.png' },
  ]

  // Map API data to buttons format safely
  const buttons = apiData?.length
    ? apiData.map((item: any) => ({
      name: item.title,
      image: item.image,
    }))
    : fallbackButtons

  // 👉 image state
  const [activeImage, setActiveImage] = useState(buttons[0].image)
  // 👉 active button state
  const [activeButton, setActiveButton] = useState(buttons[0].name)

  // Update state when data changes
  React.useEffect(() => {
    if (buttons.length > 0) {
      setActiveImage(buttons[0].image)
      setActiveButton(buttons[0].name)
    }
  }, [apiData])

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #FFEE35 0%, #FFFABF 100%)',
      }}
    >

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-12">
        <div className='text-center lg:text-left'>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full bg-white/90 text-[#9135EA] backdrop-blur"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Features
          </Button>

          <div className="mt-3 grid grid-cols-1 mb-14 lg:grid-cols-3 gap-4 lg:gap-12 items-center">
            {/* Left Side */}
            <div>
              <h1 className="text-3xl md:text-[40px] font-black text-gray-900 leading-tight">
                Everything You Need to
                <br />
                Launch Your Career
              </h1>
            </div>

            <div></div>

            {/* Right Side */}
            <div className="md:text-start space-y-8 max-w-md">
              <p className="text-lg text-gray-800 pb-4">
                The Aspiring Legal Network equips you with smart tools to build,
                prepare, and excel in your career.
              </p>

              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Pills */}
      <div className="relative z-10 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {buttons.map((btn: any) => (
              <Button
                key={btn.name}
                variant="secondary"
                className={`rounded-full px-6 py-3 transition-colors ${activeButton === btn.name
                  ? 'bg-gray-900 text-white hover:bg-gray-900'
                  : 'bg-[#E7E7E7] text-gray-900 hover:bg-[#dcdcdc]'
                  }`}
                onMouseEnter={() => {
                  setActiveImage(btn.image)
                  setActiveButton(btn.name)
                }}
              >
                {btn.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="flex overflow-hidden mt-10 items-center justify-center">
          <Image
            src={activeImage}
            alt="Tool Preview"
            width={900}
            height={900}
            quality={100}
            className="object-contain w-[1440px] rounded-lg transition-all duration-300"
          />
        </div>
      </div>
    </div>
  )
}

export default ToolsSection
