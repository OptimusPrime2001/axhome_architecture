"use client";

import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID?.trim() || "";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "";
const GOOGLE_ADS_LEAD_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL?.trim() || "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function sendMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (!isBrowser() || !FB_PIXEL_ID || typeof window.fbq !== "function") return;
  if (params) {
    window.fbq("track", eventName, params);
  } else {
    window.fbq("track", eventName);
  }
}

function pushGtmEvent(eventName: string, params: Record<string, unknown>) {
  if (!isBrowser() || !GTM_ID) return;
  sendGTMEvent({ event: eventName, ...params });
}

export function trackGenerateLead(params: {
  sourcePage: string;
  serviceType: string;
  projectTitle?: string;
}): void {
  if (!isBrowser()) return;

  const payload = {
    source_page: params.sourcePage,
    service_type: params.serviceType,
    project_title: params.projectTitle || "",
  };

  if (GA_MEASUREMENT_ID) {
    sendGAEvent("event", "generate_lead", payload);
  }

  pushGtmEvent("generate_lead", payload);

  if (
    GOOGLE_ADS_ID &&
    GOOGLE_ADS_LEAD_LABEL &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
    });
  }

  sendMetaEvent("Lead", {
    content_name: params.projectTitle || params.serviceType,
    content_category: params.serviceType,
  });
}

export function trackViewProject(params: {
  slug: string;
  title: string;
  category: string;
}): void {
  if (!isBrowser()) return;

  const payload = {
    project_slug: params.slug,
    project_title: params.title,
    project_category: params.category,
  };

  if (GA_MEASUREMENT_ID) {
    sendGAEvent("event", "view_project", payload);
  }

  pushGtmEvent("view_project", payload);

  sendMetaEvent("ViewContent", {
    content_ids: [params.slug],
    content_name: params.title,
    content_category: params.category,
    content_type: "project",
  });
}

export function trackContactClick(
  channel: "hotline" | "zalo" | "messenger" | "email",
): void {
  if (!isBrowser()) return;

  const payload = {
    contact_channel: channel,
  };

  if (GA_MEASUREMENT_ID) {
    sendGAEvent("event", "click_contact", payload);
  }

  pushGtmEvent("click_contact", payload);

  sendMetaEvent("Contact", {
    content_name: channel,
  });
}
