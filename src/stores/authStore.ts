import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiClient } from "@/services/api/base";

// Public user shape shared across app code. Expand as needed.
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Auth store contract: central source of truth for identity and token.
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken?: string | null) => Promise<void>;
  updateUser: (user: User | null) => void;
  logout: () => void;
}

// Zustand store with localStorage persistence. Only minimal state is persisted.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      login: async (token: string, refreshToken?: string | null) => {
        console.log("🔄 [AuthStore] Starting login process...");
        console.log(
          "🔑 [AuthStore] Token received:",
          token ? `${token.substring(0, 20)}...` : "No token"
        );
        console.log(
          "🔄 [AuthStore] RefreshToken received:",
          refreshToken ? "Yes" : "No"
        );

        // Lưu token và refreshToken vào localStorage trước
        set({
          token,
          refreshToken: refreshToken ?? null,
          isAuthenticated: true,
        });

        // Verify token đã được lưu
        const savedState = useAuthStore.getState();
        console.log(
          "💾 [AuthStore] Token saved to store:",
          savedState.token
            ? `${savedState.token.substring(0, 20)}...`
            : "No token"
        );
        console.log(
          "💾 [AuthStore] RefreshToken saved:",
          savedState.refreshToken ? "Yes" : "No"
        );
        console.log(
          "✅ [AuthStore] State saved, isAuthenticated:",
          savedState.isAuthenticated
        );

        // Sau khi lưu token, gọi API profile để lấy thông tin user
        try {
          console.log("📞 [AuthStore] Calling profile API...");
          const profile = await apiClient.get<User>("/users/profile");
          console.log("👤 [AuthStore] Profile received:", profile);
          set({
            user: profile,
            isAuthenticated: true,
          });
          console.log("✅ [AuthStore] User profile saved successfully");
        } catch (error) {
          // Nếu gọi profile thất bại, vẫn giữ token nhưng không có user info
          // Có thể log error hoặc xử lý theo nhu cầu
          console.error("❌ [AuthStore] Failed to fetch user profile:", error);
          // Vẫn giữ isAuthenticated = true vì đã có token
        }
      },
      updateUser: (user: User | null) => set({ user }),
      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Convenience selectors to prevent unnecessary re-renders.
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;
export const selectToken = (s: AuthState) => s.token;
export const selectUser = (s: AuthState) => s.user;
