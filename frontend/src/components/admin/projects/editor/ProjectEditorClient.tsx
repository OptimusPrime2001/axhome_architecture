"use client";

import { Button, Skeleton, Spinner } from "@components";
import {
  AlertCircle,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { ProjectBasicSection } from "./ProjectBasicSection";
import styles from "./ProjectEditorClient.module.scss";
import { ProjectFloorPlansBuilder } from "./ProjectFloorPlansBuilder";
import { ProjectGalleryBuilder } from "./ProjectGalleryBuilder";
import { ProjectMilestonesBuilder } from "./ProjectMilestonesBuilder";
import { ProjectPublishSidebar } from "./ProjectPublishSidebar";
import { ProjectSpecsSection } from "./ProjectSpecsSection";
import { useProjectEditor } from "./useProjectEditor";

export interface ProjectEditorClientProps {
  mode: "create" | "edit";
  projectId?: string;
}

export const ProjectEditorClient: React.FC<ProjectEditorClientProps> = ({
  mode,
  projectId,
}) => {
  const {
    topRef,
    form,
    existingProject,
    isLoadingDetail,
    busy,
    isDirty,
    errors,
    slugManuallyEdited,
    setSlugManuallyEdited,
    formBannerError,
    submitWithTargetStatus,
  } = useProjectEditor({ mode, projectId });

  if (isLoadingDetail) {
    return (
      <output
        className={styles.editorWrapper}
        aria-label="Đang tải dữ liệu hồ sơ dự án"
      >
        <Skeleton
          style={{ height: "72px", borderRadius: "10px", marginBottom: "20px" }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Skeleton style={{ height: "260px", borderRadius: "12px" }} />
            <Skeleton style={{ height: "220px", borderRadius: "12px" }} />
          </div>
          <Skeleton style={{ height: "380px", borderRadius: "12px" }} />
        </div>
      </output>
    );
  }

  if (mode === "edit" && !existingProject) {
    return (
      <div className={styles.editorWrapper}>
        <div className={styles.notFoundCard}>
          <h1 className={styles.notFoundTitle}>
            Không tìm thấy hồ sơ dự án ({projectId})
          </h1>
          <p className={styles.notFoundDesc}>
            Dự án bạn yêu cầu chỉnh sửa không tồn tại hoặc đã bị xóa khỏi danh
            mục quản trị.
          </p>
          <Link href="/admin/projects" className={styles.publishBtn}>
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Quay lại Danh mục dự án</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasValidationErrors = Object.keys(errors).length > 0;

  return (
    <form
      ref={topRef}
      className={styles.editorWrapper}
      onSubmit={(e) => {
        e.preventDefault();
        submitWithTargetStatus(form.getValues("status"));
      }}
      noValidate
    >
      {/* Top Page Header & Actions */}
      <header className={styles.topBar}>
        <div className={styles.headerMeta}>
          <div className={styles.breadcrumbRow}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/admin/dashboard" className={styles.breadcrumbLink}>
                Bảng điều khiển
              </Link>
              <ChevronRight size={13} aria-hidden="true" />
              <Link href="/admin/projects" className={styles.breadcrumbLink}>
                Quản lý dự án
              </Link>
              <ChevronRight size={13} aria-hidden="true" />
              <span className={styles.breadcrumbCurrent}>
                {mode === "create" ? "Tạo mới" : "Biên tập hồ sơ"}
              </span>
            </nav>

            <span className={styles.dirtyChip}>
              <span className={styles.dirtyDot} aria-hidden="true" />
              <span>
                {isDirty ? "Đang có thay đổi chưa lưu" : "Hồ sơ đã đồng bộ"}
              </span>
            </span>
          </div>

          <h1 className={styles.pageTitle}>
            {mode === "create"
              ? "Khởi Tạo Hồ Sơ Dự Án Kiến Trúc"
              : `Biên Tập: ${existingProject?.title ?? ""}`}
          </h1>
          <p className={styles.pageSubtitle}>
            Đồng bộ trọn vẹn thông số kỹ thuật, thuyết minh giải pháp, thư viện
            phối cảnh, sơ đồ mặt bằng và nhật ký công trường hiển thị ngoài
            trang Chi tiết dự án.
          </p>
        </div>

        <div className={styles.actionGroup}>
          <Button href="/admin/projects" variant="ghost" size="sm">
            Hủy bỏ
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={busy}
            onClick={() => submitWithTargetStatus("draft")}
            leftIcon={
              busy ? (
                <Spinner width={15} height={15} />
              ) : (
                <Bookmark size={15} aria-hidden="true" />
              )
            }
          >
            {busy ? "Đang lưu..." : "Lưu bản nháp"}
          </Button>

          <Button
            type="button"
            variant="dark"
            size="sm"
            disabled={busy}
            onClick={() => submitWithTargetStatus("published")}
            leftIcon={
              busy ? (
                <Spinner width={15} height={15} />
              ) : (
                <CheckCircle2 size={15} aria-hidden="true" />
              )
            }
          >
            {busy
              ? "Đang xử lý..."
              : mode === "create"
                ? "Xuất bản dự án"
                : "Cập nhật & Xuất bản"}
          </Button>
        </div>
      </header>

      {/* Validation Error Summary */}
      {(formBannerError || hasValidationErrors) && (
        <div className={styles.validationBanner} role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>
            {formBannerError ??
              "Một số thông tin kỹ thuật chưa hợp lệ. Vui lòng rà soát các mục báo đỏ bên dưới."}
          </span>
        </div>
      )}

      {/* Main 2-Column Workspace */}
      <div className={styles.workspaceGrid}>
        <div className={styles.mainColumn}>
          <ProjectBasicSection
            form={form}
            isCreateMode={mode === "create"}
            slugManuallyEdited={slugManuallyEdited}
            onMarkSlugManual={() => setSlugManuallyEdited(true)}
          />

          <ProjectSpecsSection form={form} />

          <ProjectGalleryBuilder form={form} />

          <ProjectFloorPlansBuilder form={form} />

          <ProjectMilestonesBuilder form={form} />
        </div>

        <ProjectPublishSidebar form={form} />
      </div>

      {/* Bottom Sticky Quick-Action Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomStatus}>
          <Clock size={15} aria-hidden="true" />
          <span>
            Chế độ biên tập:{" "}
            <strong>
              {mode === "create"
                ? "Khởi tạo hồ sơ mới"
                : `Mã hồ sơ ${existingProject?.id.toUpperCase()}`}
            </strong>
          </span>
        </div>

        <div className={styles.actionGroup}>
          <Button href="/admin/projects" variant="ghost" size="sm">
            Hủy thay đổi
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={busy}
            onClick={() => submitWithTargetStatus("draft")}
            leftIcon={
              busy ? (
                <Spinner width={15} height={15} />
              ) : (
                <Bookmark size={15} aria-hidden="true" />
              )
            }
          >
            {busy ? "Đang lưu..." : "Lưu bản nháp"}
          </Button>

          <Button
            type="button"
            variant="dark"
            size="sm"
            disabled={busy}
            onClick={() => submitWithTargetStatus("published")}
            leftIcon={
              busy ? (
                <Spinner width={15} height={15} />
              ) : (
                <CheckCircle2 size={15} aria-hidden="true" />
              )
            }
          >
            {busy
              ? "Đang xử lý..."
              : mode === "create"
                ? "Xuất bản dự án"
                : "Lưu cập nhật"}
          </Button>
        </div>
      </div>
    </form>
  );
};
