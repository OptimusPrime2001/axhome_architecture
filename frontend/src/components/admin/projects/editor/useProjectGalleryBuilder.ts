"use client";

import { useDeleteMedia, useUploadMedia } from "@hooks";
import { validateImageFile } from "@lib";
import { useRef, useState } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import type { ProjectEditorFormValues } from "./project-editor.schema";

export function useProjectGalleryBuilder(
  form: UseFormReturn<ProjectEditorFormValues>,
) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const {
    fields: galleryFields,
    append: appendGallery,
    remove: removeGallery,
    move: moveGallery,
  } = useFieldArray({
    control,
    name: "gallery",
  });

  const coverImage = watch("coverImage");
  const projectType = watch("projectType");
  const galleryValues = watch("gallery");

  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const sessionUploadedUrlsRef = useRef<Set<string>>(new Set());

  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [coverUrlDraft, setCoverUrlDraft] = useState("");
  const [galleryUrlDraft, setGalleryUrlDraft] = useState("");

  const { uploadMediaMutation } = useUploadMedia();
  const { deleteMediaMutation } = useDeleteMedia();

  const defaultImageType =
    projectType === "concept" ? "render_3d" : "real_photo";

  const deleteIfSessionUploaded = (
    urlToCheck: string | undefined,
    remainingUrls: string[],
  ) => {
    const trimmed = (urlToCheck ?? "").trim();
    if (!trimmed || !sessionUploadedUrlsRef.current.has(trimmed)) {
      return;
    }
    if (remainingUrls.includes(trimmed)) {
      return;
    }
    sessionUploadedUrlsRef.current.delete(trimmed);
    deleteMediaMutation.mutate({ url: trimmed });
  };

  const handleCoverFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];
    const validationError = validateImageFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const previousCover = watch("coverImage");
      const uploaded = await uploadMediaMutation.mutateAsync({
        file,
        category: "cover",
      });
      if (!uploaded?.url) {
        throw new Error(
          "Phản hồi từ máy chủ lưu trữ không chứa đường dẫn ảnh.",
        );
      }

      sessionUploadedUrlsRef.current.add(uploaded.url);
      setValue("coverImage", uploaded.url, {
        shouldDirty: true,
        shouldValidate: true,
      });

      const currentGalleryUrls = (watch("gallery") ?? []).map((g) => g.url);
      deleteIfSessionUploaded(previousCover, [
        uploaded.url,
        ...currentGalleryUrls,
      ]);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Không thể tải ảnh đại diện.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploadError(null);
    setIsUploading(true);

    try {
      const files = Array.from(fileList);
      for (const file of files) {
        const validationError = validateImageFile(file);
        if (validationError) {
          throw new Error(validationError);
        }

        const uploaded = await uploadMediaMutation.mutateAsync({
          file,
          category: "gallery",
        });
        if (!uploaded?.url) {
          throw new Error(
            "Phản hồi từ máy chủ lưu trữ không chứa đường dẫn ảnh.",
          );
        }

        sessionUploadedUrlsRef.current.add(uploaded.url);
        const baseCaption = file.name.replace(/\.[^/.]+$/, "");
        appendGallery({
          id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          url: uploaded.url,
          caption: baseCaption || "Góc nhìn phối cảnh kiến trúc",
          type: defaultImageType,
          spaceCategory: "exterior_day",
          isCover: false,
        });

        if (!watch("coverImage")) {
          setValue("coverImage", uploaded.url, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }
      }
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Không thể tải ảnh thư viện.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveCover = () => {
    const previousCover = watch("coverImage");
    setValue("coverImage", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    const currentGalleryUrls = (watch("gallery") ?? []).map((g) => g.url);
    deleteIfSessionUploaded(previousCover, currentGalleryUrls);
  };

  const handleRemoveGalleryItem = (index: number) => {
    const removedUrl = galleryValues[index]?.url;
    removeGallery(index);

    const remainingUrls = [
      watch("coverImage") ?? "",
      ...galleryValues.filter((_, idx) => idx !== index).map((g) => g.url),
    ];
    deleteIfSessionUploaded(removedUrl, remainingUrls);
  };

  const handleApplyCoverUrl = () => {
    const trimmed = coverUrlDraft.trim();
    if (!trimmed) return;
    const previousCover = watch("coverImage");
    setValue("coverImage", trimmed, {
      shouldDirty: true,
      shouldValidate: true,
    });
    const currentGalleryUrls = (watch("gallery") ?? []).map((g) => g.url);
    deleteIfSessionUploaded(previousCover, [trimmed, ...currentGalleryUrls]);
    setCoverUrlDraft("");
  };

  const handleAddGalleryUrl = () => {
    const trimmed = galleryUrlDraft.trim();
    if (!trimmed) return;
    appendGallery({
      id: `img-${Date.now()}`,
      url: trimmed,
      caption: "Góc nhìn không gian kiến trúc",
      type: defaultImageType,
      spaceCategory: "exterior_day",
      isCover: !coverImage,
    });

    if (!coverImage) {
      setValue("coverImage", trimmed, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    setGalleryUrlDraft("");
  };

  const handleSetAsCover = (index: number) => {
    const item = galleryValues[index];
    if (!item?.url) return;

    setValue("coverImage", item.url, {
      shouldDirty: true,
      shouldValidate: true,
    });

    galleryValues.forEach((_, idx) => {
      setValue(`gallery.${idx}.isCover`, idx === index, { shouldDirty: true });
    });
  };

  return {
    register,
    control,
    setValue,
    errors,
    galleryFields,
    moveGallery,
    coverImage,
    galleryValues,
    coverInputRef,
    galleryInputRef,
    isDraggingCover,
    setIsDraggingCover,
    isDraggingGallery,
    setIsDraggingGallery,
    isUploading,
    uploadError,
    coverUrlDraft,
    setCoverUrlDraft,
    galleryUrlDraft,
    setGalleryUrlDraft,
    handleCoverFiles,
    handleGalleryFiles,
    handleRemoveCover,
    handleRemoveGalleryItem,
    handleApplyCoverUrl,
    handleAddGalleryUrl,
    handleSetAsCover,
  };
}
