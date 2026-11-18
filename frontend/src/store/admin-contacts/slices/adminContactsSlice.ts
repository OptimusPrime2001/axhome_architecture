import { ADMIN_MOCK_LEADS } from "@constants";
import type { StateCreator } from "zustand";
import type { AdminContactsSlice, AdminContactsState } from "../types";

export const createAdminContactsSlice: StateCreator<
  AdminContactsState,
  [["zustand/devtools", never]],
  [],
  AdminContactsSlice
> = (set) => ({
  leads: [...ADMIN_MOCK_LEADS],
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

  addLead: (lead) =>
    set(
      (state) => ({
        leads: [lead, ...state.leads],
        statusFilter: "all",
        currentPage: 1,
        selectedLeadId: lead.id,
      }),
      false,
      "adminContacts/addLead",
    ),

  updateLead: (leadId, updates) =>
    set(
      (state) => ({
        leads: state.leads.map((item) =>
          item.id === leadId
            ? {
                ...item,
                leadStatus: updates.leadStatus,
                assignedArchitect: updates.assignedArchitect || undefined,
                internalNotes: updates.internalNotes || undefined,
              }
            : item,
        ),
      }),
      false,
      "adminContacts/updateLead",
    ),
});
