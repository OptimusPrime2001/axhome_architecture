import type {
  ArchitecturalStyle,
  ProjectCategory,
  ProjectType,
} from "@shared-types";

export type CatalogueTypeFilter = "all" | ProjectType;
export type CatalogueCategoryFilter = "all" | ProjectCategory;
export type CatalogueStyleFilter = "all" | ArchitecturalStyle;
export type CatalogueSortOption = "newest" | "area_desc" | "views_desc";

export interface ProjectsCatalogueSlice {
  activeType: CatalogueTypeFilter;
  activeCategory: CatalogueCategoryFilter;
  activeStyle: CatalogueStyleFilter;
  searchQuery: string;
  sortBy: CatalogueSortOption;
  currentPage: number;

  setActiveType: (type: CatalogueTypeFilter) => void;
  setActiveCategory: (category: CatalogueCategoryFilter) => void;
  setActiveStyle: (style: CatalogueStyleFilter) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: CatalogueSortOption) => void;
  setCurrentPage: (page: number) => void;
  resetCatalogueFilters: () => void;
}

export interface ProjectsCatalogueState extends ProjectsCatalogueSlice {}
