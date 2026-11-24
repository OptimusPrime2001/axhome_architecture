"use client";

import {
  Badge,
  type BadgeProps,
  Button,
  Card,
  CardContent,
  Skeleton,
} from "@components";
import { CONSULTATION_LEAD_STATUSES } from "@constants";
import { useAdminLeads } from "@hooks";
import type { ConsultationLeadStatus } from "@shared-types";
import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type React from "react";
import styles from "./DashboardRecentLeads.module.scss";

const LEAD_STATUS_META: Record<
  ConsultationLeadStatus,
  { label: string; badgeVariant: BadgeProps["variant"] }
> = {
  pending: { label: "Chờ Xử Lý", badgeVariant: "pending" },
  in_progress: { label: "Đang Tư Vấn", badgeVariant: "progress" },
  scheduled: { label: "Đã Hẹn", badgeVariant: "concept" },
  won: { label: "Đã Chốt HĐ", badgeVariant: "completed" },
  lost: { label: "Đã Huỷ", badgeVariant: "cancelled" },
};

const getInitial = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  const lastWord = parts[parts.length - 1] ?? fullName;
  return lastWord.charAt(0).toUpperCase();
};

export const DashboardRecentLeads: React.FC = () => {
  const { data: leadsData, isLoading } = useAdminLeads({
    params: { limit: 100 },
  });
  const leads = leadsData?.items ?? [];
  const pendingCount = leads.filter(
    (lead) => lead.leadStatus === CONSULTATION_LEAD_STATUSES.PENDING,
  ).length;
  const recentLeads = leads.slice(0, 4);

  return (
    <Card>
      <CardContent className={styles.cardInner}>
        <div className={styles.header}>
          <div>
            <div className={styles.titleRow}>
              <h2 className={styles.title}>Yêu Cầu Tư Vấn Mới Nhất</h2>
              <Badge variant="pending" showDot={false}>
                {pendingCount} Chờ
              </Badge>
            </div>
            <p className={styles.subtitle}>
              Khách hàng quan tâm dịch vụ kiến trúc & xây dựng
            </p>
          </div>

          <Link href="/admin/contacts" className={styles.viewAllLink}>
            <span>Tất cả yêu cầu</span>
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {isLoading ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {[1, 2, 3].map((key) => (
              <Skeleton
                key={key}
                style={{ height: "56px", borderRadius: "8px" }}
              />
            ))}
          </div>
        ) : recentLeads.length === 0 ? (
          <p className={styles.subtitle} style={{ padding: "16px 0" }}>
            Hiện chưa có yêu cầu tư vấn nào từ khách hàng.
          </p>
        ) : (
          <ul className={styles.leadList}>
            {recentLeads.map((lead) => {
              const statusMeta =
                LEAD_STATUS_META[lead.leadStatus] ?? LEAD_STATUS_META.pending;
              return (
                <li key={lead.id} className={styles.leadItem}>
                  <div className={styles.avatar} aria-hidden="true">
                    {getInitial(lead.fullName)}
                  </div>

                  <div className={styles.leadInfo}>
                    <div className={styles.leadTop}>
                      <span className={styles.leadName}>{lead.fullName}</span>
                      <span className={styles.leadPhone}>• {lead.phone}</span>
                    </div>
                    <p className={styles.leadService}>{lead.serviceLabel}</p>
                  </div>

                  <div className={styles.leadMeta}>
                    <Badge variant={statusMeta.badgeVariant}>
                      {statusMeta.label}
                    </Badge>
                    <span className={styles.leadTime}>{lead.relativeTime}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <Button
          href="/admin/contacts"
          variant="secondary"
          size="sm"
          fullWidth
          leftIcon={<ExternalLink size={15} aria-hidden="true" />}
        >
          Truy cập Trình Quản Lý Lead & Khách Hàng
        </Button>
      </CardContent>
    </Card>
  );
};
