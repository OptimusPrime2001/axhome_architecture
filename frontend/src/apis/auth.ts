import { API_ENDPOINTS } from "@constants";
import type { AuthLoginPayload } from "@shared-types";
import { apiClient, unwrapResponse } from "../lib/api-client";

export interface AuthUserDTO {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponseDTO {
  access_token: string;
  expires_in: number;
  user: AuthUserDTO;
}

/**
 * Authenticates admin user via `POST /api/v1/admin/auth/login`.
 * `access_token` and `refresh_token` are stored exclusively in `HttpOnly: true` cookies
 * set by the Go Backend (`withCredentials: true` on `apiClient`).
 */
export async function loginAdmin(
  payload: AuthLoginPayload,
): Promise<LoginResponseDTO> {
  return unwrapResponse<LoginResponseDTO>(
    apiClient.post(API_ENDPOINTS.ADMIN.AUTH.LOGIN, payload),
  );
}

/**
 * Logs out the current admin session and clears `HttpOnly` cookies on the server.
 */
export async function logoutAdmin(): Promise<void> {
  await unwrapResponse<{ logged_out: boolean }>(
    apiClient.post(API_ENDPOINTS.ADMIN.AUTH.LOGOUT, {}),
  );
}

export async function getCurrentAdmin(): Promise<AuthUserDTO> {
  return unwrapResponse<AuthUserDTO>(
    apiClient.get(API_ENDPOINTS.ADMIN.AUTH.ME),
  );
}

export async function updateAdminProfile(payload: {
  full_name: string;
  email: string;
}): Promise<AuthUserDTO> {
  return unwrapResponse<AuthUserDTO>(
    apiClient.patch(API_ENDPOINTS.ADMIN.AUTH.PROFILE, payload),
  );
}

export async function changeAdminPassword(payload: {
  current_password: string;
  new_password: string;
}): Promise<{ password_updated: boolean }> {
  return unwrapResponse<{ password_updated: boolean }>(
    apiClient.patch(API_ENDPOINTS.ADMIN.AUTH.PASSWORD, payload),
  );
}
