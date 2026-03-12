'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export interface EmailItem {
  id: string;
  subject: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  isRead: boolean;
}

interface EmailInboxProps {
  emails: EmailItem[];
  onSelectEmail?: (id: string) => void;
  selectedEmailId?: string;
}

const priorityColors = {
  HIGH: 'bg-red-100 text-red-700 border-red-300',
  MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  LOW: 'bg-blue-100 text-blue-700 border-blue-300',
};

const priorityDisplay = {
  HIGH: '🔴 HIGH',
  MEDIUM: '🟡 MEDIUM',
  LOW: '🔵 LOW',
};

export function EmailInbox({
  emails,
  onSelectEmail,
  selectedEmailId,
}: EmailInboxProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set([emails[0]?.id])
  );

  return (
    <div className="border-4 border-yellow-400 rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <div className="bg-yellow-400 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-900" />
          <h2 className="font-bold text-gray-900">Inbox</h2>
        </div>
        <span className="text-sm font-bold text-gray-900">{emails.length} items</span>
      </div>

      {/* Email List */}
      <div className="divide-y divide-gray-200">
        {emails.map(email => (
          <button
            key={email.id}
            onClick={() => onSelectEmail?.(email.id)}
            className={`w-full px-6 py-4 text-left transition-colors ${
              selectedEmailId === email.id
                ? 'bg-yellow-50'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="space-y-2">
              {/* Priority Badge */}
              <div className={`inline-block px-2 py-1 text-xs font-bold rounded border ${priorityColors[email.priority]}`}>
                {priorityDisplay[email.priority]}
              </div>

              {/* Subject */}
              <p className={`font-semibold text-sm ${email.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                {email.subject}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
