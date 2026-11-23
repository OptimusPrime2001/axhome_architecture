"use client";

import { toast } from "@components";
import { CONSULTATION_SERVICE_TYPES } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitConsultationLead } from "@hooks";
import type { ConsultationServiceType } from "@shared-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trackGenerateLead } from "../../../../lib/analytics";

const deepConsultSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên."),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại.")
    .regex(/^(\+?84|0)[0-9]{8,10}$/, "Số điện thoại chưa đúng định dạng."),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập địa chỉ email.")
    .email("Địa chỉ email chưa đúng định dạng."),
  serviceType: z.string().min(1, "Vui lòng chọn nhu cầu tư vấn."),
  landArea: z.string().trim().min(1, "Vui lòng nhập diện tích dự kiến."),
  location: z.string().trim().min(1, "Vui lòng nhập địa điểm khu đất / dự án."),
  budget: z.string().optional(),
  notes: z.string().trim().max(1000, "Nội dung tối đa 1.000 ký tự.").optional(),
});

export type DeepConsultFormValues = z.infer<typeof deepConsultSchema>;

const DEFAULT_VALUES: DeepConsultFormValues = {
  fullName: "",
  phone: "",
  email: "",
  serviceType: "",
  landArea: "",
  location: "",
  budget: "",
  notes: "",
};

type SubmitState = "idle" | "submitted" | "awaiting-contract";

function mapOptionToServiceType(option: string): ConsultationServiceType {
  const normalized = option.toLowerCase();
  if (normalized.includes("trọn gói"))
    return CONSULTATION_SERVICE_TYPES.FULL_PACKAGE;
  if (normalized.includes("thiết kế")) return CONSULTATION_SERVICE_TYPES.DESIGN;
  if (normalized.includes("thi công"))
    return CONSULTATION_SERVICE_TYPES.CONSTRUCTION;
  return CONSULTATION_SERVICE_TYPES.FULL_PACKAGE;
}

export function useDeepConsultForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const form = useForm<DeepConsultFormValues>({
    resolver: zodResolver(deepConsultSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const { submitLeadMutation, isPending } = useSubmitConsultationLead({
    successCb: (saved) => {
      trackGenerateLead({
        sourcePage: "/contact",
        serviceType: saved.serviceType,
      });
      form.reset();
      setSubmitState("submitted");
      toast.success("Gửi yêu cầu thành công", {
        description:
          "Hồ sơ yêu cầu tư vấn chuyên sâu của Quý khách đã được ghi nhận.",
      });
    },
    errorCb: (err) => {
      const msg =
        err.message || "Không thể gửi yêu cầu tư vấn. Vui lòng thử lại.";
      toast.error("Gửi yêu cầu thất bại", { description: msg });
    },
  });

  const onSubmit = (data: DeepConsultFormValues) => {
    submitLeadMutation.mutate({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      serviceType: mapOptionToServiceType(data.serviceType),
      estimatedBudget: data.budget || undefined,
      landSize: data.landArea,
      location: data.location,
      message: [data.serviceType, data.notes?.trim()]
        .filter(Boolean)
        .join(" — "),
      sourcePage: "/contact",
    });
  };

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting || isPending,
    submitState,
    handleFormSubmit: form.handleSubmit(onSubmit),
  };
}
