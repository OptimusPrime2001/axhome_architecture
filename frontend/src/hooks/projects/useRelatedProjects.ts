import { fetchRelatedProjects } from "@apis";
import { PROJECTS_RELATED_KEY } from "@constants";
import type { ApiError } from "@lib";
import type { Project } from "@shared-types";
import { useQuery } from "@tanstack/react-query";

export type UseRelatedProjectsOpts = {
  limit?: number;
  enabled?: boolean;
};

export const useRelatedProjects = (
  slug: string,
  opts?: UseRelatedProjectsOpts,
) => {
  const limit = opts?.limit ?? 3;

  return useQuery<Project[], ApiError>({
    queryKey: [PROJECTS_RELATED_KEY, slug, limit],
    queryFn: () => fetchRelatedProjects(slug, limit),
    enabled: (opts?.enabled ?? true) && Boolean(slug),
  });
};
