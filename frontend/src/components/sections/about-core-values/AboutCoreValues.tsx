import {
  AnimateHoverItem,
  BadgeCheck,
  Compass,
  Container,
  ScrollReveal,
  ShieldCheck,
  StaggerGroup,
  StaggerItem,
  Users,
} from "@components";
import { ABOUT_CORE_VALUES, ABOUT_CORE_VALUES_HEADER } from "@constants";
import type React from "react";
import styles from "./AboutCoreValues.module.scss";

const VALUE_ICONS: React.ReactNode[] = [
  <Compass key="val-1" size={18} />,
  <BadgeCheck key="val-2" size={18} />,
  <ShieldCheck key="val-3" size={18} />,
  <Users key="val-4" size={18} />,
];

export const AboutCoreValues: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-core-values-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <p className={styles.eyebrow}>
                {ABOUT_CORE_VALUES_HEADER.eyebrow}
              </p>
              <h2 id="about-core-values-heading" className={styles.title}>
                {ABOUT_CORE_VALUES_HEADER.title}
              </h2>
            </div>
            <p className={styles.lead}>
              {ABOUT_CORE_VALUES_HEADER.description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.grid}>
          {ABOUT_CORE_VALUES.map((item, index) => (
            <StaggerItem key={item.id}>
              <AnimateHoverItem className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.iconBox} aria-hidden="true">
                    {VALUE_ICONS[index]}
                  </span>
                  <p className={styles.tag}>{item.tag}</p>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.footerDot} aria-hidden="true" />
                  <span>{item.footerNote}</span>
                </div>
              </AnimateHoverItem>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
