// ==============================================================================
// Axhome Architecture - Domain Enum Constants (as const + Derived Types)
// ==============================================================================

export const USER_ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const PROJECT_STATUSES = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export type ProjectStatus =
  (typeof PROJECT_STATUSES)[keyof typeof PROJECT_STATUSES];

export const PROJECT_TYPES = {
  CONCEPT: "concept",
  UNDER_CONSTRUCTION: "under_construction",
  COMPLETED: "completed",
} as const;

export type ProjectType = (typeof PROJECT_TYPES)[keyof typeof PROJECT_TYPES];

export const PROJECT_CATEGORIES = {
  VILLA: "villa",
  TOWNHOUSE: "townhouse",
  MANSION: "mansion",
} as const;

export type ProjectCategory =
  (typeof PROJECT_CATEGORIES)[keyof typeof PROJECT_CATEGORIES];

export const ARCHITECTURAL_STYLES = {
  MODERN: "modern",
  NEOCLASSIC: "neoclassic",
  MINIMALIST: "minimalist",
  INDOCHINE: "indochine",
} as const;

export type ArchitecturalStyle =
  (typeof ARCHITECTURAL_STYLES)[keyof typeof ARCHITECTURAL_STYLES];

export const PROJECT_IMAGE_TYPES = {
  RENDER_3D: "render_3d",
  REAL_PHOTO: "real_photo",
} as const;

export type ProjectImageType =
  (typeof PROJECT_IMAGE_TYPES)[keyof typeof PROJECT_IMAGE_TYPES];

export const GALLERY_SPACE_CATEGORIES = {
  EXTERIOR_DAY: "exterior_day",
  EXTERIOR_NIGHT: "exterior_night",
  LIVING_ROOM: "living_room",
  POOL_GARDEN: "pool_garden",
  INTERIOR_OTHER: "interior_other",
} as const;

export type GallerySpaceCategory =
  (typeof GALLERY_SPACE_CATEGORIES)[keyof typeof GALLERY_SPACE_CATEGORIES];

export const CONSULTATION_LEAD_STATUSES = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  SCHEDULED: "scheduled",
  WON: "won",
  LOST: "lost",
} as const;

export type ConsultationLeadStatus =
  (typeof CONSULTATION_LEAD_STATUSES)[keyof typeof CONSULTATION_LEAD_STATUSES];

export const CONSULTATION_SERVICE_TYPES = {
  DESIGN: "design",
  CONSTRUCTION: "construction",
  FULL_PACKAGE: "full_package",
} as const;

export type ConsultationServiceType =
  (typeof CONSULTATION_SERVICE_TYPES)[keyof typeof CONSULTATION_SERVICE_TYPES];
