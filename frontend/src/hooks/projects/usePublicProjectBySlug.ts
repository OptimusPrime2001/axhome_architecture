import { fetchPublicProjectBySlug } from "@apis";
import { PROJECTS_PUBLIC_DETAIL_KEY } from "@constants";
import type { ApiError } from "@lib";
import type { Project } from "@shared-types";
import { useQuery } from "@tanstack/react-query";

export type UsePublicProjectBySlugOpts = {
  enabled?: boolean;
};

export const usePublicProjectBySlug = (
  slug: string,
  opts?: UsePublicProjectBySlugOpts,
) => {
  return useQuery<Project, ApiError>({
    queryKey: [PROJECTS_PUBLIC_DETAIL_KEY, slug],
    queryFn: () => fetchPublicProjectBySlug(slug),
    enabled: (opts?.enabled ?? true) && Boolean(slug),
  });
};
