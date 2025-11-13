import { apiClient } from "./base";
// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // Call real API endpoint
    // Expected backend response shape: { success, message, data: { token, user } }
    // If backend returns a different shape, adjust mapping below accordingly.
    const res = await apiClient.post<AuthResponse, LoginRequest>(
      "/auth/login",
      data
    );
    return res;
  },

  getProfile: async (): Promise<import("@/stores/authStore").User> => {
    return apiClient.get("/users/profile");
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return {
      success: true,
      message: "Registration successful. Please login.",
      data: {
        token: "mock-jwt-token-12345",
        user: {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
        },
      },
    };
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse> => {
    return {
      success: true,
      message: "Password reset email sent successfully",
    };
  },

  logout: async (): Promise<ApiResponse> => {
    return {
      success: true,
      message: "Logged out successfully",
    };
  },
};
