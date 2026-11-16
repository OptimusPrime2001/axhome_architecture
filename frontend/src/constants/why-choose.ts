// ==============================================================================
// Architectura - "Vì sao khách hàng chọn" pillars
// Nguồn: Figma node 1:1727 (4 Architectural Value Pillars)
// ==============================================================================

import type { WhyChooseItem } from "@shared-types";

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: "precision",
    icon: "precision",
    title: "Bản vẽ chuẩn",
    description:
      "Hồ sơ kỹ thuật chuẩn xác từng milimet, đồng bộ 100% giữa 2D, 3D và kết cấu chịu lực, tránh hoàn toàn rủi ro sai sót hiện trường.",
    stat: "Chuẩn xác 100%",
  },
  {
    id: "cost",
    icon: "cost",
    title: "Tối ưu chi phí",
    description:
      "Tính toán bóc tách khối lượng minh bạch, tối ưu chủng loại vật liệu ngay trong hồ sơ kỹ thuật, triệt tiêu mọi lãng phí nhân công và vật tư.",
    stat: "Tiết kiệm tới 15%",
  },
  {
    id: "team",
    icon: "team",
    title: "Đội ngũ chuyên nghiệp",
    description:
      "Kiến trúc sư & kỹ sư trưởng trên 10 năm kinh nghiệm trực tiếp chỉ đạo, thợ xây dựng lành nghề được đào tạo bài bản theo quy chuẩn khắt khe.",
    stat: "10+ năm kinh nghiệm",
  },
  {
    id: "support",
    icon: "support",
    title: "Đồng hành xuyên suốt",
    description:
      "Giám sát tác giả liên tục từ ngày khởi công đến khi hoàn công nghiệm thu. Bảo hành kết cấu 10 năm và hỗ trợ bảo trì trọn đời công trình.",
    stat: "Bảo trì trọn đời",
  },
];
