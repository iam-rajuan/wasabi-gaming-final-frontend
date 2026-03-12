import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActiveSection } from '@/constant/navConstant';

interface AppState {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            activeSection: ActiveSection.Students,
            setActiveSection: (section) => set({ activeSection: section }),
        }),
        {
            name: 'app-storage', // key in localStorage
        }
    )
);
