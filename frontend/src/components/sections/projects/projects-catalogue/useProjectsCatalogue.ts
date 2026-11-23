"use client";

import type { Project } from "@shared-types";
import { useProjectsCatalogueStore } from "@store";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const PAGE_SIZE = 6;

export function useProjectsCatalogue(projects: Project[]) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const activeType = useProjectsCatalogueStore((state) => state.activeType);
  const activeCategory = useProjectsCatalogueStore(
    (state) => state.activeCategory,
  );
  const activeStyle = useProjectsCatalogueStore((state) => state.activeStyle);
  const searchQuery = useProjectsCatalogueStore((state) => state.searchQuery);
  const sortBy = useProjectsCatalogueStore((state) => state.sortBy);
  const currentPage = useProjectsCatalogueStore((state) => state.currentPage);

  const setActiveType = useProjectsCatalogueStore(
    (state) => state.setActiveType,
  );
  const setActiveCategory = useProjectsCatalogueStore(
    (state) => state.setActiveCategory,
  );
  const setActiveStyle = useProjectsCatalogueStore(
    (state) => state.setActiveStyle,
  );
  const setSearchQuery = useProjectsCatalogueStore(
    (state) => state.setSearchQuery,
  );
  const setSortBy = useProjectsCatalogueStore((state) => state.setSortBy);
  const setCurrentPage = useProjectsCatalogueStore(
    (state) => state.setCurrentPage,
  );

  useEffect(() => {
    if (
      typeParam === "concept" ||
      typeParam === "under_construction" ||
      typeParam === "completed"
    ) {
      setActiveType(typeParam);
    }
  }, [typeParam, setActiveType]);

  const typeCounts = useMemo(
    () => ({
      all: projects.length,
      concept: projects.filter((p) => p.projectType === "concept").length,
      under_construction: projects.filter(
        (p) => p.projectType === "under_construction",
      ).length,
      completed: projects.filter((p) => p.projectType === "completed").length,
    }),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const matched = projects.filter((project) => {
      if (activeType !== "all" && project.projectType !== activeType) {
        return false;
      }
      if (activeCategory !== "all" && project.category !== activeCategory) {
        return false;
      }
      if (activeStyle !== "all" && project.style !== activeStyle) {
        return false;
      }
      if (normalizedQuery) {
        const haystack =
          `${project.title} ${project.city} ${project.location} ${project.excerpt}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }
      return true;
    });

    return [...matched].sort((a, b) => {
      if (sortBy === "area_desc") {
        return b.landArea - a.landArea;
      }
      if (sortBy === "views_desc") {
        return b.viewCount - a.viewCount;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [projects, activeType, activeCategory, activeStyle, searchQuery, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PAGE_SIZE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProjects = filteredProjects.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleResetFilters = () => {
    setActiveType("all");
    setActiveCategory("all");
    setActiveStyle("all");
    setSearchQuery("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    activeType !== "all" ||
    activeCategory !== "all" ||
    activeStyle !== "all" ||
    searchQuery.trim().length > 0;

  return {
    activeType,
    activeCategory,
    activeStyle,
    searchQuery,
    sortBy,
    setActiveType,
    setActiveCategory,
    setActiveStyle,
    setSearchQuery,
    setSortBy,
    setCurrentPage,
    typeCounts,
    filteredProjects,
    totalPages,
    safePage,
    paginatedProjects,
    handleResetFilters,
    hasActiveFilters,
  };
}
