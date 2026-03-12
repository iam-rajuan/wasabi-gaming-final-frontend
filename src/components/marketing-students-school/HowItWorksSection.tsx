import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

const HowItWorksSection = () => {
  return (
    <div className="bg-[#FFFFE6]" style={{
      backgroundImage: "url('/banner1.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

      <div className="container relative flex flex-col items-center justify-between lg:flex-row gap-10 lg:gap-8 min-h-[600px]">

        {/* Decorative Stars - Absolute positioning based on container */}
        <div className="absolute top-10 left-[40%] animate-pulse">
          <Image src="/star.png" alt="star" width={24} height={24} className="w-6 h-6 opacity-80" />
        </div>
        <div className="absolute bottom-10 left-[10%] animate-bounce duration-[3000ms]">
          <Image src="/star.png" alt="star" width={30} height={30} className="w-8 h-8 opacity-80" />
        </div>
        <div className="absolute top-1/2 right-[45%] hidden lg:block animate-pulse">
          <Image src="/star.png" alt="star" width={20} height={20} className="w-5 h-5 opacity-60" />
        </div>

        <div className="w-full lg:w-1/2 py-10 lg:py-20 z-10">
          <Button variant="secondary" size="sm" className="rounded-full bg-[#EBEBEB] mb-6 text-[#2B6BA1] backdrop-blur font-medium border border-white/50">
            <Sparkles className="mr-2 h-4 w-4" />
            Career Insight Tools
          </Button>
          <div className='bg-transparent relative'>
            <h3 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-bold mb-8 text-[#131313] tracking-tight">
              The Starting Point Of Your Career Set Up In Minutes, <br className="hidden lg:block" /> <span className='text-[#E4E403]'>Transforming Ambition</span> Into Real Opportunity
            </h3>
            <p className='text-base md:text-lg text-[#5A5A5A] leading-relaxed mb-10 max-w-xl'>
              Aspiring Legal Network is a careers and education platform for students of all ages. Through practical legal experiences, employer led sessions, and AI powered tools, students develop real insight, skills, and confidence.
            </p>
            {/* Simple Curved Arrow decoration could go here if we had the asset, approximating with layout for now */}
          </div>
          <Link href="/dashboard/cv-builder">
            <Button className="py-4 px-8 rounded-full bg-[#FFFF00] hover:bg-[#FFFF00]/80 text-[#131313] font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Create Your Resume
            </Button>
          </Link>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end py-10 relative z-10">
          {/* Image Container with Gradient Border Effect */}
          <div className="relative p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-[2rem] shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <Image
                src="/career.png"
                alt="How It Works"
                width={800}
                height={600}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HowItWorksSection