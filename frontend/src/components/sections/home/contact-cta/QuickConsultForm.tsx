"use client";

import { AnimateIcon } from "@animate-ui/react/icons";
import {
  ArrowRight,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Textarea,
} from "@components";
import { COMPANY_INFO } from "@constants";
import { Controller } from "react-hook-form";
import styles from "./QuickConsultForm.module.scss";
import { useQuickConsultForm } from "./useQuickConsultForm";

const LOCATION_PLACEHOLDER = "VD: Khu vực Quận 7, TP. Hồ Chí Minh";

const PROJECT_NEED_OPTIONS = [
  "Thiết kế kiến trúc",
  "Tối ưu chi phí",
  "Thi công trọn gói",
  "Khác",
] as const;

export const QuickConsultForm: React.FC = () => {
  const { control, errors, isSubmitting, submitState, handleFormSubmit } =
    useQuickConsultForm();

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Đăng ký nhận phương án tư vấn</h3>
      <p className={styles.subtitle}>
        Thông tin của bạn được bảo mật tuyệt đối theo tiêu chuẩn tư vấn kiến
        trúc quốc tế.
      </p>

      <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <Label htmlFor="contact-full-name">Họ và tên *</Label>
            <Input
              id="contact-full-name"
              type="text"
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              invalid={!!errors.fullName}
              aria-invalid={!!errors.fullName}
              aria-describedby={
                errors.fullName ? "contact-full-name-error" : undefined
              }
              {...control.register("fullName")}
            />
            {errors.fullName && (
              <p
                id="contact-full-name-error"
                role="alert"
                className={styles.error}
              >
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <Label htmlFor="contact-phone">Số điện thoại *</Label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="0908 xxx xxx"
              autoComplete="tel"
              invalid={!!errors.phone}
              aria-invalid={!!errors.phone}
              aria-describedby={
                errors.phone ? "contact-phone-error" : undefined
              }
              {...control.register("phone")}
            />
            {errors.phone && (
              <p id="contact-phone-error" role="alert" className={styles.error}>
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <Label htmlFor="contact-location">Địa điểm dự án *</Label>
            <Input
              id="contact-location"
              type="text"
              placeholder={LOCATION_PLACEHOLDER}
              invalid={!!errors.location}
              aria-invalid={!!errors.location}
              aria-describedby={
                errors.location ? "contact-location-error" : undefined
              }
              {...control.register("location")}
            />
            {errors.location && (
              <p
                id="contact-location-error"
                role="alert"
                className={styles.error}
              >
                {errors.location.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <Label htmlFor="contact-project-need">Nhu cầu dự án *</Label>
            <Controller
              control={control}
              name="projectNeed"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="contact-project-need"
                    invalid={!!errors.projectNeed}
                    aria-invalid={!!errors.projectNeed}
                    aria-describedby={
                      errors.projectNeed
                        ? "contact-project-need-error"
                        : undefined
                    }
                  >
                    <SelectValue placeholder="Chọn nhu cầu dự án" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_NEED_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.projectNeed && (
              <p
                id="contact-project-need-error"
                role="alert"
                className={styles.error}
              >
                {errors.projectNeed.message}
              </p>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <Label htmlFor="contact-notes">
            Ghi chú thêm về diện tích hoặc phong cách mong muốn
          </Label>
          <Textarea
            id="contact-notes"
            placeholder="VD: Khu đất 300m2, phong cách nhiệt đới hiện đại, dự kiến khởi công quý 3..."
            invalid={!!errors.notes}
            aria-invalid={!!errors.notes}
            aria-describedby={errors.notes ? "contact-notes-error" : undefined}
            {...control.register("notes")}
          />
          {errors.notes && (
            <p id="contact-notes-error" role="alert" className={styles.error}>
              {errors.notes.message}
            </p>
          )}
        </div>

        <AnimateIcon animateOnHover asChild>
          <Button
            type="submit"
            variant="primary"
            size="lg"
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
            {isSubmitting ? "Đang gửi yêu cầu..." : "Đăng ký nhận tư vấn ngay"}
          </Button>
        </AnimateIcon>

        {submitState === "submitted" && (
          <p role="status" className={styles.notice}>
            Đã tiếp nhận yêu cầu tư vấn của Quý khách. Đội ngũ Kiến trúc sư
            Axhome sẽ liên hệ lại trong vòng 2 giờ làm việc.
          </p>
        )}

        {submitState === "awaiting-contract" && (
          <p role="status" className={styles.notice}>
            Hệ thống chưa cấu hình địa chỉ máy chủ API. Vui lòng gọi trực tiếp{" "}
            <a
              className={styles.noticeLink}
              href={`tel:${COMPANY_INFO.hotline}`}
            >
              {COMPANY_INFO.hotlineFormatted}
            </a>{" "}
            để được tư vấn ngay.
          </p>
        )}
      </form>
    </div>
  );
};
