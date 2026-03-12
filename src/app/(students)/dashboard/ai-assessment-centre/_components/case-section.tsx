'use client';

interface CaseSectionProps {
  number: string;
  title: string;
  subtitle?: string;
  borderColor?: 'black' | 'yellow';
  content: {
    label: string;
    value: string;
  }[];
}

export function CaseSection({
  number,
  title,
  subtitle,
  borderColor = 'black',
  content,
}: CaseSectionProps) {
  const borderClass = borderColor === 'black' ? 'border-l-8 border-gray-900' : 'border-l-8 border-yellow-400';

  return (
    <div className={`${borderClass} bg-white p-6 rounded-lg shadow-sm space-y-4`}>
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${borderColor === 'black' ? 'bg-gray-900' : 'bg-yellow-400 text-gray-900'}`}>
          {number}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
              <span>📋</span>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 ml-14">
        {content.map((item, index) => (
          <div key={index}>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.label}</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
