import {
  AnimateHoverItem,
  Container,
  Eye,
  ScrollReveal,
  ShieldCheck,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { ABOUT_VISION_MISSION, ABOUT_VISION_MISSION_HEADER } from "@constants";
import type React from "react";
import styles from "./AboutVisionMission.module.scss";

export const AboutVisionMission: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-vision-mission-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>
              {ABOUT_VISION_MISSION_HEADER.eyebrow}
            </p>
            <h2 id="about-vision-mission-heading" className={styles.title}>
              {ABOUT_VISION_MISSION_HEADER.title}
            </h2>
            <p className={styles.lead}>
              {ABOUT_VISION_MISSION_HEADER.description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.grid}>
          {ABOUT_VISION_MISSION.map((item) => {
            const isDark = item.iconVariant === "dark";

            return (
              <StaggerItem key={item.id}>
                <AnimateHoverItem as="article" className={styles.card}>
                  <div className={styles.cardBody}>
                    <span
                      className={`${styles.iconBox} ${isDark ? styles.iconBoxDark : ""}`}
                      aria-hidden="true"
                    >
                      {isDark ? <ShieldCheck size={20} /> : <Eye size={20} />}
                    </span>

                    <p className={styles.cardEyebrow}>{item.eyebrow}</p>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>

                  <div
                    className={`${styles.cardFooter} ${isDark ? styles.cardFooterWarm : ""}`}
                  >
                    <span className={styles.footerDot} aria-hidden="true" />
                    <span>{item.footerNote}</span>
                  </div>
                </AnimateHoverItem>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
};
