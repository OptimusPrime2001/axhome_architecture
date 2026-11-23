import type { Project } from "@shared-types";

export const PROJECT_TYPE_LABELS: Record<Project["projectType"], string> = {
  concept: "Bản Vẽ 3D",
  under_construction: "Đang Thi Công",
  completed: "Đã Hoàn Thành",
};

export const PROJECT_STATUS_LABELS: Record<Project["status"], string> = {
  published: "Đã xuất bản",
  draft: "Bản nháp",
};

export const PROJECT_CATEGORY_LABELS: Record<Project["category"], string> = {
  villa: "Biệt thự",
  townhouse: "Nhà phố",
  mansion: "Dinh thự",
};

export const PROJECT_STYLE_LABELS: Record<Project["style"], string> = {
  modern: "Hiện đại",
  neoclassic: "Tân cổ điển",
  minimalist: "Tối giản",
  indochine: "Đông Dương",
};

export const PROJECTS_HERO_CONTENT = {
  badge: "BỘ SƯU TẬP KIẾN TRÚC & CÔNG TRÌNH",
  title: "Không gian sống & Dấu ấn qua từng công trình",
  description:
    "Tuyển tập các phương án thiết kế 3D độc bản và những công trình thực tế đã hoàn thành bàn giao hoặc đang thi công trên khắp cả nước — minh chứng cho năng lực chuẩn xác từ bản vẽ đến hiện trường.",
  highlights: [
    {
      id: "hl-projects",
      value: 280,
      suffix: "+",
      label: "Công trình hoàn thiện",
      iconKey: "projects" as const,
    },
    {
      id: "hl-camera",
      value: 100,
      suffix: "%",
      label: "Giám sát camera 24/7",
      iconKey: "camera" as const,
    },
    {
      id: "hl-cost",
      value: 0,
      suffix: "%",
      label: "Chi phí phát sinh",
      iconKey: "cost" as const,
    },
    {
      id: "hl-warranty",
      value: 10,
      suffix: " Năm",
      label: "Bảo hành kết cấu",
      iconKey: "warranty" as const,
    },
  ],
} as const;

export const PROJECTS_STANDARDS_HEADER = {
  eyebrow: "TIÊU CHUẨN THỰC HÀNH & THI CÔNG",
  title: "Cam kết chuẩn mực từ hồ sơ đến công trường",
  description:
    "Chúng tôi xóa bỏ mọi âu lo của gia chủ thông qua quy trình kỹ thuật độc quyền, quy chuẩn bóc tách minh bạch và giám sát chéo ba cấp.",
} as const;

export const PROJECTS_STANDARDS = [
  {
    id: "std-1",
    title: "100% Hồ sơ bóc tách chuẩn xác",
    description:
      "Hồ sơ tích hợp trọn vẹn 4 bộ môn: Kiến trúc, Kết cấu an toàn vi mô, Điện nước MEP âm tường và Bố trí cảnh quan chi tiết từng milimet trước khi khởi công.",
    iconKey: "blueprint" as const,
  },
  {
    id: "std-2",
    title: "Giám sát kỹ thuật 3 cấp 24/7",
    description:
      "Kỹ sư hiện trường túc trực 24/7, Chỉ huy trưởng kiểm tra chéo các mốc kết cấu trọng yếu, Kiến trúc sư chủ trì nghiệm thu mỹ thuật và chi tiết hoàn thiện.",
    iconKey: "supervision" as const,
  },
  {
    id: "std-3",
    title: "Không phát sinh chi phí hợp đồng",
    description:
      "Bảng dự toán bóc tách chi tiết từng hạng mục từ thiết kế tới thi công hoàn chỉnh, cam kết bảo lưu đơn giá và đền bù hợp đồng nếu chậm tiến độ.",
    iconKey: "transparent" as const,
  },
] as const;

export const PROJECTS_CTA_CONTENT = {
  eyebrow: "KHỞI ĐẦU KHÔNG GIAN SỐNG ĐÍCH THỰC",
  title: "Bạn đã tìm thấy ý tưởng cho ngôi nhà tương lai?",
  description:
    "Liên hệ ngay với KTS Trưởng và Chỉ huy trưởng công trình của Axhome để nhận bản phác thảo mặt bằng ý tưởng cùng báo giá dự toán sơ bộ hoàn toàn miễn phí.",
  primaryCta: {
    label: "Đăng ký tư vấn dự án",
    href: "/contact",
  },
} as const;
