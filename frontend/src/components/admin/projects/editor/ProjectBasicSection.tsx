"use client";

import { Input, Label, Textarea } from "@components";
import { Compass, RefreshCw } from "lucide-react";
import dynamic from "next/dynamic";
import type React from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import styles from "./EditorShared.module.scss";
import {
  type ProjectEditorFormValues,
  slugifyVietnamese,
} from "./project-editor.schema";
import type { RichTextEditorProps } from "./RichTextEditor";

// TipTap's useEditor() calls Math.random() internally — must be client-only
const RichTextEditor = dynamic<RichTextEditorProps>(
  () => import("./RichTextEditor").then((m) => ({ default: m.RichTextEditor })),
  {
    ssr: false,
    loading: () => <div className={styles.editorLoadingPlaceholder} />,
  },
);

export interface ProjectBasicSectionProps {
  form: UseFormReturn<ProjectEditorFormValues>;
  isCreateMode: boolean;
  slugManuallyEdited: boolean;
  onMarkSlugManual: () => void;
}

export const ProjectBasicSection: React.FC<ProjectBasicSectionProps> = ({
  form,
  isCreateMode,
  slugManuallyEdited,
  onMarkSlugManual,
}) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const titleValue = watch("title") ?? "";
  const excerptValue = watch("excerpt") ?? "";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTitle = e.target.value;
    setValue("title", nextTitle, { shouldDirty: true, shouldValidate: true });

    if (isCreateMode && !slugManuallyEdited) {
      setValue("slug", slugifyVietnamese(nextTitle), {
        shouldDirty: true,
        shouldValidate: nextTitle.trim().length >= 3,
      });
    }
  };

  const handleRegenerateSlug = () => {
    if (!titleValue.trim()) return;
    setValue("slug", slugifyVietnamese(titleValue), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <section
      className={styles.sectionCard}
      aria-labelledby="editor-basic-heading"
    >
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleGroup}>
          <span className={styles.sectionIcon} aria-hidden="true">
            <Compass size={18} />
          </span>
          <div>
            <p className={styles.sectionEyebrow}>KHỐI THÔNG TIN 01</p>
            <h2 id="editor-basic-heading" className={styles.sectionTitle}>
              Thông tin cơ bản & Câu chuyện kiến trúc
            </h2>
          </div>
        </div>
        <span className={styles.sectionBadge}>BẮT BUỘC NHẬP</span>
      </div>

      {/* Project Title */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <Label htmlFor="project-title" className={styles.fieldLabel}>
            TÊN HỒ SƠ DỰ ÁN / CÔNG TRÌNH
            <span className={styles.requiredStar}>*</span>
          </Label>
          <span className={styles.charCounter}>{titleValue.length}/120</span>
        </div>
        <Input
          id="project-title"
          type="text"
          maxLength={120}
          value={titleValue}
          onChange={handleTitleChange}
          placeholder="VD: Villa Thảo Điền Riverside hoặc The Sanctuary Villa"
          invalid={Boolean(errors.title)}
        />
        {errors.title && (
          <p className={styles.errorText}>{errors.title.message}</p>
        )}
      </div>

      {/* Slug URL */}
      <div className={styles.fieldGroup}>
        <Label htmlFor="project-slug" className={styles.fieldLabel}>
          ĐƯỜNG DẪN TĨNH CÔNG KHAI (SLUG URL)
          <span className={styles.requiredStar}>*</span>
        </Label>
        <div
          className={`${styles.slugGroup} ${errors.slug ? styles.inputInvalid : ""}`}
        >
          <span className={styles.slugPrefix}>https://axhome.vn/projects/</span>
          <Input
            id="project-slug"
            type="text"
            placeholder="villa-thao-dien-riverside"
            className={styles.slugInput}
            {...register("slug", {
              onChange: () => onMarkSlugManual(),
            })}
          />
          <button
            type="button"
            className={styles.slugRefreshBtn}
            onClick={handleRegenerateSlug}
            title="Tạo lại đường dẫn tự động từ Tên dự án"
            aria-label="Tạo lại đường dẫn từ tên dự án"
          >
            <RefreshCw size={15} />
          </button>
        </div>
        {errors.slug ? (
          <p className={styles.errorText}>{errors.slug.message}</p>
        ) : (
          <p className={styles.helperText}>
            Đường dẫn chuẩn SEO hiển thị tại trang chi tiết dự án bên ngoài
            website.
          </p>
        )}
      </div>

      {/* Location & City */}
      <div className={styles.gridTwo}>
        <div className={styles.fieldGroup}>
          <Label htmlFor="project-location" className={styles.fieldLabel}>
            ĐỊA CHỈ / KHU ĐÔ THỊ
            <span className={styles.requiredStar}>*</span>
          </Label>
          <Input
            id="project-location"
            type="text"
            placeholder="VD: Nguyễn Văn Hưởng, P. Thảo Điền"
            invalid={Boolean(errors.location)}
            {...register("location")}
          />
          {errors.location && (
            <p className={styles.errorText}>{errors.location.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <Label htmlFor="project-city" className={styles.fieldLabel}>
            QUẬN / TỈNH THÀNH PHỐ
            <span className={styles.requiredStar}>*</span>
          </Label>
          <Input
            id="project-city"
            type="text"
            placeholder="VD: TP. Thủ Đức, TP. Hồ Chí Minh"
            invalid={Boolean(errors.city)}
            {...register("city")}
          />
          {errors.city && (
            <p className={styles.errorText}>{errors.city.message}</p>
          )}
        </div>
      </div>

      {/* Excerpt */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <Label htmlFor="project-excerpt" className={styles.fieldLabel}>
            MÔ TẢ NGẮN Ý TƯỞNG KIẾN TRÚC (EXCERPT)
            <span className={styles.requiredStar}>*</span>
          </Label>
          <span className={styles.charCounter}>{excerptValue.length}/300</span>
        </div>
        <Textarea
          id="project-excerpt"
          maxLength={300}
          rows={3}
          placeholder="Tóm tắt 2–3 câu súc tích về phong cách, giải pháp không gian và dấu ấn vật liệu (hiển thị trên thẻ Dự án và mở đầu trang Chi tiết)..."
          invalid={Boolean(errors.excerpt)}
          {...register("excerpt")}
        />
        {errors.excerpt && (
          <p className={styles.errorText}>{errors.excerpt.message}</p>
        )}
      </div>

      {/* Rich Text Content */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <span className={styles.fieldLabel}>
            THUYẾT MINH Ý TƯỞNG & GIẢI PHÁP CÔNG TRÌNH CHI TIẾT
            <span className={styles.requiredStar}>*</span>
          </span>
        </div>

        <Controller
          control={control}
          name="contentHtml"
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              hasError={Boolean(errors.contentHtml)}
            />
          )}
        />

        {errors.contentHtml ? (
          <p className={styles.errorText}>{errors.contentHtml.message}</p>
        ) : (
          <p className={styles.helperText}>
            Hỗ trợ tiêu đề H2/H3, danh sách, trích dẫn nghiệm thu và lọc sạch
            định dạng thừa khi dán từ Word / Google Docs.
          </p>
        )}
      </div>
    </section>
  );
};
