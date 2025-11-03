import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Public user shape shared across app code. Expand as needed.
export interface User {
  id: string;
  email: string;
  name: string;
}

// Auth store contract: central source of truth for identity and token.
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Zustand store with localStorage persistence. Only minimal state is persisted.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Convenience selectors to prevent unnecessary re-renders.
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;
export const selectToken = (s: AuthState) => s.token;
export const selectUser = (s: AuthState) => s.user;
