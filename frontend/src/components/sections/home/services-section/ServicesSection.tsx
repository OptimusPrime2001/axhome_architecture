import { AnimateIcon } from "@animate-ui/react/icons";
import {
  ArrowRight,
  Check,
  Container,
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { HOME_SERVICES, HOME_SERVICES_HEADER } from "@constants";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import styles from "./ServicesSection.module.scss";

export const ServicesSection: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="services-section-heading"
    >
      <Container>
        {/* Header 2-col: Left title / Right description (Figma node 1:1418) */}
        <ScrollReveal>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <p className={styles.eyebrow}>{HOME_SERVICES_HEADER.eyebrow}</p>
              <h2 id="services-section-heading" className={styles.title}>
                {HOME_SERVICES_HEADER.title}
              </h2>
            </div>
            <p className={styles.lead}>{HOME_SERVICES_HEADER.description}</p>
          </div>
        </ScrollReveal>

        {/* 3 Service Cards Grid (Figma node 1:1424) */}
        <StaggerGroup className={styles.grid}>
          {HOME_SERVICES.map((service) => (
            <StaggerItem key={service.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={service.imageUrl}
                  alt={service.imageAlt}
                  title={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImage}
                />
                <span className={styles.badge}>{service.badge}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>

                <ul className={styles.featureList}>
                  {service.features.map((feature) => (
                    <li key={feature} className={styles.featureItem}>
                      <AnimateIcon
                        animateOnHover
                        className={styles.checkIcon}
                        aria-hidden="true"
                      >
                        <Check size={14} />
                      </AnimateIcon>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={service.href} className={styles.cardLink}>
                  <span>{service.ctaLabel}</span>
                  <AnimateIcon animateOnHover className={styles.cardLinkInner}>
                    <ArrowRight
                      size={14}
                      className={styles.arrowIcon}
                      aria-hidden="true"
                    />
                  </AnimateIcon>
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
