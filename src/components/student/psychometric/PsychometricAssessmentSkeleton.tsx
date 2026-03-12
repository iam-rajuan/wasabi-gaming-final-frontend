'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const PsychometricAssessmentSkeleton = () => {
    return (
        <div className="min-h-screen bg-white p-4 md:p-12 font-poppins">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="mb-14">
                    <Skeleton className="h-10 w-64 md:w-96 mb-2" />
                    <Skeleton className="h-5 w-48 md:w-64" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            className="bg-white rounded-3xl border border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-start gap-4">
                                    <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                </div>
                                <Skeleton className="h-7 w-24 rounded-full" />
                            </div>

                            <div className="space-y-6 mt-auto">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4 rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <Skeleton className="h-11 w-full rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-[20px] border-2 border-purple-100 bg-purple-50/50 p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <Skeleton className="w-16 h-16 rounded-2xl shrink-0" />
                        <div className="space-y-6 flex-1">
                            <Skeleton className="h-6 w-56" />
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Skeleton className="w-5 h-5 rounded-full shrink-0" />
                                        <Skeleton className="h-5 w-full max-w-md" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PsychometricAssessmentSkeleton
