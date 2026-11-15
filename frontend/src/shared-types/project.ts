// ==============================================================================
// Axhome Architecture - Project Domain Types
// ==============================================================================

export type ProjectType = "concept" | "under_construction" | "completed";

export type ArchitecturalStyle =
  | "modern"
  | "neoclassic"
  | "minimalist"
  | "indochine";

export type ProjectCategory = "villa" | "townhouse" | "mansion";

export interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  type: "render_3d" | "real_photo";
  isCover?: boolean;
}

export interface FloorPlan {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  areaSquareMeters: number;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  period: string;
  description: string;
  photoUrl?: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  projectType: ProjectType;
  category: ProjectCategory;
  style: ArchitecturalStyle;

  // Location & Meta
  location: string;
  city: string;
  completedYear: number;
  clientName?: string;
  leadArchitect: string;
  constructionDuration?: string;

  // Key Specifications
  landArea: number; // m²
  floorArea: number; // m²
  floorsCount: number;
  bedroomsCount: number;
  facadeWidth: number; // mét

  // Content & Editorial
  excerpt: string;
  contentHtml: string;
  technicalChallenges?: string;
  technicalSolutions?: string;
  clientTestimonial?: {
    author: string;
    role: string;
    quote: string;
  };

  // Visual Assets
  coverImage: string;
  gallery: ProjectImage[];
  floorPlans?: FloorPlan[];
  milestones?: ProjectMilestone[];

  // Status flags
  isFeatured: boolean;
  status: "draft" | "published";
  viewCount: number;
  createdAt: string;
}
