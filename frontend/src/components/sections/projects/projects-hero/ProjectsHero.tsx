import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";
import {
  AnimateHoverItem,
  BadgeCheck,
  Cctv,
  Container,
  House,
  ScrollReveal,
  ShieldCheck,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { PROJECTS_HERO_CONTENT } from "@constants";
import { Home } from "lucide-react";
import Link from "next/link";
import type React from "react";
import styles from "./ProjectsHero.module.scss";

const HIGHLIGHT_ICONS = {
  projects: <House size={18} />,
  camera: <Cctv size={18} />,
  cost: <BadgeCheck size={18} />,
  warranty: <ShieldCheck size={18} />,
} as const;

export const ProjectsHero: React.FC = () => {
  const { badge, title, description, highlights } = PROJECTS_HERO_CONTENT;

  return (
    <section className={styles.section} aria-labelledby="projects-hero-heading">
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
            <span className={styles.breadcrumbCurrent} aria-current="page">
              Dự án
            </span>
          </nav>

          <div className={styles.pillBadge}>
            <span className={styles.pillDot} aria-hidden="true" />
            <span>{badge}</span>
          </div>
        </div>

        <ScrollReveal>
          <div className={styles.header}>
            <h1 id="projects-hero-heading" className={styles.title}>
              {title}
            </h1>
            <p className={styles.description}>{description}</p>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.highlightsGrid}>
          {highlights.map((item) => (
            <StaggerItem key={item.id}>
              <AnimateHoverItem className={styles.highlightCard}>
                <span className={styles.iconBox} aria-hidden="true">
                  {HIGHLIGHT_ICONS[item.iconKey]}
                </span>
                <div className={styles.highlightBody}>
                  <span className={styles.highlightValue}>
                    <CountingNumber number={item.value} inView />
                    {item.suffix}
                  </span>
                  <span className={styles.highlightLabel}>{item.label}</span>
                </div>
              </AnimateHoverItem>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
