"use client";

import { ADMIN_MOCK_USER, COMPANY_INFO } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  KeyRound,
  Server,
  UserCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./AdminSettingsClient.module.scss";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Họ tên hiển thị cần tối thiểu 3 ký tự.")
    .max(80, "Họ tên tối đa 80 ký tự."),
  role: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập chức danh quản trị.")
    .max(80, "Chức danh tối đa 80 ký tự."),
  email: z.string().trim().email("Địa chỉ email công vụ không hợp lệ."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Vui lòng nhập mật khẩu hiện tại (tối thiểu 6 ký tự)."),
    newPassword: z
      .string()
      .min(8, "Mật khẩu mới cần tối thiểu 8 ký tự.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Mật khẩu mới phải bao gồm cả chữ cái và chữ số.",
      ),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận lại mật khẩu mới."),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Mật khẩu mới không được trùng với mật khẩu hiện tại.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận chưa trùng khớp.",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export const AdminSettingsClient: React.FC = () => {
  const [profileDisplay, setProfileDisplay] = useState({
    name: ADMIN_MOCK_USER.name,
    role: ADMIN_MOCK_USER.role,
    email: ADMIN_MOCK_USER.email,
    initials: ADMIN_MOCK_USER.initials,
  });

  const [notice, setNotice] = useState<string | null>(null);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const apiConfigured = Boolean(process.env.NEXT_PUBLIC_API_URL?.trim());

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: ADMIN_MOCK_USER.name,
      role: ADMIN_MOCK_USER.role,
      email: ADMIN_MOCK_USER.email,
    },
  });

  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSaveProfile = async (values: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const words = values.name.trim().split(/\s+/);
    const initials =
      words.length >= 2
        ? `${words[words.length - 2][0]}${words[words.length - 1][0]}`.toUpperCase()
        : values.name.slice(0, 2).toUpperCase();

    setProfileDisplay({
      name: values.name.trim(),
      role: values.role.trim(),
      email: values.email.trim(),
      initials,
    });
    setNotice("Đã lưu cập nhật thông tin hồ sơ quản trị viên.");
  };

  const handleChangePassword = async (_values: ChangePasswordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    passwordForm.reset();
    setNotice(
      "Đã cập nhật mật khẩu ủy quyền thành công cho tài khoản quản trị.",
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <div className={styles.headerCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/admin/dashboard" className={styles.breadcrumbLink}>
              Bảng điều khiển
            </Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span className={styles.breadcrumbCurrent}>
              Tài khoản & Bảo mật
            </span>
          </nav>

          <h1 className={styles.pageTitle}>Tài Khoản & Bảo Mật Hệ Thống</h1>
          <p className={styles.pageSubtitle}>
            Quản lý hồ sơ định danh quản trị viên, mật khẩu ủy quyền truy cập
            CMS và theo dõi trạng thái hạ tầng lưu trữ Cloudflare R2.
          </p>
        </div>
      </header>

      {notice && (
        <output className={styles.noticeBanner} aria-live="polite">
          <span>{notice}</span>
          <button
            type="button"
            className={styles.noticeCloseBtn}
            onClick={() => setNotice(null)}
            aria-label="Đóng thông báo"
          >
            <X size={15} />
          </button>
        </output>
      )}

      <div className={styles.contentGrid}>
        {/* Left Column: Admin Profile & Password Forms */}
        <div className={styles.columnStack}>
          {/* Card 1: Admin Profile */}
          <form
            className={styles.card}
            onSubmit={profileForm.handleSubmit(handleSaveProfile)}
            noValidate
          >
            <div className={styles.cardHead}>
              <div className={styles.cardTitleGroup}>
                <span className={styles.iconBox} aria-hidden="true">
                  <UserCheck size={18} />
                </span>
                <div>
                  <p className={styles.cardEyebrow}>ĐỊNH DANH PHIÊN QUẢN TRỊ</p>
                  <h2 className={styles.cardTitle}>Hồ sơ Quản trị viên</h2>
                </div>
              </div>
              <span className={styles.permBadge}>
                {ADMIN_MOCK_USER.permissionLabel}
              </span>
            </div>

            <div className={styles.profileBanner}>
              <span className={styles.avatarCircle} aria-hidden="true">
                {profileDisplay.initials}
              </span>
              <div>
                <p className={styles.profileName}>{profileDisplay.name}</p>
                <p className={styles.profileMeta}>
                  {profileDisplay.role} • {profileDisplay.email}
                </p>
              </div>
            </div>

            <div className={styles.formGridTwo}>
              <div className={styles.fieldGroup}>
                <label
                  htmlFor="admin-profile-name"
                  className={styles.fieldLabel}
                >
                  HỌ TÊN HIỂN THỊ
                </label>
                <input
                  id="admin-profile-name"
                  type="text"
                  className={`${styles.textInput} ${profileForm.formState.errors.name ? styles.inputInvalid : ""}`}
                  {...profileForm.register("name")}
                />
                {profileForm.formState.errors.name && (
                  <p className={styles.errorText}>
                    {profileForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label
                  htmlFor="admin-profile-role"
                  className={styles.fieldLabel}
                >
                  CHỨC DANH CHUYÊN MÔN
                </label>
                <input
                  id="admin-profile-role"
                  type="text"
                  className={`${styles.textInput} ${profileForm.formState.errors.role ? styles.inputInvalid : ""}`}
                  {...profileForm.register("role")}
                />
                {profileForm.formState.errors.role && (
                  <p className={styles.errorText}>
                    {profileForm.formState.errors.role.message}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label
                htmlFor="admin-profile-email"
                className={styles.fieldLabel}
              >
                ĐỊA CHỈ EMAIL ĐĂNG NHẬP CÔNG VỤ
              </label>
              <input
                id="admin-profile-email"
                type="email"
                className={`${styles.textInput} ${profileForm.formState.errors.email ? styles.inputInvalid : ""}`}
                {...profileForm.register("email")}
              />
              {profileForm.formState.errors.email && (
                <p className={styles.errorText}>
                  {profileForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className={styles.cardFooter}>
              <button
                type="submit"
                disabled={profileForm.formState.isSubmitting}
                className={styles.primaryBtn}
              >
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>Lưu thông tin hồ sơ</span>
              </button>
            </div>
          </form>

          {/* Card 2: Change Password */}
          <form
            className={styles.card}
            onSubmit={passwordForm.handleSubmit(handleChangePassword)}
            noValidate
          >
            <div className={styles.cardHead}>
              <div className={styles.cardTitleGroup}>
                <span className={styles.iconBox} aria-hidden="true">
                  <KeyRound size={18} />
                </span>
                <div>
                  <p className={styles.cardEyebrow}>AN TOÀN TRUY CẬP</p>
                  <h2 className={styles.cardTitle}>
                    Đổi mật khẩu đăng nhập Admin
                  </h2>
                </div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="admin-current-pw" className={styles.fieldLabel}>
                MẬT KHẨU HIỆN TẠI
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="admin-current-pw"
                  type={showCurrentPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu đang sử dụng..."
                  className={`${styles.textInput} ${passwordForm.formState.errors.currentPassword ? styles.inputInvalid : ""}`}
                  {...passwordForm.register("currentPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw((v) => !v)}
                  className={styles.eyeToggleBtn}
                  aria-label={showCurrentPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showCurrentPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {passwordForm.formState.errors.currentPassword && (
                <p className={styles.errorText}>
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className={styles.formGridTwo}>
              <div className={styles.fieldGroup}>
                <label htmlFor="admin-new-pw" className={styles.fieldLabel}>
                  MẬT KHẨU MỚI
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="admin-new-pw"
                    type={showNewPw ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Tối thiểu 8 ký tự (gồm chữ & số)"
                    className={`${styles.textInput} ${passwordForm.formState.errors.newPassword ? styles.inputInvalid : ""}`}
                    {...passwordForm.register("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw((v) => !v)}
                    className={styles.eyeToggleBtn}
                    aria-label={showNewPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showNewPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {passwordForm.formState.errors.newPassword && (
                  <p className={styles.errorText}>
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="admin-confirm-pw" className={styles.fieldLabel}>
                  XÁC NHẬN MẬT KHẨU MỚI
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="admin-confirm-pw"
                    type={showConfirmPw ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Nhập lại mật khẩu mới..."
                    className={`${styles.textInput} ${passwordForm.formState.errors.confirmPassword ? styles.inputInvalid : ""}`}
                    {...passwordForm.register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw((v) => !v)}
                    className={styles.eyeToggleBtn}
                    aria-label={showConfirmPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {passwordForm.formState.errors.confirmPassword && (
                  <p className={styles.errorText}>
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <p className={styles.helperText}>
              Mật khẩu mới sẽ có hiệu lực ngay từ phiên đăng nhập kế tiếp trên
              cổng quản trị nội bộ.
            </p>

            <div className={styles.cardFooter}>
              <button
                type="submit"
                disabled={passwordForm.formState.isSubmitting}
                className={styles.primaryBtn}
              >
                <KeyRound size={15} aria-hidden="true" />
                <span>Cập nhật mật khẩu</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Infrastructure & Static Brand Info */}
        <div className={styles.columnStack}>
          {/* Card 3: Infrastructure Status */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.cardTitleGroup}>
                <span className={styles.iconBox} aria-hidden="true">
                  <Server size={18} />
                </span>
                <div>
                  <p className={styles.cardEyebrow}>KIẾN TRÚC VẬN HÀNH</p>
                  <h2 className={styles.cardTitle}>Trạng thái Hạ tầng</h2>
                </div>
              </div>
            </div>

            <div className={styles.statusList}>
              <div className={styles.statusRow}>
                <div className={styles.statusInfo}>
                  <span className={styles.statusLabel}>
                    Public Static Build (Zero Latency)
                  </span>
                  <span className={styles.statusSub}>
                    Header, Footer & Dịch vụ biên dịch tĩnh 0ms không gọi API
                  </span>
                </div>
                <span className={styles.pillOnline}>TỐI ƯU</span>
              </div>

              <div className={styles.statusRow}>
                <div className={styles.statusInfo}>
                  <span className={styles.statusLabel}>
                    Go Backend REST API
                  </span>
                  <span className={styles.statusSub}>
                    {apiConfigured
                      ? `Đã kết nối: ${process.env.NEXT_PUBLIC_API_URL}`
                      : "Đang chạy chế độ Mock Store (Chờ ghép Giai đoạn 5)"}
                  </span>
                </div>
                <span
                  className={
                    apiConfigured ? styles.pillOnline : styles.pillStandby
                  }
                >
                  {apiConfigured ? "ONLINE" : "MOCK MODE"}
                </span>
              </div>

              <div className={styles.statusRow}>
                <div className={styles.statusInfo}>
                  <span className={styles.statusLabel}>
                    Cloudflare R2 Object Storage
                  </span>
                  <span className={styles.statusSub}>
                    Lưu trữ ảnh dự án & bản vẽ mặt bằng qua CDN (0đ băng thông)
                  </span>
                </div>
                <span
                  className={
                    apiConfigured ? styles.pillOnline : styles.pillStandby
                  }
                >
                  {apiConfigured ? "ĐÃ KẾT NỐI" : "ADAPTER SẴN SÀNG"}
                </span>
              </div>
            </div>
          </section>

          {/* Card 4: Read-only Static Brand Constants Reference */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.cardTitleGroup}>
                <span className={styles.iconBox} aria-hidden="true">
                  <Building2 size={18} />
                </span>
                <div>
                  <p className={styles.cardEyebrow}>THAM CHIẾU ĐÓNG GÓI TĨNH</p>
                  <h2 className={styles.cardTitle}>Thông tin Thương hiệu</h2>
                </div>
              </div>
            </div>

            <dl className={styles.brandSummaryList}>
              <div className={styles.brandSummaryItem}>
                <dt>Thương hiệu & Định vị</dt>
                <dd>
                  {COMPANY_INFO.brandName} — {COMPANY_INFO.slogan}
                </dd>
              </div>

              <div className={styles.brandSummaryItem}>
                <dt>Hotline Tư vấn</dt>
                <dd>{COMPANY_INFO.hotlineFormatted}</dd>
              </div>

              <div className={styles.brandSummaryItem}>
                <dt>Email Liên hệ</dt>
                <dd>{COMPANY_INFO.email}</dd>
              </div>

              <div className={styles.brandSummaryItem}>
                <dt>Trụ sở Văn phòng</dt>
                <dd>{COMPANY_INFO.offices[0]?.address}</dd>
              </div>
            </dl>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalOutlineLink}
            >
              <span>Mở trang chủ Public Website</span>
              <ExternalLink size={14} aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
