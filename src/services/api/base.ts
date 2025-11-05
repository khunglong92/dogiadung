// Base API configuration & lightweight fetch wrapper.
// - Adds Authorization header from Zustand store when token exists
// - Provides small convenience around JSON parsing and error shaping

import { useAuthStore } from "@/stores/authStore";

// Normalize base URL from env: trim, strip quotes/semicolons, drop trailing slashes
function normalizeBaseUrl(value: unknown): string {
  const raw = String(value ?? "http://localhost:3000/api");
  const cleaned = raw
    .trim()
    .replace(/%22/gi, "") // remove encoded quotes
    .replace(/["']/g, "") // remove literal quotes
    .replace(/[;]+$/g, ""); // remove trailing semicolons
  return cleaned.replace(/\/+$/g, ""); // remove trailing slashes
}

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_URL);

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestOptions<TBody = unknown>
  extends Omit<RequestInit, "body"> {
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
  const isFormData =
    typeof FormData !== "undefined" &&
    (options.body as any) instanceof FormData;
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const fullUrl = `${API_BASE_URL}/${String(url).replace(/^\/+/, "")}`;
  const response = await fetch(fullUrl, {
    method,
    ...options,
    headers,
    body: options.body
      ? isFormData
        ? (options.body as any)
        : JSON.stringify(options.body)
      : undefined,
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson
    ? await response.json().catch(() => undefined)
    : undefined;

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
