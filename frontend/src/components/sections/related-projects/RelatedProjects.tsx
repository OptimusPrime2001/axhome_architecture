import {
  AnimateHoverLink,
  ArrowRight,
  Badge,
  Container,
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { PROJECT_STYLE_LABELS, PROJECT_TYPE_LABELS } from "@constants";
import type { Project, ProjectType } from "@shared-types";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import styles from "./RelatedProjects.module.scss";

export interface RelatedProjectsProps {
  projects: Project[];
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

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  projects,
}) => {
  if (projects.length === 0) return null;

  return (
    <section
      className={styles.section}
      aria-labelledby="related-projects-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.headerRow}>
            <div>
              <p className={styles.eyebrow}>TUYỂN TẬP CÙNG PHÂN KHÚC</p>
              <h2 id="related-projects-heading" className={styles.title}>
                Các phương án & công trình liên quan
              </h2>
            </div>

            <AnimateHoverLink href="/projects" className={styles.viewAllLink}>
              <span>Xem toàn bộ dự án</span>
              <ArrowRight size={14} aria-hidden="true" />
            </AnimateHoverLink>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.grid}>
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Link href={`/projects/${project.slug}`} className={styles.card}>
                <div className={styles.mediaWrapper}>
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.cardImage}
                    unoptimized
                  />
                  <div className={styles.badgeOverlay}>
                    <Badge variant={getBadgeVariant(project.projectType)}>
                      {PROJECT_TYPE_LABELS[project.projectType]}
                    </Badge>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.styleTag}>
                    {PROJECT_STYLE_LABELS[project.style]} • {project.city}
                  </span>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardExcerpt}>{project.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.cardSpecs}>
                      Quy mô: {project.floorsCount} tầng • {project.landArea} m²
                    </span>
                    <span className={styles.cardCta}>
                      Xem chi tiết
                      <ArrowRight
                        size={13}
                        className={styles.ctaArrow}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
