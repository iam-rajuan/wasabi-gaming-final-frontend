'use client'

import { CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

const tips = [
  'Use action verbs to describe your achievements (e.g., "led", "developed", "improved")',
  'Quantify your accomplishments with numbers and percentages when possible',
  'Tailor your cv to match the job description and requirements',
]

export function CoverLetterTips() {
  return (
    <Card className="border-2 border-yellow-200 bg-yellow-50 rounded-xl p-2 md:p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Cover Letter Tips
      </h3>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#00A63E] shrink-0 mt-0.5" />
            <p className="text-sm text-[#364153]">{tip}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
