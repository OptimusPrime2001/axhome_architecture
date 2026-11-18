"use client";

import { ArrowRight, Button, Card, CardContent } from "@components";
import { ADMIN_DASHBOARD_MONTHLY_STATS } from "@constants";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "./DashboardTrafficChart.module.scss";

export const DashboardTrafficChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(
    ADMIN_DASHBOARD_MONTHLY_STATS.length - 1,
  );

  const maxViews = Math.max(
    ...ADMIN_DASHBOARD_MONTHLY_STATS.map((item) => item.projectViews),
  );
  const maxLeads = Math.max(
    ...ADMIN_DASHBOARD_MONTHLY_STATS.map((item) => item.consultationLeads),
  );

  const totalViews = ADMIN_DASHBOARD_MONTHLY_STATS.reduce(
    (sum, item) => sum + item.projectViews,
    0,
  );
  const activeItem =
    ADMIN_DASHBOARD_MONTHLY_STATS[activeIndex] ??
    ADMIN_DASHBOARD_MONTHLY_STATS[0];

  // SVG coordinate helper (viewBox 600 x 210)
  const chartTop = 24;
  const chartBottom = 172;
  const chartHeight = chartBottom - chartTop;

  const getColumnX = (index: number) => 56 + index * 96;
  const getViewsHeight = (views: number) =>
    Math.round((views / maxViews) * chartHeight);
  const getLeadsY = (leads: number) =>
    Math.round(chartBottom - (leads / (maxLeads * 1.15)) * chartHeight);

  const linePoints = ADMIN_DASHBOARD_MONTHLY_STATS.map(
    (item, idx) => `${getColumnX(idx)},${getLeadsY(item.consultationLeads)}`,
  ).join(" ");

  return (
    <Card>
      <CardContent className={styles.cardInner}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              Lưu Lượng Tương Tác & Yêu Cầu Tư Vấn
            </h2>
            <p className={styles.subtitle}>
              Dữ liệu quan sát qua 6 tháng gần nhất (
              {ADMIN_DASHBOARD_MONTHLY_STATS[0]?.monthLabel} –{" "}
              {
                ADMIN_DASHBOARD_MONTHLY_STATS[
                  ADMIN_DASHBOARD_MONTHLY_STATS.length - 1
                ]?.monthLabel
              }
              )
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
            {ADMIN_DASHBOARD_MONTHLY_STATS.map((item, idx) => (
              <Button
                key={item.monthLabel}
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
            <span className={styles.activeMonth}>{activeItem.monthLabel}:</span>
            <span>
              <strong>{activeItem.projectViews.toLocaleString("vi-VN")}</strong>{" "}
              lượt xem
            </span>
            <span aria-hidden="true">•</span>
            <span>
              <strong>{activeItem.consultationLeads}</strong> yêu cầu
            </span>
          </div>
        </div>

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
            {ADMIN_DASHBOARD_MONTHLY_STATS.map((item, idx) => {
              const cx = getColumnX(idx);
              const barH = getViewsHeight(item.projectViews);
              const barY = chartBottom - barH;
              const leadBarH = Math.round(
                (item.consultationLeads / maxLeads) * (chartHeight * 0.75),
              );
              const leadBarY = chartBottom - leadBarH;
              const isSelected = idx === activeIndex;

              return (
                <g key={item.monthLabel}>
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
            {ADMIN_DASHBOARD_MONTHLY_STATS.map((item, idx) => {
              const cx = getColumnX(idx);
              const cy = getLeadsY(item.consultationLeads);
              return (
                <circle
                  key={`node-${item.monthLabel}`}
                  cx={cx}
                  cy={cy}
                  r={idx === activeIndex ? 5 : 3.5}
                  className={styles.trendNode}
                />
              );
            })}
          </svg>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerStat}>
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>
              Tổng cộng 6 tháng thu hút{" "}
              <strong>{totalViews.toLocaleString("vi-VN")}+</strong> lượt tương
              tác hồ sơ dự án trực tuyến
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
