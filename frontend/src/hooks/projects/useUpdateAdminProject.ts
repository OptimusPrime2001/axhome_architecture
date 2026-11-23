import { updateAdminProject } from "@apis";
import {
  PROJECTS_ADMIN_DETAIL_KEY,
  PROJECTS_ADMIN_LIST_KEY,
  PROJECTS_PUBLIC_LIST_KEY,
} from "@constants";
import type { ApiError } from "@lib";
import type { Project } from "@shared-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateAdminProjectVariables = {
  id: string;
  project: Partial<Project>;
};

export type UpdateAdminProjectOpts = {
  successCb?: (data: Project) => void;
  errorCb?: (error: ApiError) => void;
};

export const useUpdateAdminProject = (opts?: UpdateAdminProjectOpts) => {
  const queryClient = useQueryClient();

  const updateProjectMutation = useMutation<
    Project,
    ApiError,
    UpdateAdminProjectVariables
  >({
    mutationFn: ({ id, project }) => updateAdminProject(id, project),
    onSuccess: (data, variables) => {
      queryClient.setQueryData([PROJECTS_ADMIN_DETAIL_KEY, variables.id], data);
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
    updateProjectMutation,
    isPending: updateProjectMutation.isPending,
  };
};
