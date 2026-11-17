import {
  AnimateHoverItem,
  ClipboardList,
  Container,
  Hammer,
  Key,
  MapPin,
  MessageSquare,
  ScrollReveal,
  Sparkles,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { ABOUT_PROCESS_HEADER, ABOUT_PROCESS_STEPS } from "@constants";
import type React from "react";
import styles from "./AboutProcess.module.scss";

const STEP_ICONS: React.ReactNode[] = [
  <MessageSquare key="about-step-1" size={18} />,
  <Sparkles key="about-step-2" size={18} />,
  <ClipboardList key="about-step-3" size={18} />,
  <MapPin key="about-step-4" size={18} />,
  <Hammer key="about-step-5" size={18} />,
  <Key key="about-step-6" size={18} />,
];

export const AboutProcess: React.FC = () => {
  return (
    <section
      id="process"
      className={styles.section}
      aria-labelledby="about-process-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{ABOUT_PROCESS_HEADER.eyebrow}</p>
            <h2 id="about-process-heading" className={styles.title}>
              {ABOUT_PROCESS_HEADER.title}
            </h2>
            <p className={styles.lead}>{ABOUT_PROCESS_HEADER.description}</p>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.grid}>
          {ABOUT_PROCESS_STEPS.map((step, index) => (
            <StaggerItem key={step.id}>
              <AnimateHoverItem className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.cardHead}>
                    <span className={styles.number} aria-hidden="true">
                      {step.number}
                    </span>
                    <span className={styles.iconBox} aria-hidden="true">
                      {STEP_ICONS[index]}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardDesc}>{step.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span>{step.durationLabel}</span>
                </div>
              </AnimateHoverItem>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
