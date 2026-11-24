export type CompressImageCategory =
  | "cover"
  | "gallery"
  | "floor-plan"
  | "milestone"
  | "banner"
  | "avatar";

interface CompressPreset {
  maxDimension: number;
  quality: number;
}

const COMPRESS_PRESETS: Record<CompressImageCategory, CompressPreset> = {
  cover: { maxDimension: 1920, quality: 0.82 },
  gallery: { maxDimension: 1920, quality: 0.82 },
  "floor-plan": { maxDimension: 2400, quality: 0.88 },
  milestone: { maxDimension: 1920, quality: 0.82 },
  banner: { maxDimension: 2560, quality: 0.85 },
  avatar: { maxDimension: 512, quality: 0.85 },
};

function replaceExtensionWithWebp(fileName: string): string {
  const withoutExt = fileName.replace(/\.[^/.]+$/, "");
  return `${withoutExt || "image"}.webp`;
}

/**
 * Compresses and resizes an image file to WebP on the client using the Canvas API
 * before uploading to Cloudflare R2. Preserves aspect ratio and never upscales.
 * Falls back to the original file if compression fails or increases file size.
 */
export async function compressImageForUpload(
  file: File,
  category: CompressImageCategory,
): Promise<File> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return file;
  }

  const preset = COMPRESS_PRESETS[category];

  try {
    const bitmap = await createImageBitmap(file);
    try {
      const { width, height } = bitmap;
      const longestSide = Math.max(width, height);
      const scale =
        longestSide > preset.maxDimension
          ? preset.maxDimension / longestSide
          : 1;

      const targetWidth = Math.max(1, Math.round(width * scale));
      const targetHeight = Math.max(1, Math.round(height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return file;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", preset.quality),
      );

      if (!blob || blob.size === 0) {
        return file;
      }

      // Keep original if the file was already smaller and didn't need downscaling
      if (scale === 1 && blob.size >= file.size) {
        return file;
      }

      return new File([blob], replaceExtensionWithWebp(file.name), {
        type: "image/webp",
        lastModified: Date.now(),
      });
    } finally {
      bitmap.close();
    }
  } catch {
    return file;
  }
}
