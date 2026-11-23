"use client";

import { toast } from "@components";
import { USER_ROLES } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useChangeAdminPassword,
  useCurrentAdmin,
  useUpdateAdminProfile,
  useUpdateAdminUser,
} from "@hooks";
import { useAdminAuthStore } from "@store";
import { mapDtoToProfile } from "@utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Họ tên hiển thị cần tối thiểu 3 ký tự.")
    .max(80, "Họ tên tối đa 80 ký tự."),
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.VIEWER]),
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
  const setProfileFromDto = useAdminAuthStore(
    (state) => state.setProfileFromDto,
  );

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
      role: USER_ROLES.VIEWER,
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
  const currentUser = currentAdminQuery.data;
  const isLoadingProfile = currentAdminQuery.isLoading;
  const isAdmin = currentUser?.role === USER_ROLES.ADMIN;

  useEffect(() => {
    if (!currentUser) return;
    const mapped = mapDtoToProfile(currentUser);
    setProfileDisplay({
      name: mapped.name,
      role: mapped.role,
      email: mapped.email,
      initials: mapped.initials,
      permissionLabel: mapped.permissionLabel,
    });
    profileForm.reset({
      name: mapped.name,
      role: mapped.roleCode,
      email: mapped.email,
    });
  }, [currentUser, profileForm]);

  const { updateProfileMutation, isPending: isSavingSelfProfile } =
    useUpdateAdminProfile({
      successCb: (updated) => {
        const mapped = mapDtoToProfile(updated);
        setProfileDisplay({
          name: mapped.name,
          role: mapped.role,
          email: mapped.email,
          initials: mapped.initials,
          permissionLabel: mapped.permissionLabel,
        });
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

  const { updateUserMutation, isPending: isSavingRoleProfile } =
    useUpdateAdminUser({
      successCb: (updated) => {
        setProfileFromDto(updated);
        const mapped = mapDtoToProfile(updated);
        setProfileDisplay({
          name: mapped.name,
          role: mapped.role,
          email: mapped.email,
          initials: mapped.initials,
          permissionLabel: mapped.permissionLabel,
        });
        const msg = "Đã lưu cập nhật hồ sơ & vai trò phân quyền.";
        setNotice(msg);
        toast.success("Cập nhật hồ sơ thành công", { description: msg });
      },
      errorCb: (err) => {
        const msg =
          err.message || "Không thể cập nhật thông tin hồ sơ & vai trò.";
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
    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();

    if (isAdmin && currentUser && values.role !== currentUser.role) {
      updateUserMutation.mutate({
        id: currentUser.id,
        full_name: trimmedName,
        email: trimmedEmail,
        role: values.role,
      });
      return;
    }

    updateProfileMutation.mutate({
      full_name: trimmedName,
      email: trimmedEmail,
    });
  };

  const handleChangePassword = (values: ChangePasswordFormValues) => {
    changePasswordMutation.mutate({
      current_password: values.currentPassword,
      new_password: values.newPassword,
    });
  };

  return {
    isLoadingProfile,
    isAdmin,
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
    isSavingProfile:
      profileForm.formState.isSubmitting ||
      isSavingSelfProfile ||
      isSavingRoleProfile,
    isChangingPassword:
      passwordForm.formState.isSubmitting || isChangingPassword,
    handleSaveProfile: profileForm.handleSubmit(handleSaveProfile),
    handleChangePassword: passwordForm.handleSubmit(handleChangePassword),
  };
}
