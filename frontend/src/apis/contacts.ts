import { API_ENDPOINTS } from "@constants";
import type {
  ConsultationLead,
  ConsultationLeadStatus,
  ConsultationServiceType,
} from "@shared-types";
import { apiClient, unwrapResponse } from "../lib/api-client";

export interface CreatePublicLeadPayload {
  fullName: string;
  phone: string;
  email?: string;
  serviceType: ConsultationServiceType;
  estimatedBudget?: string;
  landSize?: string;
  location?: string;
  message?: string;
  sourcePage?: string;
  referencedProjectId?: string;
  referencedProjectTitle?: string;
}

export interface PaginatedLeadsDTO {
  items: ConsultationLead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeadStatsDTO {
  total: number;
  pending: number;
  inProgress: number;
  scheduled: number;
  won: number;
  lost: number;
}

export async function submitPublicConsultationLead(
  payload: CreatePublicLeadPayload,
): Promise<ConsultationLead> {
  return unwrapResponse<ConsultationLead>(
    apiClient.post(API_ENDPOINTS.PUBLIC.CONTACTS, payload),
  );
}

export async function fetchAdminLeads(params?: {
  status?: string;
  service_type?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedLeadsDTO> {
  const query: Record<string, string | number> = {};
  if (params?.status && params.status !== "all") query.status = params.status;
  if (params?.service_type && params.service_type !== "all")
    query.service_type = params.service_type;
  if (params?.search?.trim()) query.search = params.search.trim();
  if (params?.page) query.page = params.page;
  if (params?.limit) query.limit = params.limit;

  return unwrapResponse<PaginatedLeadsDTO>(
    apiClient.get(API_ENDPOINTS.ADMIN.CONTACTS.LIST, { params: query }),
  );
}

export async function fetchAdminLeadStats(): Promise<LeadStatsDTO> {
  return unwrapResponse<LeadStatsDTO>(
    apiClient.get(API_ENDPOINTS.ADMIN.CONTACTS.STATS),
  );
}

export async function updateAdminLead(
  id: string,
  payload: {
    leadStatus?: ConsultationLeadStatus;
    assignedArchitect?: string;
    internalNotes?: string;
  },
): Promise<ConsultationLead> {
  return unwrapResponse<ConsultationLead>(
    apiClient.patch(API_ENDPOINTS.ADMIN.CONTACTS.BY_ID(id), payload),
  );
}

export async function deleteAdminLead(
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return unwrapResponse<{ deleted: boolean; id: string }>(
    apiClient.delete(API_ENDPOINTS.ADMIN.CONTACTS.BY_ID(id)),
  );
}
