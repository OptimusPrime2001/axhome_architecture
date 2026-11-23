import type { StateCreator } from "zustand";
import type { AdminContactsSlice, AdminContactsState } from "../types";

export const createAdminContactsSlice: StateCreator<
  AdminContactsState,
  [["zustand/devtools", never]],
  [],
  AdminContactsSlice
> = (set) => ({
  searchQuery: "",
  statusFilter: "all",
  serviceFilter: "all",
  currentPage: 1,
  selectedLeadId: null,
  isAddModalOpen: false,

  setSearchQuery: (query) =>
    set(
      { searchQuery: query, currentPage: 1 },
      false,
      "adminContacts/setSearchQuery",
    ),

  setStatusFilter: (status) =>
    set(
      { statusFilter: status, currentPage: 1 },
      false,
      "adminContacts/setStatusFilter",
    ),

  setServiceFilter: (service) =>
    set(
      { serviceFilter: service, currentPage: 1 },
      false,
      "adminContacts/setServiceFilter",
    ),

  setCurrentPage: (page) =>
    set({ currentPage: page }, false, "adminContacts/setCurrentPage"),

  setSelectedLeadId: (id) =>
    set({ selectedLeadId: id }, false, "adminContacts/setSelectedLeadId"),

  setIsAddModalOpen: (open) =>
    set({ isAddModalOpen: open }, false, "adminContacts/setIsAddModalOpen"),

  resetAfterLeadCreated: (leadId) =>
    set(
      {
        statusFilter: "all",
        currentPage: 1,
        selectedLeadId: leadId,
      },
      false,
      "adminContacts/resetAfterLeadCreated",
    ),
});
