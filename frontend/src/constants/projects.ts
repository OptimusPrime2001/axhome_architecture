// ==============================================================================
// Architectura - Central Mock Projects Data
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
      <p>Quá trình thi công đặt ra thách thức lớn về xử lý nền đất yếu sát bờ kè sông Sài Gòn. Đội ngũ kỹ sư Architectura đã áp dụng giải pháp ép cọc ly tâm D500 kết hợp hệ giằng móng kiên cố và tường chắn cừ Larsen, kiểm soát độ lún tuyệt đối trong phạm vi tiêu chuẩn.</p>
    `,
    highlights: [
      {
        title: "Hệ lam Teak tự nhiên kháng ẩm",
        description:
          "Gỗ Teak nguyên tấm xử lý nhiệt chuẩn ScandiThermo, chống cong vênh, cản tia UV tối ưu trước khí hậu ẩm nhiệt đới.",
      },
      {
        title: "Giếng trời xuyên suốt 3 tầng lầu",
        description:
          "Trục thông tầng trung tâm 18 m² kết hợp mái kính Low-E phân tán ánh sáng dịu nhẹ tới mọi không gian sinh hoạt.",
      },
      {
        title: "Nền móng cọc ly tâm sát bờ sông",
        description:
          "Ép cọc ly tâm D500 sâu 32m kết hợp phụ gia chống thấm tinh thể thẩm thấu Penetron cho toàn bộ tầng bán hầm.",
      },
      {
        title: "Kết nối trọn vẹn cảnh quan mặt nước",
        description:
          "Hệ cửa kính trượt Panorama mở rộng 90% khẩu độ, đưa gió trời và tầm nhìn sông Sài Gòn vào phòng khách.",
      },
    ],
    technicalChallenges:
      "Địa chất đất bùn sát mép sông yêu cầu hệ móng sâu và biện pháp chống thấm tầng ngầm tuyệt đối.",
    technicalSolutions:
      "Hệ móng cọc bê tông cốt thép dự ứng lực kết hợp phụ gia chống thấm tinh thể thẩm thấu Penetron cho toàn bộ phần ngầm.",

    clientTestimonial: {
      author: "Anh Nguyễn Minh Tuấn",
      role: "Chủ đầu tư Villa Thảo Điền Riverside",
      quote:
        "Điều tôi ấn tượng nhất ở Architectura là tính chính xác. Từ bản vẽ 3D đến khi bàn giao thực tế không hề có sự sai lệch. Dự toán ban đầu gần như trùng khớp hoàn toàn với quyết toán, không phát sinh chi phí.",
    },

    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-1-1",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        caption: "Mặt tiền chính nhìn từ hướng sân vườn hồ bơi",
        type: "real_photo",
        spaceCategory: "exterior_day",
        isCover: true,
      },
      {
        id: "img-1-2",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        caption:
          "Không gian phòng khách thông tầng ngập tràn ánh sáng tự nhiên",
        type: "real_photo",
        spaceCategory: "living_room",
      },
      {
        id: "img-1-3",
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        caption: "Khu vực bếp đảo và phòng ăn hướng view mặt nước",
        type: "real_photo",
        spaceCategory: "interior_other",
      },
      {
        id: "img-1-4",
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng ngủ master với ban công rộng và lam chắn nắng",
        type: "real_photo",
        spaceCategory: "interior_other",
      },
      {
        id: "img-1-5",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        caption: "Hồ bơi tràn bờ và sân vườn nhiệt đới ven sông",
        type: "real_photo",
        spaceCategory: "pool_garden",
      },
      {
        id: "img-1-6",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        caption: "Kiến trúc mặt tiền lên đèn ấn tượng về đêm",
        type: "real_photo",
        spaceCategory: "exterior_night",
      },
    ],
    floorPlans: [
      {
        id: "fp-1-1",
        name: "Mặt bằng Tầng 1 (Trệt)",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Tối ưu trục giao thông mở từ cổng đón qua phòng khách thông tầng ra thẳng hồ bơi và sân vườn ven sông.",
        areaSquareMeters: 280,
        rooms: [
          "Gara để xe ngầm & Cổng đón: Sức chứa 2 SUV cỡ lớn, tích hợp trạm sạc xe điện 22kW",
          "Phòng khách đôi thông tầng: Cao độ trần 7.2m, tầm nhìn 180 độ ra hồ bơi",
          "Bếp ướt & Bếp khô liên hoàn: Đảo bếp đá thạch anh tự nhiên, thiết bị âm tủ đồng bộ",
          "Terrace ẩm thực ven hồ bơi: Mái che lam gỗ xoay tự động cho tiệc BBQ ngoài trời",
        ],
      },
      {
        id: "fp-1-2",
        name: "Mặt bằng Tầng 2",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Không gian nghỉ ngơi riêng tư với 3 phòng ngủ khép kín và phòng sinh hoạt chung gia đình kết nối giếng trời.",
        areaSquareMeters: 270,
        rooms: [
          "Master Suite hướng sông: Diện tích 68 m² kèm walk-in closet và bồn tắm view cảnh quan",
          "02 Phòng ngủ Junior: Ban công riêng, thông gió đối lưu tự nhiên 2 mặt",
          "Phòng sinh hoạt chung & Thư viện nhỏ: Kết nối trực tiếp khoảng thông tầng trung tâm",
        ],
      },
      {
        id: "fp-1-3",
        name: "Mặt bằng Tầng 3",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Tổ hợp phòng thờ trang nghiêm, phòng tập thể thao tại gia, phòng ngủ khách và sân thượng thư giãn.",
        areaSquareMeters: 270,
        rooms: [
          "Không gian thờ gia tiên: Bố trí chuẩn phong thủy, tách biệt hoàn toàn khu giải trí",
          "Phòng Gym & Yoga: Vách kính chống ồn nhìn ra vườn treo sân thượng",
          "02 Phòng ngủ khách + Khu giặt phơi kín đáo có giếng trời lấy nắng",
        ],
      },
      {
        id: "fp-1-4",
        name: "Mặt bằng Mái & Thoát nước",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Giải pháp mái dốc chống nóng kết hợp thu hồi nước mưa tuần hoàn tưới cảnh quan và hệ thống năng lượng mặt trời.",
        areaSquareMeters: 245,
        rooms: [
          "Độ dốc thoát nước 2% về phễu thu đôi chống tràn khi mưa lớn",
          "Lớp chống nóng 3 tầng: Bê tông nhẹ + Xốp XPS + Gạch mát phản xạ nhiệt",
          "Khu kỹ thuật đặt máy nóng lạnh trung tâm Heatpump & Pin mặt trời áp mái",
        ],
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
    constructionDuration: "45 ngày thiết kế",

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
    highlights: [
      {
        title: "Hệ lam Teak tự nhiên kháng ẩm",
        description:
          "Gỗ Teak nguyên tấm tuyển chọn xử lý nhiệt ScandiThermo, đảm bảo không cong vênh và cản tia UV tối ưu.",
      },
      {
        title: "Giếng trời xuyên suốt 3 tầng lầu",
        description:
          "Trục thông tầng trung tâm 18 m² với mái kính Low-E phân tán sáng dịu đều tới từng phòng ngủ.",
      },
      {
        title: "Đá Travertine nguyên khối nhập khẩu",
        description:
          "Tường vách chính ốp đá Travertine vân rỗ tự nhiên từ Ý mang lại xúc giác sang trọng và cách âm tự nhiên.",
      },
      {
        title: "Tiết kiệm năng lượng chuẩn Lotus Gold",
        description:
          "Tích hợp thu hồi nước mưa cho cảnh quan sân vườn và hệ kính 3 lớp giảm hơn 42% tiêu thụ điều hòa.",
      },
    ],

    coverImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-2-1",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        caption: "Phối cảnh 3D tổng thể biệt thự ban ngày",
        type: "render_3d",
        spaceCategory: "exterior_day",
        isCover: true,
      },
      {
        id: "img-2-2",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        caption: "Hồ bơi tràn bờ & Sân vườn nhiệt đới",
        type: "render_3d",
        spaceCategory: "pool_garden",
      },
      {
        id: "img-2-3",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng khách thông tầng hướng hồ bơi",
        type: "render_3d",
        spaceCategory: "living_room",
      },
      {
        id: "img-2-4",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        caption: "Kiến trúc mặt tiền ban đêm",
        type: "render_3d",
        spaceCategory: "exterior_night",
      },
      {
        id: "img-2-5",
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng ngủ Master tầng 2",
        type: "render_3d",
        spaceCategory: "interior_other",
      },
    ],
    floorPlans: [
      {
        id: "fp-1",
        name: "Mặt bằng Tầng 1 (Trệt)",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Bố trí không gian sinh hoạt chung mở hoàn toàn ra sân vườn và hồ bơi vô cực.",
        areaSquareMeters: 248,
        rooms: [
          "Gara để xe ngầm & Cổng đón: Sức chứa 2 SUV cỡ lớn và 4 xe máy",
          "Phòng khách đôi thông tầng: Cao độ 7.2m hướng tầm nhìn 180 độ ra hồ bơi",
          "Bếp ướt & Khô liên hoàn: Đảo bếp đá thạch anh tự nhiên",
          "Terrace ẩm thực ven hồ bơi: Mái che lam gỗ xoay tự động",
        ],
      },
      {
        id: "fp-2",
        name: "Mặt bằng Tầng 2",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Phòng Master Suite có phòng thay đồ lớn, 2 Phòng ngủ khép kín và sảnh sinh hoạt chung.",
        areaSquareMeters: 224,
        rooms: [
          "Phòng Master Suite: Diện tích 62 m², ban công riêng ngắm vườn",
          "02 Phòng ngủ con khép kín với hệ tủ âm tường tối ưu diện tích",
          "Phòng sinh hoạt chung kết nối trục giếng trời trung tâm",
        ],
      },
      {
        id: "fp-3",
        name: "Mặt bằng Tầng 3",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Phòng thiền/thờ, Phòng gym, Khu giặt phơi và Sân thượng BBQ ngắm cảnh hồ.",
        areaSquareMeters: 208,
        rooms: [
          "Phòng thờ & Không gian thiền yên tĩnh hướng Đông Nam",
          "Phòng Gym & Sauna thư giãn",
          "Sân thượng BBQ ngoài trời & Khu giặt phơi thông thoáng",
        ],
      },
      {
        id: "fp-4",
        name: "Mặt bằng Mái & Thoát nước",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Hệ mái chống nóng đa lớp tích hợp thu hồi nước mưa tuần hoàn cho cảnh quan sân vườn.",
        areaSquareMeters: 215,
        rooms: [
          "Hệ thống thu hồi nước mưa tuần hoàn tưới cây tự động",
          "Mái kính Low-E 3 lớp trên trục giếng trời trung tâm",
          "Sàn kỹ thuật đặt dàn nóng trung tâm VRV & điện mặt trời",
        ],
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
      <p>The Horizon Mansion là công trình trọng điểm trong năm 2024 của Architectura, được thi công với tiêu chuẩn khắt khe nhất dành cho phân khúc siêu sang. Toàn bộ đá ốp mặt tiền là đá cẩm thạch Travertine nhập khẩu nguyên khối từ Ý.</p>
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
        spaceCategory: "exterior_day",
        isCover: true,
      },
      {
        id: "img-3-2",
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
        caption: "Ảnh thực tế tiến độ đổ bê tông sàn tầng 3",
        type: "real_photo",
        spaceCategory: "exterior_day",
      },
      {
        id: "img-3-3",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        caption: "Đại sảnh phòng khách thông tầng với đèn chùm pha lê",
        type: "render_3d",
        spaceCategory: "living_room",
      },
      {
        id: "img-3-4",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        caption: "Phối cảnh chiếu sáng mặt đứng dinh thự ban đêm",
        type: "render_3d",
        spaceCategory: "exterior_night",
      },
      {
        id: "img-3-5",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        caption: "Khuôn viên hồ bơi & sân vườn phong cách châu Âu",
        type: "render_3d",
        spaceCategory: "pool_garden",
      },
    ],
    floorPlans: [
      {
        id: "fp-3-1",
        name: "Mặt bằng Tầng 1 (Trệt)",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Đại sảnh tiếp đón hoàng gia, phòng khách lớn, phòng ăn yến tiệc 16 chỗ và bếp chính.",
        areaSquareMeters: 380,
        rooms: [
          "Đại sảnh thông tầng cao 8m kết hợp thang bộ uốn lượn đối xứng",
          "Phòng khách chính & Phòng trà tiếp khách VIP hướng sân vườn",
          "Phòng ăn yến tiệc kết nối bếp Á - Âu tách biệt",
        ],
      },
      {
        id: "fp-3-2",
        name: "Mặt bằng Tầng 2",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Tầng nghỉ ngơi của gia chủ với Master Suite rộng 110 m² và 2 phòng ngủ tiêu chuẩn khách sạn 5 sao.",
        areaSquareMeters: 360,
        rooms: [
          "Master Suite 110 m²: Phòng ngủ, phòng thay đồ Walk-in, Spa tại gia",
          "02 Phòng ngủ Junior Suite khép kín kèm ban công đá chạm khắc",
        ],
      },
      {
        id: "fp-3-3",
        name: "Mặt bằng Tầng 3 & Áp mái",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Không gian giải trí gia đình gồm phòng chiếu phim, hầm rượu, phòng thờ và sân vườn trên cao.",
        areaSquareMeters: 350,
        rooms: [
          "Phòng chiếu phim gia đình cách âm tiêu chuẩn Dolby Atmos",
          "Phòng thờ trang nghiêm & Phòng đọc sách yên tĩnh",
          "Hệ thống thang máy lồng kính kết nối xuyên suốt 4 tầng",
        ],
      },
      {
        id: "fp-3-4",
        name: "Mặt bằng Mái & Thoát nước",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Hệ mái Mansard lợp đá tự nhiên chống nóng kết hợp thu gom nước mưa và kỹ thuật điều hòa trung tâm.",
        areaSquareMeters: 360,
        rooms: [
          "Hệ mái Mansard lợp ngói đá phiến tự nhiên cách nhiệt đa lớp",
          "Hệ thống thu nước mưa âm tường tránh lộ ống kỹ thuật mặt đứng",
        ],
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
        spaceCategory: "exterior_day",
        isCover: true,
      },
      {
        id: "img-4-2",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng khách phong cách Đông Dương với nội thất gỗ tự nhiên",
        type: "real_photo",
        spaceCategory: "living_room",
      },
      {
        id: "img-4-3",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        caption: "Sân vườn nhiệt đới và chòi trà thư giãn bên hồ",
        type: "real_photo",
        spaceCategory: "pool_garden",
      },
      {
        id: "img-4-4",
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        caption: "Không gian bếp ăn ấm cúng với gạch bông thủ công",
        type: "real_photo",
        spaceCategory: "interior_other",
      },
      {
        id: "img-4-5",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        caption: "Ánh sáng vàng ấm áp tại hiên nhà vào buổi tối",
        type: "real_photo",
        spaceCategory: "exterior_night",
      },
    ],
    floorPlans: [
      {
        id: "fp-4-1",
        name: "Mặt bằng Tầng 1 (Trệt)",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Hàng hiên rộng 3m bao quanh phòng khách, bếp ăn mở ra hồ cá Koi và vườn cây ăn trái.",
        areaSquareMeters: 265,
        rooms: [
          "Hiên nhà truyền thống kết nối trực tiếp hồ cá Koi và sân vườn",
          "Phòng khách trung tâm trần cao thoáng, thông gió tự nhiên 3 mặt",
          "Phòng ngủ ông bà tầng trệt tiện lợi di chuyển",
        ],
      },
      {
        id: "fp-4-2",
        name: "Mặt bằng Tầng 2",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "03 phòng ngủ hướng vườn, phòng thờ gỗ lim và ban công rộng ngắm cảnh.",
        areaSquareMeters: 245,
        rooms: [
          "Phòng ngủ Master kết hợp ban công rộng nhìn ra toàn bộ khu vườn",
          "02 Phòng ngủ con với cửa sổ lá sách gỗ truyền thống",
          "Phòng thờ gia tiên trang trọng ở vị trí trung tâm tầng 2",
        ],
      },
      {
        id: "fp-4-3",
        name: "Mặt bằng Mái & Thoát nước",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Mái ngói đất nung 2 lớp chống nóng, thu hồi nước mưa cho hồ cảnh quan.",
        areaSquareMeters: 280,
        rooms: [
          "Hệ vì kèo thép mạ kẽm lợp ngói đất nung truyền thống",
          "Máng thu nước mưa ẩn và bồn lọc nước tưới sân vườn",
        ],
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
    constructionDuration: "30 ngày thiết kế",

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
        spaceCategory: "exterior_day",
        isCover: true,
      },
      {
        id: "img-5-2",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng khách đón sáng tự nhiên từ giếng trời trung tâm",
        type: "render_3d",
        spaceCategory: "living_room",
      },
      {
        id: "img-5-3",
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        caption: "Khu bếp ăn kết nối mảng xanh tiểu cảnh thông tầng",
        type: "render_3d",
        spaceCategory: "interior_other",
      },
      {
        id: "img-5-4",
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng ngủ Master tối giản với cửa sổ kính chống ồn",
        type: "render_3d",
        spaceCategory: "interior_other",
      },
      {
        id: "img-5-5",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        caption: "Hiệu ứng đèn hắt lam mặt tiền vào ban đêm",
        type: "render_3d",
        spaceCategory: "exterior_night",
      },
    ],
    floorPlans: [
      {
        id: "fp-5-1",
        name: "Mặt bằng Tầng 1 (Trệt)",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Khu vực gara ô tô phía trước, phòng khách liên thông bếp ăn và sân sau lấy gió.",
        areaSquareMeters: 95,
        rooms: [
          "Sân trước & Gara ô tô 4-7 chỗ có vách ngăn khói",
          "Phòng khách & Bếp ăn liên hoàn bên dưới giếng trời xanh",
        ],
      },
      {
        id: "fp-5-2",
        name: "Mặt bằng Tầng 2 & 3",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Mỗi tầng bố trí 2 phòng ngủ trước - sau đều tiếp xúc trực tiếp ánh sáng tự nhiên.",
        areaSquareMeters: 190,
        rooms: [
          "04 Phòng ngủ khép kín chia đều 2 tầng, thông gió qua giếng trời giữa nhà",
          "Cầu thang thép xương cá tối ưu diện tích và độ thoáng",
        ],
      },
      {
        id: "fp-5-3",
        name: "Mặt bằng Tầng 4 & Mái",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Phòng thờ, phòng giặt phơi, vườn rau sân thượng và mái kính giếng trời thoát nhiệt.",
        areaSquareMeters: 95,
        rooms: [
          "Phòng thờ yên tĩnh phía trước + Sân thượng tiểu cảnh thư giãn",
          "Mái kính giếng trời có khe thoát khí nóng tự nhiên",
        ],
      },
    ],

    isFeatured: false,
    status: "published",
    viewCount: 1650,
    createdAt: "2024-07-02",
  },
  {
    id: "proj-06",
    title: "The Stone & Glass Pavilion",
    slug: "the-stone-glass-pavilion",
    projectType: "concept",
    category: "villa",
    style: "minimalist",
    location: "Bán đảo Sơn Trà",
    city: "TP. Đà Nẵng",
    completedYear: 2025,
    leadArchitect: "KTS. Trần Hoàng Lâm",
    constructionDuration: "40 ngày thiết kế",

    landArea: 480,
    floorArea: 540,
    floorsCount: 2,
    bedroomsCount: 4,
    facadeWidth: 15,

    excerpt:
      "Tinh thần tối giản với đá tự nhiên xám mộc, tường bê tông áp khuôn và hồ bơi vô cực hướng trọn tầm nhìn vịnh biển.",
    contentHtml: `
      <p>The Stone & Glass Pavilion khai thác vẻ đẹp nguyên bản của đá tự nhiên và bê tông trần kết hợp hệ kính khổ lớn tràn viền, mở ra tầm nhìn panorama hướng biển Đông.</p>
    `,

    coverImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-6-1",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        caption: "Phối cảnh tổng thể hồ bơi vô cực và khối kiến trúc đá xám",
        type: "render_3d",
        spaceCategory: "exterior_day",
        isCover: true,
      },
      {
        id: "img-6-2",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        caption: "Hồ bơi vô cực hướng vịnh biển Sơn Trà",
        type: "render_3d",
        spaceCategory: "pool_garden",
      },
      {
        id: "img-6-3",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng khách kính panorama không cột góc",
        type: "render_3d",
        spaceCategory: "living_room",
      },
      {
        id: "img-6-4",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        caption: "Biệt thự đá kính lung linh dưới ánh đèn hoàng hôn",
        type: "render_3d",
        spaceCategory: "exterior_night",
      },
      {
        id: "img-6-5",
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng ngủ Master view biển 180 độ",
        type: "render_3d",
        spaceCategory: "interior_other",
      },
    ],
    floorPlans: [
      {
        id: "fp-6-1",
        name: "Mặt bằng Tầng 1 (Trệt)",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Không gian sinh hoạt mở hoàn toàn về phía biển với hồ bơi tràn viền và deck gỗ Teak.",
        areaSquareMeters: 280,
        rooms: [
          "Phòng khách & Bếp đảo mở view vịnh biển không vách ngăn",
          "Hồ bơi vô cực tràn bờ dài 14m + Sàn tắm nắng gỗ Teak",
        ],
      },
      {
        id: "fp-6-2",
        name: "Mặt bằng Tầng 2",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "04 phòng ngủ đều sở hữu ban công kính cường lực hướng biển và bồn tắm ngoài trời.",
        areaSquareMeters: 260,
        rooms: [
          "Master Suite hướng Đông Nam đón bình minh trên biển",
          "03 Phòng ngủ khách chuẩn resort 5 sao",
        ],
      },
      {
        id: "fp-6-3",
        name: "Mặt bằng Mái & Thoát nước",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Mái bằng bê tông dự ứng lực chống gió bão cấp 14 và lớp cách nhiệt chống muối biển.",
        areaSquareMeters: 260,
        rooms: [
          "Sàn mái bê tông chống thấm 2 lớp kháng mặn gió biển",
          "Hệ thống thoát nước mưa âm sàn chống ngập cục bộ",
        ],
      },
    ],

    isFeatured: false,
    status: "published",
    viewCount: 2450,
    createdAt: "2024-08-18",
  },
  {
    id: "proj-07",
    title: "Hải Phòng Heritage Mansion",
    slug: "hai-phong-heritage-mansion",
    projectType: "completed",
    category: "mansion",
    style: "neoclassic",
    location: "Lê Hồng Phong, Q. Hải An",
    city: "TP. Hải Phòng",
    completedYear: 2023,
    clientName: "Gia đình Ông H.",
    leadArchitect: "KTS. Đặng Minh Quân",
    constructionDuration: "16 Tháng",

    landArea: 520,
    floorArea: 960,
    floorsCount: 4,
    bedroomsCount: 6,
    facadeWidth: 18,

    excerpt:
      "Dinh thự tân cổ điển với tỷ lệ cột thức chuẩn mực, hệ vòm đá Marble nhập khẩu và giải pháp thang máy kính gia đình sang trọng.",
    contentHtml: `
      <p>Hải Phòng Heritage Mansion kết hợp ngôn ngữ Tân cổ điển tiết chế cùng hệ thống cơ điện thông minh, xử lý nền móng cọc khoan nhồi chịu tải trọng lớn.</p>
    `,

    coverImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-7-1",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        caption: "Mặt đứng dinh thự hoàn thiện bàn giao năm 2023",
        type: "real_photo",
        spaceCategory: "exterior_day",
        isCover: true,
      },
      {
        id: "img-7-2",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng khách Tân cổ điển ốp đá Marble tự nhiên",
        type: "real_photo",
        spaceCategory: "living_room",
      },
      {
        id: "img-7-3",
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        caption: "Phòng ăn gia đình kết nối sảnh thang máy kính",
        type: "real_photo",
        spaceCategory: "interior_other",
      },
      {
        id: "img-7-4",
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
        caption: "Hệ cột thức mặt tiền lên đèn sang trọng về đêm",
        type: "real_photo",
        spaceCategory: "exterior_night",
      },
    ],
    floorPlans: [
      {
        id: "fp-7-1",
        name: "Mặt bằng Tầng 1 (Trệt)",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Sảnh đón sang trọng, phòng khách lớn, phòng ăn và bếp nấu tách biệt.",
        areaSquareMeters: 250,
        rooms: [
          "Đại sảnh ốp đá Marble Ý kèm thang máy lồng kính gia đình",
          "Phòng khách Tân cổ điển tiếp khách đối tác",
        ],
      },
      {
        id: "fp-7-2",
        name: "Mặt bằng Tầng 2 & 3",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Không gian sinh hoạt riêng tư gồm Master Suite và 5 phòng ngủ tiện nghi.",
        areaSquareMeters: 480,
        rooms: [
          "Master Suite tầng 2 rộng rãi kèm phòng thay đồ riêng",
          "05 Phòng ngủ khép kín phân bố hợp lý tại tầng 2 và tầng 3",
        ],
      },
      {
        id: "fp-7-3",
        name: "Mặt bằng Tầng 4 & Mái",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Phòng thờ gia tiên, phòng giải trí gia đình và hệ mái chóp Tân cổ điển.",
        areaSquareMeters: 230,
        rooms: [
          "Phòng thờ gỗ gõ đỏ chạm khắc thủ công",
          "Hệ mái chống nóng và thu hồi nước mưa tiêu chuẩn châu Âu",
        ],
      },
    ],

    isFeatured: false,
    status: "published",
    viewCount: 2890,
    createdAt: "2023-09-12",
  },
  {
    id: "proj-08",
    title: "Heritage Contemporary Townhouse",
    slug: "heritage-contemporary-townhouse",
    projectType: "completed",
    category: "townhouse",
    style: "indochine",
    location: "Quận 3",
    city: "TP. Hồ Chí Minh",
    completedYear: 2024,
    clientName: "Gia đình Chị M.",
    leadArchitect: "KTS. Lê Phương Mai",
    constructionDuration: "9 Tháng",

    landArea: 160,
    floorArea: 420,
    floorsCount: 4,
    bedroomsCount: 4,
    facadeWidth: 7,

    excerpt:
      "Giải pháp nhà phố đón sáng tự nhiên qua giếng trời trung tâm, gạch thông gió gốm đất nung và nội thất Đông Dương đương đại.",
    contentHtml: `
      <p>Công trình tái hiện nét duyên dáng của kiến trúc Đông Dương trên quỹ đất nhà phố trung tâm, cân bằng giữa sự riêng tư và thông gió tự nhiên.</p>
    `,

    coverImage:
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-8-1",
        url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
        caption: "Mặt tiền gạch bông gió và hệ cửa gỗ tự nhiên",
        type: "real_photo",
        spaceCategory: "exterior_day",
        isCover: true,
      },
      {
        id: "img-8-2",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        caption:
          "Phòng khách Đông Dương đương đại ngập tràn ánh sáng giếng trời",
        type: "real_photo",
        spaceCategory: "living_room",
      },
      {
        id: "img-8-3",
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        caption: "Không gian bếp ăn gia đình với hệ tủ gỗ kết hợp mây tre đan",
        type: "real_photo",
        spaceCategory: "interior_other",
      },
      {
        id: "img-8-4",
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        caption: "Hiệu ứng ánh sáng xuyên qua lớp gạch bông gió vào ban đêm",
        type: "real_photo",
        spaceCategory: "exterior_night",
      },
    ],
    floorPlans: [
      {
        id: "fp-8-1",
        name: "Mặt bằng Tầng 1 (Trệt)",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Khoảng sân đệm trồng cây xanh, phòng khách, bếp ăn và tiểu cảnh giếng trời.",
        areaSquareMeters: 110,
        rooms: [
          "Sân đệm xanh giảm bụi và tiếng ồn đường phố",
          "Phòng khách & Bếp ăn kết nối trực tiếp giếng trời trung tâm",
        ],
      },
      {
        id: "fp-8-2",
        name: "Mặt bằng Tầng 2 & 3",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "04 phòng ngủ thông thoáng với lớp gạch bông gió chắn nắng Tây.",
        areaSquareMeters: 210,
        rooms: [
          "02 Phòng ngủ mỗi tầng có ban công cây xanh riêng",
          "Lớp tường gạch bông gió giúp giảm 4–5°C bức xạ nhiệt",
        ],
      },
      {
        id: "fp-8-3",
        name: "Mặt bằng Tầng 4 & Mái",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Phòng thờ, sân thượng trồng hoa giấy và mái kính lấy sáng giếng trời.",
        areaSquareMeters: 100,
        rooms: [
          "Phòng thờ truyền thống kết hợp sân vườn trên cao",
          "Mái kính giếng trời có lam chớp thoát khí nóng",
        ],
      },
    ],

    isFeatured: false,
    status: "published",
    viewCount: 2110,
    createdAt: "2024-03-22",
  },
  {
    id: "proj-09",
    title: "Danang Oceanfront Residence",
    slug: "danang-oceanfront-residence",
    projectType: "under_construction",
    category: "mansion",
    style: "modern",
    location: "Võ Nguyên Giáp, Q. Ngũ Hành Sơn",
    city: "TP. Đà Nẵng",
    completedYear: 2025,
    clientName: "Gia đình Anh K.",
    leadArchitect: "KS. Nguyễn Quốc Dũng",
    constructionDuration: "18 Tháng (Cất nóc & Xây thô)",

    landArea: 850,
    floorArea: 1180,
    floorsCount: 3,
    bedroomsCount: 6,
    facadeWidth: 24,

    excerpt:
      "Giai đoạn kiểm tra siêu âm cốt thép, chống thấm đa tầng kháng mặn gió biển và lắp đặt hệ thống ống luồn dây điện chống cháy chuẩn châu Âu.",
    contentHtml: `
      <p>Công trình dinh thự mặt biển đang bước vào giai đoạn hoàn thiện kỹ thuật MEP và ốp đá tự nhiên chống ăn mòn hơi muối biển.</p>
    `,

    coverImage:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      {
        id: "img-9-1",
        url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
        caption: "Hiện trạng cất nóc và hoàn thiện khối kết cấu mặt biển",
        type: "real_photo",
        spaceCategory: "exterior_day",
        isCover: true,
      },
      {
        id: "img-9-2",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        caption: "Phối cảnh hồ bơi vô cực & sân vườn hướng biển Mỹ Khê",
        type: "render_3d",
        spaceCategory: "pool_garden",
      },
      {
        id: "img-9-3",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        caption: "Phối cảnh phòng khách thông tầng đón gió biển",
        type: "render_3d",
        spaceCategory: "living_room",
      },
      {
        id: "img-9-4",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        caption: "Phối cảnh chiếu sáng mặt đứng biệt thự biển ban đêm",
        type: "render_3d",
        spaceCategory: "exterior_night",
      },
    ],
    floorPlans: [
      {
        id: "fp-9-1",
        name: "Mặt bằng Tầng 1 (Trệt)",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Không gian tiếp khách, bếp ăn và hồ bơi vô cực hướng thẳng bãi biển Mỹ Khê.",
        areaSquareMeters: 410,
        rooms: [
          "Gara 3 xe hơi & Khu vực kỹ thuật chống ẩm",
          "Phòng khách lớn + Bếp đảo mở ra sân hồ bơi hướng biển",
        ],
      },
      {
        id: "fp-9-2",
        name: "Mặt bằng Tầng 2",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "04 phòng ngủ hướng biển với hệ kính Low-E 3 lớp chống bão và cách âm.",
        areaSquareMeters: 390,
        rooms: [
          "Master Suite view toàn cảnh vịnh Đà Nẵng",
          "03 Phòng ngủ khép kín kèm ban công rộng",
        ],
      },
      {
        id: "fp-9-3",
        name: "Mặt bằng Tầng 3 & Mái",
        imageUrl:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Không gian giải trí trên cao, phòng ngủ khách và mái bê tông kháng mặn.",
        areaSquareMeters: 380,
        rooms: [
          "Sky Lounge & Phòng ngủ khách VIP",
          "Hệ mái bê tông chống thấm đa tầng chuẩn khí hậu ven biển",
        ],
      },
    ],

    isFeatured: false,
    status: "published",
    viewCount: 1940,
    createdAt: "2024-09-05",
  },
];

export const PROJECT_TYPE_LABELS: Record<Project["projectType"], string> = {
  concept: "Bản Vẽ 3D",
  under_construction: "Đang Thi Công",
  completed: "Đã Hoàn Thành",
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
    "Liên hệ ngay với KTS Trưởng và Chỉ huy trưởng công trình của ARCHITECTURA để nhận bản phác thảo mặt bằng ý tưởng cùng báo giá dự toán sơ bộ hoàn toàn miễn phí.",
  primaryCta: {
    label: "Đăng ký tư vấn dự án",
    href: "/contact",
  },
} as const;
