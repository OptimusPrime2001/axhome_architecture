import {
  AnimateHoverLink,
  ArrowRight,
  Badge,
  Container,
  ScrollReveal,
} from "@components";
import {
  PROJECT_CATEGORY_LABELS,
  PROJECT_STYLE_LABELS,
  PROJECT_TYPE_LABELS,
} from "@constants";
import type { Project, ProjectType } from "@shared-types";
import { Calendar, Home, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import styles from "./ProjectDetailHero.module.scss";
import { ShareProjectButton } from "./ShareProjectButton";

export interface ProjectDetailHeroProps {
  project: Project;
}

function getBadgeVariant(type: ProjectType) {
  switch (type) {
    case "completed":
      return "completed" as const;
    case "under_construction":
      return "progress" as const;
    case "concept":
      return "concept" as const;
  }
}

export const ProjectDetailHero: React.FC<ProjectDetailHeroProps> = ({
  project,
}) => {
  const categoryLabel = PROJECT_CATEGORY_LABELS[project.category];
  const styleLabel = PROJECT_STYLE_LABELS[project.style];
  const typeLabel = PROJECT_TYPE_LABELS[project.projectType];

  const heroOverlayLabel =
    project.projectType === "concept"
      ? "PHỐI CẢNH 3D MASTER EXTERIOR"
      : "ẢNH THỰC TẾ CÔNG TRÌNH";

  return (
    <section
      className={styles.section}
      aria-labelledby="project-detail-heading"
    >
      <Container>
        <div className={styles.heroMeta}>
          <nav className={styles.breadcrumb} aria-label="Đường dẫn điều hướng">
            <Link href="/" className={styles.breadcrumbLink}>
              <Home size={13} aria-hidden="true" />
              <span>Trang chủ</span>
            </Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">
              /
            </span>
            <Link href="/projects" className={styles.breadcrumbLink}>
              Dự án
            </Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">
              /
            </span>
            <span className={styles.breadcrumbCurrent} aria-current="page">
              {project.title}
            </span>
          </nav>

          <div className={styles.badgesRow}>
            <Badge variant={getBadgeVariant(project.projectType)}>
              {typeLabel}
            </Badge>
            <span className={styles.categoryPill}>{categoryLabel}</span>
          </div>
        </div>

        <h1 id="project-detail-heading" className={styles.title}>
          {project.title}
        </h1>

        <div className={styles.metaActionsRow}>
          <div className={styles.metaInfo}>
            <span className={styles.metaItem}>
              <MapPin size={14} aria-hidden="true" />
              <span>
                {project.location}, {project.city}
              </span>
            </span>
            <span className={styles.metaDot} aria-hidden="true">
              •
            </span>
            <span className={styles.metaItem}>
              <Calendar size={14} aria-hidden="true" />
              <span>Năm {project.completedYear}</span>
            </span>
          </div>

          <div className={styles.actions}>
            <ShareProjectButton />
            <AnimateHoverLink
              href="#project-consult-form"
              className={styles.consultBtn}
            >
              <span>Tư vấn phương án này</span>
              <ArrowRight size={15} aria-hidden="true" />
            </AnimateHoverLink>
          </div>
        </div>

        <ScrollReveal>
          <div className={styles.showcase}>
            <Image
              src={project.coverImage}
              alt={project.title}
              title={project.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1120px"
              className={styles.showcaseImage}
            />
            <div className={styles.showcaseScrim} aria-hidden="true" />
            <span className={styles.showcaseTag}>{heroOverlayLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <dl className={styles.metaBar}>
            <div className={styles.metaBarItem}>
              <dt className={styles.metaBarLabel}>LOẠI HÌNH</dt>
              <dd className={styles.metaBarValue}>{categoryLabel}</dd>
            </div>
            <div className={styles.metaBarItem}>
              <dt className={styles.metaBarLabel}>PHONG CÁCH</dt>
              <dd className={styles.metaBarValue}>{styleLabel}</dd>
            </div>
            <div className={styles.metaBarItem}>
              <dt className={styles.metaBarLabel}>DIỆN TÍCH SÀN</dt>
              <dd className={styles.metaBarValue}>
                {project.floorArea} m²{" "}
                <span className={styles.metaBarSub}>
                  (Đất {project.landArea} m²)
                </span>
              </dd>
            </div>
            <div className={styles.metaBarItem}>
              <dt className={styles.metaBarLabel}>QUY MÔ</dt>
              <dd className={styles.metaBarValue}>
                {project.floorsCount} tầng, {project.bedroomsCount} PN
              </dd>
            </div>
            <div className={styles.metaBarItem}>
              <dt className={styles.metaBarLabel}>CHỦ TRÌ THIẾT KẾ</dt>
              <dd className={styles.metaBarValue}>{project.leadArchitect}</dd>
            </div>
            <div className={styles.metaBarItem}>
              <dt className={styles.metaBarLabel}>TIẾN ĐỘ</dt>
              <dd className={styles.metaBarValue}>
                {project.constructionDuration ?? "Đang cập nhật"}
              </dd>
            </div>
          </dl>
        </ScrollReveal>
      </Container>
    </section>
  );
};
