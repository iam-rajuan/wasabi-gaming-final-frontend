


'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BadgeInfo, Loader2, Save } from 'lucide-react';

interface CareAnalysis {
  _id: string;
  aiassigmentId: {
    title: string;
    discription: string;
    type: string;
    logo?: string;
  };
  precedentSummary: string;
  pretendCase: string;
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
  };
  caseLinking?: string;
  legalIssue?: string;
  summaryQuality?: string;
  yourResponse?: string;
  createdAt: string;
}

export default function CaseStudyPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken as string | undefined;

  const [data, setData] = useState<CareAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const MAX_WORDS = 200;

 
  const applicant = data?.applicant?.firstName || '';
  const applicantLastName = data?.applicant?.lastName || '';



  const [selectedParticipant, setSelectedParticipant] = useState('1');

  // Fetch case data
  useEffect(() => {
    if (!id || !token) return;

    const fetchCaseAnalysis = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/careanalysis/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();

        if (json.success && json.data) {
          setData(json.data);
          if (json.data.yourResponse) {
            setSummary(json.data.yourResponse);
          }
        } else {
          throw new Error(json.message || 'Invalid response');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load case analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseAnalysis();
  }, [id, token]);

  const handleSummaryChange = (text: string) => {
    setSummary(text);
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const handleSave = async () => {
    if (!summary.trim() || wordCount > MAX_WORDS || !id || !token || !data) return;

    setIsSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/careanalysis/${id}`, {
        method: 'PUT',          
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          yourResponse: summary.trim(),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Save failed (${res.status})`);
      }

      // Success → redirect to result page
    //   router.push('/result');
     router.push(`/dashboard/case-study-result/${id}`);
    } catch (err: any) {
      alert('Failed to save: ' + (err.message || 'Unknown error'));
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 max-w-md">{error || 'Case not found'}</p>
        <Button variant="outline" className="mt-6" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const isOverLimit = wordCount > MAX_WORDS;
  const canSave = summary.trim().length > 0 && !isOverLimit && !isSaving;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar – unchanged */}
          <div className="lg:col-span-1 ">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-lg p-4 border border-[#FFFF00]">
                <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-4">
                  Case Participants
                </h3>
                <div className="space-y-2">
                 <button className='w-full text-left px-4 py-3 rounded-[10px] font-semibold transition-all '>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>{applicant && applicantLastName ? `${applicant} ${applicantLastName}` : 'Participant'}</span>
                  </div>
                  {/* <ChevronRight className="w-4 h-4" /> */}
                 </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Case Analysis</span>
                <span className="mx-2">•</span>
                <span className="font-semibold">{data.aiassigmentId.type.replace('_', ' ')}</span>
              </p>
              <h1 className="text-3xl font-extrabold text-[#000000]">
                {data.aiassigmentId.title || 'Duty of Care Analysis'}
              </h1>
              <p className="text-[#374151]">{data.aiassigmentId.discription}</p>
            </div>

            {/* Precedent */}
            <div className="border-l-4 border-black bg-white rounded-[6px] shadow-sm">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#FACC15] rounded flex items-center justify-center text-gray-900 font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Precedent summary</h3>
                    <p className="text-xs text-gray-500">Legal Precedent</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.precedentSummary}
                </p>
              </div>
            </div>

            {/* Fictional Case */}
            <div className="border-l-4 border-[#EAB308] bg-white rounded-[6px] shadow-sm">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-[#FACC15] font-bold text-lg">
                    02
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Pretend case (fictional)</h3>
                    <p className="text-xs text-gray-500">Case Scenario</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.pretendCase}
                </p>
              </div>
            </div>

            {/* Your Analysis */}
            <div className="border-t-8 border-[#EAB308] bg-white rounded-[6px] shadow-sm">
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-[#FACC15] font-bold">
                      03
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Your Summary</h3>
                      <p className="text-xs text-gray-500">Analysis & Application</p>
                    </div>
                  </div>

                  <div
                    className={`text-xs font-bold px-4 py-2 rounded-full border ${
                      isOverLimit
                        ? 'bg-red-50 text-red-700 border-red-300'
                        : 'bg-[#FEFCE8] text-[#374151] border-[#FACC15]'
                    }`}
                  >
                    {wordCount} / {MAX_WORDS} words
                  </div>
                </div>

                <div className="bg-[#FEFCE8] rounded-[12px] border-2 border-[#FACC15] p-4 space-y-3">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <span className="text-lg">  <BadgeInfo className="w-4 h-4" /></span>
                    Instructions
                  </h4>
                  <ul className="text-sm text-gray-800 space-y-1.5 list-disc pl-5">
                    <li>Apply the precedent principle to the pretend case</li>
                    <li>State one argument for the claimant, and one for the defendant</li>
                    <li>Keep your response clear and structured</li>
                  </ul>
                </div>

                <Textarea
                  value={summary}
                  onChange={(e) => handleSummaryChange(e.target.value)}
                  placeholder="Write your analysis and application here..."
                  className="min-h-[200px] resize-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400 border-2 border-gray-200 rounded-xl"
                  disabled={isSaving}
                />

                {data.summaryQuality && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                    <h4 className="font-semibold mb-2 text-gray-800">Previous AI Feedback</h4>
                    <p className="text-gray-700">{data.summaryQuality}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              {/* <Button
                variant="outline"
                disabled={isSaving}
                onClick={() => router.back()}
              >
                Cancel
              </Button> */}

              <Button
                onClick={handleSave}
                disabled={!canSave || isSaving}
                className={`min-w-[140px] h-[48px] rounded-[8px] font-semibold ${
                  isOverLimit
                    ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                    : 'bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-gray-900'
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save & Submit
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}