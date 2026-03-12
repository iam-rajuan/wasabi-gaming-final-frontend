import React from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Assembly = () => {
  return (
    <div
      className="bg-[#FBFDFF]"
      style={{
        backgroundImage: "url('/banner2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container lg:py-20 pb-12 flex flex-col items-center lg:gap-24 lg:flex-row ">
        <div className="py-16 ">
          <Image
            src="/career.jpg"
            alt="How It Works"
            width={1200}
            height={600}
            className="w-full  rounded-xl"
            priority
          />
        </div>

        <div className="lg:py-16 max-w-4xl text-center lg:text-left">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full bg-[#EBEBEB] text-[#2B6BA1] backdrop-blur"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Book an Assembly
          </Button>
          <div className="mt-2">
            <h3 className="text-2xl sm:text-[52px] leading-10 lg:leading-[60px]  font-bold mb-4">
              {' '}
              <span className="text-[#E4E403]">Career Assemblies</span>, Built
              For Your School
            </h3>
            <p className="max-w-2xl text-[#5A5A5A]">
              Every package includes structured careers assemblies designed
              around your school’s needs. Sessions give students realistic
              insight into legal careers, the pathways available, and the skills
              required to progress, with content adapted by age group, cohort,
              and school priorities. <br /> <br /> Assemblies can be delivered
              as stand alone sessions or as part of a wider programme.
            </p>
          </div>
          <Link href="/contact-us">
            <Button className="py-3 px-12 mt-6 rounded-full bg-[#FFFF00] text-[#282828] hover:bg-[#E4E403] font-bold shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Assembly
