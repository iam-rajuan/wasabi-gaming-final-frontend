'use client'

import React from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import FAQSection from '@/components/home/student/FAQSection'
import { FAQSection as SchoolFAQSection } from '@/components/marketing-students-school/SchoolFAQSection'
import { useAppStore } from '@/store/useAppStore'
import { ActiveSection } from '@/constant/navConstant'
import { StudentFAQSection } from '@/components/marketing-students-school/StudentFAQSection'

const FAQPage = () => {
  const { activeSection } = useAppStore()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white  pt-16 pb-12">
        {activeSection === ActiveSection.Students ? (
          <div className="bg-[#FFFEF0] min-h-[50vh] flex items-center justify-center">
            <div className="w-full">
              <StudentFAQSection />
            </div>
          </div>
        ) : (
          <div className="min-h-[60vh] flex items-center justify-center bg-white">
            <div className="w-full">
              <SchoolFAQSection />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default FAQPage
