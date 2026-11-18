"use client";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@components";
import { PROJECT_CATEGORY_LABELS, PROJECT_STYLE_LABELS } from "@constants";
import { Plus, Ruler, Trash2 } from "lucide-react";
import type React from "react";
import { Controller, type UseFormReturn, useFieldArray } from "react-hook-form";
import styles from "./EditorShared.module.scss";
import type { ProjectEditorFormValues } from "./project-editor.schema";

export interface ProjectSpecsSectionProps {
  form: UseFormReturn<ProjectEditorFormValues>;
}

export const ProjectSpecsSection: React.FC<ProjectSpecsSectionProps> = ({
  form,
}) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights",
  });

  const hasTestimonial = watch("hasTestimonial");

  return (
    <section
      className={styles.sectionCard}
      aria-labelledby="editor-specs-heading"
    >
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleGroup}>
          <span className={styles.sectionIcon} aria-hidden="true">
            <Ruler size={18} />
          </span>
          <div>
            <p className={styles.sectionEyebrow}>KHỐI THÔNG TIN 02</p>
            <h2 id="editor-specs-heading" className={styles.sectionTitle}>
              Thông số kiến trúc & Điểm nhấn kỹ thuật
            </h2>
          </div>
        </div>
        <span className={styles.sectionBadge}>META BAR TRANG CHI TIẾT</span>
      </div>

      {/* Category & Style */}
      <div className={styles.gridTwo}>
        <div className={styles.fieldGroup}>
          <Label htmlFor="project-category" className={styles.fieldLabel}>
            LOẠI HÌNH CÔNG TRÌNH
            <span className={styles.requiredStar}>*</span>
          </Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="project-category">
                  <SelectValue placeholder="Chọn loại hình công trình" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROJECT_CATEGORY_LABELS).map(
                    ([val, label]) => (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className={styles.fieldGroup}>
          <Label htmlFor="project-style" className={styles.fieldLabel}>
            PHONG CÁCH KIẾN TRÚC
            <span className={styles.requiredStar}>*</span>
          </Label>
          <Controller
            name="style"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="project-style">
                  <SelectValue placeholder="Chọn phong cách kiến trúc" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROJECT_STYLE_LABELS).map(([val, label]) => (
                    <SelectItem key={val} value={val}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Area & Facade */}
      <div className={styles.gridThree}>
        <div className={styles.fieldGroup}>
          <label htmlFor="project-land-area" className={styles.fieldLabel}>
            DIỆN TÍCH KHU ĐẤT
            <span className={styles.requiredStar}>*</span>
          </label>
          <div
            className={`${styles.unitBox} ${errors.landArea ? styles.inputInvalid : ""}`}
          >
            <input
              id="project-land-area"
              type="number"
              min={1}
              step="any"
              className={styles.unitInput}
              {...register("landArea", { valueAsNumber: true })}
            />
            <span className={styles.unitSuffix}>m² đất</span>
          </div>
          {errors.landArea && (
            <p className={styles.errorText}>{errors.landArea.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="project-floor-area" className={styles.fieldLabel}>
            TỔNG DIỆN TÍCH SÀN (GFA)
            <span className={styles.requiredStar}>*</span>
          </label>
          <div
            className={`${styles.unitBox} ${errors.floorArea ? styles.inputInvalid : ""}`}
          >
            <input
              id="project-floor-area"
              type="number"
              min={1}
              step="any"
              className={styles.unitInput}
              {...register("floorArea", { valueAsNumber: true })}
            />
            <span className={styles.unitSuffix}>m² sàn</span>
          </div>
          {errors.floorArea && (
            <p className={styles.errorText}>{errors.floorArea.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="project-facade" className={styles.fieldLabel}>
            KHẨU ĐỘ MẶT TIỀN
            <span className={styles.requiredStar}>*</span>
          </label>
          <div
            className={`${styles.unitBox} ${errors.facadeWidth ? styles.inputInvalid : ""}`}
          >
            <input
              id="project-facade"
              type="number"
              min={1}
              step="any"
              className={styles.unitInput}
              {...register("facadeWidth", { valueAsNumber: true })}
            />
            <span className={styles.unitSuffix}>mét</span>
          </div>
          {errors.facadeWidth && (
            <p className={styles.errorText}>{errors.facadeWidth.message}</p>
          )}
        </div>
      </div>

      {/* Scale: Floors, Bedrooms, Year */}
      <div className={styles.gridThree}>
        <div className={styles.fieldGroup}>
          <label htmlFor="project-floors" className={styles.fieldLabel}>
            QUY MÔ TẦNG CAO
            <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.unitBox}>
            <input
              id="project-floors"
              type="number"
              min={1}
              max={20}
              className={styles.unitInput}
              {...register("floorsCount", { valueAsNumber: true })}
            />
            <span className={styles.unitSuffix}>Tầng</span>
          </div>
          {errors.floorsCount && (
            <p className={styles.errorText}>{errors.floorsCount.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="project-bedrooms" className={styles.fieldLabel}>
            SỐ PHÒNG NGỦ
            <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.unitBox}>
            <input
              id="project-bedrooms"
              type="number"
              min={0}
              max={30}
              className={styles.unitInput}
              {...register("bedroomsCount", { valueAsNumber: true })}
            />
            <span className={styles.unitSuffix}>PN</span>
          </div>
          {errors.bedroomsCount && (
            <p className={styles.errorText}>{errors.bedroomsCount.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="project-year" className={styles.fieldLabel}>
            NĂM HOÀN THÀNH / THIẾT KẾ
            <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="project-year"
            type="number"
            min={2000}
            max={2035}
            className={`${styles.textInput} ${errors.completedYear ? styles.inputInvalid : ""}`}
            {...register("completedYear", { valueAsNumber: true })}
          />
          {errors.completedYear && (
            <p className={styles.errorText}>{errors.completedYear.message}</p>
          )}
        </div>
      </div>

      {/* Lead Architect, Duration, Client Name */}
      <div className={styles.gridThree}>
        <div className={styles.fieldGroup}>
          <label htmlFor="project-architect" className={styles.fieldLabel}>
            CHỦ TRÌ THIẾT KẾ / CHỈ HUY TRƯỞNG
            <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="project-architect"
            type="text"
            placeholder="VD: KTS. Trần Hoàng Lâm"
            className={`${styles.textInput} ${errors.leadArchitect ? styles.inputInvalid : ""}`}
            {...register("leadArchitect")}
          />
          {errors.leadArchitect && (
            <p className={styles.errorText}>{errors.leadArchitect.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="project-duration" className={styles.fieldLabel}>
            THỜI LƯỢNG / TIẾN ĐỘ THỰC HIỆN
          </label>
          <input
            id="project-duration"
            type="text"
            placeholder="VD: 14 Tháng (hoặc Dự kiến 12 Tháng)"
            className={styles.textInput}
            {...register("constructionDuration")}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="project-client" className={styles.fieldLabel}>
            CHỦ ĐẦU TƯ (TÙY CHỌN)
          </label>
          <input
            id="project-client"
            type="text"
            placeholder="VD: Gia đình Anh T."
            className={styles.textInput}
            {...register("clientName")}
          />
        </div>
      </div>

      {/* Sub-block A: Architectural Highlights (Max 4 items -> maps to right column of ProjectDetailStory) */}
      <div className={styles.subDivider}>
        <div className={styles.subHeaderRow}>
          <div>
            <h3 className={styles.subTitle}>
              Điểm nhấn kiến trúc độc bản ({highlightFields.length}/4)
            </h3>
            <p className={styles.subDesc}>
              Hiển thị trong thẻ &ldquo;Giải pháp kỹ thuật&rdquo; bên cạnh bài
              viết chi tiết ở ngoài trang dự án.
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={highlightFields.length >= 4}
            onClick={() => appendHighlight({ title: "", description: "" })}
            leftIcon={<Plus size={14} aria-hidden="true" />}
          >
            Thêm điểm nhấn
          </Button>
        </div>

        {highlightFields.map((field, index) => (
          <div key={field.id} className={styles.highlightItemCard}>
            <span className={styles.highlightIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className={styles.highlightFields}>
              <Input
                type="text"
                placeholder="Tiêu đề điểm nhấn (VD: Hệ lam gỗ Teak kháng ẩm chuẩn ScandiThermo)"
                invalid={Boolean(errors.highlights?.[index]?.title)}
                {...register(`highlights.${index}.title`)}
              />
              {errors.highlights?.[index]?.title && (
                <p className={styles.errorText}>
                  {errors.highlights[index]?.title?.message}
                </p>
              )}

              <Textarea
                rows={2}
                placeholder="Mô tả ngắn gọn giải pháp vật liệu, kết cấu hoặc thông gió..."
                invalid={Boolean(errors.highlights?.[index]?.description)}
                {...register(`highlights.${index}.description`)}
              />
              {errors.highlights?.[index]?.description && (
                <p className={styles.errorText}>
                  {errors.highlights[index]?.description?.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeHighlight(index)}
              className={styles.removeIconBtn}
              aria-label={`Xóa điểm nhấn số ${index + 1}`}
              title="Xóa điểm nhấn này"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* Sub-block B: Optional Client Testimonial Quote */}
      <div className={styles.subDivider}>
        <label className={styles.toggleRow}>
          <input type="checkbox" {...register("hasTestimonial")} />
          <span>
            Hiển thị trích dẫn cảm nhận của Chủ đầu tư trên trang Chi tiết
          </span>
        </label>

        {hasTestimonial && (
          <>
            <div className={styles.gridTwo}>
              <div className={styles.fieldGroup}>
                <Label
                  htmlFor="testimonial-author"
                  className={styles.fieldLabel}
                >
                  TÊN CHỦ ĐẦU TƯ
                </Label>
                <Input
                  id="testimonial-author"
                  type="text"
                  placeholder="VD: Anh Nguyễn Minh Tuấn"
                  {...register("testimonialAuthor")}
                />
              </div>

              <div className={styles.fieldGroup}>
                <Label htmlFor="testimonial-role" className={styles.fieldLabel}>
                  DANH XƯNG / VAI TRÒ
                </Label>
                <Input
                  id="testimonial-role"
                  type="text"
                  placeholder="VD: Chủ đầu tư Villa Thảo Điền Riverside"
                  {...register("testimonialRole")}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="testimonial-quote" className={styles.fieldLabel}>
                LỜI NHẬN XÉT NGHIỆM THU
              </Label>
              <Textarea
                id="testimonial-quote"
                rows={3}
                placeholder="Nhập chia sẻ thực tế của gia chủ về độ chuẩn xác bản vẽ và chất lượng bàn giao..."
                {...register("testimonialQuote")}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
