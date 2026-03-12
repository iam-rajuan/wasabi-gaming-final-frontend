import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SignUpData {
    email: string;
    role: string;
    [key: string]: any;
}

interface AuthState {
    signupData: SignUpData | null;
    setSignupData: (data: SignUpData | null) => void;
    // We can add user/token here if we need to sync with NextAuth client-side access
    // but NextAuth useSession is preferred for read access.
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            signupData: null,
            setSignupData: (data) => set({ signupData: data }),
        }),
        {
            name: 'auth-storage', // key in localStorage
        }
    )
);
