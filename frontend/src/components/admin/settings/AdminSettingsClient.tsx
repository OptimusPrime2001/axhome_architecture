"use client";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Spinner,
} from "@components";
import { COMPANY_INFO, USER_ROLES } from "@constants";
import type { UserRole } from "@shared-types";
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
import { Controller } from "react-hook-form";
import styles from "./AdminSettingsClient.module.scss";
import { useAdminSettings } from "./useAdminSettings";

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: USER_ROLES.ADMIN, label: "Quản trị viên" },
  { value: USER_ROLES.EDITOR, label: "Biên tập viên" },
  { value: USER_ROLES.VIEWER, label: "Người xem" },
];

export const AdminSettingsClient: React.FC = () => {
  const {
    isLoadingProfile,
    isAdmin,
    profileDisplay,
    notice,
    setNotice,
    showCurrentPw,
    setShowCurrentPw,
    showNewPw,
    setShowNewPw,
    showConfirmPw,
    setShowConfirmPw,
    profileForm,
    passwordForm,
    isSavingProfile,
    isChangingPassword,
    handleSaveProfile,
    handleChangePassword,
  } = useAdminSettings();

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <div className={styles.headerCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/admin/dashboard" className={styles.breadcrumbLink}>
              Bảng điều khiển
            </Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span className={styles.breadcrumbCurrent}>Tài khoản của tôi</span>
          </nav>

          <h1 className={styles.pageTitle}>Tài Khoản Của Tôi</h1>
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
          <form className={styles.card} onSubmit={handleSaveProfile} noValidate>
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
                {profileDisplay.permissionLabel}
              </span>
            </div>

            {isLoadingProfile ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  padding: "8px 0",
                }}
              >
                <Skeleton style={{ height: "68px", borderRadius: "10px" }} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <Skeleton style={{ height: "42px", borderRadius: "8px" }} />
                  <Skeleton style={{ height: "42px", borderRadius: "8px" }} />
                </div>
                <Skeleton style={{ height: "42px", borderRadius: "8px" }} />
              </div>
            ) : (
              <>
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
                    <Label
                      htmlFor="admin-profile-name"
                      className={styles.fieldLabel}
                    >
                      HỌ TÊN HIỂN THỊ
                    </Label>
                    <Input
                      id="admin-profile-name"
                      type="text"
                      invalid={Boolean(profileForm.formState.errors.name)}
                      {...profileForm.register("name")}
                    />
                    {profileForm.formState.errors.name && (
                      <p className={styles.errorText}>
                        {profileForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <Label
                      htmlFor="admin-profile-role"
                      className={styles.fieldLabel}
                    >
                      VAI TRÒ PHÂN QUYỀN
                    </Label>
                    <Controller
                      control={profileForm.control}
                      name="role"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!isAdmin || isSavingProfile}
                        >
                          <SelectTrigger
                            id="admin-profile-role"
                            invalid={Boolean(profileForm.formState.errors.role)}
                          >
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
                    {!isAdmin && (
                      <p className={styles.helperText}>
                        Chỉ Quản trị viên (Admin) mới có quyền thay đổi vai trò.
                      </p>
                    )}
                    {profileForm.formState.errors.role && (
                      <p className={styles.errorText}>
                        {profileForm.formState.errors.role.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <Label
                    htmlFor="admin-profile-email"
                    className={styles.fieldLabel}
                  >
                    ĐỊA CHỈ EMAIL ĐĂNG NHẬP CÔNG VỤ
                  </Label>
                  <Input
                    id="admin-profile-email"
                    type="email"
                    invalid={Boolean(profileForm.formState.errors.email)}
                    {...profileForm.register("email")}
                  />
                  {profileForm.formState.errors.email && (
                    <p className={styles.errorText}>
                      {profileForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <Button
                    type="submit"
                    variant="dark"
                    size="sm"
                    disabled={isSavingProfile}
                    leftIcon={
                      isSavingProfile ? (
                        <Spinner width={15} height={15} />
                      ) : (
                        <CheckCircle2 size={15} aria-hidden="true" />
                      )
                    }
                  >
                    {isSavingProfile ? "Đang lưu..." : "Lưu thông tin hồ sơ"}
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Card 2: Change Password */}
          <form
            className={styles.card}
            onSubmit={handleChangePassword}
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
              <Label htmlFor="admin-current-pw" className={styles.fieldLabel}>
                MẬT KHẨU HIỆN TẠI
              </Label>
              <div className={styles.inputWrapper}>
                <Input
                  id="admin-current-pw"
                  type={showCurrentPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu đang sử dụng..."
                  className={styles.passwordInput}
                  invalid={Boolean(
                    passwordForm.formState.errors.currentPassword,
                  )}
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
                <Label htmlFor="admin-new-pw" className={styles.fieldLabel}>
                  MẬT KHẨU MỚI
                </Label>
                <div className={styles.inputWrapper}>
                  <Input
                    id="admin-new-pw"
                    type={showNewPw ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Tối thiểu 8 ký tự (gồm chữ & số)"
                    className={styles.passwordInput}
                    invalid={Boolean(passwordForm.formState.errors.newPassword)}
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
                <Label htmlFor="admin-confirm-pw" className={styles.fieldLabel}>
                  XÁC NHẬN MẬT KHẨU MỚI
                </Label>
                <div className={styles.inputWrapper}>
                  <Input
                    id="admin-confirm-pw"
                    type={showConfirmPw ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Nhập lại mật khẩu mới..."
                    className={styles.passwordInput}
                    invalid={Boolean(
                      passwordForm.formState.errors.confirmPassword,
                    )}
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
              <Button
                type="submit"
                variant="dark"
                size="sm"
                disabled={isChangingPassword}
                leftIcon={
                  isChangingPassword ? (
                    <Spinner width={15} height={15} />
                  ) : (
                    <KeyRound size={15} aria-hidden="true" />
                  )
                }
              >
                {isChangingPassword ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
              </Button>
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
                    Đã kết nối:{" "}
                    {process.env.NEXT_PUBLIC_API_URL || "Backend API"}
                  </span>
                </div>
                <span className={styles.pillOnline}>ONLINE</span>
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
                <span className={styles.pillOnline}>ĐÃ KẾT NỐI</span>
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
