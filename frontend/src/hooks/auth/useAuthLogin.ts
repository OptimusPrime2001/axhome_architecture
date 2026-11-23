import { type LoginResponseDTO, loginAdmin } from "@apis";
import { AUTH_CURRENT_ACCOUNT_KEY } from "@constants";
import type { ApiError } from "@lib";
import type { AuthLoginPayload } from "@shared-types";
import { useAdminAuthStore } from "@store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cookieStorage } from "@utils";

export type AuthLoginOpts = {
  successCb?: (data: LoginResponseDTO) => void;
  errorCb?: (error: ApiError) => void;
};

export const useAuthLogin = (opts?: AuthLoginOpts) => {
  const queryClient = useQueryClient();
  const setProfileFromDto = useAdminAuthStore(
    (state) => state.setProfileFromDto,
  );

  const loginMutation = useMutation<
    LoginResponseDTO,
    ApiError,
    AuthLoginPayload
  >({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      if (data?.user) {
        setProfileFromDto(data.user);
      }
      cookieStorage.set("accessToken", data.access_token, {
        maxAge: data.expires_in,
        sameSite: "Strict",
      });
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
    loginMutation,
    isPending: loginMutation.isPending,
  };
};
