import { Container, ScrollReveal, ShieldCheck } from "@components";
import { COMPANY_INFO } from "@constants";
import type React from "react";
import styles from "./ProjectConsultCta.module.scss";
import { ProjectConsultForm } from "./ProjectConsultForm";

export interface ProjectConsultCtaProps {
  projectTitle: string;
}

export const ProjectConsultCta: React.FC<ProjectConsultCtaProps> = ({
  projectTitle,
}) => {
  return (
    <section
      id="project-consult-form"
      className={styles.section}
      aria-labelledby="project-consult-heading"
    >
      <Container>
        <ScrollReveal>
          <div className={styles.panel}>
            <div className={styles.infoCol}>
              <p className={styles.eyebrow}>ĐĂNG KÝ TƯ VẤN KIẾN TRÚC</p>
              <h2 id="project-consult-heading" className={styles.title}>
                Khởi tạo không gian sống xứng tầm trên khu đất của bạn
              </h2>
              <p className={styles.description}>
                Đội ngũ kiến trúc sư trưởng tại ARCHITECTURA sẽ phân tích hướng
                khu đất, đề xuất giải pháp bố trí mặt bằng công năng và báo giá
                khái toán sơ bộ hoàn toàn miễn phí.
              </p>

              <div className={styles.commitmentBox}>
                <span className={styles.commitmentIcon} aria-hidden="true">
                  <ShieldCheck size={18} />
                </span>
                <div className={styles.commitmentBody}>
                  <h3 className={styles.commitmentTitle}>
                    Cam kết độc quyền từ ARCHITECTURA
                  </h3>
                  <p className={styles.commitmentDesc}>
                    Khảo sát thực địa và phác thảo phương án bố trí mặt bằng sơ
                    bộ miễn phí trong 48 giờ làm việc.
                  </p>
                </div>
              </div>

              <div className={styles.contactMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>HOTLINE TRƯỞNG KTS</span>
                  <a
                    href={`tel:${COMPANY_INFO.hotline}`}
                    className={styles.metaValue}
                  >
                    {COMPANY_INFO.hotlineFormatted}
                  </a>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>PHẢN HỒI HỒ SƠ</span>
                  <span className={styles.metaValue}>Dưới 2 giờ làm việc</span>
                </div>
              </div>
            </div>

            <ProjectConsultForm projectTitle={projectTitle} />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
