import { type AuthUserDTO, updateAdminProfile } from "@apis";
import { AUTH_CURRENT_ACCOUNT_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useAdminAuthStore } from "@store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateAdminProfilePayload = {
  full_name: string;
  email: string;
};

export type UpdateAdminProfileOpts = {
  successCb?: (data: AuthUserDTO) => void;
  errorCb?: (error: ApiError) => void;
};

export const useUpdateAdminProfile = (opts?: UpdateAdminProfileOpts) => {
  const queryClient = useQueryClient();
  const setProfileFromDto = useAdminAuthStore(
    (state) => state.setProfileFromDto,
  );

  const updateProfileMutation = useMutation<
    AuthUserDTO,
    ApiError,
    UpdateAdminProfilePayload
  >({
    mutationFn: updateAdminProfile,
    onSuccess: (data) => {
      setProfileFromDto(data);
      queryClient.setQueryData([AUTH_CURRENT_ACCOUNT_KEY], data);
      opts?.successCb?.(data);
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    updateProfileMutation,
    isPending: updateProfileMutation.isPending,
  };
};
