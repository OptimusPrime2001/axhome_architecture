import type { AuthUserDTO } from "@apis";
import { USER_ROLES, type UserRole } from "@constants";

export interface AdminProfileView {
  id: string;
  name: string;
  email: string;
  role: string;
  roleCode: UserRole;
  isAdmin: boolean;
  accountTitle: string;
  permissionLabel: string;
  initials: string;
}

export function buildInitials(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[words.length - 2][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return fullName.slice(0, 2).toUpperCase() || "AD";
}

function normalizeUserRole(raw: string | undefined): UserRole {
  if (raw === USER_ROLES.ADMIN) return USER_ROLES.ADMIN;
  if (raw === USER_ROLES.EDITOR) return USER_ROLES.EDITOR;
  return USER_ROLES.VIEWER;
}

const ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLES.ADMIN]: "Quản trị viên hệ thống",
  [USER_ROLES.EDITOR]: "Biên tập viên CMS",
  [USER_ROLES.VIEWER]: "Người xem (Chỉ đọc)",
};

export function mapDtoToProfile(dto: AuthUserDTO): AdminProfileView {
  const name = dto.full_name?.trim() || dto.email;
  const roleCode = normalizeUserRole(dto.role);
  const isAdmin = roleCode === USER_ROLES.ADMIN;
  return {
    id: dto.id,
    name,
    email: dto.email,
    role: ROLE_LABELS[roleCode],
    roleCode,
    isAdmin,
    accountTitle: name,
    permissionLabel: isAdmin ? "TOÀN QUYỀN" : roleCode.toUpperCase(),
    initials: buildInitials(name),
  };
}
