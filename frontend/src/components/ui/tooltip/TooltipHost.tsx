"use client";

import type * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

export type TooltipHostProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  delayDuration?: number;
  defaultOpen?: boolean;
};

export const TooltipHost: React.FC<TooltipHostProps> = ({
  children,
  content,
  side = "top",
  sideOffset = 8,
  delayDuration = 150,
  defaultOpen,
}) => {
  return (
    <Tooltip delayDuration={delayDuration} defaultOpen={defaultOpen}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={sideOffset}>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};
