'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

type RejectPayload = {
  status: string;
  email: string;
  schoolId: string;
};

const RejectedContainer = () => {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;
const router = useRouter();

  const searchParams = useSearchParams();

  const status = searchParams?.get('status') || 'rejected';
  const email = searchParams?.get('email');
  const schoolId = searchParams?.get('schoolId');

  const { mutate, isPending } = useMutation({
    mutationKey: ['rejected-invalid-student'],
    mutationFn: async (payload: RejectPayload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/invite-students/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      return res.json();
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || 'Something went wrong');
        return;
      }

      toast.success(
        data?.message || 'Invitation has been rejected successfully.'
        
      );
      router.push("/")
    },
    onError: () => {
      toast.error('Failed to reject invitation');
    },
  });

  const handleReject = () => {
    if (!email || !schoolId) {
      toast.error('Invalid invitation data');
      return;
    }

    mutate({
      status,
      email,
      schoolId,
    });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="p-8 bg-[#FFFEF0] border-[2px] border-[#E5E5E5] rounded-[24px] text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-red-600 text-2xl font-bold">✕</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Reject Invitation
        </h2>

        <p className="max-w-sm text-sm text-gray-500">
          Are you sure you want to reject this student invitation?
          This action cannot be undone.
        </p>

        <Button
          onClick={handleReject}
          disabled={isPending}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold h-12 rounded-xl"
        >
          {isPending ? 'Rejecting...' : 'Confirm Rejection'}
        </Button>
      </div>
    </div>
  );
};

export default RejectedContainer;

