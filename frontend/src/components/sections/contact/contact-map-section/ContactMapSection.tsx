import {
  AnimateHoverItem,
  AnimateHoverLink,
  ClipboardList,
  Container,
  House,
  MapPin,
  ScrollReveal,
} from "@components";
import { CONTACT_MAP_SECTION } from "@constants";
import { ExternalLink } from "lucide-react";
import type React from "react";
import styles from "./ContactMapSection.module.scss";

export const ContactMapSection: React.FC = () => {
  const {
    studioTag,
    studioBuilding,
    studioAddress,
    googleMapsUrl,
    embedUrl,
    eyebrow,
    title,
    description,
    amenities,
    primaryBtn,
    secondaryBtn,
  } = CONTACT_MAP_SECTION;

  return (
    <section
      className={styles.section}
      aria-labelledby="contact-map-section-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.wrapperCard}>
            {/* Cột trái: Bản đồ + thẻ nổi địa chỉ */}
            <div className={styles.mapCol}>
              <iframe
                title="Bản đồ trụ sở Axhome tại TP. Hồ Chí Minh"
                src={embedUrl}
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className={styles.floatingCard}>
                <div className={styles.floatingHead}>
                  <span className={styles.floatingDot} aria-hidden="true" />
                  <span className={styles.floatingTag}>{studioTag}</span>
                </div>
                <p className={styles.floatingBuilding}>{studioBuilding}</p>
                <p className={styles.floatingAddress}>{studioAddress}</p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.floatingLink}
                >
                  <span>Mở trong Google Maps</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Cột phải: Hướng dẫn đón tiếp */}
            <div className={styles.guideCol}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h2 id="contact-map-section-heading" className={styles.title}>
                {title}
              </h2>
              <p className={styles.description}>{description}</p>

              <ul className={styles.amenities}>
                {amenities.map((item, idx) => (
                  <AnimateHoverItem
                    key={item.id}
                    className={styles.amenityItem}
                  >
                    <span className={styles.amenityIcon} aria-hidden="true">
                      {idx === 0 ? (
                        <House size={16} />
                      ) : (
                        <ClipboardList size={16} />
                      )}
                    </span>
                    <div className={styles.amenityBody}>
                      <h3 className={styles.amenityTitle}>{item.title}</h3>
                      <p className={styles.amenityDesc}>{item.description}</p>
                    </div>
                  </AnimateHoverItem>
                ))}
              </ul>

              <div className={styles.actions}>
                <AnimateHoverLink
                  href="#contact-form"
                  className={styles.primaryBtn}
                >
                  <ClipboardList size={15} aria-hidden="true" />
                  <span>{primaryBtn}</span>
                </AnimateHoverLink>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryBtn}
                >
                  <MapPin size={15} aria-hidden="true" />
                  <span>{secondaryBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
