// ==============================================================================
// Architectura - Section 3: Core Services
// Nguồn: Figma node 1:1416 (Section - 3. SERVICES SECTION)
// ==============================================================================

import type { HomeServiceItem } from "@shared-types";

export const HOME_SERVICES_HEADER = {
  eyebrow: "GIẢI PHÁP TOÀN DIỆN",
  title: "Dịch vụ cốt lõi",
  description:
    "Hệ sinh thái dịch vụ khép kín từ tư vấn quy hoạch, thiết kế kiến trúc độc bản đến thi công tổng thầu trọn gói với quy chuẩn kỹ thuật khắt khe.",
} as const;

export const HOME_SERVICES: HomeServiceItem[] = [
  {
    id: "architectural-design",
    badge: "01 / THIẾT KẾ",
    title: "Thiết kế kiến trúc",
    description:
      "Quy hoạch mặt bằng công năng tối ưu vi khí hậu, phác thảo phối cảnh 3D chân thực và hồ sơ kỹ thuật thi công chuẩn xác đến từng milimet.",
    features: [
      "Hồ sơ bản vẽ kiến trúc & kết cấu 2D/3D",
      "Thiết kế nội thất may đo đồng bộ",
      "Tối ưu phong thủy & vi khí hậu nhiệt đới",
    ],
    ctaLabel: "Khám phá dịch vụ",
    href: "/projects",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Thiết kế kiến trúc biệt thự cao cấp",
  },
  {
    id: "cost-optimization",
    badge: "02 / DỰ TOÁN",
    title: "Tư vấn & Tối ưu chi phí",
    description:
      "Bóc tách khối lượng minh bạch, hoạch định ngân sách đầu tư hiệu quả và tư vấn giải pháp vật liệu tương đương giúp triệt tiêu mọi chi phí lãng phí.",
    features: [
      "Bảng dự toán BOQ chi tiết từng hạng mục",
      "Tư vấn giải pháp vật liệu & kết cấu tối ưu",
      "Cam kết không phát sinh ngoài hợp đồng",
    ],
    ctaLabel: "Nhận tư vấn dự toán",
    href: "/contact",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Tư vấn dự toán và tối ưu chi phí xây dựng",
  },
  {
    id: "turnkey-construction",
    badge: "03 / THI CÔNG",
    title: "Thi công trọn gói",
    description:
      "Tổ chức thi công từ phần thô đến hoàn thiện nội thất dưới sự giám sát trực tiếp của kỹ sư trưởng, đảm bảo công trình thực tế chuẩn xác theo bản vẽ.",
    features: [
      "Thi công phần thô & kết cấu chuẩn ISO",
      "Hoàn thiện tinh & lắp đặt hệ thống cơ điện MEP",
      "Bảo hành kết cấu 10 năm & bảo trì trọn đời",
    ],
    ctaLabel: "Xem công trình thực tế",
    href: "/projects",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Thi công trọn gói biệt thự và dinh thự",
  },
];
