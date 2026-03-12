'use client';

import { Settings } from 'lucide-react';
import { useState } from 'react';

interface Requirement {
  id: string;
  label: string;
  completed: boolean;
}

interface RequirementsSectionProps {
  title?: string;
  requirements: Requirement[];
  onRequirementChange?: (id: string, completed: boolean) => void;
}

export function RequirementsSection({
  title = 'Requirements',
  requirements: initialRequirements,
  onRequirementChange,
}: RequirementsSectionProps) {
  const [requirements, setRequirements] = useState(initialRequirements);

  const handleToggle = (id: string) => {
    setRequirements(prev =>
      prev.map(req =>
        req.id === id ? { ...req, completed: !req.completed } : req
      )
    );
    const req = requirements.find(r => r.id === id);
    onRequirementChange?.(id, req ? !req.completed : true);
  };

  const completedCount = requirements.filter(r => r.completed).length;

  return (
    <div className="bg-[#FFF9E6] p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center">
           <Settings />
          </div>
          <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
        <span className="text-xs text-gray-600">{completedCount}/{requirements.length} completed</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {requirements.map(req => (
          <label
            key={req.id}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="radio"
              checked={req.completed}
              onChange={() => handleToggle(req.id)}
              className="w-4 h-4 accent-[#FFFF00]"
            />
            <span className="text-sm text-[#4B5563] group-hover:text-gray-900 transition-colors">
              {req.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
