import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createAdminContactsSlice } from "./slices/adminContactsSlice";
import type { AdminContactsState } from "./types";

export const useAdminContactsStore = create<AdminContactsState>()(
  devtools(
    subscribeWithSelector((...arg) => ({
      ...createAdminContactsSlice(...arg),
    })),
    {
      name: "Admin Contacts Store",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);
