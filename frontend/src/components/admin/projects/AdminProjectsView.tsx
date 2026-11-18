"use client";

import { Button } from "@components";
import {
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUS_LABELS,
  PROJECT_STYLE_LABELS,
  PROJECT_TYPE_LABELS,
} from "@constants";
import { adminProjectsSelector, useAdminProjectsStore } from "@store";
import { ChevronRight, Download, Plus, X } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useCallback, useMemo } from "react";
import styles from "./AdminProjectsView.module.scss";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { ProjectsFilterBar } from "./ProjectsFilterBar";
import { ProjectsKpiStrip } from "./ProjectsKpiStrip";
import { ProjectsTable } from "./ProjectsTable";

function escapeCsvCell(value: string | number): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export const AdminProjectsView: React.FC = () => {
  const state = useAdminProjectsStore();
  const {
    projects,
    filters,
    currentPage,
    pageSize,
    selectedIds,
    pendingDeleteIds,
    lastActionNotice,
    setLastActionNotice,
    setFilter,
    selectKpiType,
    resetFilters,
    setCurrentPage,
    setPageSize,
    toggleSelectRow,
    toggleSelectAllPage,
    clearSelection,
    setPendingDeleteIds,
    deleteProjects,
    toggleStatus,
    toggleFeatured,
    bulkUpdateStatus,
  } = state;

  const filteredProjects = useMemo(
    () => adminProjectsSelector.getFilteredProjects(state),
    [state],
  );

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProjects = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, safePage, pageSize]);

  const handleToggleSelectAllPage = useCallback(() => {
    toggleSelectAllPage(paginatedProjects.map((p) => p.id));
  }, [paginatedProjects, toggleSelectAllPage]);

  const handleToggleStatus = useCallback(
    (id: string) => {
      const target = projects.find((p) => p.id === id);
      const nextStatus = toggleStatus(id);
      if (target && nextStatus) {
        setLastActionNotice(
          `Đã chuyển "${target.title}" sang trạng thái ${PROJECT_STATUS_LABELS[nextStatus]}.`,
        );
      }
    },
    [projects, toggleStatus, setLastActionNotice],
  );

  const handleToggleFeatured = useCallback(
    (id: string) => {
      const target = projects.find((p) => p.id === id);
      const nextFeatured = toggleFeatured(id);
      if (target && nextFeatured !== null) {
        setLastActionNotice(
          nextFeatured
            ? `Đã ghim "${target.title}" vào danh sách Dự án nổi bật trang chủ.`
            : `Đã bỏ ghim "${target.title}" khỏi danh sách nổi bật.`,
        );
      }
    },
    [projects, toggleFeatured, setLastActionNotice],
  );

  const handleBulkUpdateStatus = useCallback(
    (status: "published" | "draft") => {
      if (selectedIds.length === 0) return;
      const count = selectedIds.length;
      bulkUpdateStatus(selectedIds, status);
      setLastActionNotice(
        `Đã cập nhật ${count} dự án sang trạng thái ${PROJECT_STATUS_LABELS[status]}.`,
      );
    },
    [selectedIds, bulkUpdateStatus, setLastActionNotice],
  );

  const handleConfirmDelete = useCallback(() => {
    if (pendingDeleteIds.length === 0) return;
    const removedCount = pendingDeleteIds.length;
    deleteProjects(pendingDeleteIds);
    setLastActionNotice(`Đã xóa ${removedCount} hồ sơ dự án khỏi danh mục.`);
  }, [pendingDeleteIds, deleteProjects, setLastActionNotice]);

  const handleExportCsv = useCallback(() => {
    const headers = [
      "Mã hồ sơ",
      "Tên dự án",
      "Phân loại",
      "Loại hình",
      "Phong cách",
      "Địa điểm",
      "KTS Chủ trì",
      "Diện tích sàn (m2)",
      "Diện tích đất (m2)",
      "Số tầng",
      "Năm hoàn thành",
      "Trạng thái",
      "Lượt xem",
    ];

    const rows = filteredProjects.map((p) => [
      `AX-${p.id.replace(/\D/g, "").padStart(2, "0")}`,
      p.title,
      PROJECT_TYPE_LABELS[p.projectType],
      PROJECT_CATEGORY_LABELS[p.category],
      PROJECT_STYLE_LABELS[p.style],
      p.city,
      p.leadArchitect,
      p.floorArea,
      p.landArea,
      p.floorsCount,
      p.completedYear,
      PROJECT_STATUS_LABELS[p.status],
      p.viewCount,
    ]);

    const csvContent =
      "\uFEFF" +
      [headers, ...rows]
        .map((row) => row.map(escapeCsvCell).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `axhome-du-an-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setLastActionNotice(
      `Đã xuất danh sách ${filteredProjects.length} dự án ra tệp CSV.`,
    );
  }, [filteredProjects, setLastActionNotice]);

  const pendingDeleteTitles = useMemo(
    () =>
      projects
        .filter((p) => pendingDeleteIds.includes(p.id))
        .map((p) => p.title),
    [projects, pendingDeleteIds],
  );

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
