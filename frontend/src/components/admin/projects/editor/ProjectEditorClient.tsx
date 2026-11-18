"use client";

import { Button } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminProjectsStore } from "@store";
import {
  AlertCircle,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectBasicSection } from "./ProjectBasicSection";
import styles from "./ProjectEditorClient.module.scss";
import { ProjectFloorPlansBuilder } from "./ProjectFloorPlansBuilder";
import { ProjectGalleryBuilder } from "./ProjectGalleryBuilder";
import { ProjectMilestonesBuilder } from "./ProjectMilestonesBuilder";
import { ProjectPublishSidebar } from "./ProjectPublishSidebar";
import { ProjectSpecsSection } from "./ProjectSpecsSection";
import {
  formValuesToProject,
  getDefaultEditorValues,
  type ProjectEditorFormValues,
  projectEditorSchema,
  projectToFormValues,
} from "./project-editor.schema";

export interface ProjectEditorClientProps {
  mode: "create" | "edit";
  projectId?: string;
}

export const ProjectEditorClient: React.FC<ProjectEditorClientProps> = ({
  mode,
  projectId,
}) => {
  const router = useRouter();
  const topRef = useRef<HTMLFormElement>(null);

  const projects = useAdminProjectsStore((state) => state.projects);
  const addProject = useAdminProjectsStore((state) => state.addProject);
  const updateProject = useAdminProjectsStore((state) => state.updateProject);
  const setLastActionNotice = useAdminProjectsStore(
    (state) => state.setLastActionNotice,
  );

  const existingProject = useMemo(
    () =>
      mode === "edit" && projectId
        ? projects.find((p) => p.id === projectId)
        : undefined,
    [mode, projectId, projects],
  );

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === "edit");
  const [formBannerError, setFormBannerError] = useState<string | null>(null);

  const initialValues = useMemo(
    () =>
      existingProject
        ? projectToFormValues(existingProject)
        : getDefaultEditorValues(),
    [existingProject],
  );

  const form = useForm<ProjectEditorFormValues>({
    resolver: zodResolver(projectEditorSchema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { isDirty, isSubmitting, errors },
  } = form;

  useEffect(() => {
    if (existingProject) {
      reset(projectToFormValues(existingProject));
    }
  }, [existingProject, reset]);

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

  const submitWithTargetStatus = (targetStatus: "draft" | "published") => {
    setFormBannerError(null);
    setValue("status", targetStatus, { shouldDirty: true });

    void handleSubmit(
      (values) => {
        const normalizedSlug = values.slug.trim();
        const duplicateSlug = projects.some(
          (p) => p.slug === normalizedSlug && p.id !== existingProject?.id,
        );

        if (duplicateSlug) {
          setError("slug", {
            type: "manual",
            message:
              "Đường dẫn slug này đã được sử dụng bởi một dự án khác. Vui lòng chọn slug khác.",
          });
          setFormBannerError(
            "Đường dẫn tĩnh (Slug) bị trùng lặp với dự án đã tồn tại.",
          );
          topRef.current?.scrollIntoView({ behavior: "smooth" });
          return;
        }

        const nextNumericIndex = projects.length + 1;
        const nextId = `proj-${String(nextNumericIndex).padStart(2, "0")}`;
        const finalPayload = formValuesToProject(
          { ...values, status: targetStatus },
          existingProject,
          nextId,
        );

        if (mode === "edit" && existingProject) {
          updateProject(existingProject.id, finalPayload);
          setLastActionNotice(
            targetStatus === "published"
              ? `Đã cập nhật và xuất bản hồ sơ "${finalPayload.title}".`
              : `Đã lưu bản nháp hồ sơ "${finalPayload.title}".`,
          );
        } else {
          addProject(finalPayload);
          setLastActionNotice(
            targetStatus === "published"
              ? `Đã khởi tạo và xuất bản dự án mới "${finalPayload.title}".`
              : `Đã lưu dự án mới "${finalPayload.title}" vào Bản nháp.`,
          );
        }

        router.push("/admin/projects");
      },
      () => {
        setFormBannerError(
          "Vui lòng kiểm tra lại các trường bắt buộc được đánh dấu đỏ bên dưới trước khi lưu.",
        );
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    )();
  };

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
            disabled={isSubmitting}
            onClick={() => submitWithTargetStatus("draft")}
            leftIcon={<Bookmark size={15} aria-hidden="true" />}
          >
            Lưu bản nháp
          </Button>

          <Button
            type="button"
            variant="dark"
            size="sm"
            disabled={isSubmitting}
            onClick={() => submitWithTargetStatus("published")}
            leftIcon={<CheckCircle2 size={15} aria-hidden="true" />}
          >
            {mode === "create" ? "Xuất bản dự án" : "Cập nhật & Xuất bản"}
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
            disabled={isSubmitting}
            onClick={() => submitWithTargetStatus("draft")}
            leftIcon={<Bookmark size={15} aria-hidden="true" />}
          >
            Lưu bản nháp
          </Button>

          <Button
            type="button"
            variant="dark"
            size="sm"
            disabled={isSubmitting}
            onClick={() => submitWithTargetStatus("published")}
            leftIcon={<CheckCircle2 size={15} aria-hidden="true" />}
          >
            {mode === "create" ? "Xuất bản dự án" : "Lưu cập nhật"}
          </Button>
        </div>
      </div>
    </form>
  );
};
