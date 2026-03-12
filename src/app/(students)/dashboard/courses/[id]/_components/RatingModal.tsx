'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  token: string; // pass user token for auth
};

export default function RatingModal({ open, onOpenChange, courseId, token }: Props) {
  const [rating, setRating] = useState(0); // 0 to 5, can support 0.5
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();

  // Mutation to submit rating
  const submitRating = useMutation({
    mutationFn: async () => {
      const payload = { courseId, rating, comment };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/review`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to submit rating');
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success('Rating submitted successfully!');
      console.log('Rating submitted:', data);
      queryClient.invalidateQueries({ queryKey: ['single-course', courseId] });
      onOpenChange(false); // close modal
    },
    onError: (err: any) => {
      toast.error(err.message || 'Something went wrong');
      console.error(err);
    },
  });

  // Handle submit
  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    submitRating.mutate();
  };

  // Handle star click (supports half star)
  const handleStarClick = (index: number, isHalf = false) => {
    setRating(isHalf ? index + 0.5 : index + 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">Rate this course</DialogTitle>
        </DialogHeader>

        {/* Stars */}
        <div className="flex gap-1 justify-center py-2">
          {Array.from({ length: 5 }).map((_, index) => {
            const full = index + 1 <= Math.floor(rating);
            const half = rating > index && rating < index + 1;

            return (
              <div key={index} className="relative w-7 h-7 cursor-pointer">
                <Star className="w-7 h-7 text-gray-300 absolute" />
                {half && (
                  <div className="absolute overflow-hidden w-1/2">
                    <Star className="w-7 h-7 text-yellow-500 fill-yellow-500" />
                  </div>
                )}
                {full && <Star className="w-7 h-7 text-yellow-500 fill-yellow-500 absolute" />}
                <div
                  className="absolute inset-0 z-10"
                  onClick={() => handleStarClick(index, false)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    if (e.clientX - rect.left < rect.width / 2) handleStarClick(index, true);
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Comment */}
        <Textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px] mt-4"
        />

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full mt-4 bg-primary hover:bg-primary/80 rounded-lg"
          disabled={submitRating.isPending}
        >
          {submitRating.isPending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}