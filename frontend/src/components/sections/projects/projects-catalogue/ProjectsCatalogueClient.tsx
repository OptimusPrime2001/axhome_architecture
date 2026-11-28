"use client";

import {
  Badge,
  Button,
  Container,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@components/animate-ui";
import { SafeImage } from "@components/common";
import {
  PROJECT_CATEGORY_LABELS,
  PROJECT_STYLE_LABELS,
  PROJECT_TYPE_LABELS,
} from "@constants";
import type { ArchitecturalStyle, Project, ProjectType } from "@shared-types";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from "lucide-react";
import Link from "next/link";
import styles from "./ProjectsCatalogue.module.scss";
import { useProjectsCatalogue } from "./useProjectsCatalogue";

type StyleFilter = "all" | ArchitecturalStyle;
type SortOption = "newest" | "area_desc" | "views_desc";

export interface ProjectsCatalogueClientProps {
  projects: Project[];
}

function getBadgeVariant(type: ProjectType) {
  switch (type) {
    case "completed":
      return "completed" as const;
    case "under_construction":
      return "progress" as const;
    case "concept":
      return "concept" as const;
  }
}

export const ProjectsCatalogueClient: React.FC<
  ProjectsCatalogueClientProps
> = ({ projects }) => {
  const {
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
  } = useProjectsCatalogue(projects);

  return (
    <section className={styles.section} aria-label="Danh sách dự án">
      <Container>
        {/* Filter Toolbar */}
        <ScrollReveal>
          <div className={styles.toolbar}>
            <div
              className={styles.tabsRow}
              role="tablist"
              aria-label="Phân loại dự án"
            >
              {(
                [
                  { key: "all", label: "Tất cả" },
                  { key: "concept", label: "Bản vẽ thiết kế 3D" },
                  { key: "under_construction", label: "Đang thi công" },
                  { key: "completed", label: "Đã hoàn thành" },
                ] as const
              ).map((tab) => {
                const isSelected = activeType === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`${styles.tabButton} ${isSelected ? styles.tabButtonActive : ""}`}
                    onClick={() => {
                      setActiveType(tab.key);
                      setCurrentPage(1);
                    }}
                  >
                    <span>{tab.label}</span>
                    <span className={styles.tabCount}>
                      ({typeCounts[tab.key]})
                    </span>
                  </button>
                );
              })}
            </div>

            <div className={styles.secondaryRow}>
              <div className={styles.categoryChips}>
                <span className={styles.filterLabel}>Loại hình:</span>
                {(
                  [
                    { key: "all", label: "Tất cả" },
                    { key: "villa", label: PROJECT_CATEGORY_LABELS.villa },
                    {
                      key: "townhouse",
                      label: PROJECT_CATEGORY_LABELS.townhouse,
                    },
                    { key: "mansion", label: PROJECT_CATEGORY_LABELS.mansion },
                  ] as const
                ).map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    className={`${styles.chipBtn} ${activeCategory === chip.key ? styles.chipBtnActive : ""}`}
                    onClick={() => {
                      setActiveCategory(chip.key);
                      setCurrentPage(1);
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              <div className={styles.controlsGroup}>
                <div className={styles.searchWrapper}>
                  <Search
                    size={14}
                    className={styles.searchIcon}
                    aria-hidden="true"
                  />
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Tìm tên dự án, địa điểm..."
                    aria-label="Tìm kiếm dự án"
                    className={styles.searchInput}
                  />
                </div>

                <div className={styles.selectBox}>
                  <Select
                    value={activeStyle}
                    onValueChange={(val) => {
                      setActiveStyle(val as StyleFilter);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger aria-label="Lọc theo phong cách">
                      <SelectValue placeholder="Phong cách" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Phong cách (Tất cả)</SelectItem>
                      <SelectItem value="modern">
                        {PROJECT_STYLE_LABELS.modern}
                      </SelectItem>
                      <SelectItem value="neoclassic">
                        {PROJECT_STYLE_LABELS.neoclassic}
                      </SelectItem>
                      <SelectItem value="minimalist">
                        {PROJECT_STYLE_LABELS.minimalist}
                      </SelectItem>
                      <SelectItem value="indochine">
                        {PROJECT_STYLE_LABELS.indochine}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={styles.selectBox}>
                  <Select
                    value={sortBy}
                    onValueChange={(val) => setSortBy(val as SortOption)}
                  >
                    <SelectTrigger aria-label="Sắp xếp dự án">
                      <SelectValue placeholder="Sắp xếp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Sắp xếp: Mới nhất</SelectItem>
                      <SelectItem value="area_desc">
                        Diện tích lớn nhất
                      </SelectItem>
                      <SelectItem value="views_desc">
                        Lượt xem cao nhất
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Catalogue Grid or Empty State */}
        {paginatedProjects.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>
              Không tìm thấy dự án phù hợp với bộ lọc hiện tại
            </p>
            <p className={styles.emptyDesc}>
              Bạn có thể thử từ khóa khác hoặc đặt lại bộ lọc để xem toàn bộ bộ
              sưu tập của Axhome.
            </p>
            {hasActiveFilters && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetFilters}
              >
                Đặt lại bộ lọc
              </Button>
            )}
          </div>
        ) : (
          <StaggerGroup
            key={`${activeType}-${activeCategory}-${activeStyle}-${safePage}-${searchQuery}`}
            className={styles.grid}
          >
            {paginatedProjects.map((project) => (
              <StaggerItem key={project.id}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.card}
                >
                  <div className={styles.mediaWrapper}>
                    <SafeImage
                      src={project.coverImage}
                      alt={project.title}
                      title={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.cardImage}
                    />
                    <div className={styles.topBadge}>
                      <Badge variant={getBadgeVariant(project.projectType)}>
                        {PROJECT_TYPE_LABELS[project.projectType]}
                      </Badge>
                    </div>
                    <span className={styles.categoryTag}>
                      {PROJECT_CATEGORY_LABELS[project.category]} •{" "}
                      {PROJECT_STYLE_LABELS[project.style]}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <p className={styles.location}>
                        <MapPin size={12} aria-hidden="true" />
                        <span>{project.city}</span>
                      </p>
                      <h2 className={styles.cardTitle}>{project.title}</h2>
                      <p className={styles.cardExcerpt}>{project.excerpt}</p>
                    </div>

                    <div className={styles.cardBottom}>
                      <div className={styles.specsBox}>
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>Diện tích</span>
                          <span className={styles.specValue}>
                            {project.landArea} m²
                          </span>
                        </div>
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>Quy mô</span>
                          <span className={styles.specValue}>
                            {project.floorsCount} tầng
                          </span>
                        </div>
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>Mặt tiền</span>
                          <span className={styles.specValue}>
                            {project.facadeWidth}m
                          </span>
                        </div>
                      </div>

                      <div className={styles.cardAction}>
                        <span>Xem chi tiết dự án</span>
                        <ArrowRight
                          size={14}
                          className={styles.actionArrow}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        {/* Pagination Bar */}
        {filteredProjects.length > 0 && (
          <div className={styles.paginationBar}>
            <p className={styles.resultSummary}>
              Hiển thị <strong>{paginatedProjects.length}</strong> /{" "}
              <strong>{filteredProjects.length}</strong> dự án
            </p>

            {totalPages > 1 && (
              <nav
                className={styles.pagination}
                aria-label="Phân trang danh sách dự án"
              >
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={safePage === 1}
                  onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                  aria-label="Trang trước"
                >
                  <ChevronLeft size={14} aria-hidden="true" />
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      className={`${styles.pageBtn} ${page === safePage ? styles.pageBtnActive : ""}`}
                      onClick={() => setCurrentPage(page)}
                      aria-current={page === safePage ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={safePage === totalPages}
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, safePage + 1))
                  }
                  aria-label="Trang sau"
                >
                  <ChevronRight size={14} aria-hidden="true" />
                </button>
              </nav>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};
