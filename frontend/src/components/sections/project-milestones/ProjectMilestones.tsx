import {
  Badge,
  Container,
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@components";
import type { ProjectMilestone } from "@shared-types";
import type React from "react";
import styles from "./ProjectMilestones.module.scss";

export interface ProjectMilestonesProps {
  milestones: ProjectMilestone[];
}

export const ProjectMilestones: React.FC<ProjectMilestonesProps> = ({
  milestones,
}) => {
  if (milestones.length === 0) return null;

  return (
    <section
      className={styles.section}
      aria-labelledby="project-milestones-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>NHẬT KÝ CÔNG TRƯỜNG</p>
            <h2 id="project-milestones-heading" className={styles.title}>
              Tiến độ triển khai & Nghiệm thu thực tế
            </h2>
            <p className={styles.lead}>
              Theo dõi từng cột mốc kỹ thuật quan trọng từ giai đoạn thi công
              móng, kết cấu bê tông cốt thép đến hoàn thiện bàn giao.
            </p>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.list}>
          {milestones.map((ms, index) => (
            <StaggerItem key={ms.id} className={styles.item}>
              <div className={styles.indexCol}>
                <span className={styles.stepIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.period}>{ms.period}</span>
                  <Badge variant={ms.isCompleted ? "completed" : "progress"}>
                    {ms.isCompleted ? "Đã hoàn thành" : "Đang thực hiện"}
                  </Badge>
                </div>
                <h3 className={styles.cardTitle}>{ms.title}</h3>
                <p className={styles.cardDesc}>{ms.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
