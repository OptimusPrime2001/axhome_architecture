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
  {
    id: "testimonial-4",
    quote:
      "“Axhome tư vấn rất thẳng thắn về phương án kết cấu và vật liệu, không đẩy tôi vào những hạng mục đắt tiền không cần thiết. Mỗi tuần đều có báo cáo tiến độ kèm hình ảnh thực tế nên tôi yên tâm theo dõi dù ở xa.”",
    authorName: "Anh Trần Minh Khôi",
    authorRole: "Chủ đầu tư Villa Đồi Thông — Đà Lạt",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "testimonial-5",
    quote:
      "“Tôi ấn tượng nhất với cách đội ngũ xử lý chống thấm và hệ thống cách âm. Căn nhà ở phố cổ vốn ồn ào nhưng khi bước vào trong lại yên tĩnh lạ thường. Bản vẽ và thực tế gần như không có sai lệch.”",
    authorName: "Chị Lê Thu Hà",
    authorRole: "Chủ đầu tư Nhà phố Hàng Bông — Hà Nội",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "testimonial-6",
    quote:
      "“Làm việc với Axhome, tôi thấy rõ sự chuyên nghiệp từ khâu khảo sát đến bàn giao. Mọi phát sinh đều được thông báo và có sự đồng ý của gia đình trước khi thực hiện. Công trình hoàn thành đúng hẹn, chất lượng vượt mong đợi.”",
    authorName: "Anh Phạm Quang Huy",
    authorRole: "Chủ đầu tư Biệt thự Sala — TP. Thủ Đức",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "testimonial-7",
    quote:
      "“Gia đình tôi có người lớn tuổi nên rất kỹ về lối đi, độ dốc và ánh sáng. Các KTS đã lắng nghe từng chi tiết nhỏ và thiết kế thành không gian vừa đẹp vừa an toàn. Cả nhà ai cũng hài lòng.”",
    authorName: "Cô Ngô Thị Lan Anh",
    authorRole: "Chủ đầu tư Villa Hồ Tây — Hà Nội",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "testimonial-8",
    quote:
      "“Điều tôi đánh giá cao là sự minh bạch trong dự toán và nhật ký thi công. Từng đợt thanh toán đều gắn với khối lượng nghiệm thu cụ thể. Làm ăn bài bản như vậy hiếm có trong ngành xây dựng nhà ở.”",
    authorName: "Anh Đỗ Hoàng Nam",
    authorRole: "Chủ đầu tư Seaview Residence — Đà Nẵng",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "testimonial-9",
    quote:
      "“Tôi muốn một ngôi nhà tối giản nhưng ấm áp, và đội ngũ Axhome đã hiểu đúng ngay từ buổi đầu. Ánh sáng tự nhiên len vào từng phòng, vật liệu chọn rất tinh tế. Bảo hành sau bàn giao cũng được hỗ trợ rất nhanh.”",
    authorName: "Chị Bùi Ngọc Mai",
    authorRole: "Chủ đầu tư Nhà vườn Ecopark — Hưng Yên",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "testimonial-10",
    quote:
      "“Công trình của tôi nằm ở địa hình khá khó, nhưng đội thi công xử lý móng và taluy rất cẩn trọng. Kỷ luật an toàn lao động và vệ sinh công trường làm tôi thực sự nể phục. Bàn giao sớm hơn kế hoạch gần 3 tuần.”",
    authorName: "Bác Hoàng Văn Sơn",
    authorRole: "Chủ đầu tư Mountain Retreat — Sa Pa",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: "testimonial-11",
    quote:
      "“Vợ chồng tôi lần đầu xây nhà nên khá lo lắng, nhưng Axhome đồng hành rất tận tình, giải thích rõ từng bước bằng mô hình 3D và bảng tiến độ. Ngôi nhà hoàn thiện đúng như bản phối cảnh ban đầu, thậm chí còn đẹp hơn.”",
    authorName: "Anh Vương Thế Anh",
    authorRole: "Chủ đầu tư Nhà phố Thảo Điền — TP. Thủ Đức",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
];
