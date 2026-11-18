import type { AdminContactStatusFilter, AdminContactsState } from "../types";

export const adminContactsSelector = {
  getPendingCount: (state: AdminContactsState) =>
    state.leads.filter((lead) => lead.leadStatus === "pending").length,

  getStatusCounts: (state: AdminContactsState) => {
    const counts: Record<AdminContactStatusFilter, number> = {
      all: state.leads.length,
      pending: 0,
      in_progress: 0,
      scheduled: 0,
      won: 0,
      lost: 0,
    };
    for (const item of state.leads) {
      counts[item.leadStatus] += 1;
    }
    return counts;
  },

  getFilteredLeads: (state: AdminContactsState) => {
    const { leads, searchQuery, statusFilter, serviceFilter } = state;
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.leadStatus !== statusFilter) {
        return false;
      }
      if (serviceFilter !== "all" && lead.serviceType !== serviceFilter) {
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
