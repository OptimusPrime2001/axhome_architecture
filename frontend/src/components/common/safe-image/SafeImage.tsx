"use client";

import {
  FALLBACK_PROJECT_IMAGE,
  isOptimizableImageSrc,
  isValidImageSrc,
} from "@lib/image-url";
import Image, { type ImageProps } from "next/image";
import type React from "react";
import { useState } from "react";

export interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
}

/**
 * Drop-in wrapper around `next/image` for dynamic CMS/Admin image URLs:
 * 1. Keeps full AVIF/WebP optimization for whitelisted R2 / Unsplash / local URLs.
 * 2. Automatically sets `unoptimized` for arbitrary external domains pasted by Admins
 *    so `next/image` never crashes the page with an unconfigured hostname error.
 * 3. Gracefully falls back to `fallbackSrc` on malformed or broken (404) URLs.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = FALLBACK_PROJECT_IMAGE,
  unoptimized,
  onError,
  ...rest
}) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const trimmed = src?.trim() ?? "";
  console.log("🚀 ~ SafeImage ~ trimmed:", trimmed);
  const isBrokenOrInvalid = !isValidImageSrc(trimmed) || failedSrc === trimmed;
  const resolvedSrc = isBrokenOrInvalid ? fallbackSrc : trimmed;
  const shouldBypassOptimizer =
    Boolean(unoptimized) || !isOptimizableImageSrc(resolvedSrc);

  return (
    <Image
      {...rest}
      src={resolvedSrc}
      alt={alt}
      unoptimized={shouldBypassOptimizer}
      onError={(event) => {
        if (failedSrc !== trimmed) {
          setFailedSrc(trimmed);
        }
        onError?.(event);
      }}
    />
  );
};
