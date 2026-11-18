import {
  AnimateHoverItem,
  AnimateHoverLink,
  ArrowRight,
  Container,
  Eye,
  House,
  MapPin,
  Phone,
  ScrollReveal,
  ShieldCheck,
} from "@components";
import { ABOUT_CTA_BANNER_CONTENT } from "@constants";
import type React from "react";
import styles from "./AboutCtaBanner.module.scss";

const HIGHLIGHT_ICONS: React.ReactNode[] = [
  <Phone key="hl-1" size={14} />,
  <MapPin key="hl-2" size={14} />,
  <ShieldCheck key="hl-3" size={14} />,
];

export const AboutCtaBanner: React.FC = () => {
  const { badge, title, description, primaryCta, secondaryCta, highlights } =
    ABOUT_CTA_BANNER_CONTENT;

  return (
    <section
      className={styles.section}
      aria-labelledby="about-cta-banner-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.banner}>
            <span className={styles.glow} aria-hidden="true" />

            <div className={styles.content}>
              <AnimateHoverItem as="div" className={styles.badge}>
                <House size={12} aria-hidden="true" />
                <span>{badge}</span>
              </AnimateHoverItem>

              <h2 id="about-cta-banner-heading" className={styles.title}>
                {title}
              </h2>

              <p className={styles.description}>{description}</p>

              <div className={styles.actions}>
                <AnimateHoverLink
                  href={primaryCta.href}
                  className={styles.primaryBtn}
                >
                  <span>{primaryCta.label}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </AnimateHoverLink>

                <AnimateHoverLink
                  href={secondaryCta.href}
                  className={styles.secondaryBtn}
                >
                  <span>{secondaryCta.label}</span>
                  <Eye size={15} aria-hidden="true" />
                </AnimateHoverLink>
              </div>

              <ul className={styles.highlights}>
                {highlights.map((item, idx) => (
                  <AnimateHoverItem
                    key={item.id}
                    className={styles.highlightItem}
                  >
                    <span className={styles.highlightIcon} aria-hidden="true">
                      {HIGHLIGHT_ICONS[idx]}
                    </span>
                    <span>{item.label}</span>
                  </AnimateHoverItem>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
