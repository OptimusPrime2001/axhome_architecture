import type { AdminProjectTypeFilter, Project } from "@shared-types";
import { BadgeCheck, Compass, FolderKanban, Hammer } from "lucide-react";
import type React from "react";
import styles from "./ProjectsKpiStrip.module.scss";

export interface ProjectsKpiStripProps {
  projects: Project[];
  activeType: AdminProjectTypeFilter;
  onSelectType: (type: AdminProjectTypeFilter) => void;
}

function getAverageConstructionProgress(projects: Project[]): number {
  const activeSites = projects.filter(
    (p) => p.projectType === "under_construction",
  );
  if (activeSites.length === 0) return 0;

  const ratios = activeSites.map((site) => {
    const total = site.milestones?.length ?? 0;
    if (total === 0) return 0.5;
    const done = site.milestones?.filter((m) => m.isCompleted).length ?? 0;
    return done / total;
  });

  const avg = ratios.reduce((sum, val) => sum + val, 0) / ratios.length;
  return Math.round(avg * 100);
}

export const ProjectsKpiStrip: React.FC<ProjectsKpiStripProps> = ({
  projects,
  activeType,
  onSelectType,
}) => {
  const totalCount = projects.length;
  const publishedCount = projects.filter(
    (p) => p.status === "published",
  ).length;
  const draftCount = totalCount - publishedCount;
  const publishedPercent =
    totalCount > 0 ? Math.round((publishedCount / totalCount) * 100) : 0;

  const conceptProjects = projects.filter((p) => p.projectType === "concept");
  const conceptWithPlansCount = conceptProjects.filter(
    (p) => (p.floorPlans?.length ?? 0) > 0,
  ).length;

  const underConstructionProjects = projects.filter(
    (p) => p.projectType === "under_construction",
  );
  const avgSiteProgress = getAverageConstructionProgress(projects);

  const completedProjects = projects.filter(
    (p) => p.projectType === "completed",
  );
  const featuredCount = projects.filter((p) => p.isFeatured).length;

  const handleToggleType = (target: AdminProjectTypeFilter) => {
    if (target !== "all" && activeType === target) {
      onSelectType("all");
      return;
    }
    onSelectType(target);
  };

  return (
    <section
      className={styles.kpiGrid}
      aria-label="Thống kê nhanh danh mục dự án"
    >
      {/* Card 1: Tổng hồ sơ dự án */}
      <button
        type="button"
        className={`${styles.kpiCard} ${activeType === "all" ? styles.kpiCardActive : ""}`}
        aria-pressed={activeType === "all"}
        onClick={() => handleToggleType("all")}
      >
        <div className={styles.cardTop}>
          <div>
            <p className={styles.eyebrow}>DANH MỤC HỢP NHẤT</p>
            <h2 className={styles.cardTitle}>Tổng Hồ Sơ Dự Án</h2>
          </div>
          <span className={styles.iconBox} aria-hidden="true">
            <FolderKanban size={18} />
          </span>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricValue}>
            {String(totalCount).padStart(2, "0")}
          </span>
          <span className={styles.metricUnit}>dự án hệ thống</span>
        </div>

        <div className={styles.cardBottom}>
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressFill}
              style={{ width: `${publishedPercent}%` }}
            />
          </div>
          <div className={styles.metaFooter}>
            <span className={styles.publishedAccent}>
              {publishedCount} xuất bản ({publishedPercent}%)
            </span>
            <span className={styles.dot} aria-hidden="true">
              •
            </span>
            <span>
              <strong>{draftCount}</strong> bản nháp
            </span>
          </div>
        </div>
      </button>

      {/* Card 2: Mẫu Thiết Kế 3D */}
      <button
        type="button"
        className={`${styles.kpiCard} ${activeType === "concept" ? styles.kpiCardActive : ""}`}
        aria-pressed={activeType === "concept"}
        onClick={() => handleToggleType("concept")}
      >
        <div className={styles.cardTop}>
          <div>
            <p className={styles.eyebrow}>HỒ SƠ BẢN VẼ 3D</p>
            <h2 className={styles.cardTitle}>Mẫu Thiết Kế Kiến Trúc</h2>
          </div>
          <span className={styles.iconBox} aria-hidden="true">
            <Compass size={18} />
          </span>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricValue}>
            {String(conceptProjects.length).padStart(2, "0")}
          </span>
          <span className={styles.metricUnit}>hồ sơ phối cảnh</span>
        </div>

        <div className={styles.cardBottom}>
          <div className={styles.metaFooter}>
            <span>
              <strong>{conceptWithPlansCount}</strong> hồ sơ kèm sơ đồ mặt bằng
            </span>
          </div>
        </div>
      </button>

      {/* Card 3: Công Trình Đang Thi Công */}
      <button
        type="button"
        className={`${styles.kpiCard} ${activeType === "under_construction" ? styles.kpiCardActive : ""}`}
        aria-pressed={activeType === "under_construction"}
        onClick={() => handleToggleType("under_construction")}
      >
        <div className={styles.cardTop}>
          <div>
            <p className={styles.eyebrow}>HIỆN TRƯỜNG GIÁM SÁT</p>
            <h2 className={styles.cardTitle}>Đang Thi Công Thực Tế</h2>
          </div>
          <span className={styles.iconBox} aria-hidden="true">
            <Hammer size={18} />
          </span>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricValue}>
            {String(underConstructionProjects.length).padStart(2, "0")}
          </span>
          <span className={styles.metricUnit}>công trường mở</span>
        </div>

        <div className={styles.cardBottom}>
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressFill}
              style={{ width: `${avgSiteProgress}%` }}
            />
          </div>
          <div className={styles.metaFooter}>
            <span>
              Trung bình <strong>{avgSiteProgress}%</strong> mốc tiến độ kỹ
              thuật
            </span>
          </div>
        </div>
      </button>

      {/* Card 4: Đã Hoàn Thành Bàn Giao */}
      <button
        type="button"
        className={`${styles.kpiCard} ${activeType === "completed" ? styles.kpiCardActive : ""}`}
        aria-pressed={activeType === "completed"}
        onClick={() => handleToggleType("completed")}
      >
        <div className={styles.cardTop}>
          <div>
            <p className={styles.eyebrow}>NGHIỆM THU BÀN GIAO</p>
            <h2 className={styles.cardTitle}>Công Trình Hoàn Thiện</h2>
          </div>
          <span className={styles.iconBox} aria-hidden="true">
            <BadgeCheck size={18} />
          </span>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricValue}>
            {String(completedProjects.length).padStart(2, "0")}
          </span>
          <span className={styles.metricUnit}>công trình bàn giao</span>
        </div>

        <div className={styles.cardBottom}>
          <div className={styles.metaFooter}>
            <span>
              <strong>{featuredCount}</strong> dự án ghim nổi bật trang chủ
            </span>
          </div>
        </div>
      </button>
    </section>
  );
};
