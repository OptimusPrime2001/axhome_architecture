"use client";

import { toast } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useChangeAdminPassword,
  useCurrentAdmin,
  useUpdateAdminProfile,
} from "@hooks";
import { buildInitials, mapDtoToProfile } from "@utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Họ tên hiển thị cần tối thiểu 3 ký tự.")
    .max(80, "Họ tên tối đa 80 ký tự."),
  role: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập chức danh quản trị.")
    .max(80, "Chức danh tối đa 80 ký tự."),
  email: z.string().trim().email("Địa chỉ email công vụ không hợp lệ."),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Vui lòng nhập mật khẩu hiện tại (tối thiểu 6 ký tự)."),
    newPassword: z
      .string()
      .min(8, "Mật khẩu mới cần tối thiểu 8 ký tự.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Mật khẩu mới phải bao gồm cả chữ cái và chữ số.",
      ),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận lại mật khẩu mới."),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Mật khẩu mới không được trùng với mật khẩu hiện tại.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận chưa trùng khớp.",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export function useAdminSettings() {
  const [profileDisplay, setProfileDisplay] = useState({
    name: "",
    role: "Quản trị viên hệ thống",
    email: "",
    initials: "AD",
    permissionLabel: "TOÀN QUYỀN",
  });

  const [notice, setNotice] = useState<string | null>(null);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      role: "Quản trị viên hệ thống",
      email: "",
    },
  });

  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const currentAdminQuery = useCurrentAdmin();
  const isLoadingProfile = currentAdminQuery.isLoading;

  useEffect(() => {
    const user = currentAdminQuery.data;
    if (!user) return;
    const mapped = mapDtoToProfile(user);
    setProfileDisplay({
      name: mapped.name,
      role: mapped.role,
      email: mapped.email,
      initials: mapped.initials,
      permissionLabel: mapped.permissionLabel,
    });
    profileForm.reset({
      name: mapped.name,
      role: mapped.role,
      email: mapped.email,
    });
  }, [currentAdminQuery.data, profileForm]);

  const { updateProfileMutation, isPending: isSavingProfile } =
    useUpdateAdminProfile({
      successCb: () => {
        const msg = "Đã lưu cập nhật thông tin hồ sơ quản trị viên.";
        setNotice(msg);
        toast.success("Cập nhật hồ sơ thành công", { description: msg });
      },
      errorCb: (err) => {
        const msg =
          err.message || "Không thể cập nhật thông tin hồ sơ quản trị viên.";
        setNotice(msg);
        toast.error("Cập nhật thất bại", { description: msg });
      },
    });

  const { changePasswordMutation, isPending: isChangingPassword } =
    useChangeAdminPassword({
      successCb: () => {
        passwordForm.reset();
        const msg =
          "Đã cập nhật mật khẩu ủy quyền thành công cho tài khoản quản trị.";
        setNotice(msg);
        toast.success("Đổi mật khẩu thành công", { description: msg });
      },
      errorCb: (err) => {
        const msg =
          err.message ||
          "Không thể cập nhật mật khẩu. Vui lòng kiểm tra lại mật khẩu hiện tại.";
        setNotice(msg);
        toast.error("Đổi mật khẩu thất bại", { description: msg });
      },
    });

  const handleSaveProfile = (values: ProfileFormValues) => {
    const initials = buildInitials(values.name);
    updateProfileMutation.mutate(
      {
        full_name: values.name.trim(),
        email: values.email.trim(),
      },
      {
        onSuccess: () => {
          setProfileDisplay((prev) => ({
            ...prev,
            name: values.name.trim(),
            role: values.role.trim(),
            email: values.email.trim(),
            initials,
          }));
        },
      },
    );
  };

  const handleChangePassword = (values: ChangePasswordFormValues) => {
    changePasswordMutation.mutate({
      current_password: values.currentPassword,
      new_password: values.newPassword,
    });
  };

  return {
    isLoadingProfile,
    profileDisplay,
    notice,
    setNotice,
    showCurrentPw,
    setShowCurrentPw,
    showNewPw,
    setShowNewPw,
    showConfirmPw,
    setShowConfirmPw,
    profileForm,
    passwordForm,
    isSavingProfile: profileForm.formState.isSubmitting || isSavingProfile,
    isChangingPassword:
      passwordForm.formState.isSubmitting || isChangingPassword,
    handleSaveProfile: profileForm.handleSubmit(handleSaveProfile),
    handleChangePassword: passwordForm.handleSubmit(handleChangePassword),
  };
}
