"use client";

import { ScrollReveal } from "@components/animate-ui";
import { SafeImage } from "@components/common";
import { Container } from "@components/ui";
import type { GallerySpaceCategory, ProjectImage } from "@shared-types";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./ProjectDetailGallery.module.scss";

export interface ProjectDetailGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

type GalleryFilter = "all" | GallerySpaceCategory;

const SPACE_FILTER_OPTIONS: ReadonlyArray<{
  key: GallerySpaceCategory;
  label: string;
}> = [
  { key: "exterior_day", label: "Ngoại thất ban ngày" },
  { key: "exterior_night", label: "Ngoại thất ban đêm" },
  { key: "living_room", label: "Phòng khách" },
  { key: "pool_garden", label: "Hồ bơi & sân vườn" },
  { key: "interior_other", label: "Không gian khác" },
];

const SPACE_BADGE_LABELS: Record<GallerySpaceCategory, string> = {
  exterior_day: "NGOẠI THẤT BAN NGÀY",
  exterior_night: "NGOẠI THẤT BAN ĐÊM",
  living_room: "PHÒNG KHÁCH",
  pool_garden: "HỒ BƠI & SÂN VƯỜN",
  interior_other: "KHÔNG GIAN NỘI THẤT",
};

export const ProjectDetailGallery: React.FC<ProjectDetailGalleryProps> = ({
  images,
  projectTitle,
}) => {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const availableTabs = useMemo(() => {
    const presentCategories = new Set(
      images
        .map((img) => img.spaceCategory)
        .filter((cat): cat is GallerySpaceCategory => Boolean(cat)),
    );
    return SPACE_FILTER_OPTIONS.filter((opt) => presentCategories.has(opt.key));
  }, [images]);

  const showFilterTabs = availableTabs.length >= 2;

  const visibleImages = useMemo(() => {
    if (filter === "all") return images;
    return images.filter((img) => img.spaceCategory === filter);
  }, [images, filter]);

  const handleClose = useCallback(() => setLightboxIndex(null), []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + visibleImages.length) % visibleImages.length,
    );
  }, [visibleImages.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % visibleImages.length,
    );
  }, [visibleImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  if (images.length === 0) return null;

  const activeImage =
    lightboxIndex !== null ? visibleImages[lightboxIndex] : null;

  return (
    <section
      className={styles.section}
      aria-labelledby="project-gallery-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.headerRow}>
            <div>
              <p className={styles.eyebrow}>THƯ VIỆN HÌNH ẢNH</p>
              <h2 id="project-gallery-heading" className={styles.title}>
                Phối cảnh & Không gian kiến trúc
              </h2>
            </div>

            {showFilterTabs && (
              <div className={styles.filterTabs} role="tablist">
                <button
                  key="all"
                  type="button"
                  role="tab"
                  aria-selected={filter === "all"}
                  className={`${styles.filterTab} ${filter === "all" ? styles.filterTabActive : ""}`}
                  onClick={() => {
                    setFilter("all");
                    setLightboxIndex(null);
                  }}
                >
                  Tất cả góc nhìn
                </button>
                {availableTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={filter === tab.key}
                    className={`${styles.filterTab} ${filter === tab.key ? styles.filterTabActive : ""}`}
                    onClick={() => {
                      setFilter(tab.key);
                      setLightboxIndex(null);
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className={styles.grid}>
            {visibleImages.map((img, idx) => {
              const badgeText = img.spaceCategory
                ? SPACE_BADGE_LABELS[img.spaceCategory]
                : img.type === "render_3d"
                  ? "3D RENDER"
                  : "ẢNH THỰC TẾ";

              return (
                <button
                  key={img.id}
                  type="button"
                  className={`${styles.tile} ${idx === 0 && visibleImages.length >= 3 ? styles.tileFeatured : ""}`}
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Phóng to: ${img.caption}`}
                >
                  <SafeImage
                    src={img.url}
                    alt={`${projectTitle} — ${img.caption}`}
                    title={`${projectTitle} — ${img.caption}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className={styles.tileImage}
                  />
                  <div className={styles.tileScrim} aria-hidden="true" />
                  <span className={styles.zoomBadge} aria-hidden="true">
                    <Expand size={14} />
                  </span>
                  <div className={styles.tileCaption}>
                    <span className={styles.tileType}>{badgeText}</span>
                    <p className={styles.tileText}>{img.caption}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>

      {activeImage && lightboxIndex !== null && (
        <div
          className={styles.lightboxBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={`Xem ảnh: ${activeImage.caption}`}
        >
          <button
            type="button"
            className={styles.lightboxBackdropBtn}
            onClick={handleClose}
            aria-label="Đóng trình xem ảnh"
          />
          <div className={styles.lightboxContent}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={handleClose}
              aria-label="Đóng trình xem ảnh"
            >
              <X size={20} />
            </button>

            {visibleImages.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                  onClick={handlePrev}
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                  onClick={handleNext}
                  aria-label="Ảnh tiếp theo"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div className={styles.lightboxMedia}>
              <SafeImage
                src={activeImage.url}
                alt={activeImage.caption}
                title={activeImage.caption}
                fill
                sizes="90vw"
                className={styles.lightboxImage}
              />
            </div>

            <div className={styles.lightboxFooter}>
              <p className={styles.lightboxCaption}>{activeImage.caption}</p>
              <span className={styles.lightboxCounter}>
                {lightboxIndex + 1} / {visibleImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
