import { AnimateIcon } from "@animate-ui/react/icons";
import { Container } from "@components";
import { HOME_TESTIMONIALS, HOME_TESTIMONIALS_HEADER } from "@constants";
import Image from "next/image";
import type React from "react";
import { Star } from "@/components/animate-ui/icons/star";
import styles from "./TestimonialsSection.module.scss";

const STAR_INDICES = [1, 2, 3, 4, 5] as const;

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="testimonials-section-heading"
    >
      <Container>
        {/* Header canh giữa, 768px (Figma node 1:1865) */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>{HOME_TESTIMONIALS_HEADER.eyebrow}</p>
          <h2 id="testimonials-section-heading" className={styles.title}>
            {HOME_TESTIMONIALS_HEADER.title}
          </h2>
          <p className={styles.lead}>{HOME_TESTIMONIALS_HEADER.description}</p>
        </div>

        {/* 3 Luxury Testimonial Cards (Figma node 1:1871) */}
        <ul className={styles.grid}>
          {HOME_TESTIMONIALS.map((item) => (
            <li key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <AnimateIcon
                  animateOnHover
                  role="img"
                  className={styles.stars}
                  aria-label={`Đánh giá ${item.rating} trên 5 sao`}
                >
                  {STAR_INDICES.map((starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      className={styles.starIcon}
                      aria-hidden="true"
                    />
                  ))}
                </AnimateIcon>
                <blockquote className={styles.quote}>{item.quote}</blockquote>
              </div>

              <div className={styles.authorRow}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={item.avatarUrl}
                    alt={item.authorName}
                    fill
                    sizes="48px"
                    className={styles.avatar}
                    unoptimized
                  />
                </div>
                <div className={styles.authorMeta}>
                  <p className={styles.authorName}>{item.authorName}</p>
                  <p className={styles.authorRole}>{item.authorRole}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
