import { AnimateIcon } from "@animate-ui/react/icons";
import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";
import { MorphingText } from "@animate-ui/react/primitives/texts/morphing";

import { fetchPublicProjects } from "@apis";
import {
  ArrowRight,
  Badge,
  Button,
  CompanyIntro,
  ContactCta,
  Container,
  SafeImage,
  ScrollReveal,
  SectionHeader,
  ServicesSection,
  SiteNavigationJsonLd,
  StaggerGroup,
  StaggerItem,
  TestimonialsSection,
  WebSiteJsonLd,
  WhyChooseUs,
} from "@components";
import { COMPANY_INFO, PROJECT_TYPES, R2_IMG_URL } from "@constants";
import type { Project } from "@shared-types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export const revalidate = 60;

const HOME_SEO_TITLE = `${COMPANY_INFO.brandName} — Thiết Kế Kiến Trúc & Thi Công Biệt Thự Trọn Gói`;

export const metadata: Metadata = {
  title: {
    absolute: HOME_SEO_TITLE,
  },
  description: COMPANY_INFO.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: COMPANY_INFO.brandName,
    title: HOME_SEO_TITLE,
    description: COMPANY_INFO.description,
    images: [
      {
        url: `${R2_IMG_URL}/banner/hero_background.jpg`,
        width: 1200,
        height: 630,
        alt: HOME_SEO_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SEO_TITLE,
    description: COMPANY_INFO.description,
    images: [`${R2_IMG_URL}/banner/hero_background.jpg`],
  },
};

function getStatusBadge(type: string) {
  switch (type) {
    case PROJECT_TYPES.COMPLETED:
      return <Badge variant="completed">Đã Hoàn Thành</Badge>;
    case PROJECT_TYPES.UNDER_CONSTRUCTION:
      return <Badge variant="progress">Đang Thi Công</Badge>;
    case PROJECT_TYPES.CONCEPT:
      return <Badge variant="concept">Bản Vẽ 3D</Badge>;
    default:
      return <Badge variant="neutral">Dự Án</Badge>;
  }
}

async function FeaturedProjectsGrid() {
  let featuredProjects: Project[] = [];

  try {
    const res = await fetchPublicProjects({ featured: true, limit: 3 });
    if (res?.items) {
      featuredProjects = res.items;
    }
  } catch {
    // Render empty state if Go backend is temporarily unavailable
  }

  return (
    <StaggerGroup className={styles.projectsGrid}>
      {featuredProjects.map((project) => (
        <StaggerItem key={project.id}>
          <article className={styles.projectCard}>
            <div className={styles.imageWrapper}>
              <SafeImage
                src={project.coverImage}
                alt={project.title}
                title={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.cardImage}
              />
              <div className={styles.badgeOverlay}>
                {getStatusBadge(project.projectType)}
              </div>
            </div>

            <div className={styles.cardContent}>
              <span className={styles.metaLocation}>{project.city}</span>
              <h3 className={styles.cardTitle}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.cardStretchLink}
                >
                  {project.title}
                </Link>
              </h3>
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
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

export default function HomePage() {
  return (
    <>
      <WebSiteJsonLd />
      <SiteNavigationJsonLd />
      {/* 1. HERO SECTION (Figma node 1:1294) */}
      <section className={styles.heroSection}>
        <div className={styles.heroVisualBackdrop}>
          <Image
            src={`${R2_IMG_URL}/banner/hero_background.jpg`}
            alt="Biệt thự kiến trúc đương đại thiết kế và thi công trọn gói bởi AXHOME"
            title="AXHOME Architecture — Thiết kế kiến trúc biệt thự & thi công trọn gói"
            fill
            priority
            fetchPriority="high"
            quality={75}
            sizes="100vw"
            className={styles.heroBackgroundImage}
          />
          <div className={styles.heroScrimOverlay} aria-hidden="true" />
          <div className={styles.heroBottomGradient} aria-hidden="true" />
        </div>

        <Container>
          <div className={styles.heroContent}>
            <div className={styles.brandBadge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              <span>{COMPANY_INFO.slogan}</span>
            </div>
            <h1 className={styles.srOnlyHeading}>
              Thiết Kế Kiến Trúc & Thi Công Biệt Thự Trọn Gói — AXHOME
            </h1>
            <div className={styles.heroMorphGroup} aria-hidden="true">
              <MorphingText
                className={styles.heroTitle}
                text={[
                  "Kiến tạo không gian",
                  "Xây dựng công trình",
                  "Đặt tâm huyết vào",
                ]}
                loop
              />

              {/* Dòng 2 */}
              <MorphingText
                className={styles.heroTitle}
                text={["sống hiện đại", "chuyên nghiệp", "từng bản thiết kế"]}
                loop
              />
            </div>
            <p className={styles.heroSubtitle}>
              Nơi nghệ thuật kiến trúc độc bản giao thoa cùng kỷ luật thi công
              chuẩn mực — kiến tạo những dinh thự và không gian sống di sản bền
              vững qua nhiều thế hệ.
            </p>

            <div className={styles.heroActions}>
              <Link href="/projects" className={styles.heroPrimaryBtn}>
                <span>Khám phá dự án</span>
                <AnimateIcon
                  animateOnHover
                  className={styles.heroPrimaryBtnInner}
                >
                  <ArrowRight
                    size={16}
                    className={styles.heroBtnIcon}
                    aria-hidden="true"
                  />
                </AnimateIcon>
              </Link>
              <Link href="/contact" className={styles.heroSecondaryBtn}>
                <span>Liên hệ tư vấn</span>
              </Link>
            </div>
            {/* Bottom Floating Metrics Ribbon (Figma node 1:1320) */}
            <div className={styles.metricsRibbon}>
              {COMPANY_INFO.metrics.map((item) => (
                <div key={item.label} className={styles.metricItem}>
                  <span className={styles.metricValue}>
                    <CountingNumber number={Number(item.value)} inView />
                    <span>{item.suffix}</span>
                  </span>
                  <span className={styles.metricLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. COMPANY INTRODUCTION SECTION */}
      <CompanyIntro />

      {/* 3. CORE SERVICES SECTION */}
      <ServicesSection />

      {/* 4 & 5. FEATURED PROJECTS SECTION (Unified Designs & Projects) */}
      <section className={styles.projectsSection}>
        <Container>
          <ScrollReveal>
            <SectionHeader
              tag="DỰ ÁN TIÊU BIỂU"
              title="Dấu Ấn Qua Từng Công Trình"
              description="Tuyển tập các công trình thực tế đã bàn giao và phương án thiết kế kiến trúc độc bản do đội ngũ Kiến trúc sư & Kỹ sư trưởng AXHOME trực tiếp kiến tạo."
              align="center"
            />
          </ScrollReveal>

          <FeaturedProjectsGrid />

          <ScrollReveal delay={0.1}>
            <div className={styles.viewAllContainer}>
              <Button href="/projects" size="md" variant="secondary">
                Xem Toàn Bộ Dự Án
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <WhyChooseUs />

      {/* 7. WORKING PROCESS SECTION */}
      {/* <WorkingProcess /> */}

      {/* 8. TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 9. CTA + CONTACT FORM SECTION */}
      <ContactCta />
    </>
  );
}
