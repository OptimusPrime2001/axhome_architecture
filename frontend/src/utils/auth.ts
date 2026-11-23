import type { AuthUserDTO } from "@apis";

export interface AdminProfileView {
  id: string;
  name: string;
  email: string;
  role: string;
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

export function mapDtoToProfile(dto: AuthUserDTO): AdminProfileView {
  const name = dto.full_name?.trim() || dto.email;
  const roleUpper = (dto.role || "admin").toUpperCase();
  return {
    id: dto.id,
    name,
    email: dto.email,
    role: dto.role === "admin" ? "Quản trị viên hệ thống" : "Biên tập viên CMS",
    accountTitle: name,
    permissionLabel: roleUpper === "ADMIN" ? "TOÀN QUYỀN" : roleUpper,
    initials: buildInitials(name),
  };
}
