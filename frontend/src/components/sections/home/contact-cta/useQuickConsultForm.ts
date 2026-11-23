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

const contactFormSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên."),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại.")
    .regex(/^(\+?84|0)[0-9]{8,10}$/, "Số điện thoại chưa đúng định dạng."),
  location: z.string().trim().min(1, "Vui lòng nhập địa điểm dự án."),
  projectNeed: z.string().min(1, "Vui lòng chọn nhu cầu dự án."),
  notes: z.string().trim().max(500, "Ghi chú tối đa 500 ký tự.").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const DEFAULT_VALUES: ContactFormValues = {
  fullName: "",
  phone: "",
  location: "",
  projectNeed: "",
  notes: "",
};

type SubmitState = "idle" | "submitted" | "awaiting-contract";

function mapNeedToServiceType(need: string): ConsultationServiceType {
  const normalized = need.toLowerCase();
  if (normalized.includes("thiết kế")) return CONSULTATION_SERVICE_TYPES.DESIGN;
  if (normalized.includes("trọn gói"))
    return CONSULTATION_SERVICE_TYPES.FULL_PACKAGE;
  if (normalized.includes("thi công"))
    return CONSULTATION_SERVICE_TYPES.CONSTRUCTION;
  return CONSULTATION_SERVICE_TYPES.FULL_PACKAGE;
}

export function useQuickConsultForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const { submitLeadMutation, isPending } = useSubmitConsultationLead({
    successCb: (saved) => {
      trackGenerateLead({
        sourcePage: "/",
        serviceType: saved.serviceType,
      });
      form.reset();
      setSubmitState("submitted");
      toast.success("Gửi yêu cầu thành công", {
        description:
          "Cảm ơn Quý khách! KTS Axhome sẽ liên hệ tư vấn trong thời gian sớm nhất.",
      });
    },
    errorCb: (err) => {
      const msg =
        err.message || "Không thể gửi yêu cầu tư vấn. Vui lòng thử lại.";
      toast.error("Gửi yêu cầu thất bại", { description: msg });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitLeadMutation.mutate({
      fullName: data.fullName,
      phone: data.phone,
      location: data.location,
      serviceType: mapNeedToServiceType(data.projectNeed),
      message: [data.projectNeed, data.notes?.trim()]
        .filter(Boolean)
        .join(" — "),
      sourcePage: "/",
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
