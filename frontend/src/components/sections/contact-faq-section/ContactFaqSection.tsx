import { Container, ScrollReveal } from "@components";
import { CONTACT_FAQ_HEADER, CONTACT_FAQ_ITEMS } from "@constants";
import type React from "react";
import { ContactFaqList } from "./ContactFaqList";
import styles from "./ContactFaqSection.module.scss";

export const ContactFaqSection: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="contact-faq-section-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{CONTACT_FAQ_HEADER.eyebrow}</p>
            <h2 id="contact-faq-section-heading" className={styles.title}>
              {CONTACT_FAQ_HEADER.title}
            </h2>
            <p className={styles.lead}>{CONTACT_FAQ_HEADER.description}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <ContactFaqList items={CONTACT_FAQ_ITEMS} />
        </ScrollReveal>
      </Container>
    </section>
  );
};
