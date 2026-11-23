import {
  fetchAdminProjects,
  type PaginatedProjectsDTO,
  type ProjectQueryParams,
} from "@apis";
import { PROJECTS_ADMIN_LIST_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useQuery } from "@tanstack/react-query";

export type UseAdminProjectsOpts = {
  params?: ProjectQueryParams;
  enabled?: boolean;
};

export const useAdminProjects = (opts?: UseAdminProjectsOpts) => {
  return useQuery<PaginatedProjectsDTO, ApiError>({
    queryKey: [PROJECTS_ADMIN_LIST_KEY, opts?.params ?? {}],
    queryFn: () => fetchAdminProjects(opts?.params),
    enabled: opts?.enabled ?? true,
  });
};
