import {
  Badge,
  type BadgeProps,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components";
import type { ConsultationLead, ConsultationLeadStatus } from "@shared-types";
import { ChevronLeft, ChevronRight, Clock, Inbox } from "lucide-react";
import type React from "react";
import styles from "./ContactsLeadTable.module.scss";

export const LEAD_STATUS_META: Record<
  ConsultationLeadStatus,
  { label: string; badgeVariant: BadgeProps["variant"] }
> = {
  pending: { label: "Chờ xử lý", badgeVariant: "pending" },
  in_progress: { label: "Đang tư vấn", badgeVariant: "progress" },
  scheduled: { label: "Đã hẹn", badgeVariant: "concept" },
  won: { label: "Đã chốt HĐ", badgeVariant: "completed" },
  lost: { label: "Đã huỷ", badgeVariant: "cancelled" },
};

const getInitials = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};

export interface ContactsLeadTableProps {
  leads: ConsultationLead[];
  totalFilteredCount: number;
  selectedLeadId: string | null;
  onSelectLead: (leadId: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ContactsLeadTable: React.FC<ContactsLeadTableProps> = ({
  leads,
  totalFilteredCount,
  selectedLeadId,
  onSelectLead,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (leads.length === 0) {
    return (
      <Card className={styles.emptyState}>
        <Inbox size={32} className={styles.emptyIcon} aria-hidden="true" />
        <p className={styles.emptyTitle}>Không tìm thấy yêu cầu phù hợp</p>
        <p className={styles.emptyDesc}>
          Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái để xem thêm hồ sơ
          khách hàng.
        </p>
      </Card>
    );
  }

  return (
    <Card className={styles.tableCard}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>KHÁCH HÀNG</TableHead>
            <TableHead>LIÊN HỆ (SĐT / EMAIL)</TableHead>
            <TableHead>NHU CẦU TƯ VẤN & QUY MÔ</TableHead>
            <TableHead>TRẠNG THÁI & THỜI GIAN</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const isSelected = lead.id === selectedLeadId;
            const statusMeta = LEAD_STATUS_META[lead.leadStatus];
            return (
              <TableRow
                key={lead.id}
                className={`${styles.row} ${isSelected ? styles.selectedRow : ""}`}
                onClick={() => onSelectLead(lead.id)}
              >
                <TableCell>
                  <button
                    type="button"
                    className={styles.rowSelectButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLead(lead.id);
                    }}
                  >
                    <span className={styles.avatar} aria-hidden="true">
                      {getInitials(lead.fullName)}
                    </span>
                    <span className={styles.customerInfo}>
                      <span className={styles.customerName}>
                        {lead.fullName}
                      </span>
                      <span className={styles.customerSub}>
                        {lead.code} • {lead.location}
                      </span>
                    </span>
                  </button>
                </TableCell>

                <TableCell>
                  <div className={styles.contactCell}>
                    <span className={styles.phoneText}>{lead.phone}</span>
                    <span className={styles.emailText}>
                      {lead.email || "Chưa cung cấp email"}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className={styles.needCell}>
                    <span className={styles.serviceLabel}>
                      {lead.serviceLabel}
                    </span>
                    <span className={styles.scaleMeta}>
                      Quy mô: {lead.landSize}
                      {lead.estimatedBudget ? ` • ${lead.estimatedBudget}` : ""}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className={styles.statusCell}>
                    <Badge variant={statusMeta.badgeVariant}>
                      {statusMeta.label}
                    </Badge>
                    <span className={styles.timeMeta}>
                      <Clock size={12} aria-hidden="true" />
                      <span>{lead.relativeTime}</span>
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination Bar */}
      <div className={styles.paginationBar}>
        <p className={styles.paginationInfo}>
          Hiển thị <strong>{leads.length}</strong> trong tổng số{" "}
          <strong>{totalFilteredCount}</strong> yêu cầu tư vấn
        </p>

        {totalPages > 1 && (
          <div className={styles.paginationControls}>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Trang trước"
              className={styles.pageBtn}
            >
              <ChevronLeft size={15} />
            </Button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Button
                  key={page}
                  type="button"
                  variant={page === currentPage ? "dark" : "secondary"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={styles.pageBtn}
                >
                  {page}
                </Button>
              ),
            )}

            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="Trang sau"
              className={styles.pageBtn}
            >
              <ChevronRight size={15} />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
