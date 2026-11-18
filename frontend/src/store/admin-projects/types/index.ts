import type {
  AdminProjectFilterState,
  AdminProjectTypeFilter,
  Project,
} from "@shared-types";

export interface AdminProjectsSlice {
  projects: Project[];
  filters: AdminProjectFilterState;
  currentPage: number;
  pageSize: number;
  selectedIds: string[];
  pendingDeleteIds: string[];
  lastActionNotice: string | null;

  setLastActionNotice: (message: string | null) => void;
  setFilter: <K extends keyof AdminProjectFilterState>(
    key: K,
    value: AdminProjectFilterState[K],
  ) => void;
  selectKpiType: (type: AdminProjectTypeFilter) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  toggleSelectRow: (id: string) => void;
  toggleSelectAllPage: (pageIds: string[]) => void;
  clearSelection: () => void;
  setPendingDeleteIds: (ids: string[]) => void;

  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Project) => void;
  deleteProjects: (ids: string[]) => void;
  toggleStatus: (id: string) => Project["status"] | null;
  toggleFeatured: (id: string) => boolean | null;
  bulkUpdateStatus: (ids: string[], status: Project["status"]) => void;
}

export interface AdminProjectsState extends AdminProjectsSlice {}
