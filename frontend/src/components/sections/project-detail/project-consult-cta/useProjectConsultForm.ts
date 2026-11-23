"use client";

import { toast } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitConsultationLead } from "@hooks";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const projectConsultSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên."),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại.")
    .regex(/^(\+?84|0)[0-9]{8,10}$/, "Số điện thoại chưa đúng định dạng."),
  landSize: z.string().trim().min(1, "Vui lòng nhập kích thước khu đất."),
  expectedStart: z.string().trim().optional(),
  notes: z.string().trim().max(500, "Ghi chú tối đa 500 ký tự.").optional(),
});

export type ProjectConsultFormValues = z.infer<typeof projectConsultSchema>;

type SubmitState = "idle" | "submitted" | "awaiting-contract";

export function useProjectConsultForm(projectTitle: string) {
  const pathname = usePathname();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const form = useForm<ProjectConsultFormValues>({
    resolver: zodResolver(projectConsultSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      landSize: "",
      expectedStart: "",
      notes: "",
    },
    mode: "onSubmit",
  });

  const { submitLeadMutation, isPending } = useSubmitConsultationLead({
    successCb: () => {
      form.reset();
      setSubmitState("submitted");
      toast.success("Gửi yêu cầu thành công", {
        description: `Đã gửi yêu cầu tư vấn cho phương án "${projectTitle}".`,
      });
    },
    errorCb: (err) => {
      const msg =
        err.message || "Không thể gửi yêu cầu tư vấn. Vui lòng thử lại.";
      toast.error("Gửi yêu cầu thất bại", { description: msg });
    },
  });

  const onSubmit = (data: ProjectConsultFormValues) => {
    const details = [
      data.expectedStart?.trim()
        ? `Dự kiến khởi công: ${data.expectedStart.trim()}`
        : "",
      data.notes?.trim() || "",
    ]
      .filter(Boolean)
      .join(" | ");

    submitLeadMutation.mutate({
      fullName: data.fullName,
      phone: data.phone,
      landSize: data.landSize,
      serviceType: "full_package",
      message:
        details || `Quan tâm tư vấn phương án tham chiếu: ${projectTitle}`,
      sourcePage: pathname || "/projects",
      referencedProjectTitle: projectTitle,
    });
  };

  return {
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting || isPending,
    submitState,
    handleFormSubmit: form.handleSubmit(onSubmit),
  };
}
