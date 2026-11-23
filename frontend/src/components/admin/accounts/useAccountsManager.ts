"use client";

import type {
  AuthUserDTO,
  CreateAdminUserPayload,
  UpdateAdminUserPayload,
} from "@apis";
import { toast } from "@components";
import { USER_ROLES } from "@constants";
import {
  useAdminUsers,
  useCreateAdminUser,
  useCurrentAdmin,
  useDeleteAdminUser,
  useUpdateAdminUser,
} from "@hooks";
import type { AdminAccount, UserRole } from "@shared-types";
import { useAdminAuthStore } from "@store";
import { buildInitials } from "@utils";
import { useMemo, useState } from "react";

export type AccountRoleFilter = "all" | UserRole;

function normalizeRole(raw: string): UserRole {
  if (raw === USER_ROLES.ADMIN) return USER_ROLES.ADMIN;
  if (raw === USER_ROLES.EDITOR) return USER_ROLES.EDITOR;
  return USER_ROLES.VIEWER;
}

function mapDtoToAccount(dto: AuthUserDTO): AdminAccount {
  const fullName = dto.full_name?.trim() || dto.email;
  return {
    id: dto.id,
    fullName,
    email: dto.email,
    role: normalizeRole(dto.role),
    initials: buildInitials(fullName),
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  };
}

export function useAccountsManager() {
  const profile = useAdminAuthStore((state) => state.profile);
  const { data: currentAdminDto } = useCurrentAdmin();

  const currentUserId = currentAdminDto?.id ?? profile?.id ?? "";
  const isAdmin =
    currentAdminDto?.role === USER_ROLES.ADMIN || Boolean(profile?.isAdmin);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<AccountRoleFilter>("all");
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useAdminUsers({
    params: { limit: 100, offset: 0 },
  });

  const accounts = useMemo(
    () => (data?.items ?? []).map(mapDtoToAccount),
    [data?.items],
  );

  const filteredAccounts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return accounts.filter((acc) => {
      if (roleFilter !== "all" && acc.role !== roleFilter) return false;
      if (!q) return true;
      return (
        acc.fullName.toLowerCase().includes(q) ||
        acc.email.toLowerCase().includes(q)
      );
    });
  }, [accounts, roleFilter, searchQuery]);

  const selectedAccount = useMemo(
    () => accounts.find((acc) => acc.id === selectedAccountId) ?? null,
    [accounts, selectedAccountId],
  );

  const { createUserMutation, isPending: isCreating } = useCreateAdminUser({
    successCb: (created) => {
      toast.success("Tạo tài khoản thành công", {
        description: `Đã cấp tài khoản cho ${created.full_name} (${created.email}).`,
      });
      setIsCreateModalOpen(false);
    },
    errorCb: (err) => {
      toast.error("Không thể tạo tài khoản", {
        description: err.message || "Vui lòng kiểm tra lại thông tin đã nhập.",
      });
    },
  });

  const { updateUserMutation, isPending: isUpdating } = useUpdateAdminUser({
    successCb: (updated) => {
      toast.success("Cập nhật tài khoản thành công", {
        description: `Đã lưu thay đổi cho ${updated.full_name}.`,
      });
    },
    errorCb: (err) => {
      toast.error("Cập nhật tài khoản thất bại", {
        description: err.message || "Không thể lưu thay đổi cho tài khoản này.",
      });
    },
  });

  const { deleteUserMutation, isPending: isDeleting } = useDeleteAdminUser({
    successCb: () => {
      toast.success("Đã xóa tài khoản", {
        description: "Tài khoản đã được gỡ khỏi hệ thống quản trị.",
      });
      setSelectedAccountId(null);
    },
    errorCb: (err) => {
      toast.error("Xóa tài khoản thất bại", {
        description: err.message || "Không thể xóa tài khoản này.",
      });
    },
  });

  const handleCreateAccount = (payload: CreateAdminUserPayload) => {
    createUserMutation.mutate(payload);
  };

  const handleUpdateAccount = (
    payload: UpdateAdminUserPayload,
    onDone?: () => void,
  ) => {
    updateUserMutation.mutate(payload, {
      onSuccess: () => onDone?.(),
    });
  };

  const handleDeleteAccount = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  return {
    accounts,
    filteredAccounts,
    isLoading,
    isError,
    refetch,
    isAdmin,
    currentUserId,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    selectedAccountId,
    setSelectedAccountId,
    selectedAccount,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreateAccount,
    handleUpdateAccount,
    handleDeleteAccount,
  };
}
