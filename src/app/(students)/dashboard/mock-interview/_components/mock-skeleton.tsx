import React from "react";

const MockSkeleton = () => {
  return (
    <div className="p-4 border-2 border-gray-300/50 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded animate-pulse" />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="w-1/2 h-6 bg-gray-300 rounded animate-pulse" />
            <div className="w-16 h-6 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="mt-1 space-y-1">
            <div className="h-4 bg-gray-300 rounded animate-pulse" />
            <div className="w-5/6 h-4 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
            <div className="w-20 h-4 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>

        <div className="mt-2">
          <div className="h-10 bg-gray-300 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default MockSkeleton;
