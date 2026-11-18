"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@components";
import { CONTACT_FORM_COPY } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ConsultationLead, ConsultationServiceType } from "@shared-types";
import { Plus } from "lucide-react";
import type React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./AddLeadModal.module.scss";

const addLeadSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên khách hàng."),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại.")
    .regex(/^(\+?84|0)[0-9]{8,10}$/, "Số điện thoại chưa đúng định dạng."),
  email: z
    .string()
    .trim()
    .email("Email chưa đúng định dạng.")
    .or(z.literal("")),
  serviceType: z.enum(["design", "construction", "full_package"]),
  serviceLabel: z.string().trim().min(1, "Vui lòng nhập nhu cầu tư vấn."),
  landSize: z.string().trim().min(1, "Vui lòng nhập quy mô / diện tích."),
  location: z.string().trim().min(1, "Vui lòng nhập địa điểm xây dựng."),
  estimatedBudget: z.string().optional(),
  message: z.string().trim().max(500, "Ghi chú tối đa 500 ký tự.").optional(),
});

type AddLeadFormValues = z.infer<typeof addLeadSchema>;

const UNASSIGNED_BUDGET = "__unassigned__";

export interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateLead: (lead: ConsultationLead) => void;
  nextSequenceNumber: number;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({
  isOpen,
  onClose,
  onCreateLead,
  nextSequenceNumber,
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddLeadFormValues>({
    resolver: zodResolver(addLeadSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      serviceType: "full_package",
      serviceLabel: "Thi công biệt thự trọn gói",
      landSize: "",
      location: "",
      estimatedBudget: "",
      message: "",
    },
  });

  const onSubmit = (values: AddLeadFormValues) => {
    const newLead: ConsultationLead = {
      id: `lead-${Date.now()}`,
      code: `CS-2024-${String(nextSequenceNumber).padStart(2, "0")}`,
      fullName: values.fullName,
      phone: values.phone,
      email: values.email || undefined,
      serviceType: values.serviceType as ConsultationServiceType,
      serviceLabel: values.serviceLabel,
      estimatedBudget:
        values.estimatedBudget && values.estimatedBudget !== UNASSIGNED_BUDGET
          ? values.estimatedBudget
          : undefined,
      landSize: values.landSize,
      location: values.location,
      message: values.message || "Tiếp nhận trực tiếp qua Hotline / Zalo.",
      sourcePage: "Hotline / Nhập thủ công",
      leadStatus: "pending",
      createdAt: new Date().toISOString(),
      relativeTime: "Vừa xong",
    };

    onCreateLead(newLead);
    reset();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <p className={styles.eyebrow}>TIẾP NHẬN THỦ CÔNG (HOTLINE / ZALO)</p>
          <DialogTitle>Thêm Yêu Cầu Tư Vấn Mới</DialogTitle>
        </DialogHeader>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="manual-fullName">
                Họ và tên khách hàng <span className={styles.required}>*</span>
              </Label>
              <Input
                id="manual-fullName"
                type="text"
                placeholder="VD: Nguyễn Văn A"
                invalid={Boolean(errors.fullName)}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className={styles.errorText}>{errors.fullName.message}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="manual-phone">
                Số điện thoại <span className={styles.required}>*</span>
              </Label>
              <Input
                id="manual-phone"
                type="tel"
                placeholder="VD: 0947712626"
                invalid={Boolean(errors.phone)}
                {...register("phone")}
              />
              {errors.phone && (
                <p className={styles.errorText}>{errors.phone.message}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="manual-email">Email (nếu có)</Label>
              <Input
                id="manual-email"
                type="email"
                placeholder="VD: khachhang@gmail.com"
                invalid={Boolean(errors.email)}
                {...register("email")}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="manual-serviceType">
                Nhóm dịch vụ <span className={styles.required}>*</span>
              </Label>
              <Controller
                name="serviceType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="manual-serviceType">
                      <SelectValue placeholder="Chọn nhóm dịch vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Thiết kế kiến trúc</SelectItem>
                      <SelectItem value="construction">
                        Thi công xây dựng
                      </SelectItem>
                      <SelectItem value="full_package">
                        Thi công trọn gói
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className={styles.fieldFull}>
              <Label htmlFor="manual-serviceLabel">
                Nhu cầu cụ thể <span className={styles.required}>*</span>
              </Label>
              <Input
                id="manual-serviceLabel"
                type="text"
                placeholder="VD: Thiết kế & thi công biệt thự 3 tầng"
                invalid={Boolean(errors.serviceLabel)}
                {...register("serviceLabel")}
              />
              {errors.serviceLabel && (
                <p className={styles.errorText}>
                  {errors.serviceLabel.message}
                </p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="manual-landSize">
                Quy mô / Diện tích <span className={styles.required}>*</span>
              </Label>
              <Input
                id="manual-landSize"
                type="text"
                placeholder="VD: 250 m²"
                invalid={Boolean(errors.landSize)}
                {...register("landSize")}
              />
              {errors.landSize && (
                <p className={styles.errorText}>{errors.landSize.message}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="manual-budget">Ngân sách dự kiến</Label>
              <Controller
                name="estimatedBudget"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || UNASSIGNED_BUDGET}
                    onValueChange={(val) =>
                      field.onChange(val === UNASSIGNED_BUDGET ? "" : val)
                    }
                  >
                    <SelectTrigger id="manual-budget">
                      <SelectValue placeholder="-- Chưa xác định --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UNASSIGNED_BUDGET}>
                        -- Chưa xác định --
                      </SelectItem>
                      {CONTACT_FORM_COPY.budgetOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className={styles.fieldFull}>
              <Label htmlFor="manual-location">
                Địa điểm xây dựng <span className={styles.required}>*</span>
              </Label>
              <Input
                id="manual-location"
                type="text"
                placeholder="VD: Khu đô thị Văn Quán, Hà Đông, Hà Nội"
                invalid={Boolean(errors.location)}
                {...register("location")}
              />
              {errors.location && (
                <p className={styles.errorText}>{errors.location.message}</p>
              )}
            </div>

            <div className={styles.fieldFull}>
              <Label htmlFor="manual-message">Ghi chú yêu cầu ban đầu</Label>
              <Textarea
                id="manual-message"
                rows={3}
                placeholder="Thông tin trao đổi sơ bộ với khách hàng..."
                invalid={Boolean(errors.message)}
                {...register("message")}
              />
              {errors.message && (
                <p className={styles.errorText}>{errors.message.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className={styles.modalFooter}>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Huỷ bỏ
            </Button>
            <Button
              type="submit"
              variant="dark"
              size="sm"
              disabled={isSubmitting}
              leftIcon={<Plus size={15} aria-hidden="true" />}
            >
              Thêm Yêu Cầu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
