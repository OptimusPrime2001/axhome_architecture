"use client";

import { sendGAEvent } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";

function isGaEnabled(): boolean {
  return Boolean(GA_MEASUREMENT_ID) && typeof window !== "undefined";
}

export function trackGenerateLead(params: {
  sourcePage: string;
  serviceType: string;
  projectTitle?: string;
}): void {
  if (!isGaEnabled()) return;

  sendGAEvent("event", "generate_lead", {
    source_page: params.sourcePage,
    service_type: params.serviceType,
    project_title: params.projectTitle || "",
  });
}

export function trackViewProject(params: {
  slug: string;
  title: string;
  category: string;
}): void {
  if (!isGaEnabled()) return;

  sendGAEvent("event", "view_project", {
    project_slug: params.slug,
    project_title: params.title,
    project_category: params.category,
  });
}

export function trackContactClick(
  channel: "hotline" | "zalo" | "messenger" | "email",
): void {
  if (!isGaEnabled()) return;

  sendGAEvent("event", "click_contact", {
    contact_channel: channel,
  });
}
