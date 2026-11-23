"use client";

import { Badge, Button, Card, CardContent } from "@components";
import { useAdminProjects } from "@hooks";
import type { ProjectCategory, ProjectType } from "@shared-types";
import { ChevronRight, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import styles from "./DashboardRecentProjects.module.scss";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  villa: "Biệt thự",
  townhouse: "Nhà phố",
  mansion: "Dinh thự",
};

const TYPE_LABELS: Record<ProjectType, string> = {
  concept: "Bản vẽ 3D",
  under_construction: "Đang thi công",
  completed: "Đã bàn giao",
};

export const DashboardRecentProjects: React.FC = () => {
  const { data: projectsData } = useAdminProjects({ params: { limit: 100 } });
  const projects = projectsData?.items ?? [];
  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);

  return (
    <Card>
      <CardContent className={styles.cardInner}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Hồ Sơ Dự Án Mới Cập Nhật</h2>
            <p className={styles.subtitle}>
              Danh mục dự án vừa cập nhật trong hệ thống
            </p>
          </div>

          <Link href="/admin/projects" className={styles.viewAllLink}>
            <span>Xem tất cả</span>
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <ul className={styles.projectList}>
          {recentProjects.map((project) => (
            <li key={project.id} className={styles.projectItem}>
              <Link
                href={`/admin/projects/${project.id}`}
                className={styles.projectLink}
              >
                <div className={styles.thumbWrap}>
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="56px"
                    className={styles.thumbImage}
                    unoptimized
                  />
                </div>

                <div className={styles.projectInfo}>
                  <div className={styles.projectTop}>
                    <span className={styles.projectTitle}>{project.title}</span>
                    <Badge
                      variant={
                        project.status === "published" ? "published" : "draft"
                      }
                    >
                      {project.status === "published" ? "Xuất bản" : "Bản nháp"}
                    </Badge>
                  </div>
                  <p className={styles.projectMeta}>
                    {TYPE_LABELS[project.projectType]} •{" "}
                    {CATEGORY_LABELS[project.category]} • {project.floorArea} m²
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Button
          href="/admin/projects/create"
          variant="secondary"
          size="sm"
          fullWidth
          leftIcon={<PlusCircle size={15} aria-hidden="true" />}
        >
          Tạo hồ sơ dự án mới
        </Button>
      </CardContent>
    </Card>
  );
};
