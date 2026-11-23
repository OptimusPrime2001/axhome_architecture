import { fetchAdminUsers, type ListAdminUsersDTO } from "@apis";
import { USERS_ADMIN_LIST_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useQuery } from "@tanstack/react-query";

export type UseAdminUsersOpts = {
  params?: { limit?: number; offset?: number };
  enabled?: boolean;
};

export const useAdminUsers = (opts?: UseAdminUsersOpts) => {
  return useQuery<ListAdminUsersDTO, ApiError>({
    queryKey: [USERS_ADMIN_LIST_KEY, opts?.params ?? {}],
    queryFn: () => fetchAdminUsers(opts?.params),
    enabled: opts?.enabled ?? true,
  });
};
