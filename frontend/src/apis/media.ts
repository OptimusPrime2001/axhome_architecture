import { API_ENDPOINTS } from "@constants";
import { apiClient, unwrapResponse } from "../lib/api-client";

export type MediaUploadCategory =
  | "cover"
  | "gallery"
  | "floor-plan"
  | "milestone"
  | "banner"
  | "avatar";

export interface UploadMediaDTO {
  url: string;
  key?: string;
  fileName?: string;
  size?: number;
  mimeType?: string;
  category?: string;
}

export interface DeleteMediaDTO {
  deleted: boolean;
  key?: string;
}

export async function uploadAdminMedia(
  file: File,
  category: MediaUploadCategory,
): Promise<UploadMediaDTO> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

  return unwrapResponse<UploadMediaDTO>(
    apiClient.post(API_ENDPOINTS.ADMIN.MEDIA.UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );
}

export async function deleteAdminMedia(payload: {
  url?: string;
  key?: string;
}): Promise<DeleteMediaDTO> {
  return unwrapResponse<DeleteMediaDTO>(
    apiClient.delete(API_ENDPOINTS.ADMIN.MEDIA.DELETE, {
      data: payload,
    }),
  );
}
