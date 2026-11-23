import { fetchAdminProjectById } from "@apis";
import { PROJECTS_ADMIN_DETAIL_KEY } from "@constants";
import type { ApiError } from "@lib";
import type { Project } from "@shared-types";
import { useQuery } from "@tanstack/react-query";

export type UseAdminProjectDetailOpts = {
  enabled?: boolean;
};

export const useAdminProjectDetail = (
  id?: string,
  opts?: UseAdminProjectDetailOpts,
) => {
  return useQuery<Project, ApiError>({
    queryKey: [PROJECTS_ADMIN_DETAIL_KEY, id ?? ""],
    queryFn: () => fetchAdminProjectById(id as string),
    enabled: (opts?.enabled ?? true) && Boolean(id),
  });
};
