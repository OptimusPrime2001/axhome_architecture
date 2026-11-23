import { deleteAdminProject } from "@apis";
import {
  PROJECTS_ADMIN_DETAIL_KEY,
  PROJECTS_ADMIN_LIST_KEY,
  PROJECTS_PUBLIC_LIST_KEY,
} from "@constants";
import type { ApiError } from "@lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type DeleteAdminProjectResult = {
  deleted: boolean;
  id: string;
};

export type DeleteAdminProjectOpts = {
  successCb?: (data: DeleteAdminProjectResult) => void;
  errorCb?: (error: ApiError) => void;
};

export const useDeleteAdminProject = (opts?: DeleteAdminProjectOpts) => {
  const queryClient = useQueryClient();

  const deleteProjectMutation = useMutation<
    DeleteAdminProjectResult,
    ApiError,
    string
  >({
    mutationFn: deleteAdminProject,
    onSuccess: (data, id) => {
      queryClient.removeQueries({
        queryKey: [PROJECTS_ADMIN_DETAIL_KEY, id],
      });
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
    deleteProjectMutation,
    isPending: deleteProjectMutation.isPending,
  };
};
