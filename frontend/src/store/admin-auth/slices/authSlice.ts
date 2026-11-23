import { mapDtoToProfile } from "@utils";
import type { StateCreator } from "zustand";
import type { AdminAuthSlice, AdminAuthState } from "../types";

export const createAuthSlice: StateCreator<
  AdminAuthState,
  [["zustand/devtools", never]],
  [],
  AdminAuthSlice
> = (set) => ({
  profile: null,
  isCheckingAuth: false,
  hasCheckedAuth: false,

  setProfileFromDto: (dto) =>
    set(
      {
        profile: mapDtoToProfile(dto),
        hasCheckedAuth: true,
      },
      false,
      "adminAuth/setProfileFromDto",
    ),
  setCheckingAuth: (isCheckingAuth) =>
    set({ isCheckingAuth }, false, "adminAuth/setCheckingAuth"),

  setHasCheckedAuth: (hasCheckedAuth) =>
    set({ hasCheckedAuth }, false, "adminAuth/setHasCheckedAuth"),

  clearAuth: () =>
    set(
      {
        profile: null,
        isCheckingAuth: false,
        hasCheckedAuth: false,
      },
      false,
      "adminAuth/clearAuth",
    ),
});
