"use client";

import { Button, Container } from "@components";
import { COMPANY_INFO, MAIN_NAV_ITEMS } from "@constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

	return (
		<>
			<header className={styles.headerWrapper}>
				<Container>
					<div className={styles.headerInner}>
						{/* Brand Logo */}
						<Link
							href="/"
							className={styles.brand}
							aria-label="Axhome Architecture Trang Chủ"
						>
							<div className={styles.brandLogo} aria-hidden="true">
								A
							</div>
							<div className={styles.brandText}>
								<span className={styles.brandName}>AXHOME</span>
								<span className={styles.brandTagline}>Architecture</span>
							</div>
						</Link>

						{/* Desktop Navigation */}
						<nav className={styles.navDesktop} aria-label="Điều hướng chính">
							{MAIN_NAV_ITEMS.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
								>
									{item.label}
								</Link>
							))}
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
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<line x1="3" y1="12" x2="21" y2="12" />
									<line x1="3" y1="6" x2="21" y2="6" />
									<line x1="3" y1="18" x2="21" y2="18" />
								</svg>
							</button>
						</div>
					</div>
				</Container>
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
