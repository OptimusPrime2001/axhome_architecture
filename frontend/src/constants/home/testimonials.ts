// ==============================================================================
// Architectura - Section 8: Client Testimonials
// Nguồn: Figma node 1:1863 (Section - 8. TESTIMONIALS)
// LƯU Ý: Dữ liệu hiện tại lấy theo mẫu thiết kế Figma (nodes 1:1872, 1:1895, 1:1918).
// Khi có phản hồi thực tế từ khách hàng, chỉ cần cập nhật mảng HOME_TESTIMONIALS bên dưới.
// ==============================================================================

import type { TestimonialItem } from "@shared-types";

export const HOME_TESTIMONIALS_HEADER = {
  eyebrow: "ĐÁNH GIÁ TỪ GIA CHỦ",
  title: "Khách hàng nói về chúng tôi",
  description:
    "Sự hài lòng và niềm tự hào của mỗi gia chủ khi nhận bàn giao tổ ấm chính là thước đo giá trị lớn nhất cho uy tín của Axhome.",
} as const;

export const HOME_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote:
      "“Điều tôi hài lòng nhất ở Axhome là sự chuẩn xác đến kinh ngạc giữa bản vẽ 3D và căn biệt thự thực tế hoàn thiện. Dự toán chi phí minh bạch đến từng viên gạch, không hề phát sinh thêm bất cứ khoản nào ngoài hợp đồng.”",
    authorName: "Anh Đặng Quốc Thái",
    authorRole: "Chủ đầu tư Villa Thảo Điền — TP. Thủ Đức",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "testimonial-2",
    quote:
      "“Gia đình tôi rất kỹ tính trong việc lựa chọn vật liệu và đón ánh sáng tự nhiên. Các KTS đã xử lý vi khí hậu cực kỳ tinh tế, ngôi nhà mát mẻ quanh năm mà vẫn giữ trọn sự riêng tư tĩnh tại. Tiến độ bàn giao còn sớm hơn 2 tuần.”",
    authorName: "Chị Nguyễn Hoàng Yến",
    authorRole: "Chủ đầu tư Ecopark Lakefront Villa — Hưng Yên",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "testimonial-3",
    quote:
      "“Là một nhà đầu tư bất động sản lâu năm, tôi đánh giá rất cao kỷ luật công trường và tay nghề đội ngũ thi công của Axhome. Từng mối nối đá, chi tiết gỗ hay đường ống âm đều chuẩn chỉ như một tác phẩm thủ công.”",
    authorName: "Bác Vũ Đình Trọng",
    authorRole: "Chủ đầu tư Ocean Breeze Retreat — Nha Trang",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
];
