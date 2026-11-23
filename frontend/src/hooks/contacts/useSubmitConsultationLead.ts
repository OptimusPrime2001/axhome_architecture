import {
  type CreatePublicLeadPayload,
  submitPublicConsultationLead,
} from "@apis";
import { CONTACTS_ADMIN_LIST_KEY, CONTACTS_ADMIN_STATS_KEY } from "@constants";
import type { ApiError } from "@lib";
import type { ConsultationLead } from "@shared-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type SubmitConsultationLeadOpts = {
  successCb?: (data: ConsultationLead) => void;
  errorCb?: (error: ApiError) => void;
};

export const useSubmitConsultationLead = (
  opts?: SubmitConsultationLeadOpts,
) => {
  const queryClient = useQueryClient();

  const submitLeadMutation = useMutation<
    ConsultationLead,
    ApiError,
    CreatePublicLeadPayload
  >({
    mutationFn: submitPublicConsultationLead,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: [CONTACTS_ADMIN_LIST_KEY],
      });
      void queryClient.invalidateQueries({
        queryKey: [CONTACTS_ADMIN_STATS_KEY],
      });
      opts?.successCb?.(data);
    },
    onError: (error) => {
      opts?.errorCb?.(error);
    },
  });

  return {
    submitLeadMutation,
    isPending: submitLeadMutation.isPending,
  };
};
