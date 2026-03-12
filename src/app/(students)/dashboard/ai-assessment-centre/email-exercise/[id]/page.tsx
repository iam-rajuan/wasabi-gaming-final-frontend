'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient, dataTagSymbol } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock, Save, Send } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface EmailTask {
  _id: string;
  discribtion: string;
  question: string;
  createdAt?: string;
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
  };
  yourResponse?: string;
}

// ────────────────────────────────────────────────
// Mock inbox — only used for sidebar visual
// ────────────────────────────────────────────────
const mockInboxItems = [
  {
    id: 'task-001',
    subject: 'Client Advice Request – Acquisition Due Diligence',
    priority: 'HIGH',
    isRead: false,
  },
  {
    id: 'task-002',
    subject: 'Follow-up: Disclosure Review – Riverside Case',
    priority: 'MEDIUM',
    isRead: true,
  },
  {
    id: 'task-003',
    subject: 'Billing Clarification – Newton Homes Matter',
    priority: 'LOW',
    isRead: true,
  },
];

// ────────────────────────────────────────────────
// Fetch single task (GET)
// ────────────────────────────────────────────────
async function fetchEmailTask(id: string, token?: string): Promise<EmailTask> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/intrayemail/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch task: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

// ────────────────────────────────────────────────
// Update response (PATCH)
// ────────────────────────────────────────────────
async function updateEmailResponse(
  id: string,
  responseText: string,
  token?: string
): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/intrayemail/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      yourResponse: responseText.trim(),
    }),
  });

  if (!res.ok) {
    let errorMessage = `Failed to update response (HTTP ${res.status})`;
    try {
      const errData = await res.json();
      errorMessage = errData.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }
}

// ────────────────────────────────────────────────
// Simple time formatter
// ────────────────────────────────────────────────
function formatTime(dateStr?: string): string {
  if (!dateStr) return '09:45';

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Invalid time';

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

export default function EmailExercisePage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const { data: session } = useSession();
  const token = session?.accessToken as string | undefined;

  const queryClient = useQueryClient();

  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [responseText, setResponseText] = useState('');
  const [selectedId] = useState(taskId || mockInboxItems[0]?.id || '');

  // ─── Fetch task ──────────────────────────────────────────────
  const { data, isLoading, error } = useQuery<EmailTask>({
    queryKey: ['email-task', taskId],
    queryFn: () => fetchEmailTask(taskId, token),
    enabled: !!taskId && !!token,
    staleTime: 10 * 60 * 1000,
  });

  // Pre-fill response if already exists
  useEffect(() => {
    if (data?.yourResponse) {
      setResponseText(data.yourResponse);
    }
  }, [data?.yourResponse]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // ─── Mutations ───────────────────────────────────────────────
  const saveDraftMutation = useMutation({
    mutationFn: () => updateEmailResponse(taskId, responseText, token),
    onSuccess: () => {
      toast.success('Draft saved successfully');
      queryClient.invalidateQueries({ queryKey: ['email-task', taskId] });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to save draft');
    },
  });

  const submitMutation = useMutation({
    mutationFn: () => updateEmailResponse(taskId, responseText, token),
    onSuccess: () => {
      toast.success('Response submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['email-task', taskId] });
      router.push(`/dashboard/assessment-resutl/${taskId}`);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to submit response');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading task...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load task. Please try again.
      </div>
    );
  }

  const applicantName = `${data.applicant.firstName} ${data.applicant.lastName}`;
  const avatarSrc = data.applicant.profileImage || '/default-avatar.png';
  const emailTime = formatTime(data.createdAt);

  const getPriorityStyle = (priority: string) => {
    switch (priority.toUpperCase()) {
      case 'HIGH':
        return 'bg-[#FFFF00] text-[#000000]';
      case 'MEDIUM':
        return 'bg-yellow-200/40 text-yellow-800';
      case 'LOW':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Yellow Banner */}
      <div className="bg-[#FFFF00] border-b-4 border-gray-900 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-gray-700">Exercise</span>
            <ChevronRight className="w-4 h-4 text-gray-700" />
            <span className="text-sm sm:text-lg font-bold text-gray-900">
              IN-TRAY EMAIL EXERCISE
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-900 text-yellow-400 font-bold rounded-[10px]">
            <Clock className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-sm sm:text-base">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Sidebar – visual only */}
          <div className="lg:col-span-1">
            <div className="border border-t-1 border-b-4 border-l-1 border-r-4 border-gray-900 rounded-2xl h-[calc(100vh-140px)] overflow-hidden bg-white">
              <div className="bg-[#FFFF00] px-4 sm:px-5 py-3 border-b-2 border-gray-900">
                <h2 className="text-sm sm:text-base font-bold text-gray-900">Inbox</h2>
                <p className="text-xs text-gray-600 mt-1">{mockInboxItems.length} items</p>
              </div>

              <div className="divide-y-2 divide-gray-200 overflow-y-auto max-h-[calc(100vh-220px)]">
                {mockInboxItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full px-4 sm:px-5 py-4 text-left transition-colors ${
                      selectedId === item.id
                        ? 'bg-yellow-100 border-l-4 border-yellow-400'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <span
                          className={`inline-block text-xs font-bold px-3 py-1.5 rounded mb-2 ${getPriorityStyle(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                          {item.subject}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Email View */}
          <div className="lg:col-span-2">
            <div className="border border-t-1 border-b-4 border-l-1 border-r-4 border-gray-900 rounded-2xl overflow-hidden bg-white h-[calc(100vh-140px)]">
              {/* Email Header */}
              <div className="bg-[#FFFF00] px-4 sm:px-6 py-4 border-b-2 border-gray-900">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0 border border-gray-400">
                      <Image src={avatarSrc} alt={applicantName} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                        {applicantName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-700 truncate">
                        {data.applicant.email}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-gray-700 flex-shrink-0 bg-[#0000001A] px-4 py-2 rounded-full flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {emailTime}
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="px-4 sm:px-6 py-6 overflow-y-auto h-[calc(100%-140px)]">
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Exercise Context:</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {data.discribtion}
                  </p>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                  Client Email – Acquisition Due Diligence Advice
                </h2>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                  {data.question}
                </p>


                {data.yourResponse && (
                <div className="bg-[#FACC15]/20 border-l-4 border-[#FACC15] rounded-lg px-4 py-3 mb-6">
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-2">Your Response</p>
                  <p className="text-xs sm:text-sm text-gray-700">
                   {data.yourResponse}
                  </p>
                </div>
                )}

                {/* Response Area */}
                <div className="border-t-2 pt-5 border-[#E5E7EB]">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Response
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your email response here..."
                    className="w-full h-40 sm:h-64 px-4 py-3 border border-t-2 border-b-4 border-l-2 border-r-4 border-gray-900 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  />
                  <div className="text-right text-xs text-gray-500 mt-2">
                    {responseText.trim().split(/\s+/).length} words
                  </div>

                  <div className="flex mt-4 flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
                    <Button
                      variant="outline"
                      onClick={() => saveDraftMutation.mutate()}
                      disabled={saveDraftMutation.isPending || !responseText.trim()}
                      className="w-full sm:w-auto border border-t-1 border-b-4 border-l-1 border-r-4 border-gray-900 text-gray-900 hover:bg-gray-100 bg-white font-bold rounded-[8px]"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      {saveDraftMutation.isPending ? 'Saving...' : 'Save Draft'}
                    </Button>

                    <Button
                      onClick={() => submitMutation.mutate()}
                      disabled={submitMutation.isPending || !responseText.trim()}
                      className="w-full  sm:w-auto rounded-[8px] bg-[#FFFF00] text-gray-900 hover:bg-yellow-500 font-bold border border-t-1 border-b-4 border-l-1 border-r-4 border-gray-900"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {submitMutation.isPending ? 'Submitting...' : 'Submit All'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}