import { createAdminProject } from "@apis";
import { PROJECTS_ADMIN_LIST_KEY, PROJECTS_PUBLIC_LIST_KEY } from "@constants";
import type { ApiError } from "@lib";
import type { Project } from "@shared-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CreateAdminProjectPayload =
  | Omit<Project, "id" | "viewCount" | "createdAt">
  | Project;

export type CreateAdminProjectOpts = {
  successCb?: (data: Project) => void;
  errorCb?: (error: ApiError) => void;
};

export const useCreateAdminProject = (opts?: CreateAdminProjectOpts) => {
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation<
    Project,
    ApiError,
    CreateAdminProjectPayload
  >({
    mutationFn: createAdminProject,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: [PROJECTS_ADMIN_LIST_KEY],
      });
      void queryClient.invalidateQueries({
        queryKey: [PROJECTS_PUBLIC_LIST_KEY],
      });
      opts?.successCb?.(data);
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    createProjectMutation,
    isPending: createProjectMutation.isPending,
  };
};
