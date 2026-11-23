import type { AdminProjectFilterState } from "@shared-types";
import type { StateCreator } from "zustand";
import type { AdminProjectsSlice, AdminProjectsState } from "../types";

export const INITIAL_ADMIN_PROJECT_FILTERS: AdminProjectFilterState = {
  search: "",
  projectType: "all",
  category: "all",
  style: "all",
  status: "all",
};

export const createAdminProjectsSlice: StateCreator<
  AdminProjectsState,
  [["zustand/devtools", never]],
  [],
  AdminProjectsSlice
> = (set) => ({
  filters: INITIAL_ADMIN_PROJECT_FILTERS,
  currentPage: 1,
  pageSize: 6,
  selectedIds: [],
  pendingDeleteIds: [],
  lastActionNotice: null,

  setLastActionNotice: (message) =>
    set(
      { lastActionNotice: message },
      false,
      "adminProjects/setLastActionNotice",
    ),

  setFilter: (key, value) =>
    set(
      (state) => ({
        filters: { ...state.filters, [key]: value },
        currentPage: 1,
        selectedIds: [],
      }),
      false,
      "adminProjects/setFilter",
    ),

  selectKpiType: (type) =>
    set(
      (state) => ({
        filters: { ...state.filters, projectType: type },
        currentPage: 1,
        selectedIds: [],
      }),
      false,
      "adminProjects/selectKpiType",
    ),

  resetFilters: () =>
    set(
      {
        filters: INITIAL_ADMIN_PROJECT_FILTERS,
        currentPage: 1,
        selectedIds: [],
      },
      false,
      "adminProjects/resetFilters",
    ),

  setCurrentPage: (page) =>
    set({ currentPage: page }, false, "adminProjects/setCurrentPage"),

  setPageSize: (size) =>
    set({ pageSize: size, currentPage: 1 }, false, "adminProjects/setPageSize"),

  toggleSelectRow: (id) =>
    set(
      (state) => ({
        selectedIds: state.selectedIds.includes(id)
          ? state.selectedIds.filter((item) => item !== id)
          : [...state.selectedIds, id],
      }),
      false,
      "adminProjects/toggleSelectRow",
    ),

  toggleSelectAllPage: (pageIds) =>
    set(
      (state) => {
        const allSelected =
          pageIds.length > 0 &&
          pageIds.every((id) => state.selectedIds.includes(id));
        if (allSelected) {
          return {
            selectedIds: state.selectedIds.filter(
              (id) => !pageIds.includes(id),
            ),
          };
        }
        return {
          selectedIds: Array.from(new Set([...state.selectedIds, ...pageIds])),
        };
      },
      false,
      "adminProjects/toggleSelectAllPage",
    ),

  clearSelection: () =>
    set({ selectedIds: [] }, false, "adminProjects/clearSelection"),

  setPendingDeleteIds: (ids) =>
    set({ pendingDeleteIds: ids }, false, "adminProjects/setPendingDeleteIds"),

  removeSelectedIds: (ids) =>
    set(
      (state) => ({
        selectedIds: state.selectedIds.filter((id) => !ids.includes(id)),
        pendingDeleteIds: [],
      }),
      false,
      "adminProjects/removeSelectedIds",
    ),
});
