import { type AuthUserDTO, getCurrentAdmin } from "@apis";
import { AUTH_CURRENT_ACCOUNT_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useQuery } from "@tanstack/react-query";

export type UseCurrentAdminOpts = {
  enabled?: boolean;
};

export const useCurrentAdmin = (opts?: UseCurrentAdminOpts) => {
  return useQuery<AuthUserDTO, ApiError>({
    queryKey: [AUTH_CURRENT_ACCOUNT_KEY],
    queryFn: getCurrentAdmin,
    enabled: opts?.enabled ?? true,
    retry: false,
  });
};
