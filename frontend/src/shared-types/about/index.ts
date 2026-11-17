export interface AboutBentoImage {
  id: string;
  eyebrow: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  badge?: string;
}

export interface AboutHeroContent {
  badge: string;
  title: string;
  description: string;
  statCard: {
    value: number;
    suffix: string;
    label: string;
    description: string;
  };
  bentoImages: {
    primary: AboutBentoImage;
    secondaryTop: AboutBentoImage;
    secondaryBottom: AboutBentoImage;
  };
}

export interface AboutStoryContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  stats: {
    value: number;
    suffix: string;
    label: string;
  }[];
}

export interface AboutTimelineItem {
  id: string;
  year: string;
  milestoneTag: string;
  title: string;
  description: string;
}

export interface AboutVisionMissionItem {
  id: "vision" | "mission";
  eyebrow: string;
  title: string;
  description: string;
  footerNote: string;
  iconVariant: "light" | "dark";
}

export interface AboutCoreValueItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  footerNote: string;
}

export interface AboutCapabilityMetric {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutCapabilityItem {
  id: string;
  title: string;
  description: string;
}

export interface AboutCapabilityGroup {
  id: "design" | "build";
  eyebrow: string;
  title: string;
  items: AboutCapabilityItem[];
}

export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  credential: string;
  avatarUrl: string;
}

export interface AboutProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  durationLabel: string;
}

export interface AboutCtaBannerContent {
  badge: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  highlights: {
    id: string;
    label: string;
  }[];
}
