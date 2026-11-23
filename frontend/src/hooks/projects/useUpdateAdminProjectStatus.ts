import { updateAdminProjectStatus } from "@apis";
import {
  PROJECTS_ADMIN_DETAIL_KEY,
  PROJECTS_ADMIN_LIST_KEY,
  PROJECTS_PUBLIC_LIST_KEY,
} from "@constants";
import type { ApiError } from "@lib";
import type { Project } from "@shared-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateAdminProjectStatusVariables = {
  id: string;
  status: Project["status"];
};

export type UpdateAdminProjectStatusOpts = {
  successCb?: (data: Project) => void;
  errorCb?: (error: ApiError) => void;
};

export const useUpdateAdminProjectStatus = (
  opts?: UpdateAdminProjectStatusOpts,
) => {
  const queryClient = useQueryClient();

  const updateProjectStatusMutation = useMutation<
    Project,
    ApiError,
    UpdateAdminProjectStatusVariables
  >({
    mutationFn: ({ id, status }) => updateAdminProjectStatus(id, status),
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
    updateProjectStatusMutation,
    isPending: updateProjectStatusMutation.isPending,
  };
};
