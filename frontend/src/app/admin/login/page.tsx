import { AdminLoginForm } from "@components/admin";
import { ADMIN_LOGIN_COPY, COMPANY_INFO, R2_IMG_URL } from "@constants";
import { BadgeCheck, Building2, Lock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./LoginPage.module.scss";

export const metadata: Metadata = {
  title: "Đăng nhập Quản trị",
  description: "Cổng đăng nhập hệ thống quản trị nội dung Axhome Architecture.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.topEyebrow}>
        <p>{ADMIN_LOGIN_COPY.topEyebrow}</p>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.cardContainer}>
          <div className={styles.splitCard}>
            {/* Left Visual Panel */}
            <aside
              className={styles.visualPanel}
              aria-label="Giới thiệu cổng quản trị"
            >
              <Image
                src={`${R2_IMG_URL}/banner/hero_background.jpg`}
                alt="Không gian kiến trúc Axhome Architecture"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
                className={styles.visualBg}
              />
              <div className={styles.visualOverlay} aria-hidden="true" />

              <div className={styles.visualInner}>
                <div className={styles.portalHeader}>
                  <Link href="/" className={styles.portalBrandRow}>
                    <Image
                      src="/images/axhome_logo.png"
                      alt="Axhome Architecture"
                      width={44}
                      height={28}
                      className={styles.portalLogo}
                      priority
                    />
                    <span className={styles.portalDivider} aria-hidden="true" />
                    <span className={styles.portalLabel}>
                      {ADMIN_LOGIN_COPY.portalLabel}
                    </span>
                  </Link>
                  <p className={styles.studioLocation}>
                    {ADMIN_LOGIN_COPY.studioLocation}
                  </p>
                </div>

                <div className={styles.heroCopy}>
                  <p className={styles.heroBadge}>
                    <BadgeCheck size={14} aria-hidden="true" />
                    <span>{ADMIN_LOGIN_COPY.heroBadge}</span>
                  </p>
                  <h2 className={styles.heroTitle}>
                    {ADMIN_LOGIN_COPY.heroTitleLine1}
                    <br />
                    <em>{ADMIN_LOGIN_COPY.heroTitleLine2}</em>
                  </h2>
                  <p className={styles.heroDescription}>
                    {ADMIN_LOGIN_COPY.heroDescription}
                  </p>
                </div>

                <div className={styles.statusCard}>
                  <div className={styles.statusIconBox} aria-hidden="true">
                    <Building2 size={16} />
                  </div>
                  <div className={styles.statusMeta}>
                    <p className={styles.statusTitle}>
                      {ADMIN_LOGIN_COPY.heroStatTitle}
                    </p>
                    <p className={styles.statusSubtitle}>
                      {ADMIN_LOGIN_COPY.heroStatSubtitle}
                    </p>
                  </div>
                  <span className={styles.isoBadge}>
                    ● {ADMIN_LOGIN_COPY.heroComplianceTag}
                  </span>
                </div>
              </div>
            </aside>

            {/* Right Form Panel */}
            <section
              className={styles.formPanel}
              aria-labelledby="admin-login-heading"
            >
              <div className={styles.formHeader}>
                <p className={styles.formEyebrow}>
                  <span className={styles.eyebrowSquare} aria-hidden="true" />
                  <span>{ADMIN_LOGIN_COPY.formEyebrow}</span>
                </p>
                <h1 id="admin-login-heading" className={styles.formTitle}>
                  {ADMIN_LOGIN_COPY.formTitle}
                </h1>
                <p className={styles.formSubtitle}>
                  {ADMIN_LOGIN_COPY.formSubtitle}
                </p>
              </div>

              <div className={styles.formDivider} aria-hidden="true" />

              <AdminLoginForm />
            </section>
          </div>

          <div className={styles.systemStatusBar}>
            <p className={styles.serverStatus}>
              <span className={styles.onlineDot} aria-hidden="true" />
              <span>{ADMIN_LOGIN_COPY.serverStatus}</span>
            </p>
            <p className={styles.versionInfo}>{ADMIN_LOGIN_COPY.versionText}</p>
          </div>
        </div>
      </main>

      <footer className={styles.pageFooter}>
        <div className={styles.footerItem}>
          <Lock size={13} aria-hidden="true" />
          <span>Hệ thống Bảo mật Nội bộ Axhome Architecture v2.4</span>
        </div>
        <div className={styles.footerItem}>
          <span>
            Hỗ trợ kỹ thuật: <strong>{COMPANY_INFO.hotlineFormatted}</strong>
          </span>
          <span aria-hidden="true">•</span>
          <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
        </div>
        <p>© 2024 Axhome Architecture. All rights reserved.</p>
      </footer>
    </div>
  );
}
