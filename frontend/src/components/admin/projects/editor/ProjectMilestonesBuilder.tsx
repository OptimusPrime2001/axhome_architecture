"use client";

import { Button, Input, Label, Textarea } from "@components";
import { ArrowDown, ArrowUp, HardHat, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import sharedStyles from "./EditorShared.module.scss";
import styles from "./ProjectMilestonesBuilder.module.scss";
import type { ProjectEditorFormValues } from "./project-editor.schema";

export interface ProjectMilestonesBuilderProps {
  form: UseFormReturn<ProjectEditorFormValues>;
}

const STANDARD_MILESTONE_PRESETS = [
  {
    title: "Khảo sát địa chất & Thi công nền móng",
    period: "Giai đoạn 01",
    description:
      "Định vị tim trục, ép cọc bê tông cốt thép và thi công chống thấm đài giằng móng.",
    isCompleted: true,
  },
  {
    title: "Thi công kết cấu khung BTCT các tầng",
    period: "Giai đoạn 02",
    description:
      "Đổ bê tông cột, dầm, sàn chuẩn mác thiết kế và bảo dưỡng cường độ theo TCVN.",
    isCompleted: true,
  },
  {
    title: "Xây trát hoàn thiện thô & Hệ thống MEP",
    period: "Giai đoạn 03",
    description:
      "Xây tường bao, lắp đặt điện nước âm tường, điều hòa trung tâm và chống thấm cổ ống.",
    isCompleted: false,
  },
  {
    title: "Hoàn thiện tinh, Nội thất & Nghiệm thu bàn giao",
    period: "Giai đoạn 04",
    description:
      "Ốp lát đá tự nhiên, lắp đặt hệ kính Low-E, nội thất gỗ và vệ sinh công nghiệp bàn giao.",
    isCompleted: false,
  },
];

export const ProjectMilestonesBuilder: React.FC<
  ProjectMilestonesBuilderProps
> = ({ form }) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const {
    fields: milestoneFields,
    append: appendMilestone,
    remove: removeMilestone,
    move: moveMilestone,
  } = useFieldArray({
    control,
    name: "milestones",
  });

  const milestonesValues = watch("milestones");
  const completedCount = milestonesValues.filter((m) => m.isCompleted).length;
  const percent =
    milestonesValues.length > 0
      ? Math.round((completedCount / milestonesValues.length) * 100)
      : 0;

  const handleAddMilestone = () => {
    appendMilestone({
      id: `ms-${Date.now()}`,
      title: "",
      period: `Tháng ${String(new Date().getMonth() + 1).padStart(2, "0")}/${new Date().getFullYear()}`,
      description: "",
      isCompleted: false,
    });
  };

  const handleApplyPresets = () => {
    for (const preset of STANDARD_MILESTONE_PRESETS) {
      appendMilestone({
        id: `ms-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        ...preset,
      });
    }
  };

  return (
    <section
      className={sharedStyles.sectionCard}
      aria-labelledby="editor-milestones-heading"
    >
      <div className={sharedStyles.sectionHeader}>
        <div className={sharedStyles.sectionTitleGroup}>
          <span className={sharedStyles.sectionIcon} aria-hidden="true">
            <HardHat size={18} />
          </span>
          <div>
            <p className={sharedStyles.sectionEyebrow}>
              KHỐI THÔNG TIN 05 (NHẬT KÝ CÔNG TRƯỜNG)
            </p>
            <h2
              id="editor-milestones-heading"
              className={sharedStyles.sectionTitle}
            >
              Mốc tiến độ thi công thực tế
              {milestoneFields.length > 0
                ? ` (${completedCount}/${milestoneFields.length} mốc • ${percent}%)`
                : ""}
            </h2>
          </div>
        </div>

        <div className={styles.headActions}>
          {milestoneFields.length === 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleApplyPresets}
            >
              Tạo nhanh 4 mốc chuẩn
            </Button>
          )}

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleAddMilestone}
            leftIcon={<Plus size={14} aria-hidden="true" />}
          >
            Thêm mốc tiến độ
          </Button>
        </div>
      </div>

      {milestoneFields.length === 0 ? (
        <div className={styles.emptyNotice}>
          Chưa có mốc nhật ký công trường. Phù hợp kích hoạt cho các dự án thuộc
          nhóm <strong>Đang thi công</strong> hoặc{" "}
          <strong>Đã hoàn thành bàn giao</strong> để gia chủ theo dõi quy trình
          nghiệm thu ngoài trang Chi tiết.
        </div>
      ) : (
        <div className={styles.milestoneList}>
          {milestoneFields.map((field, index) => {
            const isDone = Boolean(milestonesValues[index]?.isCompleted);

            return (
              <div key={field.id} className={styles.milestoneCard}>
                <div className={styles.cardTopRow}>
                  <div className={styles.stepGroup}>
                    <span className={styles.stepNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <label
                      className={`${styles.completedCheckLabel} ${isDone ? styles.completedCheckActive : ""}`}
                    >
                      <input
                        type="checkbox"
                        {...register(`milestones.${index}.isCompleted`)}
                      />
                      <span>
                        {isDone
                          ? "Đã hoàn thành nghiệm thu"
                          : "Đang triển khai thực hiện"}
                      </span>
                    </label>
                  </div>

                  <div className={styles.rowActions}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveMilestone(index, index - 1)}
                      className={styles.iconBtn}
                      title="Đưa lên trên"
                      aria-label="Đưa mốc tiến độ lên trên"
                    >
                      <ArrowUp size={14} />
                    </button>

                    <button
                      type="button"
                      disabled={index === milestoneFields.length - 1}
                      onClick={() => moveMilestone(index, index + 1)}
                      className={styles.iconBtn}
                      title="Đưa xuống dưới"
                      aria-label="Đưa mốc tiến độ xuống dưới"
                    >
                      <ArrowDown size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => removeMilestone(index)}
                      className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                      title="Xóa mốc này"
                      aria-label="Xóa mốc tiến độ"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className={sharedStyles.gridTwo}>
                  <div className={sharedStyles.fieldGroup}>
                    <Label
                      htmlFor={`ms-title-${field.id}`}
                      className={sharedStyles.fieldLabel}
                    >
                      TÊN HẠNG MỤC KỸ THUẬT *
                    </Label>
                    <Input
                      id={`ms-title-${field.id}`}
                      type="text"
                      placeholder="VD: Hoàn thành kết cấu khung BTCT Tầng 1 - 3"
                      invalid={Boolean(errors.milestones?.[index]?.title)}
                      {...register(`milestones.${index}.title`)}
                    />
                    {errors.milestones?.[index]?.title && (
                      <p className={sharedStyles.errorText}>
                        {errors.milestones[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  <div className={sharedStyles.fieldGroup}>
                    <Label
                      htmlFor={`ms-period-${field.id}`}
                      className={sharedStyles.fieldLabel}
                    >
                      THỜI GIAN / GIAI ĐOẠN *
                    </Label>
                    <Input
                      id={`ms-period-${field.id}`}
                      type="text"
                      placeholder="VD: Tháng 11/2024 (hoặc Quý IV/2024)"
                      invalid={Boolean(errors.milestones?.[index]?.period)}
                      {...register(`milestones.${index}.period`)}
                    />
                    {errors.milestones?.[index]?.period && (
                      <p className={sharedStyles.errorText}>
                        {errors.milestones[index]?.period?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className={sharedStyles.fieldGroup}>
                  <Label
                    htmlFor={`ms-desc-${field.id}`}
                    className={sharedStyles.fieldLabel}
                  >
                    GHI CHÚ NGHIỆM THU HIỆN TRƯỜNG *
                  </Label>
                  <Textarea
                    id={`ms-desc-${field.id}`}
                    rows={2}
                    placeholder="Mô tả hạng mục kiểm định chất lượng, vật tư sử dụng và biên bản nghiệm thu..."
                    invalid={Boolean(errors.milestones?.[index]?.description)}
                    {...register(`milestones.${index}.description`)}
                  />
                  {errors.milestones?.[index]?.description && (
                    <p className={sharedStyles.errorText}>
                      {errors.milestones[index]?.description?.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
