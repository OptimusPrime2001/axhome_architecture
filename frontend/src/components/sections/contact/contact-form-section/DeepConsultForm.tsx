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
  Spinner,
  Textarea,
} from "@components";
import { CONTACT_FORM_COPY } from "@constants";
import { Controller } from "react-hook-form";
import styles from "./ContactFormSection.module.scss";
import { useDeepConsultForm } from "./useDeepConsultForm";

export const DeepConsultForm: React.FC = () => {
  const { control, errors, isSubmitting, submitState, handleFormSubmit } =
    useDeepConsultForm();

  return (
    <div className={styles.formCard}>
      <p className={styles.formEyebrow}>{CONTACT_FORM_COPY.eyebrow}</p>
      <h3 className={styles.formTitle}>{CONTACT_FORM_COPY.title}</h3>
      <p className={styles.formSubtitle}>{CONTACT_FORM_COPY.subtitle}</p>

      <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
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

        {submitState === "submitted" && (
          <p className={styles.notice} role="status">
            Cảm ơn Quý khách! Hồ sơ tư vấn đã được gửi tới đội ngũ Kiến trúc sư
            chủ trì Axhome. Chúng tôi sẽ liên hệ lại sớm nhất.
          </p>
        )}

        {submitState === "awaiting-contract" && (
          <p className={styles.notice} role="status">
            Thông tin đã hợp lệ. Chức năng gửi yêu cầu sẽ hoạt động ngay khi cấu
            hình `NEXT_PUBLIC_API_URL`.
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
                ? "Đang gửi hồ sơ..."
                : CONTACT_FORM_COPY.submitLabel}
            </Button>
          </AnimateIcon>
        </div>
      </form>
    </div>
  );
};
