// ==============================================================================
// Architectura - Project Domain Types
// ==============================================================================

export type ProjectType = "concept" | "under_construction" | "completed";

export type ArchitecturalStyle =
  | "modern"
  | "neoclassic"
  | "minimalist"
  | "indochine";

export type ProjectCategory = "villa" | "townhouse" | "mansion";

export type GallerySpaceCategory =
  | "exterior_day"
  | "exterior_night"
  | "living_room"
  | "pool_garden"
  | "interior_other";

export interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  type: "render_3d" | "real_photo";
  spaceCategory?: GallerySpaceCategory;
  isCover?: boolean;
}

export interface FloorPlan {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  areaSquareMeters: number;
  rooms?: string[];
}

export interface ProjectHighlight {
  title: string;
  description: string;
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
  highlights?: ProjectHighlight[];
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

  // SEO Metadata (Optional custom overrides)
  seoTitle?: string;
  seoDescription?: string;

  // Status flags
  isFeatured: boolean;
  status: "draft" | "published";
  viewCount: number;
  createdAt: string;
}
