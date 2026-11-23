"use client";

import { Card, CardContent } from "@components";
import { useAdminProjects } from "@hooks";
import type { ProjectCategory } from "@shared-types";
import type React from "react";
import styles from "./DashboardCategoryChart.module.scss";

interface CategoryStat {
  key: ProjectCategory;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

const CATEGORY_META: Record<ProjectCategory, { label: string; color: string }> =
  {
    villa: { label: "Biệt thự cao cấp", color: "var(--color-brand-dark)" },
    mansion: { label: "Dinh thự", color: "var(--color-brand-primary)" },
    townhouse: { label: "Nhà phố hiện đại", color: "var(--color-brand-light)" },
  };

export const DashboardCategoryChart: React.FC = () => {
  const { data: projectsData } = useAdminProjects({ params: { limit: 100 } });
  const projects = projectsData?.items ?? [];
  const totalProjects = projects.length;

  const stats: CategoryStat[] = (
    ["villa", "mansion", "townhouse"] as ProjectCategory[]
  )
    .map((key) => {
      const count = projects.filter((p) => p.category === key).length;
      const percentage =
        totalProjects > 0 ? Math.round((count / totalProjects) * 100) : 0;
      return {
        key,
        label: CATEGORY_META[key].label,
        count,
        percentage,
        color: CATEGORY_META[key].color,
      };
    })
    .sort((a, b) => b.count - a.count);

  const dominantCategory = stats[0];

  // Donut SVG geometry
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <Card>
      <CardContent className={styles.cardInner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cơ Cấu Hồ Sơ Dự Án</h2>
          <p className={styles.subtitle}>
            Phân bổ tỷ trọng theo loại hình kiến trúc
          </p>
        </div>

        <div className={styles.donutWrapper}>
          <svg
            viewBox="0 0 160 160"
            className={styles.donutSvg}
            role="img"
            aria-label={`Biểu đồ cơ cấu ${totalProjects} dự án theo loại hình`}
          >
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="var(--color-surface-muted)"
              strokeWidth="18"
            />
            {stats.map((item) => {
              const segmentLength =
                totalProjects > 0
                  ? (item.count / totalProjects) * circumference
                  : 0;
              const dashArray = `${segmentLength} ${circumference - segmentLength}`;
              const dashOffset = -accumulatedOffset;
              accumulatedOffset += segmentLength;

              return (
                <circle
                  key={item.key}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="18"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 80 80)"
                />
              );
            })}
          </svg>

          <div className={styles.donutCenter}>
            <span className={styles.centerNumber}>{totalProjects}</span>
            <span className={styles.centerLabel}>DỰ ÁN</span>
          </div>
        </div>

        <ul className={styles.legendList}>
          {stats.map((item) => (
            <li key={item.key} className={styles.legendRow}>
              <span className={styles.legendLeft}>
                <span
                  className={styles.legendDot}
                  style={{ "--dot-color": item.color } as React.CSSProperties}
                  aria-hidden="true"
                />
                <span className={styles.legendLabel}>{item.label}</span>
              </span>
              <span className={styles.legendRight}>
                <span className={styles.legendCount}>{item.count} dự án</span>
                <span className={styles.legendPercent}>{item.percentage}%</span>
              </span>
            </li>
          ))}
        </ul>

        {dominantCategory && (
          <div className={styles.footerNote}>
            Phân khúc trọng điểm: <strong>{dominantCategory.label}</strong> (
            {dominantCategory.percentage}%)
          </div>
        )}
      </CardContent>
    </Card>
  );
};
