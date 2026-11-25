"use client";

import { Container } from "@components";
import {
  COMPANY_INFO,
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICES_LINKS,
} from "@constants";
import { trackContactClick } from "@lib/analytics";
import Link from "next/link";
import type React from "react";
import Logo from "../logo/Logo";
import styles from "./Footer.module.scss";

const ENCODED_SITE_URL = encodeURIComponent(COMPANY_INFO.website);

const SOCIAL_SHARE_LINKS = [
  {
    label: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${ENCODED_SITE_URL}`,
    ariaLabel: "Chia sẻ trang này lên Facebook",
  },
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${ENCODED_SITE_URL}`,
    ariaLabel: "Chia sẻ trang này lên LinkedIn",
  },
  {
    label: "X",
    href: `https://x.com/intent/tweet?url=${ENCODED_SITE_URL}`,
    ariaLabel: "Chia sẻ trang này lên X",
  },
] as const;

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footerWrapper}>
      <Container>
        <div className={styles.footerGrid}>
          {/* Col 1: Brand Info */}
          <div className={styles.brandCol}>
            <Logo size="large" asLink={false} />
            <p className={styles.slogan}>{COMPANY_INFO.slogan}</p>
            <p className={styles.description}>{COMPANY_INFO.description}</p>
          </div>

          {/* Col 2: Services */}
          <div className={styles.navCol}>
            <p className={styles.colTitle}>Dịch Vụ Cốt Lõi</p>
            <ul className={styles.linkList}>
              {FOOTER_SERVICES_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    rel={item.href.includes("?") ? "nofollow" : undefined}
                    className={styles.linkItem}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className={styles.navCol}>
            <p className={styles.colTitle}>Khám Phá</p>
            <ul className={styles.linkList}>
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.linkItem}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className={styles.contactCol}>
            <p className={styles.colTitle}>Liên Hệ & Trụ Sở</p>
            <div className={styles.officeInfo}>
              {COMPANY_INFO.offices.map((office) => (
                <div key={office.title} className={styles.officeItem}>
                  <span className={styles.officeName}>{office.title}</span>
                  <span className={styles.officeAddress}>{office.address}</span>
                </div>
              ))}
            </div>

            <div className={styles.hotlineBox}>
              <span className={styles.hotlineLabel}>
                Hotline Tư Vấn Dự Toán
              </span>
              <a
                href={`tel:${COMPANY_INFO.hotline}`}
                className={styles.hotlineNumber}
                onClick={() => trackContactClick("hotline")}
              >
                {COMPANY_INFO.hotlineFormatted}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>
            © 2024 {COMPANY_INFO.brandName} Vietnam. Bản quyền được bảo lưu.
          </p>
          <p>GPKD: 0108924829 cấp bởi Sở KH&ĐT TP. Hà Nội</p>
          <div className={styles.shareGroup}>
            <span className={styles.shareLabel}>Chia sẻ:</span>
            {SOCIAL_SHARE_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
                className={styles.shareLink}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
