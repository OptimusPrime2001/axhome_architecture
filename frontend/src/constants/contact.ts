import type {
  ContactFaqItem,
  ContactHeroCardItem,
  ContactReferenceProject,
  ContactSocialLink,
  ContactStartStep,
} from "@shared-types";
import { R2_IMG_URL } from "./image";

export const MESSENGER_ID = "61570966773480";
export const ZALO_PHONE = "0984601388";
export const FACEBOOK_PAGE_URL = `https://www.facebook.com/profile.php?id=${MESSENGER_ID}`;
export const MESSENGER_LINK = `https://m.me/${MESSENGER_ID}`;
export const ZALO_LINK = `https://zalo.me/${ZALO_PHONE}`;
export const CONTACT_HERO_CONTENT = {
  badge: "LIÊN HỆ & TƯ VẤN TRỰC TIẾP",
  title: "Kết nối cùng chúng tôi",
  description:
    "Đội ngũ kiến trúc sư trưởng luôn sẵn sàng lắng nghe ý tưởng, khảo sát hiện trạng và đề xuất giải pháp kiến trúc tối ưu nhất cho gia đình bạn.",
  responseCard: {
    eyebrow: "THỜI GIAN PHẢN HỒI",
    title: "Trong vòng 24 giờ làm việc",
    description: "Khảo sát địa chất và thực địa tận nơi theo yêu cầu.",
  },
} as const;

export const CONTACT_INFO_CARDS: ContactHeroCardItem[] = [
  {
    id: "contact-office",
    eyebrow: "TRỤ SỞ CHÍNH",
    title: "Hà Nội",
    lines: ["D20 TT14 Khu Đô Thị Văn Quán - Hà Đông, Hà Nội, Việt Nam"],
    footerNote: "Tiếp khách theo lịch hẹn",
    iconKey: "office",
  },
  {
    id: "contact-hotline",
    eyebrow: "HOTLINE TƯ VẤN 24/7",
    title: "Trực tiếp KTS Trưởng",
    lines: ["0947 712 626"],
    footerNote: "Hỗ trợ Zalo, WhatsApp",
    iconKey: "hotline",
  },
  {
    id: "contact-hours",
    eyebrow: "GIỜ LÀM VIỆC",
    title: "Thứ 2 - Thứ 7",
    lines: [
      "08:00 - 18:00 hàng ngày",
      "Hỗ trợ đặt lịch khảo sát tại công trình vào Chủ Nhật.",
    ],
    footerNote: "Email: Kientrucaxhome@gmail.com",
    iconKey: "hours",
  },
];

export const CONTACT_START_PROCESS = {
  eyebrow: "QUY TRÌNH BẮT ĐẦU",
  title: "Kiến tạo không gian mang bản sắc gia chủ",
  description:
    "Mỗi công trình của Axhome là sự giao thoa giữa ánh sáng nhiệt đới, kết cấu chuẩn mực và vật liệu tự nhiên tinh tuyển. Chúng tôi khởi đầu mọi dự án bằng cuộc trò chuyện sâu sắc về lối sống, thói quen sinh hoạt và tầm nhìn bền vững của gia đình.",
  steps: [
    {
      id: "start-step-1",
      number: "1",
      title: "Tiếp nhận & Nghiên cứu sơ bộ",
      description:
        "Phân tích địa hình, phong thủy, hướng nắng gió và quy hoạch đô thị.",
    },
    {
      id: "start-step-2",
      number: "2",
      title: "Khảo sát & Trình bày Concept",
      description:
        "Gặp gỡ trực tiếp cùng KTS Trưởng và gửi phối cảnh sơ phác 3D độc quyền.",
    },
    {
      id: "start-step-3",
      number: "3",
      title: "Bóc tách & Dự toán minh bạch",
      description:
        "Cam kết không phát sinh khối lượng thông qua hồ sơ kỹ thuật đồng bộ.",
    },
  ] as ContactStartStep[],
} as const;

export const CONTACT_REFERENCE_PROJECT: ContactReferenceProject = {
  eyebrow: "DỰ ÁN THAM CHIẾU",
  title: "Biệt thự 3 tầng – Ba Đình (820 m²)",
  href: "/projects",
  imageUrl: `${R2_IMG_URL}/banner/nha_noi_bat.jpg`,
  imageAlt: "Biệt thự 3 tầng (820 m²)",
};

export const CONTACT_FORM_COPY = {
  eyebrow: "HỒ SƠ KHỞI TẠO",
  title: "Đăng ký nhận phương án thiết kế & Dự toán sơ bộ",
  subtitle:
    "Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.",
  privacyNote: "Bảo mật thông tin & Không làm phiền",
  submitLabel: "Gửi yêu cầu tư vấn ngay",
  serviceOptions: [
    "Thiết kế kiến trúc biệt thự",
    "Thiết kế nội thất cao cấp",
    "Thi công xây dựng trọn gói",
    "Cải tạo & Nâng cấp dinh thự",
  ],
  budgetOptions: [
    "Dưới 3 tỷ VNĐ",
    "Từ 3 tỷ – 6 tỷ VNĐ",
    "Từ 6 tỷ – 12 tỷ VNĐ",
    "Trên 12 tỷ VNĐ",
  ],
} as const;

export const CONTACT_MAP_SECTION = {
  studioTag: "TRỤ SỞ AXHOME ARCHITECTURE",
  studioBuilding: "Khu Đô Thị Văn Quán",
  studioAddress: "D20 TT14 Khu Đô Thị Văn Quán - Hà Đông, Hà Nội",
  googleMapsUrl:
    "https://maps.google.com/?q=D20+TT14+Khu+Do+Thi+Van+Quan+Ha+Dong+Ha+Noi",
  embedUrl:
    "https://maps.google.com/maps?q=D20+TT14+Khu+Do+Thi+Van+Quan+Ha+Dong+Ha+Noi&t=&z=15&ie=UTF8&iwloc=&output=embed",
  eyebrow: "HƯỚNG DẪN ĐÓN TIẾP",
  title: "Gặp gỡ trực tiếp tại Không gian Trưng bày",
  description:
    "Để trải nghiệm đầy đủ thư viện mẫu vật liệu đá tự nhiên, các mẫu hoàn thiện gỗ và mô hình phối cảnh 3D tỷ lệ thực tế, quý khách vui lòng liên hệ trước để văn phòng chuẩn bị trà và bố trí kiến trúc sư phụ trách theo từng phân khúc.",
  amenities: [
    {
      id: "amenity-parking",
      title: "Bãi đỗ xe ô tô miễn phí",
      description: "Tầng hầm B1 và B2 với bảo vệ hướng dẫn đỗ xe riêng 24/7.",
    },
    {
      id: "amenity-meeting",
      title: "Phòng họp bảo mật chuyên biệt",
      description:
        "Màn hình tương tác 4K trình chiếu mô phỏng vi khí hậu và ánh sáng trực quan.",
    },
  ],
  primaryBtn: "Đặt lịch hẹn trước",
  secondaryBtn: "Xem chỉ đường",
} as const;

export const CONTACT_FAQ_HEADER = {
  eyebrow: "GIẢI ĐÁP BĂN KHOĂN",
  title: "Câu hỏi thường gặp khi tư vấn dự án",
  description:
    "Những câu hỏi gia chủ thường quan tâm trước khi bước vào giai đoạn phác thảo và ký kết hợp đồng kiến trúc.",
} as const;

export const CONTACT_FAQ_ITEMS: ContactFaqItem[] = [
  {
    id: "faq-1",
    question: "Chi phí tư vấn ban đầu có tính phí không?",
    answer:
      "Hoàn toàn không. Buổi trao đổi định hướng ban đầu, phân tích sơ đồ khu đất, đánh giá phong thủy kiến trúc và đề xuất concept phác thảo đầu tiên là dịch vụ tư vấn hoàn toàn miễn phí của Axhome nhằm giúp gia chủ thấu hiểu rõ tiềm năng của công trình.",
  },
  {
    id: "faq-2",
    question: "Quy trình khảo sát khu đất thực tế diễn ra như thế nào?",
    answer:
      "Sau khi thống nhất thông tin sơ bộ, KTS Trưởng cùng đội ngũ kỹ sư kết cấu sẽ trực tiếp đến khu đất để đo đạc trắc địa, kiểm tra cao độ, thẩm định chất lượng đất nền, hướng gió chính mùa và góc chiếu của mặt trời. Từ đó thiết lập ma trận thiết kế vi khí hậu riêng cho ngôi nhà.",
  },
  {
    id: "faq-3",
    question: "Thời gian hoàn thiện bộ hồ sơ thiết kế kỹ thuật mất bao lâu?",
    answer:
      "Đối với công trình biệt thự và tư gia quy mô từ 300 m² – 1.000 m², thời gian hoàn thiện trọn gói từ ý tưởng kiến trúc đến hồ sơ kỹ thuật thi công chi tiết (kiến trúc, kết cấu, MEP, cảnh quan, nội thất) thường kéo dài từ 45 đến 75 ngày làm việc, bao gồm các đợt chỉnh sửa theo nguyện vọng gia đình.",
  },
  {
    id: "faq-4",
    question: "Axhome có nhận tổng thầu thi công ngoại tỉnh không?",
    answer:
      "Có. Chúng tôi sở hữu năng lực tổng thầu xây dựng trọn gói chìa khóa trao tay tại khắp các tỉnh thành trọng điểm: Hà Nội, TP.HCM, Đà Nẵng, Nha Trang, Phú Quốc, Hải Phòng, Hưng Yên... Đội ngũ kỹ sư giám sát độc lập luôn bám sát công trường 24/7 với hệ thống camera trực tuyến báo cáo hằng ngày cho gia chủ.",
  },
];

export const CONTACT_SOCIAL_HEADER = {
  eyebrow: "MẠNG LƯỚI SÁNG TẠO",
  title: "Khám phá các ấn phẩm & dự án mới nhất của Axhome",
} as const;

export const CONTACT_SOCIAL_LINKS: ContactSocialLink[] = [
  {
    id: "social-behance",
    label: "Behance Portfolio",
    href: "https://www.behance.net",
    iconKey: "behance",
  },
  {
    id: "social-archdaily",
    label: "ArchDaily Profile",
    href: "https://www.archdaily.com",
    iconKey: "archdaily",
  },
  {
    id: "social-instagram",
    label: "Instagram Visuals",
    href: "https://www.instagram.com",
    iconKey: "instagram",
  },
  {
    id: "social-youtube",
    label: "YouTube Biệt Thự Thực Tế",
    href: "https://www.youtube.com",
    iconKey: "youtube",
  },
  {
    id: "social-facebook",
    label: "Facebook Studio",
    href: "https://www.facebook.com",
    iconKey: "facebook",
  },
];
