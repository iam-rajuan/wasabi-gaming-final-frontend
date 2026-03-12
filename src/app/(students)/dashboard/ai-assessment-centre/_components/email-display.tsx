'use client';

import { Mail, Clock } from 'lucide-react';

interface EmailDisplayProps {
  senderName: string;
  senderTitle: string;
  senderImage?: string;
  subject: string;
  time: string;
  content: string;
  instruction?: string;
}

export function EmailDisplay({
  senderName,
  senderTitle,
  senderImage,
  subject,
  time,
  content,
  instruction,
}: EmailDisplayProps) {
  return (
    <div className="border-4 border-gray-900 rounded-xl overflow-hidden bg-white flex flex-col h-full">
      {/* Header - Yellow with sender info */}
      <div className="bg-yellow-400 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
            {senderName.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{senderName}</h3>
            <p className="text-sm text-gray-700">{senderTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-900 font-semibold">
          <Clock className="w-5 h-5" />
          <span>{time}</span>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto flex-1">
          {/* Subject */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">{subject}</h2>

          {/* Email Body */}
          <div className="text-gray-700 space-y-4 mb-6">
            <p>{content}</p>
          </div>

          {/* Instruction Highlight */}
          {instruction && (
            <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-gray-800">{instruction}</p>
            </div>
          )}

          {/* Response Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-gray-900" />
              <span className="font-bold text-gray-900">Your Response</span>
            </div>
            <textarea
              placeholder="Here"
              className="w-full h-40 px-4 py-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            />
            <div className="mt-2 text-right text-xs text-gray-600">
              0 words
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
