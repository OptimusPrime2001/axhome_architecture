"use client";

import { Card, CardContent } from "@components";
import { useAdminLeads, useAdminProjects } from "@hooks";
import {
  Building2,
  Compass,
  FolderKanban,
  MessageSquareText,
} from "lucide-react";
import type React from "react";
import styles from "./DashboardKpiGrid.module.scss";

export const DashboardKpiGrid: React.FC = () => {
  const { data: projectsData } = useAdminProjects({ params: { limit: 100 } });
  const { data: leadsData } = useAdminLeads({ params: { limit: 100 } });
  const projects = projectsData?.items ?? [];
  const leads = leadsData?.items ?? [];

  const totalProjects = projects.length;
  const publishedCount = projects.filter(
    (project) => project.status === "published",
  ).length;
  const draftCount = totalProjects - publishedCount;

  const conceptCount = projects.filter(
    (project) => project.projectType === "concept",
  ).length;
  const withFloorPlansCount = projects.filter(
    (project) => (project.floorPlans?.length ?? 0) > 0,
  ).length;

  const underConstructionCount = projects.filter(
    (project) => project.projectType === "under_construction",
  ).length;
  const completedCount = projects.filter(
    (project) => project.projectType === "completed",
  ).length;
  const totalConstructionCount = underConstructionCount + completedCount;

  const totalLeads = leads.length;
  const pendingLeadsCount = leads.filter(
    (lead) => lead.leadStatus === "pending",
  ).length;
  const activeLeadsCount = leads.filter(
    (lead) =>
      lead.leadStatus === "in_progress" || lead.leadStatus === "scheduled",
  ).length;

  return (
    <section className={styles.kpiGrid} aria-label="Chỉ số tổng quan hệ thống">
      {/* Card 1: Tổng Dự Án */}
      <Card>
        <CardContent className={styles.kpiCardInner}>
          <div className={styles.cardTop}>
            <div>
              <p className={styles.eyebrow}>DANH MỤC HỢP NHẤT</p>
              <h2 className={styles.cardTitle}>Tổng Dự Án</h2>
            </div>
            <span className={styles.iconBox} aria-hidden="true">
              <FolderKanban size={18} />
            </span>
          </div>

          <div className={styles.metricRow}>
            <span className={styles.metricValue}>{totalProjects}</span>
            <span className={styles.metricUnit}>dự án</span>
          </div>

          <div className={styles.metaFooter}>
            <span>
              <strong>{publishedCount}</strong> đã xuất bản
            </span>
            <span className={styles.dot} aria-hidden="true">
              •
            </span>
            <span>
              <strong>{draftCount}</strong> bản nháp
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Bản Vẽ Thiết Kế 3D */}
      <Card>
        <CardContent className={styles.kpiCardInner}>
          <div className={styles.cardTop}>
            <div>
              <p className={styles.eyebrow}>HỒ SƠ BẢN VẼ</p>
              <h2 className={styles.cardTitle}>Bản Vẽ Thiết Kế 3D</h2>
            </div>
            <span className={styles.iconBox} aria-hidden="true">
              <Compass size={18} />
            </span>
          </div>

          <div className={styles.metricRow}>
            <span className={styles.metricValue}>{conceptCount}</span>
            <span className={styles.metricUnit}>hồ sơ 3D</span>
          </div>

          <div className={styles.metaFooter}>
            <span>
              <strong>{withFloorPlansCount}</strong> dự án có bản vẽ mặt bằng
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Công Trình Thi Công */}
      <Card>
        <CardContent className={styles.kpiCardInner}>
          <div className={styles.cardTop}>
            <div>
              <p className={styles.eyebrow}>THỰC THI HIỆN TRƯỜNG</p>
              <h2 className={styles.cardTitle}>Công Trình Thi Công</h2>
            </div>
            <span className={styles.iconBox} aria-hidden="true">
              <Building2 size={18} />
            </span>
          </div>

          <div className={styles.metricRow}>
            <span className={styles.metricValue}>{totalConstructionCount}</span>
            <span className={styles.metricUnit}>công trình</span>
          </div>

          <div className={styles.metaFooter}>
            <span>
              <strong>{completedCount}</strong> đã bàn giao
            </span>
            <span className={styles.dot} aria-hidden="true">
              •
            </span>
            <span>
              <strong>{underConstructionCount}</strong> đang thi công
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Yêu Cầu Tư Vấn */}
      <Card>
        <CardContent className={styles.kpiCardInner}>
          <div className={styles.cardTop}>
            <div>
              <p className={styles.eyebrow}>PHỄU CHĂM SÓC</p>
              <h2 className={styles.cardTitle}>Yêu Cầu Tư Vấn</h2>
            </div>
            <span className={styles.iconBox} aria-hidden="true">
              <MessageSquareText size={18} />
            </span>
          </div>

          <div className={styles.metricRow}>
            <span className={styles.metricValue}>{totalLeads}</span>
            <span className={styles.metricUnit}>yêu cầu</span>
          </div>

          <div className={styles.metaFooter}>
            <span className={styles.urgentHighlight}>
              {pendingLeadsCount} chờ xử lý gấp
            </span>
            <span className={styles.dot} aria-hidden="true">
              •
            </span>
            <span>
              <strong>{activeLeadsCount}</strong> đang tư vấn
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
