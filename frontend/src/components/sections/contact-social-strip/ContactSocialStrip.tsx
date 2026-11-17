import {
  AnimateHoverItem,
  Container,
  Globe,
  House,
  ScrollReveal,
  Sparkles,
  StaggerGroup,
  StaggerItem,
  Users,
} from "@components";
import { CONTACT_SOCIAL_HEADER, CONTACT_SOCIAL_LINKS } from "@constants";
import type { ContactSocialLink } from "@shared-types";
import { Share2 } from "lucide-react";
import type React from "react";
import styles from "./ContactSocialStrip.module.scss";

const SOCIAL_ICONS: Record<ContactSocialLink["iconKey"], React.ReactNode> = {
  behance: <Sparkles size={14} />,
  archdaily: <House size={14} />,
  instagram: <Globe size={14} />,
  youtube: <Share2 size={14} />,
  facebook: <Users size={14} />,
};

export const ContactSocialStrip: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="contact-social-strip-heading"
    >
      <Container>
        <div className={styles.row}>
          <ScrollReveal className={styles.headerCol}>
            <p className={styles.eyebrow}>{CONTACT_SOCIAL_HEADER.eyebrow}</p>
            <h2 id="contact-social-strip-heading" className={styles.title}>
              {CONTACT_SOCIAL_HEADER.title}
            </h2>
          </ScrollReveal>

          <div className={styles.chips}>
            {CONTACT_SOCIAL_LINKS.map((item) => (
              <AnimateHoverItem key={item.id} className={styles.chipItem}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.chipLink}
                >
                  <span className={styles.chipIcon} aria-hidden="true">
                    {SOCIAL_ICONS[item.iconKey]}
                  </span>
                  <span>{item.label}</span>
                </a>
              </AnimateHoverItem>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
