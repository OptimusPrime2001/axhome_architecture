import type {
  AboutCapabilityGroup,
  AboutCapabilityMetric,
  AboutCoreValueItem,
  AboutCtaBannerContent,
  AboutHeroContent,
  AboutProcessStep,
  AboutStoryContent,
  AboutTeamMember,
  AboutTimelineItem,
  AboutVisionMissionItem,
} from "@shared-types";

export const ABOUT_HERO_CONTENT: AboutHeroContent = {
  badge: "VỀ CHÚNG TÔI • HƠN MỘT THẬP KỶ KIẾN TẠO",
  title: "Kiến tạo giá trị từ tâm huyết và chuyên môn",
  description:
    "Hành trình định hình chuẩn mực sống thượng lưu qua những công trình kiến trúc độc bản, bền vững cùng thời gian và tối ưu giá trị đầu tư cho từng gia chủ.",
  statCard: {
    value: 280,
    suffix: "+",
    label: "CÔNG TRÌNH HOÀN TẤT",
    description:
      "Các biệt thự tư gia cao cấp, khu nghỉ dưỡng sinh thái trải dài từ Hà Nội, Đà Nẵng, Nha Trang tới TP. Hồ Chí Minh.",
  },
  bentoImages: {
    primary: {
      id: "bento-primary",
      eyebrow: "DINH THỰ THẢO ĐIỀN • HOÀN THÀNH 2025",
      title: "Sự giao thoa giữa ánh sáng tự nhiên và chất liệu bản địa",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Dinh thự Thảo Điền hoàn thành năm 2025 bởi ARCHITECTURA",
      badge: "Turnkey Scope",
    },
    secondaryTop: {
      id: "bento-top",
      eyebrow: "CHI TIẾT VẬT LIỆU",
      title: "Độ tinh xảo chuẩn milimet",
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Chi tiết vật liệu hoàn thiện tinh xảo tại công trình",
    },
    secondaryBottom: {
      id: "bento-bottom",
      eyebrow: "ATELIER & NGHIÊN CỨU",
      title: "Quy chuẩn thiết kế quốc tế",
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Không gian làm việc và nghiên cứu kiến trúc ARCHITECTURA",
    },
  },
};

export const ABOUT_STORY_CONTENT: AboutStoryContent = {
  eyebrow: "LỊCH SỬ HÌNH THÀNH",
  title: "Khởi nguồn từ niềm đam mê chất liệu và cấu trúc bền vững",
  paragraphs: [
    "Được thành lập vào năm 2012 bởi các kiến trúc sư và kỹ sư kết cấu tốt nghiệp các học viện danh giá trong nước và tu nghiệp tại Pháp, ARCHITECTURA ra đời từ khát vọng kết nối khí hậu nhiệt đới gió mùa Việt Nam với ngôn ngữ tối giản đương đại.",
    "Chúng tôi không chỉ kiến tạo những hình khối bắt mắt; chúng tôi đi sâu vào vi khí hậu, hướng gió, độ khúc xạ ánh sáng và độ bền hóa lý của từng mác bê tông, khối đá vôi hay thớ gỗ tự nhiên. Mỗi công trình là một tác phẩm được “may đo” riêng cho từng phong cách sống độc tôn.",
    "Trải qua hơn một thập kỷ, mô hình tổng thầu thiết kế song hành thi công (Design & Build) của chúng tôi đảm bảo mỗi nét vẽ trong bản phối cảnh được tái hiện nguyên vẹn ngoài công trường với sai số kỹ thuật tiệm cận mức 0%.",
  ],
  stats: [
    {
      value: 100,
      suffix: "%",
      label: "CHÍNH XÁC VẬT LIỆU CAM KẾT",
    },
    {
      value: 10,
      suffix: " Năm",
      label: "BẢO HÀNH KẾT CẤU CÔNG TRÌNH",
    },
  ],
};

export const ABOUT_TIMELINE: AboutTimelineItem[] = [
  {
    id: "milestone-2012",
    year: "2012",
    milestoneTag: "KHỞI SỰ",
    title: "Thành lập Xưởng Kiến trúc Atelier",
    description:
      "Nhóm kiến trúc sư sáng lập quy tụ 6 chuyên gia tại Hà Nội, khởi đầu với các dự án thiết kế villa tư gia và cải tạo biệt thự cổ mang hơi thở nhiệt đới.",
  },
  {
    id: "milestone-2016",
    year: "2016",
    milestoneTag: "MỞ RỘNG QUY MÔ",
    title: "Mở rộng Tổng thầu Thi công Chuyên nghiệp",
    description:
      "Đầu tư xưởng sản xuất nội thất thủ công 3.500m² và đội ngũ kỹ sư hiện trường cơ hữu, chuyển dịch toàn diện sang mô hình tổng thầu Chìa khóa trao tay.",
  },
  {
    id: "milestone-2020",
    year: "2020",
    milestoneTag: "CHUẨN HÓA",
    title: "Quy chuẩn Giám sát Độc lập & Hệ thống 24/7",
    description:
      "Thiết lập giao thức kiểm soát chất lượng 3 lớp độc lập với hệ thống camera công trường trực tuyến, cho phép chủ đầu tư theo dõi tiến độ theo thời gian thực.",
  },
  {
    id: "milestone-now",
    year: "Hiện tại",
    milestoneTag: "KHẲNG ĐỊNH VỊ THẾ",
    title: "Hơn 280+ Dinh thự Biệt thự & Giải thưởng Kiến trúc",
    description:
      "Chi nhánh hoạt động vững mạnh tại cả 2 đầu mối Hà Nội & TP. Hồ Chí Minh với hơn 65 kiến trúc sư, kỹ sư kết cấu và 300+ thợ tay nghề bậc cao.",
  },
];

export const ABOUT_VISION_MISSION_HEADER = {
  eyebrow: "ĐỊNH HƯỚNG TƯƠNG LAI",
  title: "Tầm nhìn & Sứ mệnh phụng sự",
  description:
    "Kiến trúc là nghệ thuật kiến tạo không gian sống, đồng thời là lời giải chuẩn xác cho bài toán tài chính và giá trị gia tăng của tài sản theo năm tháng.",
} as const;

export const ABOUT_VISION_MISSION: AboutVisionMissionItem[] = [
  {
    id: "vision",
    eyebrow: "TẦM NHÌN CHIẾN LƯỢC",
    title: "Biểu tượng kiến trúc cao cấp hàng đầu Việt Nam",
    description:
      "Trở thành thương hiệu kiến trúc – tổng thầu xây dựng phân khúc cao cấp hàng đầu Việt Nam, biểu trưng cho sự chuẩn xác kỹ thuật tuyệt đối và thẩm mỹ vượt đời trường tồn. Chúng tôi định hình mỗi công trình trở thành di sản truyền đời cho thế hệ tiếp nối.",
    footerNote: "Chuẩn mực kỹ thuật châu Âu • Hơi thở văn hóa Việt Nam",
    iconVariant: "light",
  },
  {
    id: "mission",
    eyebrow: "SỨ MỆNH HIỆN THỰC HÓA",
    title: "Bảo vệ nguồn tài chính và sự thanh thản của gia chủ",
    description:
      "Hiện thực hóa không gian sống hoàn mỹ thông qua bản vẽ bóc tách chuẩn xác, kiểm soát rủi ro từ kết cấu móng đến hoàn thiện chi tiết. Bảo vệ nguồn tài chính của gia chủ bằng cam kết tuyệt đối không phát sinh chi phí ngoài dự toán đã phê duyệt.",
    footerNote: "Minh bạch 100% tài chính và nguồn gốc xuất xứ vật liệu",
    iconVariant: "dark",
  },
];

export const ABOUT_CORE_VALUES_HEADER = {
  eyebrow: "NỀN TẢNG TRIẾT LÝ",
  title: "4 Trụ cột giá trị cốt lõi",
  description:
    "Các nguyên tắc bất biến định hướng cho từng nét vẽ phác thảo, từng biên bản nghiệm thu cốt thép và từng ứng xử với đối tác và khách hàng.",
} as const;

export const ABOUT_CORE_VALUES: AboutCoreValueItem[] = [
  {
    id: "value-quality",
    tag: "01 / NĂNG LỰC",
    title: "Chất lượng khắt khe",
    description:
      "Chuẩn mực kỹ thuật khắt khe từng milimet. Tuyển chọn vật liệu tự nhiên cao cấp từ nguồn mỏ uy tín: đá tự nhiên, gỗ teak xử lý sấy nhật, kết cấu thép chuẩn chứng chỉ kiểm định.",
    footerNote: "Sai số nghiệm thu < 3mm",
  },
  {
    id: "value-creative",
    tag: "02 / THẨM MỸ",
    title: "Sáng tạo độc bản",
    description:
      "Tuyệt đối không lạm dụng thiết kế dập khuôn. Mỗi công trình là một tác phẩm được sáng tạo dựa trên nhân sinh quan, gu thẩm mỹ và phong cách sống riêng biệt của từng chủ nhân.",
    footerNote: "100% Hồ sơ độc bản",
  },
  {
    id: "value-transparent",
    tag: "03 / TRUNG THỰC",
    title: "Minh bạch tài chính",
    description:
      "Bóc tách khối lượng chi tiết từng chủng loại hạng mục, mác xi măng đến mét vuông ốp lát. Minh bạch nguồn gốc CO/CQ vật tư nhập khẩu. Không bao giờ tồn tại chi phí ngầm.",
    footerNote: "Dự toán khóa cứng 100%",
  },
  {
    id: "value-care",
    tag: "04 / TRÁCH NHIỆM",
    title: "Tận tâm đồng hành",
    description:
      "Chúng tôi đồng hành sát sao từ phác thảo sơ bộ ban đầu đến thời khắc gia chủ đón ánh bình minh đầu tiên trong ngôi nhà mới, tiếp nối là chính sách bảo hành kết cấu 10 năm và chăm sóc bảo trì định kỳ trọn đời.",
    footerNote: "Bảo trì kỹ thuật 24/7",
  },
];

export const ABOUT_CAPABILITIES_HEADER = {
  eyebrow: "NĂNG LỰC TOÀN DIỆN",
  title: "Năng lực thiết kế & Tổng thầu thi công đồng bộ",
  description:
    "Sức mạnh của ARCHITECTURA nằm ở khả năng tích hợp hoàn chỉnh hai mắt xích cốt lõi: Studio thiết kế tư duy sáng tạo cao cấp và Công ty xây lắp kỷ luật quân đội.",
} as const;

export const ABOUT_CAPABILITY_METRICS: AboutCapabilityMetric[] = [
  { value: 12, suffix: "+", label: "Năm kinh nghiệm" },
  { value: 100, suffix: "%", label: "Kỹ sư chính quy ĐH" },
  { value: 0, suffix: "%", label: "Phát sinh chi phí HĐ" },
];

export const ABOUT_CAPABILITY_GROUPS: AboutCapabilityGroup[] = [
  {
    id: "design",
    eyebrow: "PHÂN KHỐI 01",
    title: "Năng lực Thiết kế & Sáng tạo",
    items: [
      {
        id: "cap-design-1",
        title: "Thiết kế Kiến trúc Biệt thự & Dinh thự",
        description:
          "Nghiên cứu hình khối khí hậu nhiệt đới, tối ưu hóa mặt tự nhiên, giải pháp làm chậm nắng và chống bức xạ nhiệt thông minh.",
      },
      {
        id: "cap-design-2",
        title: "Nội thất Hiện đại & Tân cổ điển Tinh hoa",
        description:
          "Tạo dựng chiều sâu thị giác thông qua tỉ lệ vàng, sử dụng vật liệu tự nhiên tinh lọc với hệ đèn chiếu sáng kịch bản phân tầng.",
      },
      {
        id: "cap-design-3",
        title: "Quy hoạch Cảnh quan & Mặt nước",
        description:
          "Thiết kế hồ bơi vô cực, vườn thiền phong cách Nhật hoặc vườn nhiệt đới xanh mát hòa quyện hữu cơ với kiến trúc chính.",
      },
      {
        id: "cap-design-4",
        title: "Diễn họa 3D Chân thực (VR / Lumion Pro)",
        description:
          "Gia chủ trải nghiệm không gian sống tương lai sống động với độ chính xác đến từng nguồn sáng và vân đá thực tế.",
      },
    ],
  },
  {
    id: "build",
    eyebrow: "PHÂN KHỐI 02",
    title: "Năng lực Thi công & Giám sát",
    items: [
      {
        id: "cap-build-1",
        title: "Xây dựng Phần thô Tiêu chuẩn Cao cấp",
        description:
          "Cốp pha phủ phim chất lượng cao, cốt thép gia cường theo tiêu chuẩn TCVN & Eurocodes, nghiệm thu mác bê tông bằng súng siêu âm.",
      },
      {
        id: "cap-build-2",
        title: "Thi công Hoàn thiện Đá Tự nhiên & Gỗ Quý",
        description:
          "Kỹ thuật ốp lát tế bào chống thấm 4 lớp, đường ron mạch đồng đều 1.5mm, phủ bóng và xử lý chống ố chuyên sâu bảo vệ vật liệu.",
      },
      {
        id: "cap-build-3",
        title: "Giám sát Camera AI Trực tuyến 24/7",
        description:
          "Hệ thống camera kết nối di động để chủ nhà kiểm tra công trường mọi lúc, báo cáo nhật ký thi công điện tử cập nhật hằng ngày.",
      },
      {
        id: "cap-build-4",
        title: "Đội ngũ Thợ Nghệ Tuyển chọn Thế hệ",
        description:
          "Hơn 300 nghệ nhân và thợ lành nghề gắn bó lâu năm, được đào tạo định kỳ về an toàn lao động và kỹ thuật thi công tinh xảo.",
      },
    ],
  },
];

export const ABOUT_TEAM_HEADER = {
  eyebrow: "CON NGƯỜI LÀ TRỌNG TÂM",
  title: "Ban lãnh đạo & Đội ngũ Chuyên gia",
  description:
    "Sự kết hợp giữa tư duy học thuật hàn lâm quốc tế và vốn kinh nghiệm thực chiến dày dạn tại điều kiện thổ nhưỡng, khí hậu Việt Nam.",
} as const;

export const ABOUT_TEAM_MEMBERS: AboutTeamMember[] = [
  {
    id: "member-lam",
    name: "KTS. Trần Hoàng Lâm",
    role: "SÁNG LẬP & GIÁM ĐỐC THIẾT KẾ",
    bio: "15+ năm kinh nghiệm. Cựu tu nghiệp Trường Kiến trúc Paris - Belleville (Pháp). Chủ trì hơn 120 dự án biệt thự tư gia và khu nghỉ dưỡng cao cấp.",
    credential: "Thạc sĩ Kiến trúc sư • Hội KTS VN",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "member-mai",
    name: "KTS. Lê Phương Mai",
    role: "TRƯỞNG PHÒNG NỘI THẤT & CẢNH QUAN",
    bio: "12+ năm kinh nghiệm chuyên sâu về nội thất xa xỉ và thiết kế vi khí hậu sinh thái. Chuyển giao phối hợp chất liệu bản địa với phong cách Wabi-Sabi hiện đại.",
    credential: "Cử nhân ĐH Kiến trúc Hà Nội",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "member-dung",
    name: "KS. Nguyễn Quốc Dũng",
    role: "GIÁM ĐỐC THI CÔNG & GIÁM SÁT KỸ THUẬT",
    bio: "16+ năm kinh nghiệm làm chỉ huy trưởng tại các tổng thầu xây dựng hạng I. Trực tiếp điều phối và nghiệm thu kỹ thuật hơn 90 công trình biệt thự cao tầng.",
    credential: "Kỹ sư Xây dựng Cầu đường & Dân dụng",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "member-quan",
    name: "KTS. Đặng Minh Quân",
    role: "CHUYÊN GIA QUY HOẠCH & KIẾN TRÚC XANH",
    bio: "10+ năm kinh nghiệm tư vấn chứng chỉ công trình xanh LOTUS và LEED. Tiên phong giải pháp thông gió chéo tự nhiên và tối ưu sử dụng năng lượng mặt trời.",
    credential: "Chứng chỉ KTS Xanh Quốc Tế (LEED AP)",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
];

export const ABOUT_PROCESS_HEADER = {
  eyebrow: "QUY TRÌNH CHUẨN MỰC",
  title: "Hệ quy trình làm việc 6 bước nghiêm ngặt",
  description:
    "Kiểm soát tiến độ và chất lượng qua các mốc bàn giao rõ ràng, bảo vệ khách hàng khỏi sự mơ hồ và mọi phát sinh ngoài ý muốn.",
} as const;

export const ABOUT_PROCESS_STEPS: AboutProcessStep[] = [
  {
    id: "about-step-1",
    number: "01",
    title: "Khảo sát & Tư vấn sâu",
    description:
      "Trực tiếp đo đạc địa hình bằng máy laser, thẩm định thổ nhưỡng, quan trắc hướng nắng, hướng gió và phỏng vấn chi tiết thói quen sinh hoạt của từng thành viên trong gia đình.",
    durationLabel: "Thời gian: 3 - 5 ngày",
  },
  {
    id: "about-step-2",
    number: "02",
    title: "Phương án ý tưởng & 3D",
    description:
      "Trình bày mặt bằng công năng tối ưu và 02 phương án kiến trúc 3D phối cảnh ánh sáng thực tế. Thảo luận và tinh chỉnh cho tới khi đạt sự đồng thuận tuyệt đối của gia chủ.",
    durationLabel: "Thời gian: 15 - 20 ngày",
  },
  {
    id: "about-step-3",
    number: "03",
    title: "Hồ sơ kỹ thuật thi công",
    description:
      "Xuất bộ hồ sơ dày hơn 300 trang bao gồm: chi tiết kết cấu móng cột, hệ thống cơ điện thông minh (M&E), chi tiết ốp lát, bố trí cấp thoát nước và hồ sơ xin cấp phép xây dựng.",
    durationLabel: "Thời gian: 25 - 30 ngày",
  },
  {
    id: "about-step-4",
    number: "04",
    title: "Dự toán chi tiết minh bạch",
    description:
      "Bóc tách định mức vật tư đến từng hạng mục nhỏ. Trình mẫu vật liệu thực tế để gia chủ trực tiếp kiểm tra và ký duyệt. Ký phụ lục cam kết không phát sinh chi phí hợp đồng.",
    durationLabel: "Thời gian: 7 - 10 ngày",
  },
  {
    id: "about-step-5",
    number: "05",
    title: "Triển khai & Giám sát 24/7",
    description:
      "Kỹ sư trưởng thường trực hiện trường, nghiệm thu theo giai đoạn cốt móng, đổ sàn, chống thấm. Kết nối camera theo dõi trực tuyến và lập biên bản kiểm tra chất lượng định kỳ.",
    durationLabel: "Tiến độ theo cam kết",
  },
  {
    id: "about-step-6",
    number: "06",
    title: "Bàn giao & Bảo hành 10 năm",
    description:
      "Vệ sinh công nghiệp tinh sạch, bàn giao chìa khóa cùng sổ bảo hành kết cấu 10 năm, thiết bị nội thất 2 năm. Đội phản ứng nhanh tiếp nhận xử lý hỗ trợ trong vòng 4 tiếng.",
    durationLabel: "Đồng hành trọn đời",
  },
];

export const ABOUT_CTA_BANNER_CONTENT: AboutCtaBannerContent = {
  badge: "ĐỒNG HÀNH KIẾN TẠO DINH THỰ CÙNG CHUYÊN GIA",
  title: "Sẵn sàng khởi tạo công trình của bạn?",
  description:
    "Hãy bắt đầu từ buổi trò chuyện cởi mở cùng các kiến trúc sư trưởng của chúng tôi để định hình phương án thiết kế tối ưu nhất cho khu đất của bạn.",
  primaryCta: {
    label: "Nhận tư vấn phương án",
    href: "/contact",
  },
  secondaryCta: {
    label: "Khám phá dự án tiêu biểu",
    href: "/projects",
  },
  highlights: [
    { id: "hl-hotline", label: "Hotline 24/7: 0947 712 626" },
    { id: "hl-office", label: "Văn phòng: Văn Quán, Hà Đông, Hà Nội" },
    { id: "hl-privacy", label: "Bảo mật tuyệt đối thông tin khách hàng" },
  ],
};
