"use client";

import { uploadProjectImage } from "@lib/media-upload";
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

  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [coverUrlDraft, setCoverUrlDraft] = useState("");
  const [galleryUrlDraft, setGalleryUrlDraft] = useState("");

  const defaultImageType =
    projectType === "concept" ? "render_3d" : "real_photo";

  const handleCoverFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploadError(null);
    setIsUploading(true);

    try {
      const uploaded = await uploadProjectImage(fileList[0], "cover");
      setValue("coverImage", uploaded.url, {
        shouldDirty: true,
        shouldValidate: true,
      });
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
        const uploaded = await uploadProjectImage(file, "gallery");
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

  const handleApplyCoverUrl = () => {
    const trimmed = coverUrlDraft.trim();
    if (!trimmed) return;
    setValue("coverImage", trimmed, {
      shouldDirty: true,
      shouldValidate: true,
    });
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
    removeGallery,
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
    handleApplyCoverUrl,
    handleAddGalleryUrl,
    handleSetAsCover,
  };
}
