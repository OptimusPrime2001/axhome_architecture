import { logoutAdmin } from "@apis";
import { AUTH_CURRENT_ACCOUNT_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useAdminAuthStore } from "@store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type AuthLogoutOpts = {
  successCb?: () => void;
  errorCb?: (error: ApiError) => void;
};

export const useAuthLogout = (opts?: AuthLogoutOpts) => {
  const queryClient = useQueryClient();
  const clearAuth = useAdminAuthStore((state) => state.clearAuth);

  const logoutMutation = useMutation<void, ApiError, void>({
    mutationFn: logoutAdmin,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: [AUTH_CURRENT_ACCOUNT_KEY] });
      clearAuth();
    },
    onSuccess: () => {
      opts?.successCb?.();
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    logoutMutation,
    isPending: logoutMutation.isPending,
  };
};
