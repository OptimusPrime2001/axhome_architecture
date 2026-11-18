import type { StateCreator } from "zustand";
import type { ProjectsCatalogueSlice, ProjectsCatalogueState } from "../types";

export const createProjectsCatalogueSlice: StateCreator<
  ProjectsCatalogueState,
  [["zustand/devtools", never]],
  [],
  ProjectsCatalogueSlice
> = (set) => ({
  activeType: "all",
  activeCategory: "all",
  activeStyle: "all",
  searchQuery: "",
  sortBy: "newest",
  currentPage: 1,

  setActiveType: (type) =>
    set(
      { activeType: type, currentPage: 1 },
      false,
      "projectsCatalogue/setActiveType",
    ),

  setActiveCategory: (category) =>
    set(
      { activeCategory: category, currentPage: 1 },
      false,
      "projectsCatalogue/setActiveCategory",
    ),

  setActiveStyle: (style) =>
    set(
      { activeStyle: style, currentPage: 1 },
      false,
      "projectsCatalogue/setActiveStyle",
    ),

  setSearchQuery: (query) =>
    set(
      { searchQuery: query, currentPage: 1 },
      false,
      "projectsCatalogue/setSearchQuery",
    ),

  setSortBy: (sort) =>
    set({ sortBy: sort, currentPage: 1 }, false, "projectsCatalogue/setSortBy"),

  setCurrentPage: (page) =>
    set({ currentPage: page }, false, "projectsCatalogue/setCurrentPage"),

  resetCatalogueFilters: () =>
    set(
      {
        activeType: "all",
        activeCategory: "all",
        activeStyle: "all",
        searchQuery: "",
        sortBy: "newest",
        currentPage: 1,
      },
      false,
      "projectsCatalogue/resetCatalogueFilters",
    ),
});
