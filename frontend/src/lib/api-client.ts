// ==============================================================================
// Axhome Architecture - Configured Axios Instance (HttpOnly Cookie Auth Ready)
// ==============================================================================

import { cookieStorage } from "@utils";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export interface ApiEnvelope<T> {
  code: number | string;
  msg: string;
  data: T;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;

  constructor(message: string, status: number, code = "API_ERROR") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export function isApiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_API_URL?.trim());
}

function resolveApiBaseUrl(): string {
  const rawBase = (
    process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8080"
  ).replace(/\/+$/, "");

  return rawBase.endsWith("/api/v1") ? rawBase : `${rawBase}/api/v1`;
}

const BASE_URL = resolveApiBaseUrl();
/**
 * Shared Axios Instance configured with `withCredentials: true` so the browser
 * automatically attaches & receives HttpOnly cookies (`access_token` & `refresh_token`).
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// 1. REQUEST INTERCEPTOR: Lấy token từ cookie và gắn vào Header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access_token = cookieStorage.get("accessToken");
    if (access_token && config.headers) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<Partial<ApiEnvelope<unknown>>>) => {
    const status = error.response?.status ?? 500;
    const payload = error.response?.data;
    const message =
      payload?.msg ||
      error.message ||
      `Yêu cầu máy chủ thất bại (Mã lỗi: ${status}).`;
    const code =
      typeof payload?.code === "string" ? payload.code : `HTTP_${status}`;

    return Promise.reject(new ApiError(message, status, code));
  },
);

/**
 * Unwraps the standard `{ code, msg, data }` response envelope from `axhome_server`.
 */
export async function unwrapResponse<T>(
  promise: Promise<{ data: ApiEnvelope<T> | T }>,
): Promise<T> {
  const response = await promise;
  const body = response.data;
  if (
    body &&
    typeof body === "object" &&
    "data" in body &&
    body.data !== undefined
  ) {
    return (body as ApiEnvelope<T>).data;
  }
  return body as T;
}
