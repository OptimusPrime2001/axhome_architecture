"use client";

import type { UpdateAdminUserPayload } from "@apis";
import {
  Badge,
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
import type { AdminAccount, UserRole } from "@shared-types";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Lock,
  Save,
  ShieldAlert,
  Trash2,
  UserCog,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./AccountDetailModal.module.scss";

const editAccountSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Họ tên cần tối thiểu 2 ký tự.")
    .max(100, "Họ tên tối đa 100 ký tự."),
  email: z.string().trim().email("Địa chỉ email không hợp lệ."),
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.VIEWER]),
  newPassword: z
    .string()
    .refine(
      (val) => val.length === 0 || val.length >= 8,
      "Mật khẩu mới cần tối thiểu 8 ký tự (hoặc để trống để giữ nguyên).",
    ),
});

type EditAccountFormValues = z.infer<typeof editAccountSchema>;

export interface AccountDetailModalProps {
  account: AdminAccount;
  currentUserId: string;
  isAdmin: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onUpdate: (payload: UpdateAdminUserPayload, onDone?: () => void) => void;
  onDelete: (id: string) => void;
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: USER_ROLES.ADMIN, label: "Quản trị viên" },
  { value: USER_ROLES.EDITOR, label: "Biên tập viên" },
  { value: USER_ROLES.VIEWER, label: "Người xem" },
];

const ROLE_BADGE_MAP: Record<
  UserRole,
  { label: string; variant: "published" | "progress" | "draft" }
> = {
  [USER_ROLES.ADMIN]: { label: "ADMIN", variant: "published" },
  [USER_ROLES.EDITOR]: { label: "EDITOR", variant: "progress" },
  [USER_ROLES.VIEWER]: { label: "VIEWER", variant: "draft" },
};

function formatDateTime(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const AccountDetailModal: React.FC<AccountDetailModalProps> = ({
  account,
  currentUserId,
  isAdmin,
  isUpdating,
  isDeleting,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const isSelf = account.id === currentUserId;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditAccountFormValues>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      fullName: account.fullName,
      email: account.email,
      role: account.role,
      newPassword: "",
    },
  });

  useEffect(() => {
    reset({
      fullName: account.fullName,
      email: account.email,
      role: account.role,
      newPassword: "",
    });
    setConfirmingDelete(false);
    setShowNewPassword(false);
  }, [account, reset]);

  const onSubmit = (values: EditAccountFormValues) => {
    if (!isAdmin) return;
    onUpdate(
      {
        id: account.id,
        full_name: values.fullName.trim(),
        email: values.email.trim(),
        role: values.role,
        new_password: values.newPassword.trim() || undefined,
      },
      () => {
        onClose();
      },
    );
  };

  const badgeMeta = ROLE_BADGE_MAP[account.role];

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrow}>HỒ SƠ TÀI KHOẢN</span>
            <Badge variant={badgeMeta.variant} showDot={false}>
              {badgeMeta.label}
            </Badge>
            {isSelf && (
              <span className={styles.selfBadge}>Tài khoản hiện tại</span>
            )}
          </div>
          <DialogTitle className={styles.accountName}>
            {account.fullName}
          </DialogTitle>
          <DialogDescription className={styles.metaLine}>
            Tạo lúc: {formatDateTime(account.createdAt)} • Cập nhật:{" "}
            {formatDateTime(account.updatedAt)}
          </DialogDescription>
        </DialogHeader>

        {!isAdmin && (
          <div className={styles.readOnlyNotice} role="status">
            <Lock size={15} aria-hidden="true" />
            <span>
              Tài khoản của bạn đang ở chế độ chỉ đọc. Chỉ{" "}
              <strong>Quản trị viên (Admin)</strong> mới có quyền chỉnh sửa hoặc
              xóa tài khoản.
            </span>
          </div>
        )}

        <form
          className={styles.formSection}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <p className={styles.sectionTitle}>
            <UserCog size={14} aria-hidden="true" />
            <span>THÔNG TIN ĐỊNH DANH & PHÂN QUYỀN</span>
          </p>

          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="edit-account-name" className={styles.fieldLabel}>
                HỌ VÀ TÊN
              </Label>
              <Input
                id="edit-account-name"
                type="text"
                disabled={!isAdmin || isUpdating}
                invalid={Boolean(errors.fullName)}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className={styles.errorText}>{errors.fullName.message}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="edit-account-email" className={styles.fieldLabel}>
                EMAIL ĐĂNG NHẬP
              </Label>
              <Input
                id="edit-account-email"
                type="email"
                disabled={!isAdmin || isUpdating}
                invalid={Boolean(errors.email)}
                {...register("email")}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.fieldFull}>
              <Label htmlFor="edit-account-role" className={styles.fieldLabel}>
                VAI TRÒ PHÂN QUYỀN
              </Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!isAdmin || isUpdating}
                  >
                    <SelectTrigger id="edit-account-role">
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

            {isAdmin && (
              <div className={styles.fieldFull}>
                <Label
                  htmlFor="edit-account-password"
                  className={styles.fieldLabel}
                >
                  ĐẶT LẠI MẬT KHẨU MỚI (TÙY CHỌN)
                </Label>
                <div className={styles.passwordWrap}>
                  <Input
                    id="edit-account-password"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Để trống nếu giữ nguyên mật khẩu hiện tại (tối thiểu 8 ký tự)"
                    disabled={isUpdating}
                    className={styles.passwordInput}
                    invalid={Boolean(errors.newPassword)}
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowNewPassword((v) => !v)}
                    aria-label={
                      showNewPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                    }
                  >
                    {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className={styles.errorText}>
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Delete Confirmation Banner (Admin only, non-self) */}
          {isAdmin && confirmingDelete && (
            <div className={styles.deleteConfirmBox} role="alert">
              <div className={styles.deleteConfirmText}>
                <AlertTriangle size={16} aria-hidden="true" />
                <span>
                  Xác nhận xóa vĩnh viễn tài khoản{" "}
                  <strong>{account.email}</strong>? Thao tác này không thể hoàn
                  tác.
                </span>
              </div>
              <div className={styles.deleteConfirmActions}>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={isDeleting}
                  onClick={() => setConfirmingDelete(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="button"
                  variant="dark"
                  size="sm"
                  className={styles.dangerBtn}
                  disabled={isDeleting}
                  onClick={() => onDelete(account.id)}
                  leftIcon={
                    isDeleting ? (
                      <Spinner width={14} height={14} />
                    ) : (
                      <Trash2 size={14} aria-hidden="true" />
                    )
                  }
                >
                  {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
                </Button>
              </div>
            </div>
          )}

          <div className={styles.formFooter}>
            <div className={styles.footerLeft}>
              {isAdmin && !isSelf && !confirmingDelete && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className={styles.deleteTriggerBtn}
                  disabled={isUpdating || isDeleting}
                  onClick={() => setConfirmingDelete(true)}
                  leftIcon={<Trash2 size={14} aria-hidden="true" />}
                >
                  Xóa tài khoản
                </Button>
              )}
              {isAdmin && isSelf && (
                <span className={styles.selfHint}>
                  <ShieldAlert size={13} aria-hidden="true" />
                  Không thể tự xóa tài khoản đang đăng nhập
                </span>
              )}
            </div>

            <div className={styles.footerButtons}>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onClose}
                disabled={isUpdating || isDeleting}
              >
                Đóng
              </Button>
              {isAdmin && (
                <Button
                  type="submit"
                  variant="dark"
                  size="sm"
                  disabled={isUpdating || isDeleting}
                  leftIcon={
                    isUpdating ? (
                      <Spinner width={14} height={14} />
                    ) : (
                      <Save size={14} aria-hidden="true" />
                    )
                  }
                >
                  {isUpdating ? "Đang lưu..." : "Lưu cập nhật"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
