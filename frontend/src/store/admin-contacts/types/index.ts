import type {
  ConsultationLead,
  ConsultationLeadStatus,
  ConsultationServiceType,
} from "@shared-types";

export type AdminContactStatusFilter = "all" | ConsultationLeadStatus;
export type AdminContactServiceFilter = "all" | ConsultationServiceType;

export interface AdminContactsSlice {
  leads: ConsultationLead[];
  searchQuery: string;
  statusFilter: AdminContactStatusFilter;
  serviceFilter: AdminContactServiceFilter;
  currentPage: number;
  selectedLeadId: string | null;
  isAddModalOpen: boolean;

  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: AdminContactStatusFilter) => void;
  setServiceFilter: (service: AdminContactServiceFilter) => void;
  setCurrentPage: (page: number) => void;
  setSelectedLeadId: (id: string | null) => void;
  setIsAddModalOpen: (open: boolean) => void;

  addLead: (lead: ConsultationLead) => void;
  updateLead: (
    leadId: string,
    updates: {
      leadStatus: ConsultationLeadStatus;
      assignedArchitect: string;
      internalNotes: string;
    },
  ) => void;
}

export interface AdminContactsState extends AdminContactsSlice {}
