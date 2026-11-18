"use client";

import { ArrowRight, Button, Input, Label } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Eye, EyeOff, Lock, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./AdminLoginForm.module.scss";

const adminLoginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, "Vui lòng nhập tên đăng nhập hoặc email công vụ."),
  password: z.string().min(6, "Mật khẩu ủy quyền phải có ít nhất 6 ký tự."),
  rememberDevice: z.boolean(),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotHint, setForgotHint] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberDevice: true,
    },
  });

  const onSubmit = async (values: AdminLoginFormValues) => {
    // UI-first mock authentication: simulate brief latency before entering CMS.
    await new Promise((resolve) => setTimeout(resolve, 350));
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("axhome_admin_user", values.identifier);
    }
    router.push("/admin/dashboard");
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Biểu mẫu đăng nhập quản trị"
    >
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <Label htmlFor="admin-identifier" className={styles.label}>
            Tên đăng nhập hoặc Email công vụ{" "}
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </Label>
          <span className={styles.formatHint}>ĐỊNH DẠNG: @AXHOME.VN</span>
        </div>

        <div className={styles.inputFieldWrap}>
          <AtSign className={styles.leadingIcon} size={16} aria-hidden="true" />
          <Input
            id="admin-identifier"
            type="text"
            autoComplete="username"
            placeholder="admin@axhome.vn"
            invalid={Boolean(errors.identifier)}
            aria-describedby={
              errors.identifier ? "admin-identifier-error" : undefined
            }
            className={styles.inputWithLeading}
            {...register("identifier")}
          />
        </div>

        {errors.identifier && (
          <p
            id="admin-identifier-error"
            className={styles.errorText}
            role="alert"
          >
            {errors.identifier.message}
          </p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <Label htmlFor="admin-password" className={styles.label}>
            Mật khẩu ủy quyền{" "}
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </Label>
          <button
            type="button"
            className={styles.forgotLink}
            onClick={() =>
              setForgotHint(
                "Vui lòng liên hệ Quản trị viên hệ thống để cấp lại mật khẩu ủy quyền.",
              )
            }
          >
            Quên mật khẩu?
          </button>
        </div>

        <div className={styles.inputFieldWrap}>
          <Lock className={styles.leadingIcon} size={16} aria-hidden="true" />
          <Input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Nhập mật khẩu ủy quyền"
            invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "admin-password-error" : undefined
            }
            className={styles.inputWithBoth}
            {...register("password")}
          />
          <button
            type="button"
            className={styles.toggleVisibility}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {errors.password && (
          <p
            id="admin-password-error"
            className={styles.errorText}
            role="alert"
          >
            {errors.password.message}
          </p>
        )}

        {forgotHint && (
          <p className={styles.infoHint} role="status">
            {forgotHint}
          </p>
        )}
      </div>

      <div className={styles.optionsRow}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            {...register("rememberDevice")}
          />
          <span>Ghi nhớ thiết bị kiến trúc an toàn (30 ngày)</span>
        </label>

        <span className={styles.twoFaTag}>
          <Smartphone size={12} aria-hidden="true" />
          2FA TÍCH HỢP
        </span>
      </div>

      <Button
        type="submit"
        variant="dark"
        size="lg"
        fullWidth
        disabled={isSubmitting}
        rightIcon={<ArrowRight size={16} aria-hidden="true" />}
      >
        {isSubmitting ? "Đang xác thực..." : "Đăng Nhập Quản Trị"}
      </Button>
    </form>
  );
};
