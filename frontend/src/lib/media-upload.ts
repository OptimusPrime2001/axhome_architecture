// ==============================================================================
// Axhome Architecture - Media Upload Helper (WebP Compression + Cloudflare R2)
// ==============================================================================

import { type MediaUploadCategory, uploadAdminMedia } from "@apis";
import { compressImageForUpload } from "@utils";

export type { MediaUploadCategory };

export interface MediaUploadResult {
  url: string;
  key?: string;
  fileName: string;
  sizeBytes: number;
  originalSizeBytes: number;
  mimeType: string;
  storageProvider: "cloudflare-r2";
}

const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_UPLOAD_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    return `Định dạng tệp "${file.name}" không được hỗ trợ. Vui lòng chọn ảnh JPG, PNG hoặc WEBP.`;
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return `Tệp "${file.name}" (${sizeMb}MB) vượt quá giới hạn tối đa 15MB.`;
  }

  return null;
}

/**
 * Validates, compresses to WebP on client, and uploads an image to Cloudflare R2
 * via the Go Backend API.
 */
export async function uploadProjectImage(
  file: File,
  category: MediaUploadCategory,
): Promise<MediaUploadResult> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const originalSizeBytes = file.size;
  const optimizedFile = await compressImageForUpload(file, category);
  const data = await uploadAdminMedia(optimizedFile, category);

  if (!data?.url) {
    throw new Error("Phản hồi từ máy chủ lưu trữ không chứa đường dẫn ảnh.");
  }

  return {
    url: data.url,
    key: data.key,
    fileName: optimizedFile.name,
    sizeBytes: optimizedFile.size,
    originalSizeBytes,
    mimeType: optimizedFile.type,
    storageProvider: "cloudflare-r2",
  };
}
