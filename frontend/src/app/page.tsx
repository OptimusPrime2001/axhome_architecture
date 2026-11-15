import { Badge, Button, Container, SectionHeader } from "@components";
import { COMPANY_INFO, MOCK_PROJECTS } from "@constants";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export default function HomePage() {
	const featuredProjects = MOCK_PROJECTS.filter((p) => p.isFeatured).slice(
		0,
		3,
	);

	const getStatusBadge = (type: string) => {
		switch (type) {
			case "completed":
				return <Badge variant="completed">Đã Hoàn Thành</Badge>;
			case "under_construction":
				return <Badge variant="progress">Đang Thi Công</Badge>;
			case "concept":
				return <Badge variant="concept">Bản Vẽ 3D</Badge>;
			default:
				return <Badge variant="neutral">Dự Án</Badge>;
		}
	};

	return (
		<>
			{/* 1. HERO SECTION */}
			<section className={styles.heroSection}>
				<div className={styles.heroBackdrop} aria-hidden="true" />
				<Container>
					<div className={styles.heroContent}>
						<div className={styles.brandBadge}>
							<span className={styles.badgeDot} aria-hidden="true" />
							<span>{COMPANY_INFO.tagline}</span>
						</div>

						<h1 className={styles.heroTitle}>
							Kiến Tạo Không Gian Sống <br />
							Chuẩn Xác Từng Chi Tiết
						</h1>

						<p className={styles.heroSubtitle}>
							{COMPANY_INFO.slogan} — Tiên phong mang đến giải pháp kiến trúc
							độc bản kết hợp năng lực thi công thực tế với cam kết kiểm soát
							sai số ≤ 3%.
						</p>

						<div className={styles.heroActions}>
							<Button href="/projects" size="lg" variant="primary">
								Khám Phá Dự Án
							</Button>
							<Button href="/contact" size="lg" variant="secondary">
								Đăng Ký Tư Vấn
							</Button>
						</div>

						{/* Floating Metrics Ribbon */}
						<div className={styles.metricsRibbon}>
							{COMPANY_INFO.metrics.map((item) => (
								<div key={item.label} className={styles.metricItem}>
									<span className={styles.metricValue}>{item.value}</span>
									<span className={styles.metricLabel}>{item.label}</span>
									{item.subLabel && (
										<span className={styles.metricSub}>{item.subLabel}</span>
									)}
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* 2. FEATURED PROJECTS SECTION */}
			<section className={styles.projectsSection}>
				<Container>
					<SectionHeader
						tag="DỰ ÁN TIÊU BIỂU"
						title="Dấu Ấn Qua Từng Công Trình"
						description="Tuyển tập các công trình thực tế đã bàn giao và phương án thiết kế độc bản do đội ngũ Kiến trúc sư & Kỹ sư trưởng Axhome trực tiếp kiến tạo."
						align="center"
					/>

					<div className={styles.projectsGrid}>
						{featuredProjects.map((project) => (
							<Link
								key={project.id}
								href={`/projects/${project.slug}`}
								className={styles.projectCard}
							>
								<div className={styles.imageWrapper}>
									<Image
										src={project.coverImage}
										alt={project.title}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className={styles.cardImage}
										unoptimized
									/>
									<div className={styles.badgeOverlay}>
										{getStatusBadge(project.projectType)}
									</div>
								</div>

								<div className={styles.cardContent}>
									<span className={styles.metaLocation}>{project.city}</span>
									<h3 className={styles.cardTitle}>{project.title}</h3>
									<p className={styles.cardExcerpt}>{project.excerpt}</p>

									<div className={styles.specRow}>
										<div className={styles.specItem}>
											<span className={styles.specLabel}>Diện tích</span>
											<span className={styles.specValue}>
												{project.landArea} m²
											</span>
										</div>
										<div className={styles.specItem}>
											<span className={styles.specLabel}>Quy mô</span>
											<span className={styles.specValue}>
												{project.floorsCount} Tầng
											</span>
										</div>
										<div className={styles.specItem}>
											<span className={styles.specLabel}>Mặt tiền</span>
											<span className={styles.specValue}>
												{project.facadeWidth} m
											</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>

					<div className={styles.viewAllContainer}>
						<Button href="/projects" size="md" variant="secondary">
							Xem Toàn Bộ Dự Án
						</Button>
					</div>
				</Container>
			</section>
		</>
	);
}
