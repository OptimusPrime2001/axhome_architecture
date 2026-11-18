import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";
import { Container, ScrollReveal } from "@components";
import { ABOUT_HERO_CONTENT } from "@constants";
import { Home } from "lucide-react";
import Link from "next/link";
import type React from "react";
import styles from "./AboutHero.module.scss";
import { BentoVisualCard } from "./BentoVisualCard";

export const AboutHero: React.FC = () => {
  const { badge, title, description, statCard, bentoImages } =
    ABOUT_HERO_CONTENT;

  return (
    <section className={styles.section} aria-labelledby="about-hero-heading">
      <Container>
        <div className={styles.heroMeta}>
          <nav className={styles.breadcrumb} aria-label="Đường dẫn điều hướng">
            <Link href="/" className={styles.breadcrumbLink}>
              <Home size={13} aria-hidden="true" />
              <span>Trang chủ</span>
            </Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">
              ›
            </span>
            <span className={styles.breadcrumbCurrent} aria-current="page">
              Giới thiệu
            </span>
          </nav>

          <div className={styles.pillBadge}>
            <span className={styles.pillDot} aria-hidden="true" />
            <span>{badge}</span>
          </div>
        </div>

        <ScrollReveal>
          <div className={styles.topRow}>
            <div className={styles.headingCol}>
              <h1 id="about-hero-heading" className={styles.title}>
                {title}
              </h1>
              <p className={styles.description}>{description}</p>
            </div>

            <aside className={styles.statCard} aria-label="Thống kê công trình">
              <div className={styles.statHead}>
                <span className={styles.statValue}>
                  <CountingNumber number={statCard.value} inView />
                  {statCard.suffix}
                </span>
                <span className={styles.statLabel}>{statCard.label}</span>
              </div>
              <p className={styles.statDesc}>{statCard.description}</p>
            </aside>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className={styles.bentoGrid}>
            <BentoVisualCard
              item={bentoImages.primary}
              variant="primary"
              priority
              sizes="(max-width: 1024px) 100vw, 720px"
            />

            <div className={styles.bentoStack}>
              {[bentoImages.secondaryTop, bentoImages.secondaryBottom].map(
                (item) => (
                  <BentoVisualCard
                    key={item.id}
                    item={item}
                    variant="secondary"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                ),
              )}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
