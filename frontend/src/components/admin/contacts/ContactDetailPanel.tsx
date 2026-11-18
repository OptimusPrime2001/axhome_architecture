"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@components";
import { ADMIN_ARCHITECT_OPTIONS } from "@constants";
import type { ConsultationLead, ConsultationLeadStatus } from "@shared-types";
import {
  Building2,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Save,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import styles from "./ContactDetailPanel.module.scss";

export interface ContactDetailPanelProps {
  lead: ConsultationLead;
  onClose: () => void;
  onSave: (
    leadId: string,
    updates: {
      leadStatus: ConsultationLeadStatus;
      assignedArchitect: string;
      internalNotes: string;
    },
  ) => void;
}

const UNASSIGNED_ARCHITECT = "__unassigned__";

const STATUS_SELECT_OPTIONS: {
  value: ConsultationLeadStatus;
  label: string;
}[] = [
  { value: "pending", label: "Chờ xử lý (Cần liên hệ ngay)" },
  { value: "in_progress", label: "Đang tư vấn" },
  { value: "scheduled", label: "Đã hẹn khảo sát thực địa" },
  { value: "won", label: "Đã chốt hợp đồng" },
  { value: "lost", label: "Đã huỷ / Không phù hợp" },
];

export const ContactDetailPanel: React.FC<ContactDetailPanelProps> = ({
  lead,
  onClose,
  onSave,
}) => {
  const [status, setStatus] = useState<ConsultationLeadStatus>(lead.leadStatus);
  const [architect, setArchitect] = useState<string>(
    lead.assignedArchitect ?? "",
  );
  const [notes, setNotes] = useState<string>(lead.internalNotes ?? "");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(lead.id, {
      leadStatus: status,
      assignedArchitect: architect,
      internalNotes: notes.trim(),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const sanitizedPhone = lead.phone.replace(/\s+/g, "");

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrow}>HỒ SƠ TƯ VẤN</span>
            <span className={styles.codeBadge}>#{lead.code}</span>
          </div>
          <DialogTitle className={styles.customerName}>
            {lead.fullName}
          </DialogTitle>
          <DialogDescription className={styles.sourceMeta}>
            Tiếp nhận từ: <code>{lead.sourcePage}</code> • {lead.relativeTime}
          </DialogDescription>
        </DialogHeader>

        {/* Quick Contact Actions */}
        <div className={styles.quickActions}>
          <a href={`tel:${sanitizedPhone}`} className={styles.callBtn}>
            <Phone size={15} aria-hidden="true" />
            <span>Gọi {lead.phone}</span>
          </a>

          {lead.email ? (
            <a href={`mailto:${lead.email}`} className={styles.emailBtn}>
              <Mail size={15} aria-hidden="true" />
              <span>Gửi Email ({lead.email})</span>
            </a>
          ) : (
            <span className={styles.emailDisabled}>
              <Mail size={15} aria-hidden="true" />
              <span>Khách chưa để lại Email</span>
            </span>
          )}
        </div>

        {/* Form Info Block */}
        <div className={styles.infoSection}>
          <p className={styles.sectionTitle}>
            <Building2 size={14} aria-hidden="true" />
            <span>THÔNG TIN YÊU CẦU TỪ FORM WEBSITE</span>
          </p>

          <div className={styles.infoGrid}>
            <div className={styles.infoFull}>
              <span className={styles.infoLabel}>Dịch vụ quan tâm</span>
              <p className={styles.infoValueStrong}>{lead.serviceLabel}</p>
            </div>

            <div>
              <span className={styles.infoLabel}>Quy mô / Diện tích đất</span>
              <p className={styles.infoValue}>{lead.landSize || "Chưa rõ"}</p>
            </div>

            <div>
              <span className={styles.infoLabel}>Ngân sách dự kiến</span>
              <p className={styles.infoValue}>
                {lead.estimatedBudget || "Chưa xác định"}
              </p>
            </div>

            <div className={styles.infoFull}>
              <span className={styles.infoLabel}>Địa điểm xây dựng</span>
              <p className={styles.locationValue}>
                <MapPin size={14} aria-hidden="true" />
                <span>{lead.location}</span>
              </p>
            </div>

            {lead.referencedProjectTitle && (
              <div className={styles.infoFull}>
                <span className={styles.infoLabel}>Dự án tham chiếu</span>
                <Link
                  href={lead.sourcePage}
                  target="_blank"
                  className={styles.refProjectLink}
                >
                  <span>{lead.referencedProjectTitle}</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </Link>
              </div>
            )}

            <div className={styles.infoFull}>
              <span className={styles.infoLabel}>Tin nhắn của gia chủ</span>
              <blockquote className={styles.messageQuote}>
                “{lead.message || "Không có ghi chú thêm."}”
              </blockquote>
            </div>
          </div>
        </div>

        {/* Coordination & Status Form */}
        <form className={styles.coordinationForm} onSubmit={handleSave}>
          <p className={styles.sectionTitle}>
            <UserCog size={14} aria-hidden="true" />
            <span>ĐIỀU PHỐI & TRẠNG THÁI XỬ LÝ</span>
          </p>

          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="lead-status-select" className={styles.fieldLabel}>
                CẬP NHẬT TRẠNG THÁI
              </Label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setStatus(value as ConsultationLeadStatus)
                }
              >
                <SelectTrigger id="lead-status-select">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_SELECT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.fieldGroup}>
              <Label
                htmlFor="lead-architect-select"
                className={styles.fieldLabel}
              >
                KTS / CHỈ HUY TRƯỞNG PHỤ TRÁCH
              </Label>
              <Select
                value={architect || UNASSIGNED_ARCHITECT}
                onValueChange={(value) =>
                  setArchitect(value === UNASSIGNED_ARCHITECT ? "" : value)
                }
              >
                <SelectTrigger id="lead-architect-select">
                  <SelectValue placeholder="-- Chưa phân công --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UNASSIGNED_ARCHITECT}>
                    -- Chưa phân công --
                  </SelectItem>
                  {(ADMIN_ARCHITECT_OPTIONS ?? []).map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.fieldFull}>
              <Label
                htmlFor="lead-internal-notes"
                className={styles.fieldLabel}
              >
                GHI CHÚ NỘI BỘ (CHỈ ADMIN & KTS XEM)
              </Label>
              <Textarea
                id="lead-internal-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ghi lại lịch hẹn khảo sát, nhu cầu chi tiết sau khi trao đổi qua điện thoại..."
              />
            </div>
          </div>

          <div className={styles.formFooter}>
            {isSaved ? (
              <span className={styles.savedNotice} role="status">
                <Check size={15} aria-hidden="true" />
                <span>Đã lưu cập nhật hồ sơ</span>
              </span>
            ) : (
              <span className={styles.footerHint}>
                Thay đổi được cập nhật tức thì vào bảng theo dõi.
              </span>
            )}

            <div className={styles.footerButtons}>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onClose}
              >
                Đóng
              </Button>
              <Button
                type="submit"
                variant="dark"
                size="sm"
                leftIcon={<Save size={15} aria-hidden="true" />}
              >
                Lưu cập nhật
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
