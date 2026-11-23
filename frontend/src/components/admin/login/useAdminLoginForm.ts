"use client";

import { toast } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthLogin } from "@hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const adminLoginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, "Vui lòng nhập tên đăng nhập hoặc email công vụ."),
  password: z.string().min(6, "Mật khẩu ủy quyền phải có ít nhất 6 ký tự."),
  rememberDevice: z.boolean(),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export function useAdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotHint, setForgotHint] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberDevice: true,
    },
  });

  const { loginMutation, isPending } = useAuthLogin({
    successCb: () => {
      toast.success("Đăng nhập thành công", {
        description: "Chào mừng bạn quay trở lại hệ thống quản trị AXHOME.",
      });
      router.push("/admin/dashboard");
    },
    errorCb: (err) => {
      const message =
        err.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra thông tin xác thực.";
      setAuthError(message);
      toast.error("Đăng nhập thất bại", { description: message });
    },
  });

  const onSubmit = (values: AdminLoginFormValues) => {
    setAuthError(null);
    loginMutation.mutate({
      email: values.identifier,
      password: values.password,
    });
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const showForgotPasswordHint = () =>
    setForgotHint(
      "Vui lòng liên hệ Quản trị viên hệ thống để cấp lại mật khẩu ủy quyền.",
    );

  return {
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting || isPending,
    showPassword,
    forgotHint,
    authError,
    handleFormSubmit: form.handleSubmit(onSubmit),
    toggleShowPassword,
    showForgotPasswordHint,
  };
}
