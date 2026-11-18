import {
  AnimateHoverItem,
  AnimateHoverLink,
  Container,
  Phone,
  ScrollReveal,
} from "@components";
import { COMPANY_INFO, PROJECTS_CTA_CONTENT } from "@constants";
import type React from "react";
import styles from "./ProjectsCtaBanner.module.scss";

export const ProjectsCtaBanner: React.FC = () => {
  const { eyebrow, title, description, primaryCta } = PROJECTS_CTA_CONTENT;

  return (
    <section
      className={styles.section}
      aria-labelledby="projects-cta-banner-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.banner}>
            <span className={styles.glow} aria-hidden="true" />

            <div className={styles.content}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h2 id="projects-cta-banner-heading" className={styles.title}>
                {title}
              </h2>
              <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.actions}>
              <AnimateHoverLink
                href={primaryCta.href}
                className={styles.primaryBtn}
              >
                <span>{primaryCta.label}</span>
              </AnimateHoverLink>

              <AnimateHoverItem as="span" className={styles.secondaryWrap}>
                <a
                  href={`tel:${COMPANY_INFO.hotline}`}
                  className={styles.secondaryBtn}
                >
                  <Phone size={15} aria-hidden="true" />
                  <span>Hotline: {COMPANY_INFO.hotlineFormatted}</span>
                </a>
              </AnimateHoverItem>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
