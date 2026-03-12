import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InterviewSessionState {
  interviewSessionId: string | null;
  setInterviewSessionId: (id: string | null) => void;
}

export const useInterviewSessionStore = create<InterviewSessionState>()(
  persist(
    (set) => ({
      interviewSessionId: null,
      setInterviewSessionId: (id) => set({ interviewSessionId: id }),
    }),
    {
      name: "interview-session-storage",
    },
  ),
);
