'use client'

import React, { useState } from 'react'
import { SquareMenu, Upload } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { CoverLetterTips } from './CoverLetterTips'
import CoverLetterModal, { type CoverData } from './CoverLetterModal'
import { useSession } from 'next-auth/react'
import AILoader from '@/components/student/psychometric/AILoader'

export function CoverLetterBuilder() {
  const [jobDescription, setJobDescription] = useState('')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [coverData, setCoverData] = useState<CoverData | null>(null)

  const { data: session } = useSession()
  const token = session?.accessToken || ''
  const image = session?.user?.image || ''

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setCvFile(file)
  }

  const handleGenerateLetter = async () => {
    if (!jobDescription || !cvFile) {
      toast.error('Please enter job description and upload your CV')
      return
    }

    if (!token) {
      toast.error('You must be logged in to generate a cover letter')
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('jobDescription', jobDescription)
      formData.append('uploadCv', cvFile)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cover-letter/`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (response.ok && data.success && data.data?.savedData) {
        setCoverData(data.data.savedData as CoverData)
        setModalOpen(true)
      } else {
        if (data.message !== 'Subscription plan error') {
          toast.error(data.message || 'Failed to generate cover letter')
        }
      }
    } catch (error) {
      console.error('Error generating cover letter:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartOver = () => {
    setCvFile(null)
    setJobDescription('')
    setCoverData(null)
  }

  return (
    <>
      {isLoading && <AILoader />}

      <div className="mb-12">
        <h1 className="text-2xl md:text-[36px] font-semibold text-[#1E1E1E] mb-3 text-balance">
          Cover letter Builder
        </h1>
        <p className="text-base text-[#4A5565] font-normal">
          Create a professional cover letter that stands out to employers.
        </p>
      </div>

      <Card className=" lg:max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 mb-8 px-2 py-6 md:p-8">
        <div className="flex items-start gap-3 mb-8">
          <div className="bg-[#FFFF00] !h-[70px] !w-[70px] rounded-[24px] flex items-center justify-center shrink-0">
            <SquareMenu className="!w-7 !h-7 text-[#000000]" />
          </div>
          <div>
            <h2 className="text-xl md:text-[24px] font-semibold text-[#1E1E1E]">
              Build Your Cover Letter
            </h2>
            <p className="text-sm text-[#4A5565] mt-2">
              Upload your CV and job description details.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-base font-normal text-[#364153]">
              Upload your job description
            </label>
            <Textarea
              placeholder="Input your job description here..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              className="w-full rounded-[24px] bg-[#F3F3F5] border-0 text-gray-900 placeholder:text-gray-500 p-4 text-base min-h-32 resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-base font-normal text-[#364153]">
              Upload CV
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleCvUpload}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="flex items-center gap-3 w-full rounded-[24px] bg-[#F3F3F5] border-2 border-dashed border-gray-300 p-4 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  {cvFile ? cvFile.name : 'Upload your CV'}
                </span>
              </label>
            </div>
          </div>

          <Button
            onClick={handleGenerateLetter}
            disabled={isLoading || !jobDescription || !cvFile}
            className="px-6 bg-[#FFFF00] hover:bg-[#FFFF00]/90  text-[#1E1E1E] font-semibold rounded-[24px] text-base h-12 transition-colors"
          >
            {isLoading ? 'Generating...' : 'Build cover letter with AI'}
          </Button>
        </div>
      </Card>

      <CoverLetterTips />

      <CoverLetterModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        data={coverData}
      />
    </>
  )
}

