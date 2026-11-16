import { AnimateIcon } from "@animate-ui/react/icons";
import {
  Badge,
  Button,
  CompanyIntro,
  ContactCta,
  Container,
  SectionHeader,
  ServicesSection,
  TestimonialsSection,
  WhyChooseUs,
  WorkingProcess,
} from "@components";
import { COMPANY_INFO, MOCK_PROJECTS } from "@constants";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";
import styles from "./page.module.scss";

export default async function HomePage() {
  "use cache";

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
      {/* 1. HERO SECTION (Figma node 1:1294) */}
      <section className={styles.heroSection}>
        <div className={styles.heroVisualBackdrop} aria-hidden="true">
          <Image
            src="/images/hero_background.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBackgroundImage}
            unoptimized
          />
          <div className={styles.heroScrimOverlay} />
          <div className={styles.heroBottomGradient} />
        </div>

        <Container>
          <div className={styles.heroContent}>
            <div className={styles.brandBadge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              <span>{COMPANY_INFO.slogan}</span>
            </div>

            <h1 className={styles.heroTitle}>
              Kiến tạo không gian sống <br />
              chuẩn xác từng chi tiết
            </h1>

            <p className={styles.heroSubtitle}>
              Nơi nghệ thuật kiến trúc độc bản giao thoa cùng kỷ luật thi công
              chuẩn mực — kiến tạo những dinh thự và không gian sống di sản bền
              vững qua nhiều thế hệ.
            </p>

            <div className={styles.heroActions}>
              <Link href="/projects" className={styles.heroPrimaryBtn}>
                <AnimateIcon
                  animateOnHover
                  className={styles.heroPrimaryBtnInner}
                >
                  <span>Khám phá dự án</span>
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
                  <span className={styles.metricValue}>{item.value}</span>
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
          <SectionHeader
            tag="DỰ ÁN TIÊU BIỂU"
            title="Dấu Ấn Qua Từng Công Trình"
            description="Tuyển tập các công trình thực tế đã bàn giao và phương án thiết kế độc bản do đội ngũ Kiến trúc sư & Kỹ sư trưởng Architectura trực tiếp kiến tạo."
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

      {/* 6. WHY CHOOSE US SECTION */}
      <WhyChooseUs />

      {/* 7. WORKING PROCESS SECTION */}
      <WorkingProcess />

      {/* 8. TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 9. CTA + CONTACT FORM SECTION */}
      <ContactCta />
    </>
  );
}
