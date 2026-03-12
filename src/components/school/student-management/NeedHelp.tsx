'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BookOpen, Headphones } from 'lucide-react'
import Link from 'next/link'

export default function NeedHelpSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-[#FFFF00] py-20  px-6 rounded-b-3xl text-center space-y-6 font-poppins relative overflow-hidden shadow-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-black/5" />

      <h3 className="text-3xl md:text-5xl font-normal text-[#1E1E1E] max-w-2xl mx-auto ">
        Need help managing students?
      </h3>
      <p className="text-black/70 md:text-xl font-medium max-w-xl mx-auto">
        Our team is here to support you with onboarding, training, and best
        practices for a seamless educational experience.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 pt-4">
        <Link href={'/contact-us'}>
          <Button className="bg-black hover:bg-black/90 text-yellow-400 px-10 h-14 rounded-full font-bold transition-all shadow-lg text-lg flex items-center gap-3">
            <Headphones className="w-5 h-5" />
            Contact Support
          </Button>
        </Link>
        <Button
          variant="outline"
          className="border-2 border-black bg-transparent text-black px-12 h-14 rounded-full font-bold hover:bg-black hover:text-white transition-all text-lg flex items-center gap-3"
          onClick={() => setIsModalOpen(true)}
        >
          <BookOpen className="w-5 h-5" />
          View Guide
        </Button>
      </div>

      {/* Modal for displaying the guide */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl w-full max-h-[85vh] overflow-y-auto font-poppins p-8 rounded-3xl bg-white">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-bold text-center">
              Website Guide (Instruction Manual)
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-10 text-left">
            {/* 1. Website Overview */}
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  1
                </span>
                Website Overview
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                The AI-driven career development platform is designed to empower
                students and schools with tools that enhance employability and
                professional growth through the use of advanced, AI-integrated
                solutions. The platform includes an AI CV Builder, Cover Letter
                Generator, Psychometric and Skill Assessments, Mock Interview
                Practice, AI Feedback, and a School Admin Dashboard for
                monitoring and management. It leverages OpenAI’s API to provide
                intelligent feedback and content generation. The system will be
                developed in four distinct phases: Design, Frontend Development,
                Backend Development, and a four-month Maintenance and
                Optimisation period. The monetisation model is
                subscription-based, primarily targeting schools.
              </p>
            </section>

            {/* 2. Website Purpose */}
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  2
                </span>
                Website Purpose
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                The purpose of this project is to provide a comprehensive
                AI-based career preparation platform that supports both students
                and educational institutions. Students gain access to
                personalised tools that help them build strong career profiles,
                while schools can efficiently manage and evaluate student
                progress in career readiness programmes. By combining AI
                personalisation, data analytics, and centralised management
                tools, the platform bridges the gap between education and
                employability.
              </p>
            </section>

            {/* 3. Target Users */}
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  3
                </span>
                Target Users
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                The platform caters primarily to two types of users — Students
                and School Administrators. Students can build their CVs,
                generate cover letters, and participate in psychometric tests
                and mock interviews to improve their employability. School
                administrators can manage student access, monitor progress, and
                use advanced analytics to assess readiness.
              </p>
            </section>

            {/* 4. Website Structure */}
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  4
                </span>
                Website Structure
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                The structure includes a Home Page, Features Page (CV Builder,
                Cover Letter, Assessments, Mock Interviews), and a For Schools
                Page. Students and administrators each have access to their own
                portals. The About Page outlines the mission, while the Contact
                Page includes support and FAQs.
              </p>
            </section>

            {/* 5. Functionality Guide */}
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  5
                </span>
                Functionality Guide
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Students can use AI tools for resumes, cover letters, and
                interviews with automated feedback. School administrators can
                approve registrations, monitor results, assign tasks, and access
                detailed reports. The system is fully responsive, supports
                secure authentication, and allows downloading resumes in PDF or
                DOCX formats.
              </p>
            </section>

            {/* 6. Content Writing Guidelines */}
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  6
                </span>
                Content Writing Guidelines
              </h3>
              <p className="text-gray-600 leading-relaxed text-base italic">
                "Build your professional future with tools that think ahead. From
                AI-powered resumes to realistic mock interviews — we help you
                shine."
              </p>
              <p className="text-gray-600 leading-relaxed text-base mt-2">
                The platform’s tone is professional yet encouraging, confident,
                and action-orientated. Copy should be concise and focus on
                outcomes using active voice.
              </p>
            </section>

            {/* 7. User Flow Summary */}
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  7
                </span>
                User Flow Summary
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Students log in, choose tools from their dashboard, save
                progress, and download results. Administrators log in to manage
                student data, track reports, assign tasks, and manage
                subscriptions.
              </p>
            </section>

            {/* 8. Future Scalability */}
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  8
                </span>
                Future Scalability
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                The platform is built for growth, with future plans for a
                Learning Portal, Job Board, AI Career Advisor Chatbot, and a
                Student Leaderboard and Ranking System.
              </p>
            </section>

            {/* 9. Deliverables */}
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  9
                </span>
                Design & Development Deliverables
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Complete set of Figma wireframes, component library, style
                guides, functional specifications, and detailed API/User flow
                diagrams. Including a colour and typography style guide.
              </p>
            </section>

            {/* Summary Section */}
            <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-200">
              <h4 className="text-lg font-bold text-yellow-900 mb-2 text-center">
                Summary
              </h4>
              <p className="text-yellow-800 text-sm leading-relaxed">
                This guide ensures a unified direction in building the
                AI-powered career development platform, creating an intuitive,
                user-friendly, and data-driven system for students and
                institutions.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
