import React from 'react'
import Image from 'next/image'
import PartnersMarquee from '../partnersMarqueeSection'

export const StoryBehind = () => {
  return (
    <section className="main-bg-color  pt-20 pb-16">
      <div className="max-w-[1153px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-[58px]">
          <h2
            className="text-xl md:text-2xl lg:text-[40px] font-bold text-[#131313] mb-3"
            style={{ fontFamily: "'Neuton', serif" }}
          >
            Story Behind The Aspiring Legal Network
          </h2>
          <p className="text-[#424242]  text-sm font-normal  md:text-xl">
            Meet Nathania Olajide, the CEO
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="max-w-[409px]  text-center lg:text-left">
            <h3
              className="text-2xl font-normal text-[#131313] mb-1"
              style={{ fontFamily: "'Neuton', serif" }}
            >
              Nathania Olajide
            </h3>
            <p className="text-[#929292] font-normal text-sm md:text-lg mb-6">
              Founder & CEO
            </p>

            <div className="space-y-1 md:space-y-3 text-[#424242] text-sm md:text-base  lg:leading-[44px]">
              <p>
                I founded the Aspiring Legal Network after seeing how confusing
                and inaccessible legal careers can feel for many young people,
                particularly those without existing networks or guidance.
              </p>
              <p>
                I wanted to create something that gave students clarity,
                confidence, and a genuine understanding of what a legal career
                involves before they are asked to make big decisions.
              </p>
              <p>
                Today, the Aspiring Legal Network works closely with students
                and schools to widen access to legal careers and support
                meaningful, long-term progression.
              </p>
            </div>
          </div>

          {/* Right Images (Overlapping) */}
          <div className="relative h-[420px] w-full">
            {/* Image 1 */}
            <div className="absolute top-0 left-0 w-[280px] h-[300px] rounded-2xl overflow-hidden shadow-lg bg-white">
              <Image
                src="/story-img1.png"
                alt="Story image 1"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Image 2 */}
            <div className="absolute bottom-0 right-0 w-[300px] h-[310px] rounded-2xl overflow-hidden shadow-lg bg-white">
              <Image
                src="/story-img2.png"
                alt="Story image 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="mt-16">
        {/* <div className="flex justify-center items-center"> */}
        <hr className="w-full max-w-[980px] border border-gray-400 mx-auto px-2" />
        {/* </div> */}
        <div className="flex items-center justify-center gap-3 mb-6 text-sm font-medium text-gray-800 py-8">
          <p className="text-[#131313] main-font text-sm md:text-xl font-normal">
            Trusted by leading organisations
          </p>
        </div>

        <PartnersMarquee />
      </div>
    </section>
  )
}
