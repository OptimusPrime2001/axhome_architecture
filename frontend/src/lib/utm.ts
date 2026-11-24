"use client";

const UTM_STORAGE_KEY = "axhome_ad_attribution";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ttclid",
] as const;

export type AttributionParams = Partial<
  Record<(typeof TRACKED_PARAMS)[number], string>
>;

export function captureAttributionFromSearch(search: string): void {
  if (typeof window === "undefined") return;
  try {
    const urlParams = new URLSearchParams(search);
    const captured: AttributionParams = {};
    let hasAny = false;

    for (const key of TRACKED_PARAMS) {
      const val = urlParams.get(key)?.trim();
      if (val) {
        captured[key] = val.slice(0, 120);
        hasAny = true;
      }
    }

    if (hasAny) {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
    }
  } catch {
    // Ignore storage errors in private browsing modes
  }
}

export function getStoredAttribution(): AttributionParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttributionParams;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Appends stored ad attribution query parameters (UTM / gclid / fbclid)
 * to a clean route path (e.g. "/contact" -> "/contact?utm_source=facebook&utm_campaign=villa_hn").
 */
export function buildAttributedSourcePage(basePath: string): string {
  const attribution = getStoredAttribution();
  if (!attribution) return basePath;

  const qs = new URLSearchParams();
  for (const key of TRACKED_PARAMS) {
    const value = attribution[key];
    if (value) {
      qs.set(key, value);
    }
  }

  const queryString = qs.toString();
  if (!queryString) return basePath;

  const separator = basePath.includes("?") ? "&" : "?";
  return `${basePath}${separator}${queryString}`;
}
