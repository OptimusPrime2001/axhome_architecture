import {
  AnimateHoverItem,
  Clock,
  Compass,
  Container,
  House,
  Phone,
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@components";
import { CONTACT_HERO_CONTENT, CONTACT_INFO_CARDS } from "@constants";
import type { ContactHeroCardItem } from "@shared-types";
import { Home } from "lucide-react";
import Link from "next/link";
import type React from "react";
import styles from "./ContactHero.module.scss";

const CARD_ICONS: Record<ContactHeroCardItem["iconKey"], React.ReactNode> = {
  office: <House size={18} />,
  studio: <Compass size={18} />,
  hotline: <Phone size={18} />,
  hours: <Clock size={18} />,
};

export const ContactHero: React.FC = () => {
  const { badge, title, description, responseCard } = CONTACT_HERO_CONTENT;

  return (
    <section className={styles.section} aria-labelledby="contact-hero-heading">
      <Container>
        <div className={styles.heroMeta}>
          <nav className={styles.breadcrumb} aria-label="Đường dẫn điều hướng">
            <Link href="/" className={styles.breadcrumbLink}>
              <Home size={13} aria-hidden="true" />
              <span>Trang chủ</span>
            </Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">
              /
            </span>
            <span className={styles.breadcrumbCurrent} aria-current="page">
              Liên hệ
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
              <h1 id="contact-hero-heading" className={styles.title}>
                {title}
              </h1>
              <p className={styles.description}>{description}</p>
            </div>

            <AnimateHoverItem as="div" className={styles.responseCard}>
              <p className={styles.responseEyebrow}>{responseCard.eyebrow}</p>
              <div className={styles.responseTitleRow}>
                <span className={styles.responseIcon} aria-hidden="true">
                  <Clock size={16} />
                </span>
                <p className={styles.responseTitle}>{responseCard.title}</p>
              </div>
              <p className={styles.responseDesc}>{responseCard.description}</p>
            </AnimateHoverItem>
          </div>
        </ScrollReveal>

        <StaggerGroup className={styles.cardsGrid}>
          {CONTACT_INFO_CARDS.map((card) => (
            <StaggerItem key={card.id}>
              <AnimateHoverItem className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardIconBox} aria-hidden="true">
                    {CARD_ICONS[card.iconKey]}
                  </span>
                  <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                  <h2 className={styles.cardTitle}>{card.title}</h2>
                  <div className={styles.cardLines}>
                    {card.lines.map((line) => (
                      <p key={line} className={styles.cardLine}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span>{card.footerNote}</span>
                </div>
              </AnimateHoverItem>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
};
