import {
  type AuthUserDTO,
  type UpdateAdminUserPayload,
  updateAdminUser,
} from "@apis";
import { AUTH_CURRENT_ACCOUNT_KEY, USERS_ADMIN_LIST_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateAdminUserOpts = {
  successCb?: (data: AuthUserDTO) => void;
  errorCb?: (error: ApiError) => void;
};

export const useUpdateAdminUser = (opts?: UpdateAdminUserOpts) => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation<
    AuthUserDTO,
    ApiError,
    UpdateAdminUserPayload
  >({
    mutationFn: updateAdminUser,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: [USERS_ADMIN_LIST_KEY] });
      void queryClient.invalidateQueries({
        queryKey: [AUTH_CURRENT_ACCOUNT_KEY],
      });
      opts?.successCb?.(data);
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    updateUserMutation,
    isPending: updateUserMutation.isPending,
  };
};
