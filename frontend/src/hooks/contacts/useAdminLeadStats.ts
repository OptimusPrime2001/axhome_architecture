import { fetchAdminLeadStats, type LeadStatsDTO } from "@apis";
import { CONTACTS_ADMIN_STATS_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useQuery } from "@tanstack/react-query";

export type UseAdminLeadStatsOpts = {
  enabled?: boolean;
};

export const useAdminLeadStats = (opts?: UseAdminLeadStatsOpts) => {
  return useQuery<LeadStatsDTO, ApiError>({
    queryKey: [CONTACTS_ADMIN_STATS_KEY],
    queryFn: fetchAdminLeadStats,
    enabled: opts?.enabled ?? true,
  });
};
