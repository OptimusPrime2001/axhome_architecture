import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createAuthSlice } from "./slices/authSlice";
import type { AdminAuthState } from "./types";

export const useAdminAuthStore = create<AdminAuthState>()(
  devtools(
    subscribeWithSelector((...arg) => ({
      ...createAuthSlice(...arg),
    })),
    {
      name: "Admin Auth Store",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);
