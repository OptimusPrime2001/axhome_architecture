import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createAdminProjectsSlice } from "./slices/adminProjectsSlice";
import type { AdminProjectsState } from "./types";

export const useAdminProjectsStore = create<AdminProjectsState>()(
  devtools(
    subscribeWithSelector((...arg) => ({
      ...createAdminProjectsSlice(...arg),
    })),
    {
      name: "Admin Projects Store",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);
