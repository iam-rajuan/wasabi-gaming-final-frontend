'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Download, PencilLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import jsPDF from 'jspdf'

type Applicant = {
  firstName: string
  lastName: string
  location: string
  phone: string
  email: string
}

type CoverLetter = {
  subject: string
  paragraphs: string[]
}

export type CoverData = {
  applicant: Applicant
  coverLetter: CoverLetter
}

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  data: CoverData | null
}

export default function CoverLetterModal({ open, onOpenChange, data }: Props) {
  const [isEditMode, setIsEditMode] = useState(false)

  const [subject, setSubject] = useState('')
  const [paragraphs, setParagraphs] = useState<string[]>([])

  // Load initial values when modal opens / data changes
  useEffect(() => {
    if (!data) return
    setSubject(data.coverLetter.subject || '')
    setParagraphs(data.coverLetter.paragraphs || [])
    setIsEditMode(false) // modal reopen হলে default preview
  }, [data, open])

  const fullName = useMemo(() => {
    if (!data) return ''
    return `${data.applicant.firstName} ${data.applicant.lastName}`
  }, [data])

  const handleParagraphChange = (index: number, value: string) => {
    setParagraphs(prev => prev.map((p, i) => (i === index ? value : p)))
  }

  const handleDownloadPDF = () => {
    if (!data) return

    const doc = new jsPDF({ unit: 'pt', format: 'letter' })

    const margin = 60
    let y = 80

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(fullName.toUpperCase(), margin, y)
    y += 22

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text(data.applicant.location, margin, y)
    y += 18
    doc.text(data.applicant.phone, margin, y)
    y += 18
    doc.text(data.applicant.email, margin, y)
    y += 35

    doc.text(
      new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      margin,
      y,
    )
    y += 35

    doc.setFont('helvetica', 'bold')
    doc.text((subject || '').toUpperCase(), margin, y)
    y += 35

    doc.setFont('helvetica', 'normal')
    doc.text('Dear Hiring Manager,', margin, y)
    y += 30

    doc.setFontSize(11)

    // Page break helper
    const ensureSpace = (neededHeight: number) => {
      const pageHeight = doc.internal.pageSize.getHeight()
      if (y + neededHeight > pageHeight - 80) {
        doc.addPage()
        y = 80
      }
    }

    paragraphs.forEach(para => {
      const clean = (para || '').trim()
      if (!clean) return

      const lines = doc.splitTextToSize(clean, 480)
      const blockHeight = lines.length * 16 + 12
      ensureSpace(blockHeight)

      doc.text(lines, margin, y)
      y += blockHeight
    })

    ensureSpace(90)
    y += 20
    doc.text('Sincerely,', margin, y)
    y += 30
    doc.text(fullName, margin, y)

    doc.save('Cover-Letter.pdf')
  }

  if (!data) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-6 md:p-8 overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Cover Letter</DialogTitle>
        </DialogHeader>

        <div className="bg-white p-10 my-6 border-[3px] border-gray-200 shadow-sm min-h-[680px] font-serif text-base leading-relaxed">
          <div className="mb-10 space-y-1">
            <p className="font-bold text-lg">{fullName}</p>
            <p>{data.applicant.location}</p>
            <p>
              {data.applicant.phone} • {data.applicant.email}
            </p>
          </div>

          <div className="mb-10">
            <p>
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>

          <div className="mb-10">
            <p className="font-bold uppercase tracking-wide">{subject}</p>
          </div>

          <div className="space-y-6">
            <p>Dear Hiring Manager,</p>

            {paragraphs
              .map(x => (x || '').trim())
              .filter(Boolean)
              .map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}

            <p>Sincerely,</p>
            <div className="mt-10">
              <p>{fullName}</p>
            </div>
          </div>
        </div>

        {/*  Edit panel shows only after clicking Edit */}
        {isEditMode && (
          <div className="border border-gray-200 rounded-xl p-4 md:p-5 mb-4">
            <h3 className="font-semibold text-lg mb-4">Edit Letter</h3>

            <div className="space-y-3">
              <label className="text-sm text-gray-600">Subject</label>
              <Input
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>

            <div className="mt-5 space-y-4">
              {paragraphs.map((p, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-sm font-medium">Paragraph {i + 1}</p>
                  <Textarea
                    value={p}
                    onChange={e => handleParagraphChange(i, e.target.value)}
                    className="min-h-28 border border-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditMode(v => !v)}
              className="gap-2"
            >
              <PencilLine className="h-4 w-4" />
              {isEditMode ? 'Hide Edit' : 'Edit'}
            </Button>

            <Button onClick={handleDownloadPDF} className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
