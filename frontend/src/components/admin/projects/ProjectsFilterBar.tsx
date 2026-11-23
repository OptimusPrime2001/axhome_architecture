import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import {
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUS_LABELS,
  PROJECT_STYLE_LABELS,
} from "@constants";
import type {
  AdminProjectCategoryFilter,
  AdminProjectFilterState,
  AdminProjectStatusFilter,
  AdminProjectStyleFilter,
  AdminProjectTypeFilter,
  Project,
} from "@shared-types";
import { RotateCcw, Search, X } from "lucide-react";
import type React from "react";
import styles from "./ProjectsFilterBar.module.scss";

export interface ProjectsFilterBarProps {
  projects: Project[];
  filters: AdminProjectFilterState;
  onFilterChange: <K extends keyof AdminProjectFilterState>(
    key: K,
    value: AdminProjectFilterState[K],
  ) => void;
  onResetFilters: () => void;
}

export const ProjectsFilterBar: React.FC<ProjectsFilterBarProps> = ({
  projects,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const counts = {
    all: projects.length,
    concept: projects.filter((p) => p.projectType === "concept").length,
    under_construction: projects.filter(
      (p) => p.projectType === "under_construction",
    ).length,
    completed: projects.filter((p) => p.projectType === "completed").length,
  };

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.projectType !== "all" ||
    filters.category !== "all" ||
    filters.style !== "all" ||
    filters.status !== "all";

  const typeTabs: ReadonlyArray<{
    key: AdminProjectTypeFilter;
    label: string;
    count: number;
  }> = [
    { key: "all", label: "Tất cả dự án", count: counts.all },
    { key: "concept", label: "Bản vẽ 3D", count: counts.concept },
    {
      key: "under_construction",
      label: "Đang thi công",
      count: counts.under_construction,
    },
    { key: "completed", label: "Đã hoàn thành", count: counts.completed },
  ];

  return (
    <section
      className={styles.filterCard}
      aria-label="Bộ lọc và tìm kiếm danh sách dự án"
    >
      <div className={styles.topBar}>
        <div
          className={styles.typeTabs}
          role="tablist"
          aria-label="Phân loại dự án"
        >
          {typeTabs.map((tab) => {
            const isActive = filters.projectType === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.typeTab} ${isActive ? styles.typeTabActive : ""}`}
                onClick={() => onFilterChange("projectType", tab.key)}
              >
                <span>{tab.label}</span>
                <span className={styles.tabCount}>{tab.count}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.resetButton}
          onClick={onResetFilters}
          disabled={!hasActiveFilters}
        >
          <RotateCcw size={14} aria-hidden="true" />
          <span>Xóa bộ lọc</span>
        </button>
      </div>

      <div className={styles.controlsGrid}>
        {/* Search Input */}
        <div className={styles.fieldGroup}>
          <Label htmlFor="admin-project-search" className={styles.fieldLabel}>
            TÌM KIẾM HỒ SƠ & CÔNG TRÌNH
          </Label>
          <div className={styles.searchBox}>
            <Search
              size={15}
              className={styles.searchIcon}
              aria-hidden="true"
            />
            <Input
              id="admin-project-search"
              type="search"
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              placeholder="Tìm tên dự án, mã hồ sơ (AX-xx), địa điểm, KTS chủ trì..."
              className={styles.searchInput}
            />
            {filters.search && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => onFilterChange("search", "")}
                aria-label="Xóa từ khóa tìm kiếm"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category Select */}
        <div className={styles.fieldGroup}>
          <Label htmlFor="admin-filter-category" className={styles.fieldLabel}>
            LOẠI HÌNH CÔNG TRÌNH
          </Label>
          <Select
            value={filters.category}
            onValueChange={(value) =>
              onFilterChange("category", value as AdminProjectCategoryFilter)
            }
          >
            <SelectTrigger id="admin-filter-category">
              <SelectValue placeholder="Tất cả loại hình" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại hình</SelectItem>
              {Object.entries(PROJECT_CATEGORY_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Architectural Style Select */}
        <div className={styles.fieldGroup}>
          <Label htmlFor="admin-filter-style" className={styles.fieldLabel}>
            PHONG CÁCH KIẾN TRÚC
          </Label>
          <Select
            value={filters.style}
            onValueChange={(value) =>
              onFilterChange("style", value as AdminProjectStyleFilter)
            }
          >
            <SelectTrigger id="admin-filter-style">
              <SelectValue placeholder="Tất cả phong cách" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả phong cách</SelectItem>
              {Object.entries(PROJECT_STYLE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Publication Status Select */}
        <div className={styles.fieldGroup}>
          <Label htmlFor="admin-filter-status" className={styles.fieldLabel}>
            TRẠNG THÁI XUẤT BẢN
          </Label>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              onFilterChange("status", value as AdminProjectStatusFilter)
            }
          >
            <SelectTrigger id="admin-filter-status">
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              {Object.entries(PROJECT_STATUS_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};
