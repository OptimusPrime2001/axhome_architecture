// ==============================================================================
// Architectura - Homepage section domain types
// Nguồn: Figma Axhome_Architecture, node 1:1290 (Trang Chủ)
// ==============================================================================

/** Section 2 — Giới thiệu công ty & 4 thẻ số liệu (node 1:1342) */
export interface CompanyStatItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface CompanyIntroContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  quote: {
    text: string;
    author: string;
  };
  image: {
    url: string;
    alt: string;
  };
  floatingBadge: {
    title: string;
    subtitle: string;
  };
}

/** Section 3 — Dịch vụ cốt lõi (node 1:1416) */
export interface HomeServiceItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
}

/** Section 6 — Vì sao khách hàng chọn (node 1:1719) */
export interface WhyChooseItem {
  id: string;
  /** Tên icon placeholder — thay bằng SVG thật khi có asset từ Figma */
  icon: "precision" | "cost" | "team" | "support";
  title: string;
  description: string;
  /** Dòng nhấn mạnh dưới cùng của pillar, viết hoa */
  stat: string;
}

/** Section 7 — Quy trình làm việc (node 1:1776) */
export interface ProcessStep {
  id: string;
  /** Số bước hiển thị lớn, ví dụ "01" */
  number: string;
  title: string;
  description: string;
}

/** Section 8 — Đánh giá khách hàng / Testimonials (node 1:1863) */
export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatarUrl: string;
  rating: number;
}
