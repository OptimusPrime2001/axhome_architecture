import { deleteAdminUser } from "@apis";
import { USERS_ADMIN_LIST_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type DeleteAdminUserOpts = {
  successCb?: (data: { deleted: boolean }) => void;
  errorCb?: (error: ApiError) => void;
};

export const useDeleteAdminUser = (opts?: DeleteAdminUserOpts) => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation<
    { deleted: boolean },
    ApiError,
    string
  >({
    mutationFn: deleteAdminUser,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: [USERS_ADMIN_LIST_KEY] });
      opts?.successCb?.(data);
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    deleteUserMutation,
    isPending: deleteUserMutation.isPending,
  };
};
