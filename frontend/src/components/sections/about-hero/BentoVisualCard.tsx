"use client";

import { ImageZoom } from "@animate-ui/react/primitives/effects/image-zoom";
import { Shine } from "@animate-ui/react/primitives/effects/shine";
import type { AboutBentoImage } from "@shared-types";
import Image from "next/image";
import type React from "react";
import styles from "./AboutHero.module.scss";

export interface BentoVisualCardProps {
  item: AboutBentoImage;
  variant: "primary" | "secondary";
  priority?: boolean;
  sizes: string;
}

export const BentoVisualCard: React.FC<BentoVisualCardProps> = ({
  item,
  variant,
  priority = false,
  sizes,
}) => {
  const isPrimary = variant === "primary";

  return (
    <figure className={isPrimary ? styles.bentoPrimary : styles.bentoSecondary}>
      <Shine
        enableOnHover
        color="#faf9f6"
        opacity={0.18}
        duration={900}
        className={styles.bentoShine}
      >
        <ImageZoom
          zoomOnHover
          zoomOnClick={false}
          zoomScale={1.06}
          className={styles.bentoZoom}
        >
          <div className={styles.bentoMediaInner}>
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              priority={priority}
              sizes={sizes}
              className={styles.bentoImage}
              unoptimized
            />
          </div>
        </ImageZoom>

        <div className={styles.bentoScrim} aria-hidden="true" />

        {isPrimary ? (
          <figcaption className={styles.bentoCaptionRow}>
            <div className={styles.bentoCaptionText}>
              <span className={styles.bentoEyebrow}>{item.eyebrow}</span>
              <p className={styles.bentoTitle}>{item.title}</p>
            </div>
            {item.badge && (
              <span className={styles.bentoScopeBadge}>{item.badge}</span>
            )}
          </figcaption>
        ) : (
          <figcaption className={styles.bentoCaptionCompact}>
            <span className={styles.bentoEyebrow}>{item.eyebrow}</span>
            <p className={styles.bentoTitleCompact}>{item.title}</p>
          </figcaption>
        )}
      </Shine>
    </figure>
  );
};
