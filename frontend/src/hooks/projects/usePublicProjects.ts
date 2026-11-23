import {
  fetchPublicProjects,
  type PaginatedProjectsDTO,
  type ProjectQueryParams,
} from "@apis";
import { PROJECTS_PUBLIC_LIST_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useQuery } from "@tanstack/react-query";

export type UsePublicProjectsOpts = {
  params?: ProjectQueryParams;
  enabled?: boolean;
};

export const usePublicProjects = (opts?: UsePublicProjectsOpts) => {
  return useQuery<PaginatedProjectsDTO, ApiError>({
    queryKey: [PROJECTS_PUBLIC_LIST_KEY, opts?.params ?? {}],
    queryFn: () => fetchPublicProjects(opts?.params),
    enabled: opts?.enabled ?? true,
  });
};
