"use client";

import { MotionConfig } from "motion/react";
import type React from "react";

export interface MotionProviderProps {
  children: React.ReactNode;
}

export const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};
