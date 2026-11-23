import { fetchAdminLeads, type PaginatedLeadsDTO } from "@apis";
import { CONTACTS_ADMIN_LIST_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useQuery } from "@tanstack/react-query";

export interface AdminLeadsQueryParams {
  status?: string;
  service_type?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export type UseAdminLeadsOpts = {
  params?: AdminLeadsQueryParams;
  enabled?: boolean;
};

export const useAdminLeads = (opts?: UseAdminLeadsOpts) => {
  return useQuery<PaginatedLeadsDTO, ApiError>({
    queryKey: [CONTACTS_ADMIN_LIST_KEY, opts?.params ?? {}],
    queryFn: () => fetchAdminLeads(opts?.params),
    enabled: opts?.enabled ?? true,
  });
};
