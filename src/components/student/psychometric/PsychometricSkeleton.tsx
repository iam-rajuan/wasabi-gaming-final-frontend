'use client'

import React from 'react'
import { Card } from './PsychometricUI'

const PsychometricSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50/30 p-4 md:p-8 font-poppins flex flex-col items-center">
      <div className="w-full max-w-[1116.5px]">
        {/* Header Skeleton */}
        <div className="mb-12 text-center space-y-2">
          <div className="h-9 bg-gray-200 rounded-lg w-3/5 mx-auto animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-2/5 mx-auto animate-pulse" />
        </div>

        {/* Card Skeleton */}
        <div className="relative">
          <Card
            className="shadow-xl bg-white overflow-hidden relative z-10 p-0"
            style={{
              borderWidth: '1.81px',
              borderColor: '#FFFF0033',
              borderRadius: '14.5px',
            }}
          >
            {/* Header Section */}
            <div
              className="flex justify-between items-center border-b border-gray-100"
              style={{ padding: '21.75px' }}
            >
              <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
            </div>

            {/* Question Section */}
            <div style={{ padding: '21.75px' }} className="space-y-6">
              {/* Question Text Skeleton */}
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-4/5 animate-pulse" />
              </div>

              {/* Options Skeleton */}
              <div className="space-y-3 mt-6">
                {[1, 2, 3, 4].map(idx => (
                  <div
                    key={idx}
                    className="h-14 bg-gray-100 rounded-xl border border-gray-200 animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <div
              className="flex justify-between items-center bg-white"
              style={{ padding: '0 21.75px 21.75px 21.75px' }}
            >
              {/* Previous Button Skeleton */}
              <div className="h-11 w-32 bg-gray-200 rounded-xl animate-pulse" />

              {/* Question Dots Skeleton */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(idx => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"
                  />
                ))}
              </div>

              {/* Next Button Skeleton */}
              <div className="h-11 w-32 bg-gray-200 rounded-xl animate-pulse" />
            </div>

            {/* Progress Bar Skeleton */}
            <div className="h-1.5 bg-gray-50 w-full">
              <div className="h-full bg-gray-200 w-1/4 animate-pulse" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PsychometricSkeleton
