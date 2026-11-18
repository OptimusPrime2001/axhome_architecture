import { Button } from "@components";
import {
  DashboardCategoryChart,
  DashboardConstructionGrid,
  DashboardKpiGrid,
  DashboardRecentLeads,
  DashboardRecentProjects,
  DashboardTrafficChart,
} from "@components/admin";
import { MessageSquareText, Plus } from "lucide-react";
import type { Metadata } from "next";
import styles from "./DashboardPage.module.scss";

export const metadata: Metadata = {
  title: "Tổng quan hệ thống",
};

export default function AdminDashboardPage() {
  return (
    <div className={styles.dashboardWrapper}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>HỆ THỐNG ĐIỀU HÀNH TRUNG TÂM</span>
          </p>
          <h1 className={styles.pageTitle}>Tổng Quan Hệ Thống</h1>
          <p className={styles.pageSubtitle}>
            Theo dõi số liệu hoạt động, lưu lượng hồ sơ dự án, tiến độ công
            trình và yêu cầu tư vấn mới từ khách hàng.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Button
            href="/admin/contacts"
            variant="secondary"
            size="sm"
            leftIcon={<MessageSquareText size={15} aria-hidden="true" />}
          >
            Quản lý yêu cầu
          </Button>
          <Button
            href="/admin/projects/create"
            variant="dark"
            size="sm"
            leftIcon={<Plus size={15} aria-hidden="true" />}
          >
            Tạo Dự Án Mới
          </Button>
        </div>
      </header>

      {/* Row 1: 4 KPI Cards */}
      <DashboardKpiGrid />

      {/* Row 2: Traffic Chart (65%) & Category Breakdown Donut (35%) */}
      <section className={styles.chartsRow} aria-label="Biểu đồ thống kê">
        <DashboardTrafficChart />
        <DashboardCategoryChart />
      </section>

      {/* Row 3: Recent Leads (50%) & Recent Projects (50%) */}
      <section className={styles.listsRow} aria-label="Danh sách mới nhất">
        <DashboardRecentLeads />
        <DashboardRecentProjects />
      </section>

      {/* Row 4: Construction Progress Grid */}
      <DashboardConstructionGrid />
    </div>
  );
}
