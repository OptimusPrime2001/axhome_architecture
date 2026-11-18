import type { ProjectsCatalogueState } from "../types";

export const projectsCatalogueSelector = {
  hasActiveFilters: (state: ProjectsCatalogueState) =>
    state.activeType !== "all" ||
    state.activeCategory !== "all" ||
    state.activeStyle !== "all" ||
    state.searchQuery.trim().length > 0,
};
