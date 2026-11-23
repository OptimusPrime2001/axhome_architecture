import { API_ENDPOINTS } from "@constants";
import type { UserRole } from "@shared-types";
import { apiClient, unwrapResponse } from "../lib/api-client";
import type { AuthUserDTO } from "./auth";

export interface ListAdminUsersDTO {
  items: AuthUserDTO[];
  total: number;
}

export interface CreateAdminUserPayload {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateAdminUserPayload {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  new_password?: string;
}

export async function fetchAdminUsers(params?: {
  limit?: number;
  offset?: number;
}): Promise<ListAdminUsersDTO> {
  return unwrapResponse<ListAdminUsersDTO>(
    apiClient.get(API_ENDPOINTS.ADMIN.USERS.LIST, { params }),
  );
}

export async function createAdminUser(
  payload: CreateAdminUserPayload,
): Promise<AuthUserDTO> {
  return unwrapResponse<AuthUserDTO>(
    apiClient.post(API_ENDPOINTS.ADMIN.USERS.LIST, payload),
  );
}

export async function updateAdminUser({
  id,
  ...body
}: UpdateAdminUserPayload): Promise<AuthUserDTO> {
  return unwrapResponse<AuthUserDTO>(
    apiClient.patch(API_ENDPOINTS.ADMIN.USERS.BY_ID(id), body),
  );
}

export async function deleteAdminUser(
  id: string,
): Promise<{ deleted: boolean }> {
  return unwrapResponse<{ deleted: boolean }>(
    apiClient.delete(API_ENDPOINTS.ADMIN.USERS.BY_ID(id)),
  );
}
