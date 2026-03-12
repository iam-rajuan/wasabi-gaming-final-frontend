import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StudentDashboardState {
    cvCompletionPercentage: number;
    psychometricScore: number;
    psychometricInsights: string; // "Strong in..." or similar

    setCvCompletion: (percentage: number) => void;
    setPsychometricResult: (score: number, insights: string) => void;
}

export const useStudentDashboardStore = create<StudentDashboardState>()(
    persist(
        (set) => ({
            cvCompletionPercentage: 0,
            psychometricScore: 0,
            psychometricInsights: '',

            setCvCompletion: (percentage) => set({ cvCompletionPercentage: percentage }),
            setPsychometricResult: (score, insights) =>
                set({ psychometricScore: score, psychometricInsights: insights }),
        }),
        {
            name: 'student-dashboard-storage',
        }
    )
);
