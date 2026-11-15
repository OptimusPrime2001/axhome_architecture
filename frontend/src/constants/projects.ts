// ==============================================================================
// Axhome Architecture - Central Mock Projects Data
// ==============================================================================

import type { Project } from "@/shared-types/project";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-01",
    title: "Villa Thảo Điền Riverside",
    slug: "villa-thao-dien-riverside",
    projectType: "completed",
    category: "villa",
    style: "modern",
    location: "Nguyễn Văn Hưởng, P. Thảo Điền",
    city: "TP. Thủ Đức, TP. Hồ Chí Minh",
    completedYear: 2024,
    clientName: "Gia đình Anh T.",
    leadArchitect: "KTS. Trần Hoàng Lâm",
    constructionDuration: "14 Tháng",

    landArea: 650,
    floorArea: 820,
    floorsCount: 3,
    bedroomsCount: 5,
    facadeWidth: 22,

    excerpt:
      "Biệt thự ven sông phong cách hiện đại tối giản với hệ lam gỗ sồi chịu nước và vách kính mở rộng kết nối trọn vẹn cảnh quan thiên nhiên.",
    contentHtml: `
      <p>Tọa lạc tại khu vực ven sông Thảo Điền, công trình là sự kết hợp hài hòa giữa hình khối kiến trúc mạnh mẽ và các giải pháp vi khí hậu bản địa. Điểm nhấn là không gian thông tầng mở rộng với hệ vách kính Low-E cản nhiệt, mang trọn vẹn gió trời và tầm nhìn mặt nước vào từng góc sống.</p>
      <p>Quá trình thi công đặt ra thách thức lớn về xử lý nền đất yếu sát bờ kè sông Sài Gòn. Đội ngũ kỹ sư Axhome đã áp dụng giải pháp ép cọc ly tâm D500 kết hợp hệ giằng móng kiên cố và tường chắn cừ Larsen, kiểm soát độ lún tuyệt đối trong phạm vi tiêu chuẩn.</p>
    `,
    technicalChallenges:
      "Địa chất đất bùn sát mép sông yêu cầu hệ móng sâu và biện pháp chống thấm tầng ngầm tuyệt đối.",
    technicalSolutions:
      "Hệ móng cọc bê tông cốt thép dự ứng lực kết hợp phụ gia chống thấm tinh thể thẩm thấu Penetron cho toàn bộ phần ngầm.",

    clientTestimonial: {
      author: "Anh Nguyễn Minh Tuấn",
      role: "Chủ đầu tư Villa Thảo Điền Riverside",
      quote:
        "Điều tôi ấn tượng nhất ở Axhome là tính chính xác. Từ bản vẽ 3D đến khi bàn giao thực tế không hề có sự sai lệch. Dự toán ban đầu gần như trùng khớp hoàn toàn với quyết toán, không phát sinh chi phí.",
    },

    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-1-1",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        caption: "Mặt tiền chính nhìn từ hướng sân vườn hồ bơi",
        type: "real_photo",
        isCover: true,
      },
      {
        id: "img-1-2",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        caption:
          "Không gian phòng khách thông tầng ngập tràn ánh sáng tự nhiên",
        type: "real_photo",
      },
      {
        id: "img-1-3",
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        caption: "Khu vực bếp đảo và phòng ăn hướng view mặt nước",
        type: "real_photo",
      },
      {
        id: "img-1-4",
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng ngủ master với ban công rộng và lam chắn nắng",
        type: "real_photo",
      },
    ],
    milestones: [
      {
        id: "ms-1",
        title: "Khảo sát địa chất & Thi công móng",
        period: "Tháng 02/2023 – Tháng 04/2023",
        description:
          "Ép cọc ly tâm D500 sâu 32m, hoàn thành đài móng và hố móng tầng bán hầm.",
        isCompleted: true,
      },
      {
        id: "ms-2",
        title: "Khung kết cấu bê tông cốt thép",
        period: "Tháng 05/2023 – Tháng 08/2023",
        description:
          "Đổ sàn dầm các tầng 1, 2, 3 và cất nóc đúng tiến độ cam kết.",
        isCompleted: true,
      },
      {
        id: "ms-3",
        title: "Xây thô & Lắp đặt hệ thống MEP",
        period: "Tháng 09/2023 – Tháng 12/2023",
        description:
          "Đi âm đường điện nước, hệ thống điều hòa trung tâm VRV và trát tường phẳng.",
        isCompleted: true,
      },
      {
        id: "ms-4",
        title: "Hoàn thiện nội thất & Bàn giao",
        period: "Tháng 01/2024 – Tháng 04/2024",
        description:
          "Lắp đặt đá tự nhiên, đồ gỗ sồi, nghiệm thu kỹ thuật và trao chìa khóa.",
        isCompleted: true,
      },
    ],

    isFeatured: true,
    status: "published",
    viewCount: 3240,
    createdAt: "2024-04-15",
  },
  {
    id: "proj-02",
    title: "The Sanctuary Villa",
    slug: "the-sanctuary-villa",
    projectType: "concept",
    category: "villa",
    style: "minimalist",
    location: "Khu Đô Thị Ecopark",
    city: "Hưng Yên",
    completedYear: 2025,
    leadArchitect: "KTS. Lê Quang Dũng",

    landArea: 520,
    floorArea: 680,
    floorsCount: 3,
    bedroomsCount: 4,
    facadeWidth: 18,

    excerpt:
      "Phương án thiết kế biệt thự sinh thái nghỉ dưỡng kết hợp thiên nhiên, sử dụng mảng kính lớn và lam gỗ sồi ngoài trời tạo điểm nhấn kiến trúc độc bản.",
    contentHtml: `
      <p>The Sanctuary Villa là lời giải cho bài toán tìm kiếm không gian sống cân bằng, nơi thiên nhiên len lỏi vào từng nhịp sống thường nhật. Thiết kế tập trung vào tính tương phản giữa những mảng tường bê tông mộc và hệ vách kính tràn viền.</p>
      <p>Bản vẽ mặt bằng được tính toán chi tiết nhằm tối ưu hướng nắng và đón gió tự nhiên từ hồ điều hòa, giúp giảm thiểu tối đa năng lượng tiêu thụ cho điều hòa nhiệt độ vào mùa hè.</p>
    `,

    coverImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-2-1",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        caption: "Phối cảnh 3D tổng thể biệt thự ban ngày",
        type: "render_3d",
        isCover: true,
      },
      {
        id: "img-2-2",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        caption: "Phối cảnh 3D góc sân vườn và bể bơi vô cực",
        type: "render_3d",
      },
      {
        id: "img-2-3",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        caption: "Phối cảnh nội thất phòng khách liên thông sân trong",
        type: "render_3d",
      },
    ],
    floorPlans: [
      {
        id: "fp-1",
        name: "Mặt bằng công năng Tầng 1",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Gara 2 ô tô, Sảnh đón, Phòng khách thông tầng, Bếp & Bàn ăn, Sân vườn cảnh quan.",
        areaSquareMeters: 220,
      },
      {
        id: "fp-2",
        name: "Mặt bằng công năng Tầng 2",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Phòng Master Suite có phòng thay đồ lớn, 2 Phòng ngủ khép kín cho con, Sinh hoạt chung.",
        areaSquareMeters: 240,
      },
      {
        id: "fp-3",
        name: "Mặt bằng công năng Tầng 3 & Mái",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Phòng thiền/thờ, Phòng gym, Khu giặt phơi, Sân thượng BBQ ngắm cảnh hồ.",
        areaSquareMeters: 220,
      },
    ],

    isFeatured: true,
    status: "published",
    viewCount: 4510,
    createdAt: "2024-05-10",
  },
  {
    id: "proj-03",
    title: "The Horizon Mansion",
    slug: "the-horizon-mansion",
    projectType: "under_construction",
    category: "mansion",
    style: "neoclassic",
    location: "Khu Dinh Thự Chateau, Phú Mỹ Hưng",
    city: "Quận 7, TP. Hồ Chí Minh",
    completedYear: 2025,
    clientName: "Gia đình Chị H.",
    leadArchitect: "KTS. Nguyễn Đăng Khoa",
    constructionDuration: "18 Tháng",

    landArea: 980,
    floorArea: 1450,
    floorsCount: 4,
    bedroomsCount: 6,
    facadeWidth: 28,

    excerpt:
      "Dinh thự tân cổ điển chuẩn mực với tỷ lệ thức cột Hy Lạp kinh điển, vật liệu đá Marble tự nhiên ốp nguyên khối và sân vườn phong cách châu Âu hoàng gia.",
    contentHtml: `
      <p>The Horizon Mansion là công trình trọng điểm trong năm 2024 của Axhome, được thi công với tiêu chuẩn khắt khe nhất dành cho phân khúc siêu sang. Toàn bộ đá ốp mặt tiền là đá cẩm thạch Travertine nhập khẩu nguyên khối từ Ý.</p>
      <p>Hiện công trình đang bước vào giai đoạn hoàn thiện tinh với sự giám sát chặt chẽ của các chuyên gia kết cấu và nghệ nhân điêu khắc đá.</p>
    `,

    coverImage:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-3-1",
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
        caption: "Mặt tiền dinh thự với hàng cột thức cổ điển bề thế",
        type: "render_3d",
        isCover: true,
      },
      {
        id: "img-3-2",
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
        caption: "Ảnh thực tế tiến độ đổ bê tông sàn tầng 3",
        type: "real_photo",
      },
    ],
    milestones: [
      {
        id: "ms-3-1",
        title: "Móng cọc khoan nhồi D800",
        period: "Tháng 11/2023 – Tháng 01/2024",
        description:
          "Thi công 48 tim cọc nhồi sâu 45m và đài giằng bê tông mác 400.",
        isCompleted: true,
      },
      {
        id: "ms-3-2",
        title: "Khung bê tông cốt thép 4 tầng",
        period: "Tháng 02/2024 – Tháng 07/2024",
        description:
          "Đổ sàn không dầm sàn rỗng công nghệ mới, giảm tải trọng bản thân.",
        isCompleted: true,
      },
      {
        id: "ms-3-3",
        title: "Lắp dựng phào chỉ đá & MEP",
        period: "Tháng 08/2024 – Hiện tại",
        description:
          "Đang triển khai ốp đá mặt tiền và luồn ống điện nước cao cấp.",
        isCompleted: false,
      },
    ],

    isFeatured: true,
    status: "published",
    viewCount: 2890,
    createdAt: "2024-06-01",
  },
  {
    id: "proj-04",
    title: "An Lạc Garden Villa",
    slug: "an-lac-garden-villa",
    projectType: "completed",
    category: "villa",
    style: "indochine",
    location: "Đường Nguyễn Xiển, Long Thạnh Mỹ",
    city: "TP. Thủ Đức, TP. Hồ Chí Minh",
    completedYear: 2023,
    clientName: "Bác sĩ Hoàng Nam",
    leadArchitect: "KTS. Trần Hoàng Lâm",
    constructionDuration: "10 Tháng",

    landArea: 480,
    floorArea: 510,
    floorsCount: 2,
    bedroomsCount: 4,
    facadeWidth: 16,

    excerpt:
      "Giao thoa giữa nét hoài niệm Á Đông truyền thống và tiện nghi sống hiện đại. Ngôi nhà vườn ngập tràn bóng cây xanh, hồ cá Koi và gạch bông gió bản địa.",
    contentHtml: `
      <p>An Lạc Garden Villa mang đến cảm giác thanh tịnh và an yên ngay giữa lòng phố thị. Sử dụng vật liệu thân thiện với tự nhiên như gỗ lim, ngói đất nung, gạch hoa văn xi măng thủ công kết hợp giải pháp thông gió chéo giúp ngôi nhà luôn mát mẻ quanh năm.</p>
    `,

    coverImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-4-1",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        caption: "Hiên nhà đón gió với mái ngói dốc và hồ cá Koi",
        type: "real_photo",
        isCover: true,
      },
    ],

    isFeatured: false,
    status: "published",
    viewCount: 1980,
    createdAt: "2023-11-20",
  },
  {
    id: "proj-05",
    title: "Urban Linear Townhouse",
    slug: "urban-linear-townhouse",
    projectType: "concept",
    category: "townhouse",
    style: "modern",
    location: "Đường D2, P. 25, Quận Bình Thạnh",
    city: "TP. Hồ Chí Minh",
    completedYear: 2025,
    leadArchitect: "KTS. Lê Quang Dũng",

    landArea: 120,
    floorArea: 380,
    floorsCount: 4,
    bedroomsCount: 4,
    facadeWidth: 6,

    excerpt:
      "Giải pháp tối ưu hóa ánh sáng và đối lưu gió cho nhà phố mặt tiền hẹp với giếng trời trung tâm thông suốt 4 tầng và vườn đứng treo trong nhà.",
    contentHtml: `
      <p>Nhà phố đô thị luôn đối mặt với vấn đề thiếu sáng và bí bách. Phương án Urban Linear Townhouse đã biến nhược điểm thành điểm nhấn thông qua hệ giếng trời thông minh kết hợp cầu thang thép xương cá thanh mảnh, tạo nên dòng đối lưu liên tục từ tầng trệt lên sân thượng.</p>
    `,

    coverImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-5-1",
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        caption: "Mặt tiền nhà phố hiện đại với lam chớp nhôm xoay chuyển nắng",
        type: "render_3d",
        isCover: true,
      },
    ],

    isFeatured: false,
    status: "published",
    viewCount: 1650,
    createdAt: "2024-07-02",
  },
];
