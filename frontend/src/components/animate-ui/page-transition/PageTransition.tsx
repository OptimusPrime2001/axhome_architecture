"use client";

import { Effect } from "@animate-ui/react/primitives/effects/effect";
import type React from "react";

export interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <Effect
      fade={{ initialOpacity: 0, opacity: 1 }}
      slide={{ direction: "up", offset: 12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Effect>
  );
};
