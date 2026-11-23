// ==============================================================================
// Axhome Architecture - Media Upload Service (Axios + Cloudflare R2 Ready)
// ==============================================================================

import { apiClient, isApiConfigured, unwrapResponse } from "./api-client";

export type MediaUploadCategory = "cover" | "gallery" | "floor-plan";

export interface MediaUploadResult {
  url: string;
  fileName: string;
  sizeBytes: number;
  mimeType: string;
  storageProvider: "cloudflare-r2" | "local-preview";
}

interface UploadMediaEndpointDTO {
  url: string;
  key?: string;
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
 * Uploads an image via the Go Backend API to Cloudflare R2 using the shared
 * Axios `apiClient` (`withCredentials: true` for HttpOnly `access_token` cookie).
 */
export async function uploadProjectImage(
  file: File,
  category: MediaUploadCategory,
): Promise<MediaUploadResult> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  if (isApiConfigured()) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const data = await unwrapResponse<UploadMediaEndpointDTO>(
      apiClient.post("/admin/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    );

    if (!data?.url) {
      throw new Error("Phản hồi từ máy chủ lưu trữ không chứa đường dẫn ảnh.");
    }

    return {
      url: data.url,
      fileName: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
      storageProvider: "cloudflare-r2",
    };
  }

  // Fallback local preview simulation when NEXT_PUBLIC_API_URL is not configured
  await new Promise((resolve) => setTimeout(resolve, 220));
  const previewUrl = URL.createObjectURL(file);

  return {
    url: previewUrl,
    fileName: file.name,
    sizeBytes: file.size,
    mimeType: file.type,
    storageProvider: "local-preview",
  };
}
