"use client";

import { AnimateIcon } from "@animate-ui/react/icons";
import {
  ArrowRight,
  Button,
  Input,
  Label,
  Lock,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@components";
import { CONTACT_FORM_COPY } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./ContactFormSection.module.scss";

const deepConsultSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên."),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại.")
    .regex(/^(\+?84|0)[0-9]{8,10}$/, "Số điện thoại chưa đúng định dạng."),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập địa chỉ email.")
    .email("Địa chỉ email chưa đúng định dạng."),
  serviceType: z.string().min(1, "Vui lòng chọn nhu cầu tư vấn."),
  landArea: z.string().trim().min(1, "Vui lòng nhập diện tích dự kiến."),
  location: z.string().trim().min(1, "Vui lòng nhập địa điểm khu đất / dự án."),
  budget: z.string().optional(),
  notes: z.string().trim().max(1000, "Nội dung tối đa 1.000 ký tự.").optional(),
});

type DeepConsultFormValues = z.infer<typeof deepConsultSchema>;

const DEFAULT_VALUES: DeepConsultFormValues = {
  fullName: "",
  phone: "",
  email: "",
  serviceType: "",
  landArea: "",
  location: "",
  budget: "",
  notes: "",
};

type SubmitState = "idle" | "awaiting-contract";

export const DeepConsultForm: React.FC = () => {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeepConsultFormValues>({
    resolver: zodResolver(deepConsultSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const onSubmit = (_data: DeepConsultFormValues) => {
    // Chưa có endpoint backend nên giữ thông báo trung thực, không báo thành công giả.
    setSubmitState("awaiting-contract");
  };

  return (
    <div className={styles.formCard}>
      <p className={styles.formEyebrow}>{CONTACT_FORM_COPY.eyebrow}</p>
      <h3 className={styles.formTitle}>{CONTACT_FORM_COPY.title}</h3>
      <p className={styles.formSubtitle}>{CONTACT_FORM_COPY.subtitle}</p>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.row}>
          <div className={styles.field}>
            <Label htmlFor="deep-full-name">HỌ VÀ TÊN *</Label>
            <Input
              id="deep-full-name"
              type="text"
              placeholder="VD: Nguyễn Văn A"
              autoComplete="name"
              invalid={!!errors.fullName}
              aria-invalid={!!errors.fullName}
              aria-describedby={
                errors.fullName ? "deep-full-name-error" : undefined
              }
              {...control.register("fullName")}
            />
            {errors.fullName && (
              <p
                id="deep-full-name-error"
                role="alert"
                className={styles.error}
              >
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <Label htmlFor="deep-phone">SỐ ĐIỆN THOẠI *</Label>
            <Input
              id="deep-phone"
              type="tel"
              placeholder="VD: 0908 xxx xxx"
              autoComplete="tel"
              invalid={!!errors.phone}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "deep-phone-error" : undefined}
              {...control.register("phone")}
            />
            {errors.phone && (
              <p id="deep-phone-error" role="alert" className={styles.error}>
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <Label htmlFor="deep-email">EMAIL *</Label>
            <Input
              id="deep-email"
              type="email"
              placeholder="VD: email@domain.com"
              autoComplete="email"
              invalid={!!errors.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "deep-email-error" : undefined}
              {...control.register("email")}
            />
            {errors.email && (
              <p id="deep-email-error" role="alert" className={styles.error}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <Label htmlFor="deep-service-type">NHU CẦU TƯ VẤN *</Label>
            <Controller
              name="serviceType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="deep-service-type"
                    invalid={!!errors.serviceType}
                    aria-invalid={!!errors.serviceType}
                    aria-describedby={
                      errors.serviceType ? "deep-service-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Chọn dịch vụ mong muốn" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_FORM_COPY.serviceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.serviceType && (
              <p id="deep-service-error" role="alert" className={styles.error}>
                {errors.serviceType.message}
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <Label htmlFor="deep-land-area">DIỆN TÍCH DỰ KIẾN *</Label>
            <Input
              id="deep-land-area"
              type="text"
              placeholder="VD: 350 m², Biệt thự 3 tầng..."
              invalid={!!errors.landArea}
              aria-invalid={!!errors.landArea}
              aria-describedby={
                errors.landArea ? "deep-land-area-error" : undefined
              }
              {...control.register("landArea")}
            />
            {errors.landArea && (
              <p
                id="deep-land-area-error"
                role="alert"
                className={styles.error}
              >
                {errors.landArea.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <Label htmlFor="deep-location">ĐỊA ĐIỂM KHU ĐẤT / DỰ ÁN *</Label>
            <Input
              id="deep-location"
              type="text"
              placeholder="VD: Thảo Điền, TP. Thủ Đức, TP.HCM"
              invalid={!!errors.location}
              aria-invalid={!!errors.location}
              aria-describedby={
                errors.location ? "deep-location-error" : undefined
              }
              {...control.register("location")}
            />
            {errors.location && (
              <p id="deep-location-error" role="alert" className={styles.error}>
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <Label htmlFor="deep-budget">NGÂN SÁCH DỰ KIẾN</Label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="deep-budget">
                  <SelectValue placeholder="Vui lòng ước lượng mức đầu tư" />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_FORM_COPY.budgetOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className={styles.field}>
          <Label htmlFor="deep-notes">
            NỘI DUNG YÊU CẦU / CHIA SẺ MONG MUỐN
          </Label>
          <Textarea
            id="deep-notes"
            rows={4}
            placeholder="Mô tả phong cách kiến trúc yêu thích, số thành viên gia đình, hoặc các yêu cầu công năng đặc biệt (hồ bơi, hầm rượu, giếng trời nhiệt đới)..."
            invalid={!!errors.notes}
            aria-invalid={!!errors.notes}
            aria-describedby={errors.notes ? "deep-notes-error" : undefined}
            {...control.register("notes")}
          />
          {errors.notes && (
            <p id="deep-notes-error" role="alert" className={styles.error}>
              {errors.notes.message}
            </p>
          )}
        </div>

        {submitState === "awaiting-contract" && (
          <p className={styles.notice} role="status">
            Thông tin đã hợp lệ. Chức năng gửi yêu cầu sẽ được kích hoạt ngay
            khi kết nối hệ thống tiếp nhận hồ sơ từ máy chủ.
          </p>
        )}

        <div className={styles.formFooter}>
          <AnimateIcon animateOnHover>
            <span className={styles.privacyNote}>
              <Lock size={14} aria-hidden="true" />
              <span>{CONTACT_FORM_COPY.privacyNote}</span>
            </span>
          </AnimateIcon>

          <AnimateIcon animateOnHover asChild>
            <Button
              type="submit"
              variant="dark"
              size="md"
              disabled={isSubmitting}
              rightIcon={<ArrowRight size={16} aria-hidden="true" />}
            >
              {CONTACT_FORM_COPY.submitLabel}
            </Button>
          </AnimateIcon>
        </div>
      </form>
    </div>
  );
};
