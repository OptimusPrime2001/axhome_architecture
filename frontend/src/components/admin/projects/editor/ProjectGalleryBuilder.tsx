"use client";

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import { uploadProjectImage } from "@lib/media-upload";
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Link2,
  Star,
  Trash2,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useRef, useState } from "react";
import { Controller, type UseFormReturn, useFieldArray } from "react-hook-form";
import sharedStyles from "./EditorShared.module.scss";
import styles from "./ProjectGalleryBuilder.module.scss";
import {
  type ProjectEditorFormValues,
  SPACE_CATEGORY_OPTIONS,
} from "./project-editor.schema";

export interface ProjectGalleryBuilderProps {
  form: UseFormReturn<ProjectEditorFormValues>;
}

export const ProjectGalleryBuilder: React.FC<ProjectGalleryBuilderProps> = ({
  form,
}) => {
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

  return (
    <section
      className={sharedStyles.sectionCard}
      aria-labelledby="editor-media-heading"
    >
      <div className={sharedStyles.sectionHeader}>
        <div className={sharedStyles.sectionTitleGroup}>
          <span className={sharedStyles.sectionIcon} aria-hidden="true">
            <ImagePlus size={18} />
          </span>
          <div>
            <p className={sharedStyles.sectionEyebrow}>KHỐI THÔNG TIN 03</p>
            <h2 id="editor-media-heading" className={sharedStyles.sectionTitle}>
              Ảnh đại diện & Thư viện không gian
            </h2>
          </div>
        </div>
        <span className={sharedStyles.sectionBadge}>CLOUDFLARE R2 READY</span>
      </div>

      {uploadError && <p className={styles.uploadError}>{uploadError}</p>}

      {/* 1. Hero Cover Image */}
      <div className={styles.subSection}>
        <div className={styles.subHeader}>
          <span className={styles.subLabel}>
            ẢNH ĐẠI DIỆN CHÍNH (HERO COVER — TỶ LỆ 16:9) *
          </span>
          <span className={styles.formatHint}>
            JPG, PNG, WEBP • TỐI ĐA 15MB
          </span>
        </div>

        <input
          ref={coverInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className={styles.hiddenFileInput}
          onChange={(e) => {
            void handleCoverFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {coverImage ? (
          <div className={styles.coverPreviewBox}>
            <Image
              src={coverImage}
              alt="Ảnh đại diện dự án"
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className={styles.coverPreviewImg}
              unoptimized
            />
            <span className={styles.coverBadge}>
              <Star size={12} fill="currentColor" aria-hidden="true" />
              <span>ẢNH BÌA HIỆN HÀNH</span>
            </span>

            <div className={styles.coverOverlayActions}>
              <button
                type="button"
                className={styles.coverActionBtn}
                onClick={() => coverInputRef.current?.click()}
              >
                Đổi tệp ảnh
              </button>
              <button
                type="button"
                className={styles.coverActionBtn}
                onClick={() =>
                  setValue("coverImage", "", {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              >
                Gỡ ảnh
              </button>
            </div>
          </div>
        ) : (
          // biome-ignore lint/a11y/useSemanticElements: Drag-and-drop dropzone container
          <div
            role="button"
            tabIndex={0}
            onClick={() => coverInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                coverInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingCover(true);
            }}
            onDragLeave={() => setIsDraggingCover(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingCover(false);
              void handleCoverFiles(e.dataTransfer.files);
            }}
            className={`${styles.dropzone} ${isDraggingCover ? styles.dropzoneDragging : ""}`}
          >
            <span className={styles.uploadIconCircle} aria-hidden="true">
              <UploadCloud size={20} />
            </span>
            <p className={styles.dropzoneTitle}>
              {isUploading ? (
                "Đang xử lý tệp hình ảnh..."
              ) : (
                <>
                  Kéo và thả ảnh đại diện chính vào đây, hoặc{" "}
                  <span>nhấn để chọn tệp</span>
                </>
              )}
            </p>
            <p className={styles.dropzoneSub}>
              Khuyến nghị độ phân giải từ 1920 × 1080 px để hiển thị sắc nét
              trên khu vực Hero trang Chi tiết.
            </p>
          </div>
        )}

        <div className={styles.urlAddRow}>
          <input
            type="url"
            value={coverUrlDraft}
            onChange={(e) => setCoverUrlDraft(e.target.value)}
            placeholder="Hoặc dán trực tiếp URL ảnh đại diện (https://...)"
            className={styles.urlInput}
          />
          <button
            type="button"
            onClick={handleApplyCoverUrl}
            className={styles.urlAddBtn}
          >
            <Link2 size={14} aria-hidden="true" />
            <span>Áp dụng URL bìa</span>
          </button>
        </div>

        {errors.coverImage && (
          <p className={sharedStyles.errorText}>{errors.coverImage.message}</p>
        )}
      </div>

      {/* 2. Multi-View Space Gallery */}
      <div className={`${styles.subSection} ${styles.divider}`}>
        <div className={styles.subHeader}>
          <span className={styles.subLabel}>
            BỘ SƯU TẬP PHỐI CẢNH & KHÔNG GIAN ({galleryFields.length} GÓC NHÌN)
          </span>
          <span className={styles.formatHint}>
            Tự động phân tab lọc ngoài trang Chi tiết theo Phân khu không gian
          </span>
        </div>

        <input
          ref={galleryInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className={styles.hiddenFileInput}
          onChange={(e) => {
            void handleGalleryFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {/* biome-ignore lint/a11y/useSemanticElements: Drag-and-drop multi-file dropzone */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => galleryInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              galleryInputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingGallery(true);
          }}
          onDragLeave={() => setIsDraggingGallery(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingGallery(false);
            void handleGalleryFiles(e.dataTransfer.files);
          }}
          className={`${styles.dropzone} ${isDraggingGallery ? styles.dropzoneDragging : ""}`}
        >
          <span className={styles.uploadIconCircle} aria-hidden="true">
            <UploadCloud size={20} />
          </span>
          <p className={styles.dropzoneTitle}>
            Kéo thả nhiều ảnh góc nhìn vào đây, hoặc{" "}
            <span>chọn từ máy tính</span>
          </p>
          <p className={styles.dropzoneSub}>
            Chọn từ 2 phân khu trở lên (VD: Ngoại thất ban ngày, Phòng khách, Hồ
            bơi...) để kích hoạt thanh lọc góc nhìn trên trang Chi tiết.
          </p>
        </div>

        <div className={styles.urlAddRow}>
          <input
            type="url"
            value={galleryUrlDraft}
            onChange={(e) => setGalleryUrlDraft(e.target.value)}
            placeholder="Thêm nhanh góc nhìn bằng đường dẫn URL ảnh (https://...)"
            className={styles.urlInput}
          />
          <button
            type="button"
            onClick={handleAddGalleryUrl}
            className={styles.urlAddBtn}
          >
            <ImagePlus size={14} aria-hidden="true" />
            <span>+ Thêm vào thư viện</span>
          </button>
        </div>

        {galleryFields.length > 0 && (
          <div className={styles.galleryGrid}>
            {galleryFields.map((field, index) => {
              const currentUrl = galleryValues[index]?.url || field.url;
              const isCurrentCover = coverImage === currentUrl;

              return (
                <div key={field.id} className={styles.galleryCard}>
                  <div className={styles.galleryThumb}>
                    {currentUrl && (
                      <Image
                        src={currentUrl}
                        alt={
                          galleryValues[index]?.caption ||
                          `Góc nhìn ${index + 1}`
                        }
                        fill
                        sizes="360px"
                        className={styles.galleryThumbImg}
                        unoptimized
                      />
                    )}

                    <div className={styles.galleryTopBar}>
                      {isCurrentCover && (
                        <span className={styles.coverPill}>ẢNH ĐẠI DIỆN</span>
                      )}

                      <div className={styles.thumbIconGroup}>
                        <button
                          type="button"
                          onClick={() => handleSetAsCover(index)}
                          className={styles.thumbIconBtn}
                          title="Đặt làm ảnh đại diện chính"
                          aria-label="Đặt làm ảnh đại diện"
                        >
                          <Star
                            size={13}
                            fill={isCurrentCover ? "#c78a26" : "none"}
                          />
                        </button>

                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => moveGallery(index, index - 1)}
                          className={styles.thumbIconBtn}
                          title="Chuyển lên trước"
                          aria-label="Chuyển ảnh lên trước"
                        >
                          <ArrowUp size={13} />
                        </button>

                        <button
                          type="button"
                          disabled={index === galleryFields.length - 1}
                          onClick={() => moveGallery(index, index + 1)}
                          className={styles.thumbIconBtn}
                          title="Chuyển xuống sau"
                          aria-label="Chuyển ảnh xuống sau"
                        >
                          <ArrowDown size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeGallery(index)}
                          className={`${styles.thumbIconBtn} ${styles.thumbIconDanger}`}
                          title="Xóa góc nhìn này"
                          aria-label="Xóa ảnh khỏi thư viện"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.galleryMetaBody}>
                    <div className={styles.gallerySelectRow}>
                      <Controller
                        name={`gallery.${index}.spaceCategory`}
                        control={control}
                        render={({ field: selectField }) => (
                          <Select
                            value={selectField.value ?? "exterior_day"}
                            onValueChange={selectField.onChange}
                          >
                            <SelectTrigger aria-label="Phân khu không gian">
                              <SelectValue placeholder="Phân khu" />
                            </SelectTrigger>
                            <SelectContent>
                              {SPACE_CATEGORY_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />

                      <Controller
                        name={`gallery.${index}.type`}
                        control={control}
                        render={({ field: selectField }) => (
                          <Select
                            value={selectField.value}
                            onValueChange={selectField.onChange}
                          >
                            <SelectTrigger aria-label="Loại hình ảnh">
                              <SelectValue placeholder="Loại ảnh" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="render_3d">
                                3D Render
                              </SelectItem>
                              <SelectItem value="real_photo">
                                Ảnh thực tế
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <Input
                      type="text"
                      placeholder="Nhập chú thích góc nhìn..."
                      invalid={Boolean(errors.gallery?.[index]?.caption)}
                      {...register(`gallery.${index}.caption`)}
                    />
                    {errors.gallery?.[index]?.caption && (
                      <p className={sharedStyles.errorText}>
                        {errors.gallery[index]?.caption?.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
