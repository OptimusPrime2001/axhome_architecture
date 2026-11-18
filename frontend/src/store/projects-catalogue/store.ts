import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createProjectsCatalogueSlice } from "./slices/projectsCatalogueSlice";
import type { ProjectsCatalogueState } from "./types";

export const useProjectsCatalogueStore = create<ProjectsCatalogueState>()(
  devtools(
    subscribeWithSelector((...arg) => ({
      ...createProjectsCatalogueSlice(...arg),
    })),
    {
      name: "Projects Catalogue Store",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);
