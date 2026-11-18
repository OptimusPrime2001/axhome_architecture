import {
  AnimateHoverItem,
  BadgeCheck,
  ClipboardList,
  Container,
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
  Users,
} from "@components";
import { PROJECTS_STANDARDS, PROJECTS_STANDARDS_HEADER } from "@constants";
import type React from "react";
import styles from "./ProjectsStandards.module.scss";

const STANDARD_ICONS = {
  blueprint: <ClipboardList size={18} />,
  supervision: <Users size={18} />,
  transparent: <BadgeCheck size={18} />,
} as const;

export const ProjectsStandards: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="projects-standards-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>
              {PROJECTS_STANDARDS_HEADER.eyebrow}
            </p>
            <h2 id="projects-standards-heading" className={styles.title}>
              {PROJECTS_STANDARDS_HEADER.title}
            </h2>
            <p className={styles.lead}>
              {PROJECTS_STANDARDS_HEADER.description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.grid}>
          {PROJECTS_STANDARDS.map((item) => (
            <StaggerItem key={item.id}>
              <AnimateHoverItem className={styles.card}>
                <span className={styles.iconBox} aria-hidden="true">
                  {STANDARD_ICONS[item.iconKey]}
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </AnimateHoverItem>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
