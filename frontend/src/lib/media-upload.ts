// ==============================================================================
// Axhome Architecture - Media Upload Service (Go Backend + Cloudflare R2 Ready)
// ==============================================================================

export type MediaUploadCategory = "cover" | "gallery" | "floor-plan";

export interface MediaUploadResult {
  url: string;
  fileName: string;
  sizeBytes: number;
  mimeType: string;
  storageProvider: "cloudflare-r2" | "local-preview";
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
 * Uploads an image via the Go Backend API to Cloudflare R2 when
 * `NEXT_PUBLIC_API_URL` is configured (Phase 5).
 * Automatically falls back to an instant browser Object URL preview during
 * Phase 4 Frontend-First development so all UI dropzones work seamlessly.
 */
export async function uploadProjectImage(
  file: File,
  category: MediaUploadCategory,
): Promise<MediaUploadResult> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (apiBaseUrl) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const response = await fetch(
      `${apiBaseUrl.replace(/\/$/, "")}/api/v1/admin/media/upload`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error(
        `Không thể tải ảnh "${file.name}" lên Cloudflare R2 (Mã lỗi: ${response.status}).`,
      );
    }

    const payload = (await response.json()) as {
      data?: { url?: string };
      url?: string;
    };
    const uploadedUrl = payload.data?.url ?? payload.url;

    if (!uploadedUrl) {
      throw new Error("Phản hồi từ máy chủ lưu trữ không chứa đường dẫn ảnh.");
    }

    return {
      url: uploadedUrl,
      fileName: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
      storageProvider: "cloudflare-r2",
    };
  }

  // Phase 4 UI-first local preview simulation
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
