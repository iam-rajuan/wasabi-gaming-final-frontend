'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role?: string;
}

interface CaseParticipantSidebarProps {
  participants: Participant[];
  selectedId?: string;
  onSelectParticipant?: (id: string) => void;
  moduleProgress?: number;
}

export function CaseParticipantSidebar({
  participants,
  selectedId,
  onSelectParticipant,
  moduleProgress = 65,
}: CaseParticipantSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Case Participants */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Case Participants</h3>
        <div className="space-y-1">
          {participants.map(participant => (
            <button
              key={participant.id}
              onClick={() => onSelectParticipant?.(participant.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                selectedId === participant.id
                  ? 'bg-yellow-400 text-gray-900 font-bold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>{participant.name}</span>
              </div>
              {selectedId === participant.id && (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-3 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-bold text-gray-900">Progress</h3>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Module Completion</span>
            <span className="text-xs font-bold text-gray-900">{moduleProgress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-300"
              style={{ width: `${moduleProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
