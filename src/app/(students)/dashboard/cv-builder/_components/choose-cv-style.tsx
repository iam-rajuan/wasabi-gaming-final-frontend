import { PocketKnife, CheckCircle2 } from 'lucide-react'
import React from 'react'

interface Props {
  cvFormat: string
  setCvFormat: (value: string) => void
}

const ChooseCvStyle = ({ cvFormat, setCvFormat }: Props) => {
  return (
    <div className="p-4 border border-gray-200 rounded-xl">
      <div className="items-center justify-between lg:flex">
        <div>
          <h1 className="text-lg font-bold">Choose Your Style</h1>
          <p className="text-gray-600">
            Select a resume template that matches your personality.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-gradient-to-r from-[#9313fa] via-[#7326fb] to-[#424efc] text-white px-5 py-3 rounded-3xl mt-4 lg:mt-0">
          <PocketKnife className="w-4 h-4" /> AI Enhance CV
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 mt-5 lg:grid-cols-3">
        {/* Modern Style */}
        <div
          onClick={() => setCvFormat('Modern')}
          className={`p-4 h-[500px] rounded-xl cursor-pointer transition-all flex flex-col relative ${
            cvFormat === 'Modern'
              ? 'border-2 border-yellow-400 shadow-md scale-[1.01]'
              : 'border border-gray-200 hover:border-gray-300 shadow-sm'
          }`}
        >
          {cvFormat === 'Modern' && (
            <CheckCircle2 className="absolute z-10 w-5 h-5 text-yellow-500 top-2 right-2 fill-white" />
          )}
          <div className="h-[420px] bg-[#fffdf5] border-b relative overflow-hidden p-4 rounded-t-lg">
            <div className="w-3/4 h-3 mb-2 bg-yellow-400" />
            <div className="w-1/2 h-1 mb-1 bg-gray-300" />
            <div className="w-full h-1 mb-1 bg-gray-200" />
            <div className="w-4/5 h-1 mb-8 bg-gray-200" />
            <div className="absolute h-2 bg-yellow-400 bottom-4 left-4 right-4" />
          </div>
          <div className="pt-2">
            <h1 className="font-bold">Modern</h1>
            <p className="text-sm text-gray-500">Clean and contemporary</p>
          </div>
        </div>

        {/* Classic Style */}
        <div
          onClick={() => setCvFormat('Classic')}
          className={`p-4 h-[500px] rounded-xl cursor-pointer transition-all flex flex-col relative ${
            cvFormat === 'Classic'
              ? 'border-2 border-primary shadow-md scale-[1.01]'
              : 'border border-gray-200 hover:border-gray-300 shadow-sm'
          }`}
        >
          {cvFormat === 'Classic' && (
            <CheckCircle2 className="absolute z-10 w-5 h-5 text-primary top-2 right-2 fill-white" />
          )}
          <div className="h-[420px] bg-white border-b relative p-6 flex flex-col items-center">
            <div className="w-40 h-4 bg-[#1a2b3c] mb-2" />
            <div className="w-24 h-1 mb-6 bg-gray-300" />
            <div className="w-full h-[1px] bg-gray-200 mb-1" />
            <div className="w-full h-[1px] bg-gray-200 mb-1" />
            <div className="w-full h-[1px] bg-gray-200 mb-1" />
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#1a2b3c]" />
          </div>
          <div className="pt-2">
            <h1 className="font-bold">Classic</h1>
            <p className="text-sm text-gray-500">
              Traditional and professional
            </p>
          </div>
        </div>

        {/* Creative Style */}
        <div
          onClick={() => setCvFormat('Creative')}
          className={`p-4 h-[500px] rounded-xl cursor-pointer transition-all flex flex-col relative ${
            cvFormat === 'Creative'
              ? 'border-2 border-primary shadow-md scale-[1.01]'
              : 'border border-gray-200 hover:border-gray-300 shadow-sm'
          }`}
        >
          {cvFormat === 'Creative' && (
            <CheckCircle2 className="absolute z-10 w-5 h-5 text-primary top-2 right-2 fill-white" />
          )}
          <div className="h-[420px] bg-white border-b relative flex overflow-hidden rounded-t-lg">
            <div className="w-[30%] bg-[#1a1a1a] h-full p-4 flex flex-col items-center">
              <div className="w-8 h-8 mb-4 bg-yellow-400 rounded-full" />
              <div className="w-full h-[1.5px] bg-gray-600 mb-1" />
              <div className="w-full h-[1.5px] bg-gray-600" />
            </div>
            <div className="w-[70%] p-4">
              <div className="w-3/4 h-2 mb-1 bg-yellow-400" />
              <div className="w-1/2 h-1.5 bg-gray-200 mb-4" />
              <div className="space-y-1">
                <div className="w-full h-[1px] bg-gray-100" />
                <div className="w-full h-[1px] bg-gray-100" />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <h1 className="font-bold">Creative</h1>
            <p className="text-sm text-gray-500">Bold and distinctive</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseCvStyle
