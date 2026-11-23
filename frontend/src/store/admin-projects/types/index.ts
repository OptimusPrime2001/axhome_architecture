import type {
  AdminProjectFilterState,
  AdminProjectTypeFilter,
} from "@shared-types";

export interface AdminProjectsSlice {
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
  removeSelectedIds: (ids: string[]) => void;
}

export interface AdminProjectsState extends AdminProjectsSlice {}
