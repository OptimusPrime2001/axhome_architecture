"use client";

import { Button, Skeleton } from "@components";
import { ChevronRight, Download, Plus, X } from "lucide-react";
import Link from "next/link";
import type React from "react";
import styles from "./AdminProjectsView.module.scss";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { ProjectsFilterBar } from "./ProjectsFilterBar";
import { ProjectsKpiStrip } from "./ProjectsKpiStrip";
import { ProjectsTable } from "./ProjectsTable";
import { useAdminProjectsView } from "./useAdminProjectsView";

export const AdminProjectsView: React.FC = () => {
  const {
    projects,
    isLoading,
    filters,
    pageSize,
    selectedIds,
    pendingDeleteIds,
    pendingDeleteTitles,
    lastActionNotice,
    setLastActionNotice,
    setFilter,
    selectKpiType,
    resetFilters,
    setCurrentPage,
    setPageSize,
    toggleSelectRow,
    clearSelection,
    setPendingDeleteIds,
    filteredProjects,
    safePage,
    paginatedProjects,
    handleToggleSelectAllPage,
    handleToggleStatus,
    handleToggleFeatured,
    handleBulkUpdateStatus,
    handleConfirmDelete,
    handleExportCsv,
  } = useAdminProjectsView();

  return (
    <div className={styles.pageWrapper}>
      {/* Header & Top Actions */}
      <header className={styles.pageHeader}>
        <div className={styles.headerCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/admin/dashboard" className={styles.breadcrumbLink}>
              Bảng điều khiển
            </Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span className={styles.breadcrumbCurrent}>Quản lý dự án</span>
          </nav>

          <h1 className={styles.pageTitle}>Quản Lý Danh Mục Dự Án</h1>
          <p className={styles.pageSubtitle}>
            Theo dõi và biên tập tập trung {projects.length} hồ sơ bản vẽ phối
            cảnh 3D, công trình đang thi công thực tế và dự án đã bàn giao trên
            hệ thống website AXHOME.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleExportCsv}
            disabled={isLoading}
            leftIcon={<Download size={16} aria-hidden="true" />}
          >
            Xuất Danh Sách (CSV)
          </Button>

          <Button
            href="/admin/projects/create"
            variant="dark"
            size="sm"
            leftIcon={<Plus size={16} aria-hidden="true" />}
          >
            Thêm Dự Án Mới
          </Button>
        </div>
      </header>

      {/* Inline Feedback Banner */}
      {lastActionNotice && (
        <output className={styles.feedbackBanner} aria-live="polite">
          <span>{lastActionNotice}</span>
          <button
            type="button"
            className={styles.feedbackCloseBtn}
            onClick={() => setLastActionNotice(null)}
            aria-label="Đóng thông báo"
          >
            <X size={15} />
          </button>
        </output>
      )}

      {isLoading ? (
        <output aria-label="Đang tải danh sách dự án">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {[1, 2, 3, 4].map((key) => (
              <Skeleton
                key={key}
                style={{ height: "96px", borderRadius: "10px" }}
              />
            ))}
          </div>
          <Skeleton
            style={{
              height: "58px",
              borderRadius: "10px",
              marginBottom: "16px",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {[1, 2, 3, 4, 5].map((key) => (
              <Skeleton
                key={key}
                style={{ height: "64px", borderRadius: "8px" }}
              />
            ))}
          </div>
        </output>
      ) : (
        <>
          {/* 4 KPI Summary Cards */}
          <ProjectsKpiStrip
            projects={projects}
            activeType={filters.projectType}
            onSelectType={selectKpiType}
          />

          {/* Search & Multi-filter Bar */}
          <ProjectsFilterBar
            projects={projects}
            filters={filters}
            onFilterChange={setFilter}
            onResetFilters={resetFilters}
          />

          {/* Main Data Table + Pagination */}
          <ProjectsTable
            paginatedProjects={paginatedProjects}
            totalFilteredCount={filteredProjects.length}
            currentPage={safePage}
            pageSize={pageSize}
            selectedIds={selectedIds}
            onToggleSelectAllPage={handleToggleSelectAllPage}
            onToggleSelectRow={toggleSelectRow}
            onClearSelection={clearSelection}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            onToggleStatus={handleToggleStatus}
            onToggleFeatured={handleToggleFeatured}
            onBulkUpdateStatus={handleBulkUpdateStatus}
            onRequestDelete={setPendingDeleteIds}
            onResetFilters={resetFilters}
          />
        </>
      )}

      {/* Confirmation Dialog for Deleting */}
      <DeleteProjectModal
        isOpen={pendingDeleteIds.length > 0}
        targetTitles={pendingDeleteTitles}
        onClose={() => setPendingDeleteIds([])}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
