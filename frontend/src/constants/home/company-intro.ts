// ==============================================================================
// Architectura - Section 2: Company Introduction & Key Metrics Stats
// Nguồn: Figma node 1:1342 (Section - 2. COMPANY INTRODUCTION)
// ==============================================================================

import { PROJECT_DONE_COUNT } from "@constants";
import type { CompanyIntroContent, CompanyStatItem } from "@shared-types";

export const COMPANY_INTRO_CONTENT: CompanyIntroContent = {
  eyebrow: "TRIẾT LÝ KIẾN TẠO",
  title: "Kiến trúc là nơi chốn an yên của tâm hồn và di sản gia đình",
  paragraphs: [
    "Tại Axhome, mỗi công trình không chỉ đơn thuần là sự ghép nối giữa bê tông, thép và kính. Chúng tôi tiếp cận kiến trúc như một nghệ thuật tổ chức không gian sống, tôn trọng bản sắc nhiệt đới Việt Nam và tôn vinh phong cách sống tinh tế của từng gia chủ.",
    "Với tôn chỉ “Bản vẽ chuẩn – Tối ưu chi phí – Thi công trọn gói”, chúng tôi kết nối chặt chẽ giữa ý tưởng quy hoạch không gian đột phá và năng lực quản lý tổng thầu xây lắp kỷ luật, bảo chứng cho sự vững bền trường tồn qua nhiều thế hệ.",
  ],
  quote: {
    text: "“Chúng tôi không chỉ xây những bức tường vững chãi, mà kiến tạo không gian nơi ánh sáng, gió trời và cảm xúc gia đình giao hòa trọn vẹn qua năm tháng.”",
    author: "— KTS. TRẦN HOÀNG LÂM, GIÁM ĐỐC SÁNG TẠO",
  },
  image: {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Axhome Design Atelier — Không gian kiến trúc đương đại",
  },
  floatingBadge: {
    title: "Chuẩn mực Độc bản",
    subtitle: "Cam kết sai số kỹ thuật ≤ 3%",
  },
};

export const COMPANY_STATS: CompanyStatItem[] = [
  {
    id: "experience",
    value: 4,
    type: "plus",
    label: "Năm kinh nghiệm",
    description: "Tiên phong phân khúc biệt thự & dinh thự",
  },
  {
    id: "projects",
    value: PROJECT_DONE_COUNT,
    type: "plus",
    label: "Công trình hoàn thiện",
    description: "Hiện diện tại khắp các tỉnh thành cả nước",
  },
  {
    id: "satisfaction",
    value: 99,
    type: "percent",
    label: "Khách hàng hài lòng",
    description: "Chất lượng thẩm mỹ và độ chuẩn xác thi công",
  },
  {
    id: "budget-commitment",
    value: 100,
    type: "percent",
    label: "Không phát sinh",
    description: "Cam kết theo hợp đồng tổng thầu trọn gói",
  },
];
