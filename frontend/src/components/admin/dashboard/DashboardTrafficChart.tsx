"use client";

import { ArrowRight, Button, Card, CardContent, Skeleton } from "@components";
import { useAdminLeads, useAdminProjects } from "@hooks";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./DashboardTrafficChart.module.scss";

interface MonthlyBucket {
  key: string;
  monthLabel: string;
  projectViews: number;
  consultationLeads: number;
}

function extractYearMonthKey(rawDate?: string): string | null {
  if (!rawDate) return null;
  const trimmed = rawDate.trim();

  // Matches Go backend lead format: "DD/MM/YYYY - HH:mm" or "DD/MM/YYYY"
  const vnMatch = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(trimmed);
  if (vnMatch) {
    return `${vnMatch[3]}-${vnMatch[2]}`;
  }

  // Matches ISO / project format: "YYYY-MM-DD..."
  const isoMatch = /^(\d{4})-(\d{2})/.exec(trimmed);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}`;
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

  return null;
}

function buildLastSixMonthBuckets(): MonthlyBucket[] {
  const now = new Date();
  const buckets: MonthlyBucket[] = [];

  for (let offset = 5; offset >= 0; offset--) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const year = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    const key = `${year}-${String(monthNum).padStart(2, "0")}`;
    buckets.push({
      key,
      monthLabel: `Thg ${monthNum}`,
      projectViews: 0,
      consultationLeads: 0,
    });
  }

  return buckets;
}

export const DashboardTrafficChart: React.FC = () => {
  const { data: projectsData, isLoading: isLoadingProjects } = useAdminProjects(
    {
      params: { limit: 100 },
    },
  );
  const { data: leadsData, isLoading: isLoadingLeads } = useAdminLeads({
    params: { limit: 100 },
  });

  const projects = projectsData?.items ?? [];
  const leads = leadsData?.items ?? [];
  const isLoading = isLoadingProjects || isLoadingLeads;

  const monthlyStats = useMemo(() => {
    const buckets = buildLastSixMonthBuckets();
    const bucketMap = new Map<string, MonthlyBucket>(
      buckets.map((bucket) => [bucket.key, bucket]),
    );

    for (const project of projects) {
      const key = extractYearMonthKey(project.createdAt);
      const bucket = key ? bucketMap.get(key) : undefined;
      if (bucket) {
        bucket.projectViews += project.viewCount ?? 0;
      }
    }

    for (const lead of leads) {
      const key = extractYearMonthKey(lead.createdAt);
      const bucket = key ? bucketMap.get(key) : undefined;
      if (bucket) {
        bucket.consultationLeads += 1;
      }
    }

    return buckets;
  }, [projects, leads]);

  const [activeIndex, setActiveIndex] = useState<number>(5);

  const maxViews = Math.max(
    1,
    ...monthlyStats.map((item) => item.projectViews),
  );
  const maxLeads = Math.max(
    1,
    ...monthlyStats.map((item) => item.consultationLeads),
  );

  const totalViews = projects.reduce(
    (sum, item) => sum + (item.viewCount ?? 0),
    0,
  );
  const totalLeads = leads.length;
  const activeItem =
    monthlyStats[activeIndex] ?? monthlyStats[monthlyStats.length - 1];

  // SVG coordinate helper (viewBox 600 x 210)
  const chartTop = 24;
  const chartBottom = 172;
  const chartHeight = chartBottom - chartTop;

  const getColumnX = (index: number) => 56 + index * 96;
  const getViewsHeight = (views: number) =>
    views <= 0 ? 0 : Math.max(4, Math.round((views / maxViews) * chartHeight));
  const getLeadsHeight = (count: number) =>
    count <= 0
      ? 0
      : Math.max(4, Math.round((count / maxLeads) * (chartHeight * 0.75)));
  const getLeadsY = (count: number) =>
    Math.round(chartBottom - (count / (maxLeads * 1.15)) * chartHeight);

  const linePoints = monthlyStats
    .map(
      (item, idx) => `${getColumnX(idx)},${getLeadsY(item.consultationLeads)}`,
    )
    .join(" ");

  return (
    <Card>
      <CardContent className={styles.cardInner}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              Lưu Lượng Tương Tác & Yêu Cầu Tư Vấn
            </h2>
            <p className={styles.subtitle}>
              Dữ liệu thực tế qua 6 tháng gần nhất (
              {monthlyStats[0]?.monthLabel} –{" "}
              {monthlyStats[monthlyStats.length - 1]?.monthLabel})
            </p>
          </div>

          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.legendDotPrimary} aria-hidden="true" />
              <span>Lượt xem hồ sơ dự án</span>
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendDotSecondary} aria-hidden="true" />
              <span>Yêu cầu tư vấn mới</span>
            </span>
          </div>
        </div>

        {/* Month selector pills + active summary */}
        <div className={styles.controlsRow}>
          <div
            className={styles.monthTabs}
            role="tablist"
            aria-label="Chọn tháng xem chi tiết"
          >
            {monthlyStats.map((item, idx) => (
              <Button
                key={item.key}
                type="button"
                role="tab"
                size="sm"
                variant={idx === activeIndex ? "dark" : "secondary"}
                aria-selected={idx === activeIndex}
                className={styles.monthTabBtn}
                onClick={() => setActiveIndex(idx)}
              >
                {item.monthLabel}
              </Button>
            ))}
          </div>

          <div className={styles.activeSummary} aria-live="polite">
            <span className={styles.activeMonth}>
              {activeItem?.monthLabel}:
            </span>
            <span>
              <strong>
                {(activeItem?.projectViews ?? 0).toLocaleString("vi-VN")}
              </strong>{" "}
              lượt xem
            </span>
            <span aria-hidden="true">•</span>
            <span>
              <strong>{activeItem?.consultationLeads ?? 0}</strong> yêu cầu
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.chartContainer}>
            <Skeleton style={{ height: "210px", borderRadius: "10px" }} />
          </div>
        ) : (
          <div className={styles.chartContainer}>
            <svg
              viewBox="0 0 600 210"
              className={styles.svgChart}
              role="img"
              aria-label="Biểu đồ lưu lượng xem dự án và yêu cầu tư vấn 6 tháng gần nhất"
            >
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = Math.round(chartTop + ratio * chartHeight);
                return (
                  <line
                    key={ratio}
                    x1="20"
                    y1={y}
                    x2="580"
                    y2={y}
                    className={styles.gridLine}
                  />
                );
              })}

              {/* Bars for Views & Secondary Bars for Leads */}
              {monthlyStats.map((item, idx) => {
                const cx = getColumnX(idx);
                const barH = getViewsHeight(item.projectViews);
                const barY = chartBottom - barH;
                const leadBarH = getLeadsHeight(item.consultationLeads);
                const leadBarY = chartBottom - leadBarH;
                const isSelected = idx === activeIndex;

                return (
                  <g key={item.key}>
                    <rect
                      x={cx - 18}
                      y={barY}
                      width="15"
                      height={barH}
                      rx="3"
                      className={
                        isSelected ? styles.barPrimaryActive : styles.barPrimary
                      }
                    />
                    <rect
                      x={cx + 3}
                      y={leadBarY}
                      width="15"
                      height={leadBarH}
                      rx="3"
                      className={
                        isSelected
                          ? styles.barSecondaryActive
                          : styles.barSecondary
                      }
                    />
                    <text
                      x={cx}
                      y="196"
                      textAnchor="middle"
                      className={
                        isSelected ? styles.monthLabelActive : styles.monthLabel
                      }
                    >
                      {item.monthLabel}
                    </text>
                  </g>
                );
              })}

              {/* Trend Line */}
              <polyline
                fill="none"
                points={linePoints}
                className={styles.trendLine}
              />

              {/* Trend Nodes */}
              {monthlyStats.map((item, idx) => {
                const cx = getColumnX(idx);
                const cy = getLeadsY(item.consultationLeads);
                return (
                  <circle
                    key={`node-${item.key}`}
                    cx={cx}
                    cy={cy}
                    r={idx === activeIndex ? 5 : 3.5}
                    className={styles.trendNode}
                  />
                );
              })}
            </svg>
          </div>
        )}

        <div className={styles.footer}>
          <p className={styles.footerStat}>
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>
              Hệ thống hiện ghi nhận{" "}
              <strong>{totalViews.toLocaleString("vi-VN")}</strong> lượt xem hồ
              sơ và <strong>{totalLeads}</strong> yêu cầu tư vấn
            </span>
          </p>

          <Link href="/admin/projects" className={styles.footerLink}>
            <span>Quản lý danh mục dự án</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
