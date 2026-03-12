import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CVData {
    personalInfo?: any;
    education?: any[];
    workExperience?: any[];
    skills?: any[];
    achievements?: any[];
    [key: string]: any;
}

interface CVBuilderState {
    currentStep: number;
    cvData: CVData;
    selectedTemplate: string;
    setCurrentStep: (step: number) => void;
    updateCVData: (section: string, data: any) => void;
    setSelectedTemplate: (template: string) => void;
    resetCVBuilder: () => void;
    nextStep: () => void;
    previousStep: () => void;
}

const initialCVData: CVData = {
    personalInfo: {},
    education: [],
    workExperience: [],
    skills: [],
    achievements: [],
};

export const useCVBuilderStore = create<CVBuilderState>()(
    persist(
        (set, get) => ({
            currentStep: 0,
            cvData: initialCVData,
            selectedTemplate: 'modern',

            setCurrentStep: (step) => set({ currentStep: step }),

            updateCVData: (section, data) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        [section]: data,
                    },
                })),

            setSelectedTemplate: (template) => set({ selectedTemplate: template }),

            resetCVBuilder: () =>
                set({
                    currentStep: 0,
                    cvData: initialCVData,
                    selectedTemplate: 'modern',
                }),

            nextStep: () =>
                set((state) => ({
                    currentStep: state.currentStep + 1,
                })),

            previousStep: () =>
                set((state) => ({
                    currentStep: Math.max(0, state.currentStep - 1),
                })),
        }),
        {
            name: 'cv-builder-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
