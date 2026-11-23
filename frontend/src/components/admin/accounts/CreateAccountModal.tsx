"use client";

import type { CreateAdminUserPayload } from "@apis";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from "@components";
import { USER_ROLES } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UserRole } from "@shared-types";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./CreateAccountModal.module.scss";

const createAccountSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Họ và tên cần tối thiểu 2 ký tự.")
      .max(100, "Họ và tên tối đa 100 ký tự."),
    email: z.string().trim().email("Địa chỉ email không hợp lệ."),
    role: z.enum([USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.VIEWER]),
    password: z
      .string()
      .min(8, "Mật khẩu cần tối thiểu 8 ký tự.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Mật khẩu phải bao gồm cả chữ cái và chữ số.",
      ),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận chưa trùng khớp.",
    path: ["confirmPassword"],
  });

type CreateAccountFormValues = z.infer<typeof createAccountSchema>;

export interface CreateAccountModalProps {
  isCreating: boolean;
  onClose: () => void;
  onCreate: (payload: CreateAdminUserPayload) => void;
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: USER_ROLES.EDITOR, label: "Biên tập viên" },
  { value: USER_ROLES.VIEWER, label: "Người xem" },
  { value: USER_ROLES.ADMIN, label: "Quản trị viên" },
];

export const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  isCreating,
  onClose,
  onCreate,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: USER_ROLES.EDITOR,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: CreateAccountFormValues) => {
    onCreate({
      full_name: values.fullName.trim(),
      email: values.email.trim(),
      role: values.role,
      password: values.password,
    });
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <p className={styles.eyebrow}>CẤP TÀI KHOẢN NỘI BỘ</p>
          <DialogTitle className={styles.title}>Thêm Tài Khoản Mới</DialogTitle>
          <DialogDescription className={styles.description}>
            Tạo tài khoản truy cập hệ thống quản trị CMS và gán vai trò phân
            quyền phù hợp cho nhân sự.
          </DialogDescription>
        </DialogHeader>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="create-acc-name" className={styles.fieldLabel}>
                HỌ VÀ TÊN <span className={styles.required}>*</span>
              </Label>
              <Input
                id="create-acc-name"
                type="text"
                placeholder="VD: KTS. Nguyễn Minh Quân"
                disabled={isCreating}
                invalid={Boolean(errors.fullName)}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className={styles.errorText}>{errors.fullName.message}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="create-acc-email" className={styles.fieldLabel}>
                EMAIL ĐĂNG NHẬP <span className={styles.required}>*</span>
              </Label>
              <Input
                id="create-acc-email"
                type="email"
                placeholder="minhquan@axhome.vn"
                disabled={isCreating}
                invalid={Boolean(errors.email)}
                {...register("email")}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.fieldFull}>
              <Label htmlFor="create-acc-role" className={styles.fieldLabel}>
                VAI TRÒ PHÂN QUYỀN <span className={styles.required}>*</span>
              </Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isCreating}
                  >
                    <SelectTrigger id="create-acc-role">
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label
                htmlFor="create-acc-password"
                className={styles.fieldLabel}
              >
                MẬT KHẨU <span className={styles.required}>*</span>
              </Label>
              <div className={styles.passwordWrap}>
                <Input
                  id="create-acc-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Tối thiểu 8 ký tự (chữ & số)"
                  disabled={isCreating}
                  className={styles.passwordInput}
                  invalid={Boolean(errors.password)}
                  {...register("password")}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className={styles.errorText}>{errors.password.message}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="create-acc-confirm" className={styles.fieldLabel}>
                XÁC NHẬN MẬT KHẨU <span className={styles.required}>*</span>
              </Label>
              <div className={styles.passwordWrap}>
                <Input
                  id="create-acc-confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Nhập lại mật khẩu..."
                  disabled={isCreating}
                  className={styles.passwordInput}
                  invalid={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className={styles.errorText}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.footer}>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={isCreating}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="dark"
              size="sm"
              disabled={isCreating}
              leftIcon={
                isCreating ? (
                  <Spinner width={14} height={14} />
                ) : (
                  <UserPlus size={14} aria-hidden="true" />
                )
              }
            >
              {isCreating ? "Đang tạo..." : "Tạo tài khoản"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
