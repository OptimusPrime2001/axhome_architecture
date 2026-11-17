import { Container, ScrollReveal } from "@components";
import type { Project } from "@shared-types";
import { Quote } from "lucide-react";
import type React from "react";
import styles from "./ProjectDetailStory.module.scss";

function extractParagraphs(html: string): string[] {
  const matches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
  if (matches.length > 0) {
    return matches
      .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
      .filter(Boolean);
  }
  const plain = html.replace(/<[^>]+>/g, "").trim();
  return plain ? [plain] : [];
}

export interface ProjectDetailStoryProps {
  project: Project;
}

export const ProjectDetailStory: React.FC<ProjectDetailStoryProps> = ({
  project,
}) => {
  const paragraphs = extractParagraphs(project.contentHtml);

  return (
    <section
      className={styles.section}
      aria-labelledby="project-detail-story-heading"
    >
      <Container>
        <div className={styles.layout}>
          {/* Cột trái: Câu chuyện ý tưởng & Nội dung bài viết chi tiết */}
          <ScrollReveal className={styles.storyCol}>
            <p className={styles.eyebrow}>TRIẾT LÝ THIẾT KẾ & GIẢI PHÁP</p>
            <h2 id="project-detail-story-heading" className={styles.title}>
              Câu chuyện ý tưởng & Giải pháp công trình
            </h2>
            <p className={styles.lead}>{project.excerpt}</p>

            <div className={styles.prose}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>

          {/* Cột phải: Điểm nhấn kiến trúc (từ highlights hoặc fallback thông số kỹ thuật) */}
          <ScrollReveal delay={0.1} className={styles.techCol}>
            <div className={styles.techCard}>
              <p className={styles.techEyebrow}>GIẢI PHÁP KỸ THUẬT</p>
              <h3 className={styles.techTitle}>Điểm nhấn kiến trúc độc bản</h3>

              <div className={styles.techItems}>
                {project.highlights && project.highlights.length > 0 ? (
                  project.highlights.slice(0, 4).map((item, idx) => (
                    <div key={item.title} className={styles.techItem}>
                      <span className={styles.techNumber}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className={styles.techBody}>
                        <h4 className={styles.techItemTitle}>{item.title}</h4>
                        <p className={styles.techItemDesc}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className={styles.techItem}>
                      <span className={styles.techNumber}>01</span>
                      <div className={styles.techBody}>
                        <h4 className={styles.techItemTitle}>
                          Thông số quy hoạch & Mặt tiền
                        </h4>
                        <p className={styles.techItemDesc}>
                          Diện tích khu đất {project.landArea} m², tổng diện
                          tích sàn {project.floorArea} m², mặt tiền rộng{" "}
                          {project.facadeWidth} m với {project.floorsCount} tầng
                          công năng và {project.bedroomsCount} phòng ngủ.
                        </p>
                      </div>
                    </div>

                    {project.technicalChallenges && (
                      <div className={styles.techItem}>
                        <span className={styles.techNumber}>02</span>
                        <div className={styles.techBody}>
                          <h4 className={styles.techItemTitle}>
                            Bài toán & Thách thức kỹ thuật
                          </h4>
                          <p className={styles.techItemDesc}>
                            {project.technicalChallenges}
                          </p>
                        </div>
                      </div>
                    )}

                    {project.technicalSolutions && (
                      <div className={styles.techItem}>
                        <span className={styles.techNumber}>03</span>
                        <div className={styles.techBody}>
                          <h4 className={styles.techItemTitle}>
                            Giải pháp kết cấu & Vật liệu
                          </h4>
                          <p className={styles.techItemDesc}>
                            {project.technicalSolutions}
                          </p>
                        </div>
                      </div>
                    )}

                    {project.constructionDuration && (
                      <div className={styles.techItem}>
                        <span className={styles.techNumber}>04</span>
                        <div className={styles.techBody}>
                          <h4 className={styles.techItemTitle}>
                            Tiến độ triển khai thực tế
                          </h4>
                          <p className={styles.techItemDesc}>
                            Tổng thời gian thực hiện:{" "}
                            <strong>{project.constructionDuration}</strong> dưới
                            sự chủ trì của {project.leadArchitect}.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {project.clientTestimonial && (
              <blockquote className={styles.quoteCard}>
                <Quote
                  size={20}
                  className={styles.quoteIcon}
                  aria-hidden="true"
                />
                <p className={styles.quoteText}>
                  “{project.clientTestimonial.quote}”
                </p>
                <footer className={styles.quoteFooter}>
                  <strong>{project.clientTestimonial.author}</strong>
                  <span>{project.clientTestimonial.role}</span>
                </footer>
              </blockquote>
            )}
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};
