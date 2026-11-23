"use client";

import { toast } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAdminProjectDetail,
  useAdminProjects,
  useCreateAdminProject,
  useUpdateAdminProject,
} from "@hooks";
import { useAdminProjectsStore } from "@store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  formValuesToProject,
  getDefaultEditorValues,
  type ProjectEditorFormValues,
  projectEditorSchema,
  projectToFormValues,
} from "./project-editor.schema";

export interface UseProjectEditorParams {
  mode: "create" | "edit";
  projectId?: string;
}

export function useProjectEditor({ mode, projectId }: UseProjectEditorParams) {
  const router = useRouter();
  const topRef = useRef<HTMLFormElement>(null);

  const setLastActionNotice = useAdminProjectsStore(
    (state) => state.setLastActionNotice,
  );

  const { data: projectsData } = useAdminProjects({ params: { limit: 100 } });
  const projects = projectsData?.items ?? [];

  const cachedProject = useMemo(
    () =>
      mode === "edit" && projectId
        ? projects.find((p) => p.id === projectId)
        : undefined,
    [mode, projectId, projects],
  );

  const detailQuery = useAdminProjectDetail(projectId, {
    enabled: mode === "edit" && Boolean(projectId) && !cachedProject,
  });

  const existingProject = cachedProject ?? detailQuery.data;
  const isLoadingDetail =
    mode === "edit" &&
    Boolean(projectId) &&
    !cachedProject &&
    detailQuery.isLoading;

  const { createProjectMutation, isPending: isCreating } =
    useCreateAdminProject();
  const { updateProjectMutation, isPending: isUpdating } =
    useUpdateAdminProject();

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

  const busy = isSubmitting || isCreating || isUpdating;

  const submitWithTargetStatus = (targetStatus: "draft" | "published") => {
    setFormBannerError(null);
    setValue("status", targetStatus, { shouldDirty: true });

    void handleSubmit(
      async (values) => {
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
          toast.error("Không thể lưu", {
            description: "Đường dẫn tĩnh (Slug) bị trùng lặp.",
          });
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

        try {
          if (mode === "edit" && existingProject) {
            await updateProjectMutation.mutateAsync({
              id: existingProject.id,
              project: finalPayload,
            });
            const msg =
              targetStatus === "published"
                ? `Đã cập nhật và xuất bản hồ sơ "${finalPayload.title}".`
                : `Đã lưu bản nháp hồ sơ "${finalPayload.title}".`;
            setLastActionNotice(msg);
            toast.success("Cập nhật dự án thành công", { description: msg });
          } else {
            await createProjectMutation.mutateAsync(finalPayload);
            const msg =
              targetStatus === "published"
                ? `Đã khởi tạo và xuất bản dự án mới "${finalPayload.title}".`
                : `Đã lưu dự án mới "${finalPayload.title}" vào Bản nháp.`;
            setLastActionNotice(msg);
            toast.success("Tạo dự án thành công", { description: msg });
          }

          router.push("/admin/projects");
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : "Không thể lưu hồ sơ dự án. Vui lòng thử lại.";
          setFormBannerError(message);
          toast.error("Lưu dự án thất bại", { description: message });
          topRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      },
      () => {
        setFormBannerError(
          "Vui lòng kiểm tra lại các trường bắt buộc được đánh dấu đỏ bên dưới trước khi lưu.",
        );
        toast.error("Dữ liệu chưa hợp lệ", {
          description: "Vui lòng hoàn thiện các thông tin bắt buộc còn thiếu.",
        });
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    )();
  };

  return {
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
  };
}
