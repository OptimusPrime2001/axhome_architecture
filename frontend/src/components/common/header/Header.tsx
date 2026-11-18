"use client";

import { AnimateIcon } from "@animate-ui/react/icons";
import {
  Highlight,
  HighlightItem,
} from "@animate-ui/react/primitives/effects/highlight";
import {
  ScrollProgress,
  ScrollProgressProvider,
} from "@animate-ui/react/primitives/scroll-progress";
import { Menu } from "@components/animate-ui";
import { Button, Container } from "@components/ui";
import { COMPANY_INFO, MAIN_NAV_ITEMS } from "@constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../logo/Logo";
import { MobileDrawer } from "../mobile-drawer";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const activeNavHref =
    MAIN_NAV_ITEMS.find((item) => isActive(item.href))?.href ?? null;

  return (
    <>
      <header className={styles.headerWrapper}>
        <Container>
          <div className={styles.headerInner}>
            <Logo />
            {/* Desktop Navigation with Animate-UI Highlight */}
            <nav className={styles.navDesktop} aria-label="Điều hướng chính">
              <Highlight
                mode="parent"
                controlledItems
                hover
                value={activeNavHref}
                className={styles.navHighlight}
                containerClassName={styles.navList}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              >
                {MAIN_NAV_ITEMS.map((item) => (
                  <HighlightItem key={item.href} value={item.href} asChild>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
                    >
                      {item.label}
                    </Link>
                  </HighlightItem>
                ))}
              </Highlight>
            </nav>

            {/* Header Actions */}
            <div className={styles.headerActions}>
              <a
                href={`tel:${COMPANY_INFO.hotline}`}
                className={styles.hotlineLink}
                aria-label={`Hotline: ${COMPANY_INFO.hotlineFormatted}`}
              >
                <span className={styles.hotlineLabel}>Hotline 24/7</span>
                <span className={styles.hotlineNumber}>
                  {COMPANY_INFO.hotlineFormatted}
                </span>
              </a>

              <div className={styles.ctaButton}>
                <Button href="/contact" size="sm" variant="primary">
                  Đăng Ký Tư Vấn
                </Button>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                className={styles.mobileMenuButton}
                onClick={() => setIsMobileOpen(true)}
                aria-label="Mở menu điều hướng"
                aria-expanded={isMobileOpen}
              >
                <AnimateIcon animateOnHover aria-hidden="true">
                  <Menu size={20} />
                </AnimateIcon>
              </button>
            </div>
          </div>
        </Container>
        <ScrollProgressProvider global>
          <div className={styles.scrollProgressTrack} aria-hidden="true">
            <ScrollProgress
              mode="scaleX"
              className={styles.scrollProgressBar}
            />
          </div>
        </ScrollProgressProvider>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        activePath={pathname}
      />
    </>
  );
};
