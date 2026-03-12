

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  CheckCircle2,
  Lightbulb,
  PlayCircle,
  ChevronRight,
  Trophy,
  AlertCircle,
  FileText,
  ArrowRight,
} from 'lucide-react';

interface PresentationTaskData {
  totalScore: number;
  completionRate: number;
  wordsCompleted: number;
  writingSpeed: number;
  overallGrade: string;
  feedback: string[];
  successTips: string[];
  recommendations: string[];
  aiassigmentId?: {
    title: string;
    description?: string;
  };
  // ... other fields if needed
}

const RadialProgress = ({ value, label }: { value: number; label: string }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center justify-between p-6 bg-[#FFFFF0] rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800">{label}</h3>
      <div className="relative flex items-center justify-center">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#A3B12D"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-semibold text-gray-600">
          {Math.round(value)}%
        </span>
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className="max-w-5xl p-6 mx-auto space-y-6 animate-pulse">
    <div className="w-full h-16 bg-gray-200 rounded-lg" />
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-gray-100 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="h-64 bg-gray-50 rounded-xl" />
      <div className="h-64 bg-gray-50 rounded-xl" />
    </div>
  </div>
);

export default function PresentationResultsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery<{ data: PresentationTaskData }>({
    queryKey: ['presentation-task', id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/presentationtask/${id}`
      );
      if (!res.ok) throw new Error('Failed to fetch presentation result');
      return res.json();
    },
  });

  if (isLoading) return <Skeleton />;
  if (!data?.data) {
    return (
      <div className="p-10 text-center text-gray-500">
        No presentation result found.
      </div>
    );
  }

  const pd = data.data;

  // Normalize values for radial progress (0-100)
  const wordsProgress = Math.min(Math.round((pd.wordsCompleted / 300) * 100), 100); // assuming ~300 words target
  const writingSpeedScore = Math.min(pd.writingSpeed ?? 0, 100);

  return (
    <div className="space-y-8 pb-12  container mx-auto px-4 md:px-6 py-10">
      {/* Top Banner */}
      <div className="bg-[#1A1A1A] text-white p-5 md:p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <Trophy className="w-6 h-6 text-gray-300" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Presentation Task
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              {pd.totalScore || 0}/100
            </h2>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Grade</div>
          <div className="text-2xl font-bold">{pd.overallGrade || '—'}</div>
        </div>
      </div>

      

      {/* Score Breakdown Section */}
<div className="p-8 border border-gray-200 rounded-2xl bg-white">
  <div className="flex items-center gap-2 mb-6">
    <div className="bg-gray-100 p-1.5 rounded text-gray-600">
      <FileText size={18} />
    </div>

    <div>
      <h2 className="text-xl font-bold leading-tight text-gray-900">
        Performance Breakdown
      </h2>

      <p className="text-xs font-medium text-gray-500">
        {pd.aiassigmentId?.title || "Written Presentation Task"}
      </p>
    </div>
  </div>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <RadialProgress
      label="Total Score"
      value={pd.totalScore || 0}
    />

    <RadialProgress
      label="Completion Rate"
      value={pd.completionRate || 0}
    />

    {/* <RadialProgress
      label="Word Count Progress"
      value={wordsProgress}
    /> */}

    {/* <RadialProgress
      label="Writing Speed"
      value={writingSpeedScore}
    /> */}
  </div>
</div>


      {/* Strengths & Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positive Observations / Strengths */}
        <div className="bg-[#F0F9F4] border border-[#B7E4C7] rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5 text-[#2D6A4F]">
            <CheckCircle2 size={22} />
            <h3 className="text-xl font-bold">Positive Observations</h3>
          </div>
          <div className="space-y-4 text-sm text-[#2D6A4F]">
            {pd.feedback?.some(f => f.toLowerCase().includes('good') || f.toLowerCase().includes('strong') || f.toLowerCase().includes('well')) ? (
              pd.feedback
                .filter(f => !f.toLowerCase().includes('not') && !f.toLowerCase().includes('improve') && !f.toLowerCase().includes('lack'))
                .map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 size={16} className="shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))
            ) : (
              <p className="italic opacity-80">
                No specific positive observations were highlighted in this submission.
              </p>
            )}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-[#FFF5F2] border border-[#FAD2C0] rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5 text-[#94412D]">
            <Lightbulb size={22} />
            <h3 className="text-xl font-bold">Areas for Improvement</h3>
          </div>
          <div className="space-y-4 text-sm text-[#94412D]">
            {pd.feedback?.length > 0 ? (
              pd.feedback.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <AlertCircle size={16} className="shrink-0 mt-1" />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p className="italic">No detailed feedback available at this time.</p>
            )}
          </div>
        </div>
      </div>
      {/* Success Tips */}
      {pd.successTips?.length > 0 && (
        <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-400 p-2.5 rounded-lg">
              <Lightbulb className="text-gray-900" size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Tips to Improve Your Next Presentation
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pd.successTips.map((tip, i) => (
              <div key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                <CheckCircle2 size={16} className="shrink-0 mt-1 text-green-600" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#E6E905] to-[#8C931B] rounded-3xl p-10 md:p-12 text-center space-y-6 shadow-xl">
        <div className="flex justify-center">
          <PlayCircle className="w-14 h-14 text-gray-900 opacity-90" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          Ready to Improve?
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg font-medium text-gray-800">
          Submit a Video Presentation  , get fresh AI analysis, and track your progress over time.
        </p>
        <button
          onClick={() => router.push('/dashboard/ai-assessment-centre')}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white font-bold text-gray-900 rounded-2xl shadow hover:bg-gray-50 transition-colors text-lg"
        >
          Start New Presentation Task
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}