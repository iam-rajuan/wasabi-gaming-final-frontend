'use client'

import { useState } from 'react'
import { Download, Copy, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface CoverLetterFormProps {
  letter: string
  onBack: () => void
}

export function CoverLetterForm({ letter, onBack }: CoverLetterFormProps) {
  const [editedLetter, setEditedLetter] = useState(letter)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedLetter)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([editedLetter], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'cover-letter.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Your Cover Letter
        </h2>
      </div>

      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="space-y-4 mb-6">
          <Textarea
            value={editedLetter}
            onChange={(e) => setEditedLetter(e.target.value)}
            className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 p-4 min-h-96 resize-none font-mono text-sm"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1 gap-2 bg-transparent"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              onClick={handleDownload}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      </Card>

      {/* Preview */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        <div className="bg-gray-50 rounded-lg p-6 md:p-8 text-gray-900 whitespace-pre-wrap font-serif leading-relaxed text-sm md:text-base">
          {editedLetter}
        </div>
      </Card>
    </div>
  )
}
