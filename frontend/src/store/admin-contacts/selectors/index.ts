import type { ConsultationLead } from "@shared-types";
import type {
  AdminContactServiceFilter,
  AdminContactStatusFilter,
} from "../types";

export const adminContactsSelector = {
  getPendingCount: (leads: ConsultationLead[]) =>
    leads.filter((lead) => lead.leadStatus === "pending").length,

  getStatusCounts: (leads: ConsultationLead[]) => {
    const counts: Record<AdminContactStatusFilter, number> = {
      all: leads.length,
      pending: 0,
      in_progress: 0,
      scheduled: 0,
      won: 0,
      lost: 0,
    };
    for (const item of leads) {
      counts[item.leadStatus] += 1;
    }
    return counts;
  },

  filterLeads: (
    leads: ConsultationLead[],
    filters: {
      searchQuery: string;
      statusFilter: AdminContactStatusFilter;
      serviceFilter: AdminContactServiceFilter;
    },
  ) => {
    const normalizedQuery = filters.searchQuery.trim().toLowerCase();

    return leads.filter((lead) => {
      if (
        filters.statusFilter !== "all" &&
        lead.leadStatus !== filters.statusFilter
      ) {
        return false;
      }
      if (
        filters.serviceFilter !== "all" &&
        lead.serviceType !== filters.serviceFilter
      ) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const haystack = [
        lead.code,
        lead.fullName,
        lead.phone,
        lead.email ?? "",
        lead.location,
        lead.serviceLabel,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  },
};
