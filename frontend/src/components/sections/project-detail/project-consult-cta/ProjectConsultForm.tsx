"use client";

import { AnimateIcon } from "@animate-ui/react/icons";
import {
  ArrowRight,
  Button,
  Input,
  Label,
  Spinner,
  Textarea,
} from "@components";
import styles from "./ProjectConsultCta.module.scss";
import { useProjectConsultForm } from "./useProjectConsultForm";

export interface ProjectConsultFormProps {
  projectTitle: string;
}

export const ProjectConsultForm: React.FC<ProjectConsultFormProps> = ({
  projectTitle,
}) => {
  const { register, errors, isSubmitting, submitState, handleFormSubmit } =
    useProjectConsultForm(projectTitle);

  return (
    <div className={styles.formCard}>
      <p className={styles.refTag}>
        Phương án tham chiếu: <strong>{projectTitle}</strong>
      </p>

      <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
        <div className={styles.field}>
          <Label htmlFor="proj-consult-name">HỌ VÀ TÊN QUÝ KHÁCH *</Label>
          <Input
            id="proj-consult-name"
            type="text"
            placeholder="Ví dụ: Nguyễn Văn An"
            invalid={!!errors.fullName}
            aria-invalid={!!errors.fullName}
            aria-describedby={
              errors.fullName ? "proj-consult-name-error" : undefined
            }
            {...register("fullName")}
          />
          {errors.fullName && (
            <p
              id="proj-consult-name-error"
              role="alert"
              className={styles.error}
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <Label htmlFor="proj-consult-phone">SỐ ĐIỆN THOẠI *</Label>
            <Input
              id="proj-consult-phone"
              type="tel"
              placeholder="+84 9xx xxx xxx"
              invalid={!!errors.phone}
              aria-invalid={!!errors.phone}
              aria-describedby={
                errors.phone ? "proj-consult-phone-error" : undefined
              }
              {...register("phone")}
            />
            {errors.phone && (
              <p
                id="proj-consult-phone-error"
                role="alert"
                className={styles.error}
              >
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <Label htmlFor="proj-consult-land">
              KÍCH THƯỚC ĐẤT (DÀI X RỘNG) *
            </Label>
            <Input
              id="proj-consult-land"
              type="text"
              placeholder="Ví dụ: 20m x 35m (700m²)"
              invalid={!!errors.landSize}
              aria-invalid={!!errors.landSize}
              aria-describedby={
                errors.landSize ? "proj-consult-land-error" : undefined
              }
              {...register("landSize")}
            />
            {errors.landSize && (
              <p
                id="proj-consult-land-error"
                role="alert"
                className={styles.error}
              >
                {errors.landSize.message}
              </p>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <Label htmlFor="proj-consult-start">
            DỰ KIẾN THỜI GIAN KHỞI CÔNG
          </Label>
          <Input
            id="proj-consult-start"
            type="text"
            placeholder="Ví dụ: Quý 1 / 2026"
            {...register("expectedStart")}
          />
        </div>

        <div className={styles.field}>
          <Label htmlFor="proj-consult-notes">
            NHU CẦU & MONG MUỐN RIÊNG BIỆT
          </Label>
          <Textarea
            id="proj-consult-notes"
            rows={3}
            placeholder="Chia sẻ thêm về địa điểm khu đất, số lượng thành viên gia đình, hoặc phong cách kiến trúc yêu thích..."
            invalid={!!errors.notes}
            aria-invalid={!!errors.notes}
            aria-describedby={
              errors.notes ? "proj-consult-notes-error" : undefined
            }
            {...register("notes")}
          />
          {errors.notes && (
            <p
              id="proj-consult-notes-error"
              role="alert"
              className={styles.error}
            >
              {errors.notes.message}
            </p>
          )}
        </div>

        {submitState === "submitted" && (
          <p className={styles.notice} role="status">
            Đã tiếp nhận yêu cầu tư vấn phương án{" "}
            <strong>{projectTitle}</strong>. Đội ngũ KTS Axhome sẽ liên hệ lại
            Quý khách trong thời gian sớm nhất.
          </p>
        )}

        {submitState === "awaiting-contract" && (
          <p className={styles.notice} role="status">
            Thông tin đã hợp lệ. Yêu cầu tư vấn phương án{" "}
            <strong>{projectTitle}</strong> sẽ được gửi đi ngay khi cấu hình
            `NEXT_PUBLIC_API_URL`.
          </p>
        )}

        <AnimateIcon animateOnHover asChild>
          <Button
            type="submit"
            variant="dark"
            size="md"
            fullWidth
            disabled={isSubmitting}
            leftIcon={
              isSubmitting ? <Spinner width={16} height={16} /> : undefined
            }
            rightIcon={
              isSubmitting ? undefined : (
                <ArrowRight size={16} aria-hidden="true" />
              )
            }
          >
            {isSubmitting
              ? "Đang gửi yêu cầu..."
              : "Gửi yêu cầu tư vấn phương án"}
          </Button>
        </AnimateIcon>

        <p className={styles.privacyNote}>
          Thông tin của Quý khách được bảo mật tuyệt đối theo chính sách Axhome.
        </p>
      </form>
    </div>
  );
};
