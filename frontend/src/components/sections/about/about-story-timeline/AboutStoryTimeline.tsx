import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";
import {
  Container,
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { ABOUT_STORY_CONTENT, ABOUT_TIMELINE } from "@constants";
import type React from "react";
import styles from "./AboutStoryTimeline.module.scss";

export const AboutStoryTimeline: React.FC = () => {
  const { eyebrow, title, paragraphs, stats } = ABOUT_STORY_CONTENT;

  return (
    <section
      className={styles.section}
      aria-labelledby="about-story-timeline-heading"
    >
      <Container>
        <div className={styles.layout}>
          {/* Cột trái: Lịch sử hình thành + 2 chỉ số */}
          <ScrollReveal className={styles.storyCol}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 id="about-story-timeline-heading" className={styles.title}>
              {title}
            </h2>

            <div className={styles.paragraphs}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={styles.statsRow}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <span className={styles.statValue}>
                    <CountingNumber number={stat.value} inView />
                    {stat.suffix}
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Cột phải: 4 cột mốc dọc */}
          <StaggerGroup className={styles.timeline}>
            {ABOUT_TIMELINE.map((item) => (
              <StaggerItem key={item.id} className={styles.timelineItem}>
                <div className={styles.yearCol}>
                  <span className={styles.year}>{item.year}</span>
                  <span className={styles.milestoneTag}>
                    {item.milestoneTag}
                  </span>
                </div>

                <div className={styles.markerCol} aria-hidden="true">
                  <span className={styles.dot} />
                </div>

                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
};
