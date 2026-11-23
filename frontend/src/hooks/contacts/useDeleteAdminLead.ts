import { deleteAdminLead } from "@apis";
import { CONTACTS_ADMIN_LIST_KEY, CONTACTS_ADMIN_STATS_KEY } from "@constants";
import type { ApiError } from "@lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type DeleteAdminLeadResult = {
  deleted: boolean;
  id: string;
};

export type DeleteAdminLeadOpts = {
  successCb?: (data: DeleteAdminLeadResult) => void;
  errorCb?: (error: ApiError) => void;
};

export const useDeleteAdminLead = (opts?: DeleteAdminLeadOpts) => {
  const queryClient = useQueryClient();

  const deleteLeadMutation = useMutation<
    DeleteAdminLeadResult,
    ApiError,
    string
  >({
    mutationFn: deleteAdminLead,
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
    deleteLeadMutation,
    isPending: deleteLeadMutation.isPending,
  };
};
