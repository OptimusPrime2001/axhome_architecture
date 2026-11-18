import type {
  ArchitecturalStyle,
  ProjectCategory,
  ProjectType,
} from "../project";

export type AdminNavIconKey =
  | "dashboard"
  | "projects"
  | "contacts"
  | "settings";

export interface AdminNavItem {
  label: string;
  href: string;
  iconKey: AdminNavIconKey;
  badge?: string;
}

export interface AdminUserProfile {
  name: string;
  role: string;
  accountTitle: string;
  permissionLabel: string;
  initials: string;
  email: string;
}

export interface AdminNotificationItem {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  isUnread: boolean;
  href: string;
}

export type ConsultationLeadStatus =
  | "pending"
  | "in_progress"
  | "scheduled"
  | "won"
  | "lost";

export type ConsultationServiceType =
  | "design"
  | "construction"
  | "full_package";

export interface ConsultationLead {
  id: string;
  code: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceType: ConsultationServiceType;
  serviceLabel: string;
  estimatedBudget?: string;
  landSize: string;
  location: string;
  message: string;
  sourcePage: string;
  referencedProjectId?: string;
  referencedProjectTitle?: string;
  leadStatus: ConsultationLeadStatus;
  assignedArchitect?: string;
  internalNotes?: string;
  createdAt: string;
  relativeTime: string;
}

export interface DashboardMonthlyStat {
  monthLabel: string;
  projectViews: number;
  consultationLeads: number;
}

export type AdminProjectStatusFilter = "all" | "published" | "draft";
export type AdminProjectTypeFilter = "all" | ProjectType;
export type AdminProjectCategoryFilter = "all" | ProjectCategory;
export type AdminProjectStyleFilter = "all" | ArchitecturalStyle;

export interface AdminProjectFilterState {
  search: string;
  projectType: AdminProjectTypeFilter;
  category: AdminProjectCategoryFilter;
  style: AdminProjectStyleFilter;
  status: AdminProjectStatusFilter;
}
