import React from 'react'

const CourseDetailsSkeleton = () => {
    return (
        <div className="container mx-auto p-6 bg-white min-h-screen animate-pulse">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4 pb-4">
                <div className="h-8 w-32 bg-slate-200 rounded-full" />
                <div>
                    <div className="h-6 w-64 bg-slate-200 rounded mb-2" />
                    <div className="h-4 w-40 bg-slate-200 rounded" />
                </div>
            </div>

            {/* Progress Card */}
            <div className="mb-8 border-2 border-[#FFFF00] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-5 w-32 bg-slate-200 rounded" />
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Lessons */}
                <div className="space-y-4">
                    <div className="h-5 w-40 bg-slate-200 rounded mb-4" />

                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="p-4 rounded-xl border border-[#FFFF00] flex gap-3"
                        >
                            <div className="w-5 h-5 bg-slate-200 rounded-full mt-1" />
                            <div className="flex-1">
                                <div className="h-4 w-48 bg-slate-200 rounded mb-2" />
                                <div className="h-3 w-24 bg-slate-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Video + Details */}
                <div className="lg:col-span-2">
                    <div className="aspect-video bg-slate-200 rounded-xl border-2 border-[#FFFF00]" />

                    <div className="mt-4 p-6 border-2 border-[#FFFF00] rounded-xl">
                        <div className="h-6 w-64 bg-slate-200 rounded mb-3" />
                        <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    </div>
                </div>
            </div>

            {/* Quiz Card */}
            <div className="mt-8 border-2 border-[#FFFF00] rounded-xl p-8">
                <div className="flex gap-6">
                    <div className="h-16 w-16 bg-slate-200 rounded-xl" />
                    <div className="flex-1">
                        <div className="h-6 w-48 bg-slate-200 rounded mb-2" />
                        <div className="h-4 w-64 bg-slate-200 rounded mb-4" />

                        <div className="flex gap-4 mb-4">
                            <div className="h-4 w-20 bg-slate-200 rounded" />
                            <div className="h-4 w-20 bg-slate-200 rounded" />
                            <div className="h-4 w-24 bg-slate-200 rounded" />
                        </div>

                        <div className="h-10 w-32 bg-slate-200 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsSkeleton;
