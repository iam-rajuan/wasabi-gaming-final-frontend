import React from 'react'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Minutes = () => {
  return (
    <div
      className="bg-[#FFFFE6]"
      style={{
        backgroundImage: "url('/banner1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container flex flex-col items-center lg:justify-between lg:flex-row gap-10 lg:gap-20 py-12 lg:py-24">
        <div className="max-w-3xl text-center lg:text-left">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full bg-[#EBEBEB] mb-6 text-[#2B6BA1] backdrop-blur font-medium"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Set up in minutes
          </Button>
          <div className="bg-transparent">
            <h3 className="text-3xl md:text-5xl lg:text-[56px] leading-[1.2] font-bold mb-6 text-[#131313]">
              The Starting Point Of Your Career,{' '}
              <span className="text-[#E4E403]">Transforming Ambition</span> Into
              Real Opportunity
            </h3>
            <p className="text-base md:text-lg text-[#5A5A5A] leading-relaxed mb-8">
              Aspiring Legal Network is a careers and education platform for
              students of all ages. Through practical legal experiences,
              employer led sessions, and AI powered tools, students develop real
              insight, skills, and confidence to progress across work
              experience, apprenticeships, and university pathways, with
              progress tracked in one place.
            </p>
          </div>
          <div>
            <h3 className="text-[#131313] font-bold text-4xl md:text-5xl lg:text-[64px] mb-2">
              10K+
            </h3>
            <p className="text-sm md:text-base text-[#5A5A5A] font-medium">
              Students Using The Aspiring Legal Network
            </p>
          </div>
        </div>
        <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
          <Image
            src="/career.png"
            alt="How It Works"
            width={600}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default Minutes
