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
  Skeleton,
} from "@components";
import type { AdminContactServiceFilter } from "@store";
import { Download, Plus, Search } from "lucide-react";
import type React from "react";
import { AddLeadModal } from "./AddLeadModal";
import { ContactDetailPanel } from "./ContactDetailPanel";
import { ContactsKpiStrip } from "./ContactsKpiStrip";
import { ContactsLeadTable } from "./ContactsLeadTable";
import styles from "./ContactsManagerClient.module.scss";
import { useContactsManager } from "./useContactsManager";

export const ContactsManagerClient: React.FC = () => {
  const {
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
    statusTabs: STATUS_TABS,
    setSearchQuery,
    setStatusFilter,
    setServiceFilter,
    setCurrentPage,
    setSelectedLeadId,
    setIsAddModalOpen,
    addLead,
    updateLead,
    handleExportCsv,
  } = useContactsManager();

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
            disabled={isLoading}
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

      {isLoading ? (
        <output aria-label="Đang tải danh sách yêu cầu tư vấn">
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
              height: "60px",
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
          {/* KPI Strip */}
          <ContactsKpiStrip leads={leads} />

          {/* Filter & Search Bar */}
          <Card className={styles.filterToolbar}>
            <div className={styles.searchWrap}>
              <Search
                className={styles.searchIcon}
                size={15}
                aria-hidden="true"
              />
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
                    <SelectItem value="construction">
                      Thi công xây dựng
                    </SelectItem>
                    <SelectItem value="full_package">
                      Thi công trọn gói
                    </SelectItem>
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
        </>
      )}

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
