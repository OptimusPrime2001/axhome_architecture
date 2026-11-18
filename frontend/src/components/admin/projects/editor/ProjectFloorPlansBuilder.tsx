"use client";

import { Button, Input, Label, Textarea } from "@components";
import { uploadProjectImage } from "@lib/media-upload";
import {
  ArrowDown,
  ArrowUp,
  Layers,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import sharedStyles from "./EditorShared.module.scss";
import styles from "./ProjectFloorPlansBuilder.module.scss";
import type { ProjectEditorFormValues } from "./project-editor.schema";

export interface ProjectFloorPlansBuilderProps {
  form: UseFormReturn<ProjectEditorFormValues>;
}

export const ProjectFloorPlansBuilder: React.FC<
  ProjectFloorPlansBuilderProps
> = ({ form }) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const {
    fields: planFields,
    append: appendPlan,
    remove: removePlan,
    move: movePlan,
  } = useFieldArray({
    control,
    name: "floorPlans",
  });

  const floorPlansValues = watch("floorPlans");
  const [roomDrafts, setRoomDrafts] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleAddFloorPlan = () => {
    const nextFloorNum = planFields.length + 1;
    appendPlan({
      id: `fp-${Date.now()}`,
      name: `Mặt bằng Tầng ${nextFloorNum}`,
      imageUrl: "",
      areaSquareMeters: 150,
      description: "",
      rooms: [],
    });
  };

  const handleUploadBlueprint = async (
    index: number,
    files: FileList | null,
  ) => {
    if (!files || files.length === 0) return;
    setUploadError(null);
    try {
      const uploaded = await uploadProjectImage(files[0], "floor-plan");
      setValue(`floorPlans.${index}.imageUrl`, uploaded.url, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Không thể tải ảnh bản vẽ.",
      );
    }
  };

  const handleAddRoom = (index: number, fieldKey: string) => {
    const draft = (roomDrafts[fieldKey] ?? "").trim();
    if (!draft) return;

    const existingRooms = floorPlansValues[index]?.rooms ?? [];
    if (!existingRooms.includes(draft)) {
      setValue(`floorPlans.${index}.rooms`, [...existingRooms, draft], {
        shouldDirty: true,
      });
    }
    setRoomDrafts((prev) => ({ ...prev, [fieldKey]: "" }));
  };

  const handleRemoveRoom = (planIndex: number, roomToRemove: string) => {
    const existingRooms = floorPlansValues[planIndex]?.rooms ?? [];
    setValue(
      `floorPlans.${planIndex}.rooms`,
      existingRooms.filter((r) => r !== roomToRemove),
      { shouldDirty: true },
    );
  };

  return (
    <section
      className={sharedStyles.sectionCard}
      aria-labelledby="editor-floorplans-heading"
    >
      <div className={sharedStyles.sectionHeader}>
        <div className={sharedStyles.sectionTitleGroup}>
          <span className={sharedStyles.sectionIcon} aria-hidden="true">
            <Layers size={18} />
          </span>
          <div>
            <p className={sharedStyles.sectionEyebrow}>
              KHỐI THÔNG TIN 04 (TÙY CHỌN)
            </p>
            <h2
              id="editor-floorplans-heading"
              className={sharedStyles.sectionTitle}
            >
              Hồ sơ bản vẽ & Sơ đồ mặt bằng ({planFields.length})
            </h2>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleAddFloorPlan}
          leftIcon={<Plus size={14} aria-hidden="true" />}
        >
          Thêm mặt bằng tầng
        </Button>
      </div>

      {uploadError && <p className={styles.errorBanner}>{uploadError}</p>}

      {planFields.length === 0 ? (
        <div className={styles.emptyNotice}>
          Chưa đính kèm sơ đồ mặt bằng công năng. Khi thêm ít nhất 1 mặt bằng,
          trang Chi tiết dự án sẽ tự động kích hoạt khu vực{" "}
          <strong>Bản vẽ mặt bằng công năng các tầng</strong> kèm phóng to
          Lightbox.
        </div>
      ) : (
        <div className={styles.planList}>
          {planFields.map((field, index) => {
            const currentImg = floorPlansValues[index]?.imageUrl || "";
            const currentRooms = floorPlansValues[index]?.rooms ?? [];

            return (
              <div key={field.id} className={styles.planCard}>
                <div className={styles.planCardHead}>
                  <span className={styles.planBadge}>
                    BẢN VẼ #{String(index + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.planHeadActions}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => movePlan(index, index - 1)}
                      className={styles.iconBtn}
                      title="Đưa lên trên"
                      aria-label="Đưa mặt bằng lên trên"
                    >
                      <ArrowUp size={14} />
                    </button>

                    <button
                      type="button"
                      disabled={index === planFields.length - 1}
                      onClick={() => movePlan(index, index + 1)}
                      className={styles.iconBtn}
                      title="Đưa xuống dưới"
                      aria-label="Đưa mặt bằng xuống dưới"
                    >
                      <ArrowDown size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => removePlan(index)}
                      className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                      title="Xóa mặt bằng này"
                      aria-label="Xóa mặt bằng"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className={styles.planBodyGrid}>
                  {/* Blueprint Image Upload & Preview */}
                  <div className={styles.blueprintCol}>
                    <div className={styles.blueprintFrame}>
                      {currentImg ? (
                        <Image
                          src={currentImg}
                          alt={
                            floorPlansValues[index]?.name ||
                            `Bản vẽ tầng ${index + 1}`
                          }
                          fill
                          sizes="220px"
                          className={styles.blueprintImg}
                          unoptimized
                        />
                      ) : (
                        <div className={styles.blueprintPlaceholder}>
                          <Layers size={20} aria-hidden="true" />
                          <span>Chưa có ảnh bản vẽ 2D/3D</span>
                        </div>
                      )}
                    </div>

                    <label className={styles.uploadMiniBtn}>
                      <Upload size={13} aria-hidden="true" />
                      <span>Tải ảnh bản vẽ</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className={styles.hiddenInput}
                        onChange={(e) => {
                          void handleUploadBlueprint(index, e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>

                  {/* Plan Details */}
                  <div className={styles.fieldsCol}>
                    <div className={sharedStyles.gridTwo}>
                      <div className={sharedStyles.fieldGroup}>
                        <Label
                          htmlFor={`fp-name-${field.id}`}
                          className={sharedStyles.fieldLabel}
                        >
                          TÊN TẦNG / HẠNG MỤC *
                        </Label>
                        <Input
                          id={`fp-name-${field.id}`}
                          type="text"
                          placeholder="VD: Mặt bằng Tầng 1, Mặt bằng Mái..."
                          invalid={Boolean(errors.floorPlans?.[index]?.name)}
                          {...register(`floorPlans.${index}.name`)}
                        />
                        {errors.floorPlans?.[index]?.name && (
                          <p className={sharedStyles.errorText}>
                            {errors.floorPlans[index]?.name?.message}
                          </p>
                        )}
                      </div>

                      <div className={sharedStyles.fieldGroup}>
                        <Label
                          htmlFor={`fp-area-${field.id}`}
                          className={sharedStyles.fieldLabel}
                        >
                          DIỆN TÍCH SÀN TẦNG *
                        </Label>
                        <div className={sharedStyles.unitBox}>
                          <input
                            id={`fp-area-${field.id}`}
                            type="number"
                            min={1}
                            step="any"
                            className={sharedStyles.unitInput}
                            {...register(
                              `floorPlans.${index}.areaSquareMeters`,
                              { valueAsNumber: true },
                            )}
                          />
                          <span className={sharedStyles.unitSuffix}>m²</span>
                        </div>
                        {errors.floorPlans?.[index]?.areaSquareMeters && (
                          <p className={sharedStyles.errorText}>
                            {
                              errors.floorPlans[index]?.areaSquareMeters
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={sharedStyles.fieldGroup}>
                      <Label
                        htmlFor={`fp-url-${field.id}`}
                        className={sharedStyles.fieldLabel}
                      >
                        ĐƯỜNG DẪN ẢNH BẢN VẼ (HOẶC TẢI TỆP BÊN TRÁI) *
                      </Label>
                      <Input
                        id={`fp-url-${field.id}`}
                        type="text"
                        placeholder="https://..."
                        invalid={Boolean(errors.floorPlans?.[index]?.imageUrl)}
                        {...register(`floorPlans.${index}.imageUrl`)}
                      />
                      {errors.floorPlans?.[index]?.imageUrl && (
                        <p className={sharedStyles.errorText}>
                          {errors.floorPlans[index]?.imageUrl?.message}
                        </p>
                      )}
                    </div>

                    <div className={sharedStyles.fieldGroup}>
                      <Label
                        htmlFor={`fp-desc-${field.id}`}
                        className={sharedStyles.fieldLabel}
                      >
                        MÔ TẢ BỐ TRÍ KHÔNG GIAN *
                      </Label>
                      <Textarea
                        id={`fp-desc-${field.id}`}
                        rows={2}
                        placeholder="Mô tả luồng giao thông, hướng đón gió và liên kết các phòng chức năng..."
                        invalid={Boolean(
                          errors.floorPlans?.[index]?.description,
                        )}
                        {...register(`floorPlans.${index}.description`)}
                      />
                      {errors.floorPlans?.[index]?.description && (
                        <p className={sharedStyles.errorText}>
                          {errors.floorPlans[index]?.description?.message}
                        </p>
                      )}
                    </div>

                    {/* Functional Rooms Tag List */}
                    <div className={styles.roomsSection}>
                      <label
                        htmlFor={`fp-room-input-${field.id}`}
                        className={sharedStyles.fieldLabel}
                      >
                        DANH SÁCH PHÒNG CHỨC NĂNG ({currentRooms.length})
                      </label>

                      <div className={styles.roomInputRow}>
                        <input
                          id={`fp-room-input-${field.id}`}
                          type="text"
                          value={roomDrafts[field.id] ?? ""}
                          onChange={(e) =>
                            setRoomDrafts((prev) => ({
                              ...prev,
                              [field.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddRoom(index, field.id);
                            }
                          }}
                          placeholder="Nhập tên không gian rồi nhấn Enter (VD: Phòng khách thông tầng 65m²)"
                          className={sharedStyles.textInput}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddRoom(index, field.id)}
                          className={styles.roomAddBtn}
                        >
                          + Thêm phòng
                        </button>
                      </div>

                      {currentRooms.length > 0 && (
                        <div className={styles.roomChips}>
                          {currentRooms.map((room) => (
                            <span key={room} className={styles.roomChip}>
                              <span>{room}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveRoom(index, room)}
                                className={styles.roomChipRemove}
                                aria-label={`Xóa phòng ${room}`}
                              >
                                <X size={13} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
