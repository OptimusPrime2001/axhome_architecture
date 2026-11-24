import { AnimateIcon } from "@animate-ui/react/icons";
import { Container, ScrollReveal, Star } from "@components";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Marquee } from "@components/ui/marquee";
import { HOME_TESTIMONIALS, HOME_TESTIMONIALS_HEADER } from "@constants";
import type { TestimonialItem } from "@shared-types";
import type React from "react";
import styles from "./TestimonialsSection.module.scss";

const STAR_INDICES = [1, 2, 3, 4, 5] as const;

const SPLIT_INDEX = Math.ceil(HOME_TESTIMONIALS.length / 2);
const FIRST_ROW_TESTIMONIALS = HOME_TESTIMONIALS.slice(0, SPLIT_INDEX);
const SECOND_ROW_TESTIMONIALS = HOME_TESTIMONIALS.slice(SPLIT_INDEX);

function getAuthorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "AX";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const lastTwo = parts.slice(-2);
  return `${lastTwo[0][0] ?? ""}${lastTwo[1][0] ?? ""}`.toUpperCase();
}

interface TestimonialCardProps {
  item: TestimonialItem;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => {
  return (
    <article className={styles.card}>
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
        <Avatar>
          <AvatarImage src={item.avatarUrl} alt={item.authorName} />
          <AvatarFallback>{getAuthorInitials(item.authorName)}</AvatarFallback>
        </Avatar>
        <div className={styles.authorMeta}>
          <p className={styles.authorName}>{item.authorName}</p>
          <p className={styles.authorRole}>{item.authorRole}</p>
        </div>
      </div>
    </article>
  );
};

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="testimonials-section-heading"
    >
      <Container>
        {/* Header canh giữa, 768px (Figma node 1:1865) */}
        <ScrollReveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{HOME_TESTIMONIALS_HEADER.eyebrow}</p>
            <h2 id="testimonials-section-heading" className={styles.title}>
              {HOME_TESTIMONIALS_HEADER.title}
            </h2>
            <p className={styles.lead}>
              {HOME_TESTIMONIALS_HEADER.description}
            </p>
          </div>
        </ScrollReveal>
      </Container>

      {/* Dual-row opposite-direction Marquee showcase */}
      <ScrollReveal delay={0.1}>
        <div className={styles.marqueeContainer}>
          <Marquee pauseOnHover repeat={3} className={styles.marqueeRow}>
            {FIRST_ROW_TESTIMONIALS.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </Marquee>
          <div className={styles.fadeLeft} aria-hidden="true" />
          <div className={styles.fadeRight} aria-hidden="true" />
        </div>
      </ScrollReveal>
    </section>
  );
};
