export const FALLBACK_PROJECT_IMAGE = "/images/hero_background.png";

const OPTIMIZABLE_EXACT_HOSTS = new Set([
  "images.unsplash.com",
  "cdn.shopify.com",
  "axhome.vn",
]);

const OPTIMIZABLE_HOST_SUFFIXES = [
  ".r2.dev",
  ".r2.cloudflarestorage.com",
  ".axhome.vn",
];

/**
 * Checks whether an image source string is a valid Next.js Image src
 * (either a local path starting with "/" or an explicit http/https URL).
 */
export function isValidImageSrc(src: string): boolean {
  const trimmed = src.trim();
  if (!trimmed) return false;

  if (trimmed.startsWith("/")) {
    return !trimmed.startsWith("//");
  }

  try {
    const parsed = new URL(trimmed);
    return (
      (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      Boolean(parsed.hostname)
    );
  } catch {
    return false;
  }
}

/**
 * Checks whether an image source belongs to a trusted hostname configured
 * in `next.config.ts` `images.remotePatterns` (eligible for AVIF/WebP optimization).
 * External arbitrary URLs return `false` so `<SafeImage />` falls back to `unoptimized`.
 */
export function isOptimizableImageSrc(src: string): boolean {
  const trimmed = src.trim();
  if (!trimmed) return false;

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return true;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();

    if (parsed.protocol === "https:") {
      if (OPTIMIZABLE_EXACT_HOSTS.has(host)) {
        return true;
      }
      return OPTIMIZABLE_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));
    }

    if (
      parsed.protocol === "http:" &&
      host === "localhost" &&
      parsed.port === "8080" &&
      parsed.pathname.startsWith("/uploads/")
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
