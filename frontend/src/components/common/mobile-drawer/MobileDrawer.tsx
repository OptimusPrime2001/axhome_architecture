"use client";

import { Button } from "@components";
import { COMPANY_INFO, MAIN_NAV_ITEMS } from "@constants";
import Link from "next/link";
import type React from "react";
import styles from "./MobileDrawer.module.scss";

export interface MobileDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	activePath: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
	isOpen,
	onClose,
	activePath,
}) => {
	const isActive = (href: string) => {
		if (href === "/") {
			return activePath === "/";
		}
		return activePath.startsWith(href);
	};

	return (
		<>
			{/* Backdrop */}
			<div
				className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Drawer */}
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Menu di động"
				className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
				aria-hidden={!isOpen}
			>
				<div className={styles.drawerHeader}>
					<span className={styles.brandTitle}>AXHOME ARCHITECTURE</span>
					<button
						type="button"
						className={styles.closeButton}
						onClick={onClose}
						aria-label="Đóng menu"
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
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				<nav className={styles.drawerNav}>
					{MAIN_NAV_ITEMS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`${styles.navItem} ${isActive(item.href) ? styles.active : ""}`}
							onClick={onClose}
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className={styles.drawerFooter}>
					<div className={styles.contactBlock}>
						<span className={styles.contactLabel}>Hotline Hỗ Trợ 24/7</span>
						<a
							href={`tel:${COMPANY_INFO.hotline}`}
							className={styles.contactValue}
						>
							{COMPANY_INFO.hotlineFormatted}
						</a>
					</div>

					<Button
						href="/contact"
						size="md"
						variant="primary"
						fullWidth
						onClick={onClose}
					>
						Đăng Ký Tư Vấn Ngay
					</Button>
				</div>
			</div>
		</>
	);
};
