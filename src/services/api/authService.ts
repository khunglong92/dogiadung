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

// Mock implementation - replace with real API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    await delay(1000);

    // Mock validation
    if (data.email === "demo@example.com" && data.password === "password123") {
      return {
        success: true,
        message: "Login successful",
        data: {
          token: "mock-jwt-token-12345",
          user: {
            id: "1",
            email: data.email,
            name: "Demo User",
          },
        },
      };
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    await delay(1000);

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
    await delay(1000);

    return {
      success: true,
      message: "Password reset email sent successfully",
    };
  },

  logout: async (): Promise<ApiResponse> => {
    await delay(500);

    return {
      success: true,
      message: "Logged out successfully",
    };
  },
};
