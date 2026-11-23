import { updateAdminLead } from "@apis";
import { CONTACTS_ADMIN_LIST_KEY, CONTACTS_ADMIN_STATS_KEY } from "@constants";
import type { ApiError } from "@lib";
import type { ConsultationLead, ConsultationLeadStatus } from "@shared-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateAdminLeadVariables = {
  id: string;
  payload: {
    leadStatus?: ConsultationLeadStatus;
    assignedArchitect?: string;
    internalNotes?: string;
  };
};

export type UpdateAdminLeadOpts = {
  successCb?: (data: ConsultationLead) => void;
  errorCb?: (error: ApiError) => void;
};

export const useUpdateAdminLead = (opts?: UpdateAdminLeadOpts) => {
  const queryClient = useQueryClient();

  const updateLeadMutation = useMutation<
    ConsultationLead,
    ApiError,
    UpdateAdminLeadVariables
  >({
    mutationFn: ({ id, payload }) => updateAdminLead(id, payload),
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
    updateLeadMutation,
    isPending: updateLeadMutation.isPending,
  };
};
