"use client";

import { ScrollReveal } from "@components/animate-ui";
import { Container } from "@components/ui";
import type { FloorPlan } from "@shared-types";
import { CheckCircle2, Expand, Layers, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ProjectFloorPlans.module.scss";

export interface ProjectFloorPlansProps {
  floorPlans: FloorPlan[];
}

export const ProjectFloorPlans: React.FC<ProjectFloorPlansProps> = ({
  floorPlans,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    if (!isZoomOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsZoomOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isZoomOpen]);

  if (floorPlans.length === 0) return null;

  const activePlan = floorPlans[activeIndex] ?? floorPlans[0];

  return (
    <section
      className={styles.section}
      aria-labelledby="project-floor-plans-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>HỒ SƠ KỸ THUẬT CHI TIẾT</p>
            <h2 id="project-floor-plans-heading" className={styles.title}>
              Bản vẽ mặt bằng công năng các tầng
            </h2>
            <p className={styles.lead}>
              Bản vẽ bố trí mặt bằng khoa học, tối ưu luồng giao thông nội bộ,
              giải pháp thông gió chéo và kết nối vi khí hậu xuyên suốt các
              tầng.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.tabsRow} role="tablist" aria-label="Chọn tầng">
          {floorPlans.map((plan, index) => (
            <button
              key={plan.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={`${styles.tabBtn} ${index === activeIndex ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <ScrollReveal delay={0.08}>
          <div className={styles.viewerCard}>
            <div className={styles.imageCol}>
              <button
                type="button"
                className={styles.imageFrame}
                onClick={() => setIsZoomOpen(true)}
                aria-label={`Phóng to bản vẽ ${activePlan.name}`}
              >
                <Image
                  src={activePlan.imageUrl}
                  alt={activePlan.name}
                  title={activePlan.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className={styles.planImage}
                />
                <span className={styles.zoomHint} aria-hidden="true">
                  <Expand size={14} />
                  <span>Phóng to bản vẽ</span>
                </span>
              </button>
            </div>

            <div className={styles.infoCol}>
              <span className={styles.infoEyebrow}>QUY CHUẨN CÔNG NĂNG</span>
              <h3 className={styles.planName}>{activePlan.name}</h3>

              <div className={styles.areaBadge}>
                <Layers size={15} aria-hidden="true" />
                <span>
                  Tổng diện tích sàn:{" "}
                  <strong>{activePlan.areaSquareMeters} m²</strong>
                </span>
              </div>

              <p className={styles.planDesc}>{activePlan.description}</p>

              {activePlan.rooms && activePlan.rooms.length > 0 && (
                <ul className={styles.roomsList}>
                  {activePlan.rooms.map((room) => (
                    <li key={room} className={styles.roomItem}>
                      <CheckCircle2
                        size={16}
                        className={styles.roomIcon}
                        aria-hidden="true"
                      />
                      <span>{room}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {isZoomOpen && (
        <div
          className={styles.lightboxBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={`Phóng to: ${activePlan.name}`}
        >
          <button
            type="button"
            className={styles.lightboxBackdropBtn}
            onClick={() => setIsZoomOpen(false)}
            aria-label="Đóng xem bản vẽ"
          />
          <div className={styles.lightboxContent}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setIsZoomOpen(false)}
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
            <div className={styles.lightboxMedia}>
              <Image
                src={activePlan.imageUrl}
                alt={activePlan.name}
                title={activePlan.name}
                fill
                sizes="95vw"
                className={styles.lightboxImage}
              />
            </div>
            <p className={styles.lightboxCaption}>
              {activePlan.name} — {activePlan.areaSquareMeters} m²
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
