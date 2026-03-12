import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    token: string | null;
    setUser: (user: User | null, token?: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,

            setUser: (user, token) => {
                set((state) => ({
                    user: user ?? null,
                    token: token ?? state.token,
                }));
            },

            logout: () => {
                set({ user: null, token: null });
            },

            isAuthenticated: () => {
                const { token } = get();
                return !!token;
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Selectors
export const selectUser = (state: AuthState) => state.user;
export const selectToken = (state: AuthState) => state.token;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated();
