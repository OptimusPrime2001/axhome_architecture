import { Container, ScrollReveal } from "@components";
import { CONTACT_REFERENCE_PROJECT, CONTACT_START_PROCESS } from "@constants";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import styles from "./ContactFormSection.module.scss";
import { DeepConsultForm } from "./DeepConsultForm";

export const ContactFormSection: React.FC = () => {
  const { eyebrow, title, description, steps } = CONTACT_START_PROCESS;

  return (
    <section
      id="contact-form"
      className={styles.section}
      aria-labelledby="contact-form-section-heading"
    >
      <Container>
        <div className={styles.layout}>
          {/* Cột trái: Quy trình bắt đầu + Dự án tham chiếu */}
          <ScrollReveal className={styles.infoCol}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 id="contact-form-section-heading" className={styles.title}>
              {title}
            </h2>
            <p className={styles.description}>{description}</p>

            <ol className={styles.stepsList}>
              {steps.map((step) => (
                <li key={step.id} className={styles.stepItem}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {step.number}
                  </span>
                  <div className={styles.stepBody}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href={CONTACT_REFERENCE_PROJECT.href}
              className={styles.refCard}
            >
              <div className={styles.refMedia}>
                <Image
                  src={CONTACT_REFERENCE_PROJECT.imageUrl}
                  alt={CONTACT_REFERENCE_PROJECT.imageAlt}
                  title={CONTACT_REFERENCE_PROJECT.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className={styles.refImage}
                />
              </div>
              <div className={styles.refFooter}>
                <div className={styles.refMeta}>
                  <span className={styles.refEyebrow}>
                    {CONTACT_REFERENCE_PROJECT.eyebrow}
                  </span>
                  <p className={styles.refTitle}>
                    {CONTACT_REFERENCE_PROJECT.title}
                  </p>
                </div>
                <span className={styles.refArrow} aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* Cột phải: Form tư vấn chuyên sâu */}
          <ScrollReveal delay={0.1}>
            <DeepConsultForm />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};
