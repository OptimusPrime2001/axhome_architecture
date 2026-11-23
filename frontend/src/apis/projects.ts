import { API_ENDPOINTS } from "@constants";
import type { Project } from "@shared-types";
import { apiClient, unwrapResponse } from "../lib/api-client";

export interface PaginatedProjectsDTO {
  items: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProjectQueryParams {
  type?: string;
  category?: string;
  style?: string;
  city?: string;
  status?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

function normalizeProjectQueryParams(
  params?: ProjectQueryParams,
): Record<string, string | number | boolean> | undefined {
  if (!params) return undefined;
  const query: Record<string, string | number | boolean> = {};

  if (params.type && params.type !== "all") query.type = params.type;
  if (params.category && params.category !== "all")
    query.category = params.category;
  if (params.style && params.style !== "all") query.style = params.style;
  if (params.city && params.city !== "all") query.city = params.city;
  if (params.status && params.status !== "all") query.status = params.status;
  if (params.featured !== undefined) query.featured = params.featured;
  if (params.search?.trim()) query.search = params.search.trim();
  if (params.page) query.page = params.page;
  if (params.limit) query.limit = params.limit;

  return query;
}

export async function fetchPublicProjects(
  params?: ProjectQueryParams,
): Promise<PaginatedProjectsDTO> {
  return unwrapResponse<PaginatedProjectsDTO>(
    apiClient.get(API_ENDPOINTS.PUBLIC.PROJECTS, {
      params: normalizeProjectQueryParams(params),
    }),
  );
}

export async function fetchPublicProjectBySlug(slug: string): Promise<Project> {
  return unwrapResponse<Project>(
    apiClient.get(API_ENDPOINTS.PUBLIC.PROJECT_BY_SLUG(slug)),
  );
}

export async function fetchRelatedProjects(
  slug: string,
  limit = 3,
): Promise<Project[]> {
  return unwrapResponse<Project[]>(
    apiClient.get(API_ENDPOINTS.PUBLIC.RELATED_PROJECTS(slug), {
      params: { limit },
    }),
  );
}

export async function fetchAdminProjects(
  params?: ProjectQueryParams,
): Promise<PaginatedProjectsDTO> {
  return unwrapResponse<PaginatedProjectsDTO>(
    apiClient.get(API_ENDPOINTS.ADMIN.PROJECTS.LIST, {
      params: normalizeProjectQueryParams(params),
    }),
  );
}

export async function fetchAdminProjectById(id: string): Promise<Project> {
  return unwrapResponse<Project>(
    apiClient.get(API_ENDPOINTS.ADMIN.PROJECTS.BY_ID(id)),
  );
}

export async function createAdminProject(
  project: Omit<Project, "id" | "viewCount" | "createdAt"> | Project,
): Promise<Project> {
  return unwrapResponse<Project>(
    apiClient.post(API_ENDPOINTS.ADMIN.PROJECTS.LIST, project),
  );
}

export async function updateAdminProject(
  id: string,
  project: Partial<Project>,
): Promise<Project> {
  return unwrapResponse<Project>(
    apiClient.put(API_ENDPOINTS.ADMIN.PROJECTS.BY_ID(id), project),
  );
}

export async function updateAdminProjectStatus(
  id: string,
  status: Project["status"],
): Promise<Project> {
  return unwrapResponse<Project>(
    apiClient.patch(API_ENDPOINTS.ADMIN.PROJECTS.STATUS(id), {
      status,
    }),
  );
}

export async function deleteAdminProject(
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return unwrapResponse<{ deleted: boolean; id: string }>(
    apiClient.delete(API_ENDPOINTS.ADMIN.PROJECTS.BY_ID(id)),
  );
}
