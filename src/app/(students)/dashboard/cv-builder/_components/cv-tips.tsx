import { CircleCheckBig, Sparkles } from 'lucide-react'
import React from 'react'

const CvTips = () => {
  return (
    <div className="p-4 border-2 bg-primary/5 border-primary rounded-xl">
      <h1 className="flex items-center gap-2">
        <Sparkles className="text-orange-500/50" />
        <span className="text-2xl font-bold">Resume Tips</span>
      </h1>

      <div className="mt-5">
        <h1 className="flex items-center gap-2">
          <span>
            <CircleCheckBig className="w-4 h-4 text-green-500" />
          </span>
          <span>
            Use action verbs to describe your achievements (e.g., "led,"
            "developed," "improved")
          </span>
        </h1>

        <h1 className="flex items-center gap-2 mt-2">
          <span>
            <CircleCheckBig className="w-4 h-4 text-green-500" />
          </span>
          <span>
            Quantify your accomplishments with numbers and percentages when
            possible
          </span>
        </h1>

        <h1 className="flex items-center gap-2 mt-2">
          <span>
            <CircleCheckBig className="w-4 h-4 text-green-500" />
          </span>
          <span>
            Tailor your resume to match the job description and requirements
          </span>
        </h1>
      </div>
    </div>
  )
}

export default CvTips
