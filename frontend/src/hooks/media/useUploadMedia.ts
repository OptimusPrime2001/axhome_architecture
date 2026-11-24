import {
  type MediaUploadCategory,
  type UploadMediaDTO,
  uploadAdminMedia,
} from "@apis";
import type { ApiError } from "@lib";
import { useMutation } from "@tanstack/react-query";
import { compressImageForUpload } from "@utils";

export type UploadMediaVariables = {
  file: File;
  category: MediaUploadCategory;
};

export type UploadMediaOpts = {
  successCb?: (data: UploadMediaDTO) => void;
  errorCb?: (error: ApiError) => void;
};

export const useUploadMedia = (opts?: UploadMediaOpts) => {
  const uploadMediaMutation = useMutation<
    UploadMediaDTO,
    ApiError,
    UploadMediaVariables
  >({
    mutationFn: async ({ file, category }) => {
      const optimizedFile = await compressImageForUpload(file, category);
      return uploadAdminMedia(optimizedFile, category);
    },
    onSuccess: (data) => {
      opts?.successCb?.(data);
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    uploadMediaMutation,
    isPending: uploadMediaMutation.isPending,
  };
};
