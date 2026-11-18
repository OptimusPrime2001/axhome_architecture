import { MOCK_PROJECTS } from "@constants";
import type { AdminProjectFilterState, Project } from "@shared-types";
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
> = (set, get) => ({
  projects: [...MOCK_PROJECTS],
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

  addProject: (project) =>
    set(
      (state) => ({
        projects: [project, ...state.projects],
      }),
      false,
      "adminProjects/addProject",
    ),

  updateProject: (id, updated) =>
    set(
      (state) => ({
        projects: state.projects.map((item) =>
          item.id === id ? updated : item,
        ),
      }),
      false,
      "adminProjects/updateProject",
    ),

  deleteProjects: (ids) =>
    set(
      (state) => ({
        projects: state.projects.filter((item) => !ids.includes(item.id)),
        selectedIds: state.selectedIds.filter((id) => !ids.includes(id)),
        pendingDeleteIds: [],
      }),
      false,
      "adminProjects/deleteProjects",
    ),

  toggleStatus: (id) => {
    const target = get().projects.find((p) => p.id === id);
    if (!target) return null;
    const nextStatus: Project["status"] =
      target.status === "published" ? "draft" : "published";

    set(
      (state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, status: nextStatus } : p,
        ),
      }),
      false,
      "adminProjects/toggleStatus",
    );

    return nextStatus;
  },

  toggleFeatured: (id) => {
    const target = get().projects.find((p) => p.id === id);
    if (!target) return null;
    const nextFeatured = !target.isFeatured;

    set(
      (state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, isFeatured: nextFeatured } : p,
        ),
      }),
      false,
      "adminProjects/toggleFeatured",
    );

    return nextFeatured;
  },

  bulkUpdateStatus: (ids, status) =>
    set(
      (state) => ({
        projects: state.projects.map((p) =>
          ids.includes(p.id) ? { ...p, status } : p,
        ),
        selectedIds: [],
      }),
      false,
      "adminProjects/bulkUpdateStatus",
    ),
});
