'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { Brain, Sparkles, Zap, Cpu } from 'lucide-react'

const AILoader = () => {
  const [loadingText, setLoadingText] = useState(
    'Initialising AI Assessment...',
  )

  const loadingStates = [
    'Analysing cognitive patterns...',
    'Evaluating decision matrices...',
    'Synthesising performance metrics...',
    'Generating personalised insights...',
    'Finalising assessment report...',
  ]

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingStates.length
      setLoadingText(loadingStates[currentIndex])
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Abstract geometric background pulsing */}
        <div className="absolute inset-0 bg-purple-100 rounded-full animate-ping opacity-20 filter blur-xl"></div>
        <div className="absolute w-48 h-48 border-2 border-purple-200 rounded-full animate-[spin_8s_linear_infinite]"></div>
        <div className="absolute w-40 h-40 border border-[#FFFF00] rounded-full animate-[spin_4s_linear_infinite_reverse] opacity-60"></div>

        {/* Central AI Brain Node */}
        <div className="relative z-10 w-24 h-24 bg-white rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.2)] flex items-center justify-center border border-purple-100">
          <Brain className="w-12 h-12 text-[#AD46FF] animate-pulse" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFFF00] rounded-full animate-bounce shadow-md"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 animate-bounce delay-100">
          <Sparkles className="w-6 h-6 text-[#FFFF00]" />
        </div>
        <div className="absolute bottom-10 right-0 animate-pulse delay-300">
          <Zap className="w-5 h-5 text-purple-400" />
        </div>
        <div className="absolute top-10 left-0 animate-pulse delay-500">
          <Cpu className="w-5 h-5 text-purple-300" />
        </div>
      </div>

      <div className="mt-8 text-center space-y-3 relative z-10">
        <h3 className="text-xl font-bold text-gray-900 min-w-[300px] transition-all duration-300">
          {loadingText}
        </h3>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#AD46FF] rounded-full animate-bounce delay-0"></div>
          <div className="w-2 h-2 bg-[#AD46FF] rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-[#AD46FF] rounded-full animate-bounce delay-300"></div>
        </div>
        <p className="text-sm text-gray-500 font-medium tracking-wide">
          POWERED BY ASPIRING NETWORK AI
        </p>
      </div>
    </div>
  )
}

export default AILoader
