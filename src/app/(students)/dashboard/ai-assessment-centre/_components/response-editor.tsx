'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface ResponseEditorProps {
  maxWords?: number;
  label?: string;
  subtitle?: string;
  placeholder?: string;
  onResponseChange?: (text: string) => void;
  initialValue?: string;
}

export function ResponseEditor({
  maxWords = 300,
  label = 'Your Response',
  subtitle = 'Internal Email Draft',
  placeholder = 'Start typing your response here...',
  onResponseChange,
  initialValue = '',
}: ResponseEditorProps) {
  const [response, setResponse] = useState(initialValue);
  const wordCount = response.trim().split(/\s+/).filter(w => w.length > 0).length;

  const handleChange = (text: string) => {
    setResponse(text);
    onResponseChange?.(text);
  };

  const isBelowLimit = wordCount <= maxWords;

  return (
    <div className="space-y-3 ">
      {/* Header */}
      <div className="flex items-center justify-between gap-4  px-4 py-3 border-b border-[#FFEBA0] ">
        <div className="flex items-center gap-2">
                  <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                    <FileText  className="text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A0A0A] text-base">{label}</h3>
                    <p className="text-xs text-[#64748B] font-semibold">{subtitle}</p>
                  </div>

                </div>
        <div className={`text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
          isBelowLimit ? 'bg-white text-gray-700' : 'bg-red-100 text-red-700'
        }`}>
          {wordCount} / {maxWords} words
        </div>
      </div>

      {/* Editor */}
      <Textarea
        value={response}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
         className="w-full h-96 py-1 rounded-lg focus:outline-none px-4 border-none placeholder:text-[#CCCCCC] text-foreground resize-none"
      />

      {/* Word count indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="pl-4">{wordCount} words used</span>
        {wordCount > maxWords && (
          <span className="text-red-600 font-semibold">
            Exceeds limit by {wordCount - maxWords} words
          </span>
        )}
      </div>
    </div>
  );
}
