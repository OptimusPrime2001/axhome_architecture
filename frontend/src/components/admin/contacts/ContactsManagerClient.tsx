"use client";

import {
  Button,
  Card,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import {
  type AdminContactServiceFilter,
  type AdminContactStatusFilter,
  adminContactsSelector,
  useAdminContactsStore,
} from "@store";
import { Download, Plus, Search } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { AddLeadModal } from "./AddLeadModal";
import { ContactDetailPanel } from "./ContactDetailPanel";
import { ContactsKpiStrip } from "./ContactsKpiStrip";
import { ContactsLeadTable } from "./ContactsLeadTable";
import styles from "./ContactsManagerClient.module.scss";

const ITEMS_PER_PAGE = 5;

const escapeCsvField = (value: string | undefined): string => {
  const str = (value ?? "").replace(/"/g, '""');
  return `"${str}"`;
};

export const ContactsManagerClient: React.FC = () => {
  const leads = useAdminContactsStore((state) => state.leads);
  const searchQuery = useAdminContactsStore((state) => state.searchQuery);
  const statusFilter = useAdminContactsStore((state) => state.statusFilter);
  const serviceFilter = useAdminContactsStore((state) => state.serviceFilter);
  const currentPage = useAdminContactsStore((state) => state.currentPage);
  const selectedLeadId = useAdminContactsStore((state) => state.selectedLeadId);
  const isAddModalOpen = useAdminContactsStore((state) => state.isAddModalOpen);

  const setSearchQuery = useAdminContactsStore((state) => state.setSearchQuery);
  const setStatusFilter = useAdminContactsStore(
    (state) => state.setStatusFilter,
  );
  const setServiceFilter = useAdminContactsStore(
    (state) => state.setServiceFilter,
  );
  const setCurrentPage = useAdminContactsStore((state) => state.setCurrentPage);
  const setSelectedLeadId = useAdminContactsStore(
    (state) => state.setSelectedLeadId,
  );
  const setIsAddModalOpen = useAdminContactsStore(
    (state) => state.setIsAddModalOpen,
  );
  const addLead = useAdminContactsStore((state) => state.addLead);
  const updateLead = useAdminContactsStore((state) => state.updateLead);

  const statusCounts = useMemo(
    () =>
      adminContactsSelector.getStatusCounts({
        leads,
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
        addLead,
        updateLead,
      }),
    [
      leads,
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
      addLead,
      updateLead,
    ],
  );

  const filteredLeads = useMemo(
    () =>
      adminContactsSelector.getFilteredLeads({
        leads,
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
        addLead,
        updateLead,
      }),
    [
      leads,
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
      addLead,
      updateLead,
    ],
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

    const rows = filteredLeads.map((lead) =>
      [
        escapeCsvField(lead.code),
        escapeCsvField(lead.fullName),
        escapeCsvField(lead.phone),
        escapeCsvField(lead.email),
        escapeCsvField(lead.serviceLabel),
        escapeCsvField(lead.landSize),
        escapeCsvField(lead.estimatedBudget),
        escapeCsvField(lead.location),
        escapeCsvField(lead.leadStatus),
        escapeCsvField(lead.assignedArchitect),
        escapeCsvField(lead.sourcePage),
      ].join(","),
    );

    const csvContent = `\uFEFF${[headers.join(","), ...rows].join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "axhome-yeu-cau-tu-van.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const STATUS_TABS: { key: AdminContactStatusFilter; label: string }[] = [
    { key: "all", label: `Tất cả (${statusCounts.all})` },
    { key: "pending", label: `Chờ xử lý (${statusCounts.pending})` },
    { key: "in_progress", label: `Đang tư vấn (${statusCounts.in_progress})` },
    { key: "scheduled", label: `Đã hẹn (${statusCounts.scheduled})` },
    { key: "won", label: `Đã chốt HĐ (${statusCounts.won})` },
    { key: "lost", label: `Đã huỷ (${statusCounts.lost})` },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>
            BẢNG ĐIỀU KHIỂN <span aria-hidden="true">›</span> YÊU CẦU TƯ VẤN
            KHÁCH HÀNG
          </p>
          <h1 className={styles.pageTitle}>
            Quản Lý Yêu Cầu Tư Vấn & Khách Hàng Tiềm Năng
          </h1>
          <p className={styles.pageSubtitle}>
            Tiếp nhận, phân loại và điều phối {leads.length} yêu cầu tư vấn
            thiết kế kiến trúc và thi công trọn gói từ website & hotline.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleExportCsv}
            leftIcon={<Download size={15} aria-hidden="true" />}
          >
            Xuất Dữ Liệu (CSV)
          </Button>

          <Button
            type="button"
            variant="dark"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus size={15} aria-hidden="true" />}
          >
            Thêm Yêu Cầu Thủ Công
          </Button>
        </div>
      </header>

      {/* KPI Strip */}
      <ContactsKpiStrip leads={leads} />

      {/* Filter & Search Bar */}
      <Card className={styles.filterToolbar}>
        <div className={styles.searchWrap}>
          <Search className={styles.searchIcon} size={15} aria-hidden="true" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên khách hàng, SĐT, địa điểm..."
            aria-label="Tìm kiếm yêu cầu tư vấn"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filtersRight}>
          <div
            className={styles.tabsRow}
            role="tablist"
            aria-label="Lọc theo trạng thái"
          >
            {STATUS_TABS.map((tab) => (
              <Button
                key={tab.key}
                type="button"
                role="tab"
                size="sm"
                variant={statusFilter === tab.key ? "dark" : "secondary"}
                aria-selected={statusFilter === tab.key}
                className={styles.filterTabBtn}
                onClick={() => setStatusFilter(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className={styles.serviceSelectWrap}>
            <Select
              value={serviceFilter}
              onValueChange={(value) =>
                setServiceFilter(value as AdminContactServiceFilter)
              }
            >
              <SelectTrigger
                aria-label="Lọc theo loại dịch vụ"
                className={styles.serviceTrigger}
              >
                <SelectValue placeholder="Tất cả loại dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại dịch vụ</SelectItem>
                <SelectItem value="design">Thiết kế kiến trúc</SelectItem>
                <SelectItem value="construction">Thi công xây dựng</SelectItem>
                <SelectItem value="full_package">Thi công trọn gói</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Lead Table */}
      <ContactsLeadTable
        leads={paginatedLeads}
        totalFilteredCount={filteredLeads.length}
        selectedLeadId={selectedLeadId}
        onSelectLead={setSelectedLeadId}
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Detail Modal */}
      {selectedLead && (
        <ContactDetailPanel
          key={selectedLead.id}
          lead={selectedLead}
          onClose={() => setSelectedLeadId(null)}
          onSave={updateLead}
        />
      )}

      {/* Manual Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreateLead={addLead}
        nextSequenceNumber={leads.length + 1}
      />
    </div>
  );
};
