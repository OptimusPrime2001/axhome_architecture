// ==============================================================================
// Architectura - "Quy trình làm việc" 6 bước
// Nguồn: Figma node 1:1784 (6-Step Grid) — tiêu đề lấy đúng từ metadata,
// mô tả là PLACEHOLDER cần đối chiếu với Figma node 1:1797/1810/1823/1836/1849/1862
// ==============================================================================

import type { ProcessStep } from "@shared-types";

export const WORKING_PROCESS_STEPS: ProcessStep[] = [
  {
    id: "step-1",
    number: "01",
    title: "Bước 01: Tiếp nhận tư vấn",
    // TODO: thay bằng text thật từ Figma
    description:
      "Lắng nghe nhu cầu, chốt công năng và ngân sách đầu tư cùng gia đình ngay trong buổi gặp đầu tiên.",
  },
  {
    id: "step-2",
    number: "02",
    title: "Bước 02: Khảo sát hiện trạng",
    // TODO: thay bằng text thật từ Figma
    description:
      "Đo đạc địa hình, kiểm tra điều kiện nền và ghi nhận thực trạng khu đất trước khi triển khai.",
  },
  {
    id: "step-3",
    number: "03",
    title: "Bước 03: Lên phương án thiết kế",
    // TODO: thay bằng text thật từ Figma
    description:
      "Phác thảo mặt bằng, hình khối và phối cảnh 3D để gia đình duyệt trước khi vẽ chi tiết kỹ thuật.",
  },
  {
    id: "step-4",
    number: "04",
    title: "Bước 04: Dự toán chi phí chi tiết",
    // TODO: thay bằng text thật từ Figma
    description:
      "Bóc tách khối lượng và chốt giá vật liệu minh bạch, cam kết không phát sinh ngoài hợp đồng.",
  },
  {
    id: "step-5",
    number: "05",
    title: "Bước 05: Thi công & Giám sát chặt chẽ",
    // TODO: thay bằng text thật từ Figma
    description:
      "Thi công đúng bản vẽ, kỹ sư giám sát thường xuyên và báo cáo tiến độ hằng tuần cho gia đình.",
  },
  {
    id: "step-6",
    number: "06",
    title: "Bước 06: Bàn giao & Bảo hành dài hạn",
    // TODO: thay bằng text thật từ Figma
    description:
      "Nghiệm thu hoàn công, bàn giao đầy đủ hồ sơ pháp lý và bảo hành kết cấu theo hợp đồng.",
  },
];
