import { Container } from "@components";
import {
	COMPANY_INFO,
	FOOTER_QUICK_LINKS,
	FOOTER_SERVICES_LINKS,
} from "@constants";
import Link from "next/link";
import type React from "react";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
	return (
		<footer className={styles.footerWrapper}>
			<Container>
				<div className={styles.footerGrid}>
					{/* Col 1: Brand Info */}
					<div className={styles.brandCol}>
						<div className={styles.brandLogo}>
							<span className={styles.logoIcon}>A</span>
							<span className={styles.brandTitle}>AXHOME</span>
						</div>
						<p className={styles.slogan}>{COMPANY_INFO.slogan}</p>
						<p className={styles.description}>{COMPANY_INFO.description}</p>

						<div className={styles.socialRow}>
							<a
								href={COMPANY_INFO.socialLinks.facebook}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.socialLink}
								aria-label="Facebook Axhome"
							>
								FB
							</a>
							<a
								href={COMPANY_INFO.socialLinks.zalo}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.socialLink}
								aria-label="Zalo Axhome"
							>
								ZL
							</a>
							<a
								href={COMPANY_INFO.socialLinks.youtube}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.socialLink}
								aria-label="YouTube Axhome"
							>
								YT
							</a>
						</div>
					</div>

					{/* Col 2: Services */}
					<div className={styles.navCol}>
						<h3 className={styles.colTitle}>Dịch Vụ Cốt Lõi</h3>
						<ul className={styles.linkList}>
							{FOOTER_SERVICES_LINKS.map((item) => (
								<li key={item.label}>
									<Link href={item.href} className={styles.linkItem}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Col 3: Quick Links */}
					<div className={styles.navCol}>
						<h3 className={styles.colTitle}>Khám Phá</h3>
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
						<h3 className={styles.colTitle}>Liên Hệ & Trụ Sở</h3>
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
							>
								{COMPANY_INFO.hotlineFormatted}
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className={styles.bottomBar}>
					<p>
						© 2026 AXHOME ARCHITECTURE. Bản quyền thuộc về Công ty Cổ phần Kiến
						trúc & Xây dựng Axhome.
					</p>
					<p>
						Mã số DN: 0317892345 • Chứng chỉ năng lực hoạt động xây dựng Hạng II
					</p>
				</div>
			</Container>
		</footer>
	);
};
