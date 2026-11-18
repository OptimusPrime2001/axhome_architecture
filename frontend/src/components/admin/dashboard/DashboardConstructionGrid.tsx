"use client";

import { Badge, Card, CardContent } from "@components";
import type { Project } from "@shared-types";
import { useAdminProjectsStore } from "@store";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type React from "react";
import styles from "./DashboardConstructionGrid.module.scss";

const getProjectProgress = (project: Project): number => {
  const milestones = project.milestones ?? [];
  if (milestones.length === 0) {
    return project.projectType === "completed" ? 100 : 0;
  }
  const completedCount = milestones.filter((m) => m.isCompleted).length;
  return Math.round((completedCount / milestones.length) * 100);
};

const getCurrentPhaseLabel = (project: Project): string => {
  if (project.projectType === "completed") {
    return "Đã bàn giao";
  }
  const milestones = project.milestones ?? [];
  const nextPending = milestones.find((m) => !m.isCompleted);
  if (nextPending) {
    return nextPending.title;
  }
  const lastCompleted = milestones[milestones.length - 1];
  return lastCompleted?.title ?? "Đang triển khai";
};

export const DashboardConstructionGrid: React.FC = () => {
  const projects = useAdminProjectsStore((state) => state.projects);

  // Prioritize under_construction first, then completed with milestones
  const constructionProjects = projects
    .filter(
      (project) =>
        project.projectType === "under_construction" ||
        (project.projectType === "completed" &&
          (project.milestones?.length ?? 0) > 0),
    )
    .sort((a, b) => {
      if (
        a.projectType === "under_construction" &&
        b.projectType !== "under_construction"
      ) {
        return -1;
      }
      if (
        b.projectType === "under_construction" &&
        a.projectType !== "under_construction"
      ) {
        return 1;
      }
      return 0;
    })
    .slice(0, 3);

  return (
    <Card>
      <CardContent className={styles.sectionCardInner}>
        <div className={styles.header}>
          <div>
            <div className={styles.titleRow}>
              <h2 id="construction-progress-heading" className={styles.title}>
                Tiến Độ Công Trình Thi Công Thực Tế
              </h2>
              <Badge variant="neutral" showDot={false}>
                Hiện Trường
              </Badge>
            </div>
            <p className={styles.subtitle}>
              Giám sát các dự án trọng điểm đang triển khai và hoàn thiện
            </p>
          </div>

          <Link href="/admin/projects" className={styles.viewAllLink}>
            <span>Xem toàn bộ {projects.length} dự án</span>
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.grid}>
          {constructionProjects.map((project) => {
            const progress = getProjectProgress(project);
            const phaseLabel = getCurrentPhaseLabel(project);
            const isCompleted = project.projectType === "completed";

            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={styles.projectCard}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cityLabel}>{project.city}</span>
                  <Badge variant={isCompleted ? "completed" : "pending"}>
                    {progress}% {isCompleted ? "Hoàn thành" : "Tiến độ"}
                  </Badge>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectExcerpt}>{project.excerpt}</p>
                </div>

                <div className={styles.progressSection}>
                  <div className={styles.progressHeader}>
                    <span>Tiến độ thi công</span>
                    <span className={styles.progressValue}>{progress}%</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={
                        { "--progress": `${progress}%` } as React.CSSProperties
                      }
                    />
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span>
                    KTS: <strong>{project.leadArchitect}</strong>
                  </span>
                  <span className={styles.phaseText}>{phaseLabel}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
