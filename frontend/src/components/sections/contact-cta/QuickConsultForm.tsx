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
  Textarea,
} from "@components";
import { COMPANY_INFO } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./QuickConsultForm.module.scss";

// ==============================================================================
// Form yêu cầu tư vấn nhanh — Figma node 1:1973 (Quick Consultation Request Form)
//
// - Field bắt buộc (`*`) lấy đúng theo design (rule 08 §1: không tự đặt field).
// - Chưa có backend contract nên KHÔNG gọi API và KHÔNG báo thành công giả
//   (rule 06 §2, rule 08 §4, quyết định đã chốt).
// ==============================================================================

const contactFormSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên."),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại.")
    // Nới lỏng để chấp nhận cả số di động lẫn bàn (0..., +84...)
    .regex(/^(\+?84|0)[0-9]{8,10}$/, "Số điện thoại chưa đúng định dạng."),
  location: z.string().trim().min(1, "Vui lòng nhập địa điểm dự án."),
  projectNeed: z.string().min(1, "Vui lòng chọn nhu cầu dự án."),
  notes: z.string().trim().max(500, "Ghi chú tối đa 500 ký tự.").optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const DEFAULT_VALUES: ContactFormValues = {
  fullName: "",
  phone: "",
  location: "",
  projectNeed: "",
  notes: "",
};

// TODO: đối chiếu placeholder địa điểm với Figma (node 1:2002).
const LOCATION_PLACEHOLDER = "VD: Khu vực Quận 7, TP. Hồ Chí Minh";

// TODO: đối chiếu danh sách options với Figma (node 1:2009).
// Hiện lấy theo 3 dịch vụ chính trong architecture_construction_project_brief.md.
const PROJECT_NEED_OPTIONS = [
  "Thiết kế kiến trúc",
  "Tối ưu chi phí",
  "Thi công trọn gói",
  "Khác",
] as const;

type SubmitState = "idle" | "awaiting-contract";

export const QuickConsultForm: React.FC = () => {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  const onSubmit = (_data: ContactFormValues) => {
    // TODO: gửi lên API tạo yêu cầu tư vấn ngay khi backend có contract.
    // Hiện tại dữ liệu đã hợp lệ nhưng KHÔNG gửi đi và KHÔNG báo thành công giả.
    setSubmitState("awaiting-contract");
  };

  return (
    <div className={styles.card}>
      {/* TODO: đối chiếu heading + mô tả với Figma (node 1:1976, 1:1978) */}
      <h3 className={styles.title}>Đăng ký nhận phương án tư vấn</h3>
      <p className={styles.subtitle}>
        Thông tin của bạn được bảo mật tuyệt đối theo tiêu chuẩn tư vấn kiến
        trúc quốc tế.
      </p>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                >
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
            rightIcon={<ArrowRight size={16} aria-hidden="true" />}
          >
            Đăng ký nhận tư vấn ngay
          </Button>
        </AnimateIcon>

        {submitState === "awaiting-contract" && isValid && (
          <p role="status" className={styles.notice}>
            Biểu mẫu đã hợp lệ nhưng chưa được gửi vì hệ thống chưa có API. Vui
            lòng gọi{" "}
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
