// ==============================================================================
// Architectura - Project Domain Types
// ==============================================================================

import type {
  ArchitecturalStyle,
  GallerySpaceCategory,
  ProjectCategory,
  ProjectImageType,
  ProjectStatus,
  ProjectType,
} from "../../constants/enums";

export type {
  ArchitecturalStyle,
  GallerySpaceCategory,
  ProjectCategory,
  ProjectImageType,
  ProjectStatus,
  ProjectType,
};

export interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  type: ProjectImageType;
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
  status: ProjectStatus;
  viewCount: number;
  createdAt: string;
}
