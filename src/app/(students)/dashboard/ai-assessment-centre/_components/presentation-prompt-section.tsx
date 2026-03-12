'use client';

import { AlertCircle, PenTool } from 'lucide-react';

interface PromptSectionProps {
  title: string;
  description: string;
  objectives: string[];
  proTip: string;
}

export function PresentationPromptSection({
  title,
  description,
  objectives,
  proTip,
}: PromptSectionProps) {
  return (
    <div className="space-y-4">
      {/* AI Prompt Header */}
       <div className="mb-6 border border-[#E5E7EB] bg-white rounded-[12px] shadow-[0px_1px_2px_0px_#0000000D]">
        <div className="bg-[#0A0A0A] rounded-t-[12px] p-5 text-white border-b-[4px] border-[#FFFF00]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                    <PenTool  className="text-[#0A0A0A]" />
                  </div>
                  <h3 className="font-bold">AI Prompt</h3>
                </div>
              </div>

      <div className="p-7">
        {/* Case Title */}
      <div>
        <h3 className="text-lg md:text-xl text-[#111827] font-bold mb-1">{title}</h3>
        <div className="w-16 h-1 bg-[#FFFF00] rounded" />
      </div>

      {/* Description */}
      <p className="text-[#1E1E1E] text-base font-normal pt-4 pb-6 text-justify leading-[1.5]  ">{description}</p>

      {/* Key Objectives */}
      <div className="bg-[#F9FAFB] rounded-[8px] border-l-4 border-[#FFFF00] p-4 ">
        <h4 className="text-[#111827] text-sm font-bold mb-1">Key Objectives</h4>
        <ul className="space-y-1">
          {objectives.map((objective, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="flex-shrink-0 text-[#FFFF00] ">▶</span>
              <span className="text-sm text-[#4B5563] font-normal">{objective}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
       </div>

      {/* Pro Tip */}
      <div className="bg-[#F3F4F6] p-5 rounded-[12px] flex gap-3 border border-[#E5E7EB] ">
        <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-sm text-[#111827]">Pro Tip</h4>
          <p className="text-[#4B5563] text-sm mt-1">{proTip}</p>
        </div>
      </div>
    </div>
  );
}
