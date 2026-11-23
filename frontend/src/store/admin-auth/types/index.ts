import type { AuthUserDTO } from "@apis";
import type { AdminProfileView } from "@utils";

export type AdminAuthProfile = AdminProfileView;

export interface AdminAuthSlice {
  profile: AdminAuthProfile | null;
  isCheckingAuth: boolean;
  hasCheckedAuth: boolean;
  setProfileFromDto: (dto: AuthUserDTO) => void;
  setCheckingAuth: (isCheckingAuth: boolean) => void;
  setHasCheckedAuth: (hasCheckedAuth: boolean) => void;
  clearAuth: () => void;
}

export interface AdminAuthState extends AdminAuthSlice {}
