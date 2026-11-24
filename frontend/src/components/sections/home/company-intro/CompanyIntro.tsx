import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";
import {
  Container,
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { COMPANY_INTRO_CONTENT, COMPANY_STATS } from "@constants";
import { Award, Quote } from "lucide-react";
import Image from "next/image";
import type React from "react";
import styles from "./CompanyIntro.module.scss";
export const CompanyIntro: React.FC = () => {
  const { eyebrow, title, paragraphs, quote, image, floatingBadge } =
    COMPANY_INTRO_CONTENT;

  return (
    <section className={styles.section} aria-labelledby="company-intro-heading">
      <Container>
        <div className={styles.topGrid}>
          {/* Left: Story Column (Figma node 1:1345) */}
          <ScrollReveal className={styles.storyColumn}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 id="company-intro-heading" className={styles.title}>
              {title}
            </h2>

            <div className={styles.paragraphs}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className={styles.quotationBox}>
              <span className={styles.quoteIcon} aria-hidden="true">
                <Quote />
              </span>
              <div className={styles.quoteBody}>
                <p className={styles.quoteText}>{quote.text}</p>
                <footer className={styles.quoteAuthor}>{quote.author}</footer>
              </div>
            </blockquote>
          </ScrollReveal>

          {/* Right: Architectural Image Column (Figma node 1:1366) */}
          <ScrollReveal delay={0.1} className={styles.imageColumn}>
            <div className={styles.imageFrame}>
              <Image
                src={image.url}
                alt={image.alt}
                title={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className={styles.studioImage}
              />
            </div>

            <div className={styles.floatingCard}>
              <span className={styles.floatingIcon} aria-hidden="true">
                <Award />
              </span>
              <div className={styles.floatingText}>
                <p className={styles.floatingTitle}>{floatingBadge.title}</p>
                <p className={styles.floatingSubtitle}>
                  {floatingBadge.subtitle}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom: 4 Key Metrics Stats Banner (Figma node 1:1379) */}
        <StaggerGroup className={styles.statsGrid}>
          {COMPANY_STATS.map((stat) => (
            <StaggerItem key={stat.id} className={styles.statCard}>
              <span className={styles.statValue}>
                <CountingNumber number={stat.value} inView />
                {stat.type === "percent" ? "%" : "+"}
              </span>
              <h3 className={styles.statLabel}>{stat.label}</h3>
              <p className={styles.statDescription}>{stat.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
