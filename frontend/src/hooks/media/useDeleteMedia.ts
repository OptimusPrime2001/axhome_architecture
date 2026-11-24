import { type DeleteMediaDTO, deleteAdminMedia } from "@apis";
import type { ApiError } from "@lib";
import { useMutation } from "@tanstack/react-query";

export type DeleteMediaVariables = {
  url?: string;
  key?: string;
};

export type DeleteMediaOpts = {
  successCb?: (data: DeleteMediaDTO) => void;
  errorCb?: (error: ApiError) => void;
};

export const useDeleteMedia = (opts?: DeleteMediaOpts) => {
  const deleteMediaMutation = useMutation<
    DeleteMediaDTO,
    ApiError,
    DeleteMediaVariables
  >({
    mutationFn: deleteAdminMedia,
    onSuccess: (data) => {
      opts?.successCb?.(data);
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    deleteMediaMutation,
    isPending: deleteMediaMutation.isPending,
  };
};
