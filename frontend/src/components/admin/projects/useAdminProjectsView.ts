"use client";

import { toast } from "@components";
import {
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUS_LABELS,
  PROJECT_STYLE_LABELS,
  PROJECT_TYPE_LABELS,
} from "@constants";
import {
  useAdminProjects,
  useDeleteAdminProject,
  useUpdateAdminProject,
  useUpdateAdminProjectStatus,
} from "@hooks";
import { adminProjectsSelector, useAdminProjectsStore } from "@store";
import { downloadCsvFile } from "@utils";
import { useCallback, useMemo } from "react";

export function useAdminProjectsView() {
  const {
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
    removeSelectedIds,
  } = useAdminProjectsStore();

  const { data: projectsData, isLoading } = useAdminProjects({
    params: { limit: 100 },
  });
  const projects = projectsData?.items ?? [];

  const { updateProjectStatusMutation } = useUpdateAdminProjectStatus({
    errorCb: (err) => {
      toast.error(
        err.message || "Không thể cập nhật trạng thái dự án lên máy chủ.",
      );
    },
  });

  const { updateProjectMutation } = useUpdateAdminProject({
    errorCb: (err) => {
      toast.error(
        err.message || "Không thể cập nhật trạng thái nổi bật lên máy chủ.",
      );
    },
  });

  const { deleteProjectMutation } = useDeleteAdminProject({
    errorCb: (err) => {
      toast.error(err.message || "Không thể đồng bộ xóa dự án với máy chủ.");
    },
  });

  const filteredProjects = useMemo(
    () => adminProjectsSelector.filterProjects(projects, filters),
    [projects, filters],
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
      if (!target) return;
      const nextStatus = target.status === "published" ? "draft" : "published";

      updateProjectStatusMutation.mutate(
        { id, status: nextStatus },
        {
          onSuccess: () => {
            const msg = `Đã chuyển "${target.title}" sang trạng thái ${PROJECT_STATUS_LABELS[nextStatus]}.`;
            setLastActionNotice(msg);
            toast.success("Cập nhật trạng thái", { description: msg });
          },
        },
      );
    },
    [projects, updateProjectStatusMutation, setLastActionNotice],
  );

  const handleToggleFeatured = useCallback(
    (id: string) => {
      const target = projects.find((p) => p.id === id);
      if (!target) return;
      const nextFeatured = !target.isFeatured;

      updateProjectMutation.mutate(
        { id, project: { ...target, isFeatured: nextFeatured } },
        {
          onSuccess: () => {
            const msg = nextFeatured
              ? `Đã ghim "${target.title}" vào danh sách Dự án nổi bật trang chủ.`
              : `Đã bỏ ghim "${target.title}" khỏi danh sách nổi bật.`;
            setLastActionNotice(msg);
            toast.success("Cập nhật nổi bật", { description: msg });
          },
        },
      );
    },
    [projects, updateProjectMutation, setLastActionNotice],
  );

  const handleBulkUpdateStatus = useCallback(
    async (status: "published" | "draft") => {
      if (selectedIds.length === 0) return;
      const count = selectedIds.length;
      try {
        await Promise.all(
          selectedIds.map((id) =>
            updateProjectStatusMutation.mutateAsync({ id, status }),
          ),
        );
        clearSelection();
        const msg = `Đã cập nhật ${count} dự án sang trạng thái ${PROJECT_STATUS_LABELS[status]}.`;
        setLastActionNotice(msg);
        toast.success("Cập nhật hàng loạt", { description: msg });
      } catch {
        // Handled by mutation errorCb
      }
    },
    [
      selectedIds,
      updateProjectStatusMutation,
      clearSelection,
      setLastActionNotice,
    ],
  );

  const handleConfirmDelete = useCallback(async () => {
    if (pendingDeleteIds.length === 0) return;
    const removedCount = pendingDeleteIds.length;
    try {
      await Promise.all(
        pendingDeleteIds.map((id) => deleteProjectMutation.mutateAsync(id)),
      );
      removeSelectedIds(pendingDeleteIds);
      const msg = `Đã xóa ${removedCount} hồ sơ dự án khỏi danh mục.`;
      setLastActionNotice(msg);
      toast.success("Xóa dự án thành công", { description: msg });
    } catch {
      // Handled by mutation errorCb
    }
  }, [
    pendingDeleteIds,
    deleteProjectMutation,
    removeSelectedIds,
    setLastActionNotice,
  ]);

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

    downloadCsvFile(
      `axhome-du-an-${new Date().toISOString().slice(0, 10)}.csv`,
      headers,
      rows,
    );

    const msg = `Đã xuất danh sách ${filteredProjects.length} dự án ra tệp CSV.`;
    setLastActionNotice(msg);
    toast.success("Xuất dữ liệu thành công", { description: msg });
  }, [filteredProjects, setLastActionNotice]);

  const pendingDeleteTitles = useMemo(
    () =>
      projects
        .filter((p) => pendingDeleteIds.includes(p.id))
        .map((p) => p.title),
    [projects, pendingDeleteIds],
  );

  return {
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
  };
}
