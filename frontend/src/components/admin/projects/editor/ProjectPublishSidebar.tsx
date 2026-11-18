"use client";

import { Input, Label, Textarea } from "@components";
import { ADMIN_MOCK_USER, COMPANY_INFO } from "@constants";
import type { ProjectType } from "@shared-types";
import {
  CheckCircle2,
  Circle,
  FileText,
  Globe,
  SearchCheck,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import type React from "react";
import type { UseFormReturn } from "react-hook-form";
import styles from "./ProjectPublishSidebar.module.scss";
import type { ProjectEditorFormValues } from "./project-editor.schema";

export interface ProjectPublishSidebarProps {
  form: UseFormReturn<ProjectEditorFormValues>;
}

const STAGE_OPTIONS: ReadonlyArray<{
  value: ProjectType;
  label: string;
  subtitle: string;
}> = [
  {
    value: "concept",
    label: "Bản vẽ thiết kế 3D",
    subtitle: "Hồ sơ phương án kiến trúc, phối cảnh & mặt bằng",
  },
  {
    value: "under_construction",
    label: "Đang thi công thực tế",
    subtitle: "Công trường đang triển khai & cập nhật mốc nghiệm thu",
  },
  {
    value: "completed",
    label: "Đã hoàn thành bàn giao (100%)",
    subtitle: "Công trình đã hoàn thiện và bàn giao cho chủ đầu tư",
  },
];

export const ProjectPublishSidebar: React.FC<ProjectPublishSidebarProps> = ({
  form,
}) => {
  const { register, watch, setValue } = form;

  const status = watch("status");
  const projectType = watch("projectType");
  const isFeatured = watch("isFeatured");
  const title = watch("title");
  const slug = watch("slug");
  const excerpt = watch("excerpt");
  const contentHtml = watch("contentHtml");
  const location = watch("location");
  const landArea = watch("landArea");
  const floorArea = watch("floorArea");
  const coverImage = watch("coverImage");
  const gallery = watch("gallery");
  const floorPlans = watch("floorPlans");
  const milestones = watch("milestones");
  const seoTitle = watch("seoTitle");
  const seoDescription = watch("seoDescription");

  const completedMilestones = milestones.filter((m) => m.isCompleted).length;
  const sitePercent =
    projectType === "completed"
      ? 100
      : milestones.length > 0
        ? Math.round((completedMilestones / milestones.length) * 100)
        : 50;

  const effectiveSeoTitle =
    seoTitle.trim() ||
    (title.trim()
      ? `${title.trim()} | ${COMPANY_INFO.brandName}`
      : `Mẫu Thiết Kế & Công Trình | ${COMPANY_INFO.brandName}`);

  const effectiveSeoDesc =
    seoDescription.trim() ||
    excerpt.trim() ||
    "Hồ sơ thiết kế kiến trúc và thi công trọn gói chuẩn mực từ AXHOME Architecture.";

  const checklistItems = [
    {
      id: "media",
      label: "Đã tải Ảnh đại diện 16:9 & tối thiểu 2 góc nhìn không gian",
      done: Boolean(coverImage.trim()) && gallery.length >= 2,
    },
    {
      id: "specs",
      label: "Đầy đủ thông số diện tích đất, sàn & vị trí thực tế",
      done: landArea > 0 && floorArea > 0 && Boolean(location?.trim()),
    },
    {
      id: "editorial",
      label: "Đã biên soạn mô tả ngắn & bài viết giải pháp chi tiết",
      done: excerpt.trim().length >= 15 && contentHtml.trim().length >= 20,
    },
    {
      id: "modules",
      label: "Đính kèm Sơ đồ mặt bằng hoặc Nhật ký mốc thi công",
      done: floorPlans.length > 0 || milestones.length > 0,
    },
  ];

  return (
    <aside
      className={styles.sidebarStack}
      aria-label="Cấu hình xuất bản và SEO"
    >
      {/* Card 1: Publication & Stage Settings */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardTitleGroup}>
            <Settings2 size={17} aria-hidden="true" />
            <h2 className={styles.cardTitle}>Tiến độ & Cài đặt xuất bản</h2>
          </div>
          <span className={styles.liveDot} aria-hidden="true" />
        </div>

        {/* Status Toggle */}
        <div className={styles.blockGroup}>
          <span className={styles.miniLabel}>CHẾ ĐỘ XUẤT BẢN WEBSITE</span>
          <div className={styles.statusSegment}>
            <button
              type="button"
              onClick={() => setValue("status", "draft", { shouldDirty: true })}
              className={`${styles.segmentBtn} ${status === "draft" ? styles.segmentBtnActive : ""}`}
            >
              <FileText size={14} aria-hidden="true" />
              <span>Bản nháp</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setValue("status", "published", { shouldDirty: true })
              }
              className={`${styles.segmentBtn} ${status === "published" ? styles.segmentBtnActive : ""}`}
            >
              <Globe size={14} aria-hidden="true" />
              <span>Công khai</span>
            </button>
          </div>
        </div>

        {/* Project Stage Radio Cards */}
        <div className={styles.blockGroup}>
          <span className={styles.miniLabel}>PHÂN LOẠI GIAI ĐOẠN DỰ ÁN</span>
          <div className={styles.stageList}>
            {STAGE_OPTIONS.map((stage) => {
              const isSelected = projectType === stage.value;
              return (
                <button
                  key={stage.value}
                  type="button"
                  onClick={() =>
                    setValue("projectType", stage.value, { shouldDirty: true })
                  }
                  className={`${styles.stageCard} ${isSelected ? styles.stageCardActive : ""}`}
                >
                  <span className={styles.radioCircle} aria-hidden="true">
                    <span className={styles.radioDot} />
                  </span>
                  <span className={styles.stageMeta}>
                    <span className={styles.stageName}>{stage.label}</span>
                    <span className={styles.stageSub}>{stage.subtitle}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Site Progress when under construction or completed */}
        {(projectType !== "concept" || milestones.length > 0) && (
          <div className={styles.progressBox}>
            <div className={styles.progressHeader}>
              <span>Tiến độ công trường tổng thể</span>
              <strong>{sitePercent}% HOÀN TẤT</strong>
            </div>
            <div className={styles.progressTrack} aria-hidden="true">
              <div
                className={styles.progressFill}
                style={{ width: `${sitePercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Featured Switch */}
        <div className={styles.featuredBox}>
          <div className={styles.featuredCopy}>
            <span className={styles.featuredTitle}>
              Dự án Tiêu biểu (Featured)
            </span>
            <span className={styles.featuredSub}>
              Ghim lên khu vực nổi bật Trang chủ
            </span>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isFeatured}
            aria-label="Ghim dự án tiêu biểu lên trang chủ"
            onClick={() =>
              setValue("isFeatured", !isFeatured, { shouldDirty: true })
            }
            className={`${styles.switchBtn} ${isFeatured ? styles.switchBtnActive : ""}`}
          >
            <span className={styles.switchThumb} />
          </button>
        </div>

        {/* Author Info */}
        <div className={styles.blockGroup}>
          <span className={styles.miniLabel}>BIÊN TẬP VIÊN HỒ SƠ</span>
          <div className={styles.authorStrip}>
            <span className={styles.authorAvatar} aria-hidden="true">
              {ADMIN_MOCK_USER.initials}
            </span>
            <div>
              <p className={styles.authorName}>{ADMIN_MOCK_USER.name}</p>
              <p className={styles.authorRole}>{ADMIN_MOCK_USER.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Card 2: SEO & Google SERP Preview */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardTitleGroup}>
            <SearchCheck size={17} aria-hidden="true" />
            <h2 className={styles.cardTitle}>Tối ưu SEO & Google SERP</h2>
          </div>
          <span className={styles.seoBadge}>GOOGLE READY</span>
        </div>

        <div className={styles.blockGroup}>
          <div className={styles.miniLabelRow}>
            <Label htmlFor="seo-title" className={styles.miniLabel}>
              TIÊU ĐỀ SEO (TITLE TAG)
            </Label>
            <span className={styles.miniCounter}>
              {effectiveSeoTitle.length}/60
            </span>
          </div>
          <Input
            id="seo-title"
            type="text"
            maxLength={70}
            placeholder="Để trống để tự động lấy theo Tên dự án..."
            {...register("seoTitle")}
          />
          <div className={styles.charMeter} aria-hidden="true">
            <div
              className={styles.charMeterFill}
              style={{
                width: `${Math.min(100, Math.round((effectiveSeoTitle.length / 60) * 100))}%`,
              }}
            />
          </div>
        </div>

        <div className={styles.blockGroup}>
          <div className={styles.miniLabelRow}>
            <Label htmlFor="seo-desc" className={styles.miniLabel}>
              THẺ MÔ TẢ (META DESCRIPTION)
            </Label>
            <span className={styles.miniCounter}>
              {effectiveSeoDesc.length}/160
            </span>
          </div>
          <Textarea
            id="seo-desc"
            rows={3}
            maxLength={180}
            placeholder="Để trống để tự động đồng bộ từ Mô tả ngắn (Excerpt)..."
            {...register("seoDescription")}
          />
          <div className={styles.charMeter} aria-hidden="true">
            <div
              className={styles.charMeterFill}
              style={{
                width: `${Math.min(100, Math.round((effectiveSeoDesc.length / 160) * 100))}%`,
              }}
            />
          </div>
        </div>

        <div className={styles.blockGroup}>
          <span className={styles.miniLabel}>
            XEM TRƯỚC HIỂN THỊ GOOGLE SEARCH
          </span>
          <div className={styles.serpPreview}>
            <span className={styles.serpSiteRow}>
              axhome.vn › projects › {slug.trim() || "duong-dan-du-an"}
            </span>
            <p className={styles.serpTitle}>{effectiveSeoTitle}</p>
            <p className={styles.serpDesc}>{effectiveSeoDesc}</p>
          </div>
        </div>
      </section>

      {/* Card 3: Publishing Quality Standards Checklist */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardTitleGroup}>
            <ShieldCheck size={17} aria-hidden="true" />
            <h2 className={styles.cardTitle}>Tiêu chuẩn hồ sơ phát hành</h2>
          </div>
        </div>

        <ul className={styles.checklist}>
          {checklistItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.checkItem} ${item.done ? styles.checkItemDone : ""}`}
            >
              {item.done ? (
                <CheckCircle2
                  size={16}
                  className={styles.checkIconDone}
                  aria-hidden="true"
                />
              ) : (
                <Circle
                  size={16}
                  className={styles.checkIconPending}
                  aria-hidden="true"
                />
              )}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};
