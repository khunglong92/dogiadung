// Base API configuration & lightweight fetch wrapper.
// - Adds Authorization header from Zustand store when token exists
// - Provides small convenience around JSON parsing and error shaping

import { useAuthStore } from "@/stores/authStore";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestOptions<TBody = unknown> extends RequestInit {
  body?: TBody;
  headers?: Record<string, string>;
}

export interface ApiError extends Error {
  status?: number;
  details?: unknown;
}

async function request<TResponse, TBody = unknown>(
  method: HttpMethod,
  url: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const token = useAuthStore.getState().token;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json().catch(() => undefined) : undefined;

  if (!response.ok) {
    const error: ApiError = new Error(
      (data as any)?.message || response.statusText || "API Error"
    );
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data as TResponse;
}

export const apiClient = {
  get: <T>(url: string, options?: Omit<RequestOptions, "body">) =>
    request<T>("GET", url, options),
  post: <T, B = unknown>(url: string, body?: B, options?: RequestOptions<B>) =>
    request<T, B>("POST", url, { ...(options || {}), body }),
  put: <T, B = unknown>(url: string, body?: B, options?: RequestOptions<B>) =>
    request<T, B>("PUT", url, { ...(options || {}), body }),
  patch: <T, B = unknown>(url: string, body?: B, options?: RequestOptions<B>) =>
    request<T, B>("PATCH", url, { ...(options || {}), body }),
  delete: <T>(url: string, options?: Omit<RequestOptions, "body">) =>
    request<T>("DELETE", url, options),
};
