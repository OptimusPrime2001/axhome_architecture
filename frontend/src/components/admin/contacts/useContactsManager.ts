"use client";

import { toast } from "@components";
import {
  useAdminLeads,
  useSubmitConsultationLead,
  useUpdateAdminLead,
} from "@hooks";
import type { ConsultationLead, ConsultationLeadStatus } from "@shared-types";
import {
  type AdminContactStatusFilter,
  adminContactsSelector,
  useAdminContactsStore,
} from "@store";
import { downloadCsvFile } from "@utils";
import { useCallback, useMemo } from "react";

const ITEMS_PER_PAGE = 5;

export function useContactsManager() {
  const {
    searchQuery,
    statusFilter,
    serviceFilter,
    currentPage,
    selectedLeadId,
    isAddModalOpen,
    setSearchQuery,
    setStatusFilter,
    setServiceFilter,
    setCurrentPage,
    setSelectedLeadId,
    setIsAddModalOpen,
    resetAfterLeadCreated,
  } = useAdminContactsStore();

  const { data: leadsData, isLoading } = useAdminLeads({
    params: { limit: 100 },
  });
  const leads = leadsData?.items ?? [];

  const { submitLeadMutation } = useSubmitConsultationLead({
    successCb: (saved) => {
      resetAfterLeadCreated(saved.id);
      toast.success("Tạo yêu cầu thành công", {
        description: `Đã tiếp nhận yêu cầu tư vấn của "${saved.fullName}".`,
      });
    },
    errorCb: (err) => {
      toast.error(
        err.message || "Không thể đồng bộ yêu cầu tư vấn lên máy chủ.",
      );
    },
  });

  const { updateLeadMutation } = useUpdateAdminLead({
    successCb: () => {
      toast.success("Cập nhật thành công", {
        description: "Đã lưu cập nhật trạng thái và ghi chú xử lý khách hàng.",
      });
    },
    errorCb: (err) => {
      toast.error(err.message || "Không thể lưu cập nhật yêu cầu tư vấn.");
    },
  });

  const statusCounts = useMemo(
    () => adminContactsSelector.getStatusCounts(leads),
    [leads],
  );

  const filteredLeads = useMemo(
    () =>
      adminContactsSelector.filterLeads(leads, {
        searchQuery,
        statusFilter,
        serviceFilter,
      }),
    [leads, searchQuery, statusFilter, serviceFilter],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedLeads = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredLeads.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLeads, safePage]);

  const selectedLead = useMemo(
    () => leads.find((item) => item.id === selectedLeadId) ?? null,
    [leads, selectedLeadId],
  );

  const addLead = useCallback(
    (lead: ConsultationLead) => {
      submitLeadMutation.mutate({
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        serviceType: lead.serviceType,
        estimatedBudget: lead.estimatedBudget,
        landSize: lead.landSize,
        location: lead.location,
        message: lead.message,
        sourcePage: lead.sourcePage,
        referencedProjectId: lead.referencedProjectId,
        referencedProjectTitle: lead.referencedProjectTitle,
      });
    },
    [submitLeadMutation],
  );

  const updateLead = useCallback(
    (
      leadId: string,
      updates: {
        leadStatus: ConsultationLeadStatus;
        assignedArchitect: string;
        internalNotes: string;
      },
    ) => {
      updateLeadMutation.mutate({
        id: leadId,
        payload: {
          leadStatus: updates.leadStatus,
          assignedArchitect: updates.assignedArchitect || undefined,
          internalNotes: updates.internalNotes || undefined,
        },
      });
    },
    [updateLeadMutation],
  );

  const handleExportCsv = () => {
    const headers = [
      "Mã hồ sơ",
      "Họ và tên",
      "Số điện thoại",
      "Email",
      "Nhu cầu tư vấn",
      "Quy mô",
      "Ngân sách dự kiến",
      "Địa điểm",
      "Trạng thái",
      "KTS phụ trách",
      "Nguồn",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.code,
      lead.fullName,
      lead.phone,
      lead.email,
      lead.serviceLabel,
      lead.landSize,
      lead.estimatedBudget,
      lead.location,
      lead.leadStatus,
      lead.assignedArchitect,
      lead.sourcePage,
    ]);

    downloadCsvFile("axhome-yeu-cau-tu-van.csv", headers, rows);

    toast.success("Xuất dữ liệu thành công", {
      description: `Đã xuất danh sách ${filteredLeads.length} yêu cầu tư vấn ra tệp CSV.`,
    });
  };

  const statusTabs: { key: AdminContactStatusFilter; label: string }[] = [
    { key: "all", label: `Tất cả (${statusCounts.all})` },
    { key: "pending", label: `Chờ xử lý (${statusCounts.pending})` },
    { key: "in_progress", label: `Đang tư vấn (${statusCounts.in_progress})` },
    { key: "scheduled", label: `Đã hẹn (${statusCounts.scheduled})` },
    { key: "won", label: `Đã chốt HĐ (${statusCounts.won})` },
    { key: "lost", label: `Đã huỷ (${statusCounts.lost})` },
  ];

  return {
    leads,
    isLoading,
    searchQuery,
    statusFilter,
    serviceFilter,
    selectedLeadId,
    selectedLead,
    isAddModalOpen,
    filteredLeads,
    paginatedLeads,
    totalPages,
    safePage,
    statusTabs,
    setSearchQuery,
    setStatusFilter,
    setServiceFilter,
    setCurrentPage,
    setSelectedLeadId,
    setIsAddModalOpen,
    addLead,
    updateLead,
    handleExportCsv,
  };
}
