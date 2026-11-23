"use client";

import { ArrowRight, Button, Input, Label, Spinner } from "@components";
import { APP_ROUTE } from "@constants";
import { useAdminAuthStore } from "@store";
import { cookieStorage } from "@utils";
import { AtSign, Eye, EyeOff, Lock, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./AdminLoginForm.module.scss";
import { useAdminLoginForm } from "./useAdminLoginForm";

export const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    errors,
    isSubmitting,
    showPassword,
    forgotHint,
    authError,
    handleFormSubmit,
    toggleShowPassword,
    showForgotPasswordHint,
  } = useAdminLoginForm();
  const hasCheckedAuth = useAdminAuthStore((state) => state.hasCheckedAuth);
  useEffect(() => {
    if (hasCheckedAuth && cookieStorage.get("access_token")) {
      router.replace(APP_ROUTE.LOGIN_ADMIN);
    }
  }, [hasCheckedAuth, router.replace]);
  return (
    <form
      className={styles.form}
      onSubmit={handleFormSubmit}
      noValidate
      aria-label="Biểu mẫu đăng nhập quản trị"
    >
      {authError && (
        <p className={styles.errorText} role="alert">
          {authError}
        </p>
      )}

      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <Label htmlFor="admin-identifier" className={styles.label}>
            Email công vụ{" "}
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </Label>
          <span className={styles.formatHint}>Định dạng: @gmail.com</span>
        </div>

        <div className={styles.inputFieldWrap}>
          <AtSign className={styles.leadingIcon} size={16} aria-hidden="true" />
          <Input
            id="admin-identifier"
            type="text"
            autoComplete="username"
            placeholder="admin@gmail.com"
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
            onClick={showForgotPasswordHint}
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
            onClick={toggleShowPassword}
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
        leftIcon={isSubmitting ? <Spinner width={16} height={16} /> : undefined}
        rightIcon={
          isSubmitting ? undefined : <ArrowRight size={16} aria-hidden="true" />
        }
      >
        {isSubmitting ? "Đang xác thực..." : "Đăng Nhập Quản Trị"}
      </Button>
    </form>
  );
};
