import { AnimateHoverItem, Container, Mail, Phone } from "@components";
import { COMPANY_INFO } from "@constants";
import styles from "./ContactCta.module.scss";
import { QuickConsultForm } from "./QuickConsultForm";

// =============================================================================
// Section 9 — CTA + Form tư vấn (Figma node 1:1941, 1280 × 898)
//
// - Panel tối 1120 × 706, padding 96px, có ambient glow góc trên bên phải.
// - Grid 2 cột: Text Info 363.33px / Form card 524.67px, gap 40px.
// =============================================================================

export const ContactCta: React.FC = () => (
  <section className={styles.section} aria-labelledby="contact-cta-heading">
    <Container>
      <div className={styles.panel}>
        <span className={styles.glow} aria-hidden="true" />

        <div className={styles.grid}>
          <div className={styles.info}>
            {/* TODO: đối chiếu eyebrow với Figma (node 1:1949) */}
            <p className={styles.eyebrow}>Khởi đầu không gian sống</p>

            <h2 id="contact-cta-heading" className={styles.title}>
              Cùng chúng tôi kiến tạo ngôi nhà mơ ước
            </h2>

            <p className={styles.lead}>
              Để lại thông tin hoặc đặt lịch hẹn trực tiếp cùng Tổng Kiến trúc
              sư trưởng để nhận phương án quy hoạch mặt bằng và tư vấn dự toán
              độc bản hoàn toàn miễn phí.
            </p>

            <ul className={styles.contactList}>
              <li className={styles.contactRow}>
                <AnimateHoverItem
                  as="span"
                  className={styles.contactIcon}
                  aria-hidden="true"
                >
                  <Phone />
                </AnimateHoverItem>

                <span className={styles.contactText}>
                  {/* TODO: đối chiếu label với Figma (node 1:1957) */}
                  <span className={styles.contactLabel}>
                    Hotline tư vấn 24/7
                  </span>
                  <a
                    className={styles.contactHotline}
                    href={`tel:${COMPANY_INFO.hotline}`}
                  >
                    {COMPANY_INFO.hotlineFormatted}
                  </a>
                </span>
              </li>

              <li className={styles.contactRow}>
                <AnimateHoverItem
                  as="span"
                  className={styles.contactIcon}
                  aria-hidden="true"
                >
                  <Mail />
                </AnimateHoverItem>

                <span className={styles.contactText}>
                  {/* TODO: đối chiếu label với Figma (node 1:1965) */}
                  <span className={styles.contactLabel}>Email tư vấn</span>
                  <a
                    className={styles.contactEmail}
                    href={`mailto:${COMPANY_INFO.email}`}
                  >
                    {COMPANY_INFO.email}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <QuickConsultForm />
        </div>
      </div>
    </Container>
  </section>
);
