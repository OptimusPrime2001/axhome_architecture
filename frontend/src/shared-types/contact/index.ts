export interface ContactHeroCardItem {
  id: string;
  eyebrow: string;
  title: string;
  lines: string[];
  footerNote: string;
  iconKey: "office" | "studio" | "hotline" | "hours";
}

export interface ContactStartStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ContactReferenceProject {
  eyebrow: string;
  title: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
}

export interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactSocialLink {
  id: string;
  label: string;
  href: string;
  iconKey: "behance" | "archdaily" | "instagram" | "youtube" | "facebook";
}
