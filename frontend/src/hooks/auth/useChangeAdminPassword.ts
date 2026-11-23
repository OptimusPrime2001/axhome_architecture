import { changeAdminPassword } from "@apis";
import type { ApiError } from "@lib";
import { useMutation } from "@tanstack/react-query";

export type ChangeAdminPasswordPayload = {
  current_password: string;
  new_password: string;
};

export type ChangeAdminPasswordOpts = {
  successCb?: (data: { password_updated: boolean }) => void;
  errorCb?: (error: ApiError) => void;
};

export const useChangeAdminPassword = (opts?: ChangeAdminPasswordOpts) => {
  const changePasswordMutation = useMutation<
    { password_updated: boolean },
    ApiError,
    ChangeAdminPasswordPayload
  >({
    mutationFn: changeAdminPassword,
    onSuccess: (data) => {
      opts?.successCb?.(data);
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    changePasswordMutation,
    isPending: changePasswordMutation.isPending,
  };
};
