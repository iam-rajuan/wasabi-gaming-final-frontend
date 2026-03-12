import { create } from "zustand";


export type StepLabel =
  | "Personal Information"
  | "Legal Work Experience"
  | "Non Legal Work Experience"
  | "Education Level"
  | "Leadership Experience"
  | "Achievements"
  | "Summary";


interface IFormState {
  isActive: StepLabel;
  completedSteps: StepLabel[];

  setIsActive: (step: StepLabel) => void;
  markStepCompleted: (step: StepLabel) => void;
}


const initialState = {
  isActive: "Personal Information" as StepLabel,
  completedSteps: [] as StepLabel[],
};


export const useFormState = create<IFormState>((set) => ({
  ...initialState,

  setIsActive: (step) => set({ isActive: step }),

  markStepCompleted: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
    })),
}));
