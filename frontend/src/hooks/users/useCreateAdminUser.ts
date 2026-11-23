import {
  type AuthUserDTO,
  type CreateAdminUserPayload,
  createAdminUser,
} from "@apis";
import { USERS_ADMIN_LIST_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CreateAdminUserOpts = {
  successCb?: (data: AuthUserDTO) => void;
  errorCb?: (error: ApiError) => void;
};

export const useCreateAdminUser = (opts?: CreateAdminUserOpts) => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation<
    AuthUserDTO,
    ApiError,
    CreateAdminUserPayload
  >({
    mutationFn: createAdminUser,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: [USERS_ADMIN_LIST_KEY] });
      opts?.successCb?.(data);
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    createUserMutation,
    isPending: createUserMutation.isPending,
  };
};
