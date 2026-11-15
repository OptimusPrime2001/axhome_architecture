// ==============================================================================
// Axhome Architecture - Central Company Constants
// Easy to modify information in one centralized file
// ==============================================================================

export interface CompanyOffice {
  title: string;
  address: string;
  phone: string;
  email: string;
  isMain?: boolean;
}

export interface MetricRibbonItem {
  value: string;
  label: string;
  subLabel?: string;
}

export const COMPANY_INFO = {
  brandName: "AXHOME ARCHITECTURE",
  shortName: "Axhome",
  tagline: "Kiến trúc & Xây dựng cao cấp",
  slogan: "Bản vẽ chuẩn — Tối ưu chi phí — Thi công trọn gói",
  description:
    "Công ty kiến trúc và xây dựng chuyên nghiệp, tiên phong trong thiết kế nhà phố, biệt thự vườn và thi công trọn gói với tiêu chuẩn kiểm soát sai số ≤ 3% và cam kết không phát sinh chi phí.",

  hotline: "0908 123 456",
  hotlineFormatted: "0908.123.456",
  landline: "028 3822 9999",
  email: "tuvan@axhome.vn",
  website: "https://axhome.vn",
  workingHours: "Thứ Hai – Thứ Bảy: 08:00 – 18:00 (Hỗ trợ Hotline 24/7)",

  offices: [
    {
      title: "Trụ Sở & Văn Phòng Thiết Kế",
      address: "128 Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh",
      phone: "0908 123 456",
      email: "contact@axhome.vn",
      isMain: true,
    },
    {
      title: "Xưởng Sản Xuất & Gia Công Nội Thất",
      address: "Đường Số 7, KCN Cát Lái, TP. Thủ Đức, TP. Hồ Chí Minh",
      phone: "0908 123 789",
      email: "workshop@axhome.vn",
      isMain: false,
    },
  ] as CompanyOffice[],

  socialLinks: {
    facebook: "https://facebook.com/axhome.architecture",
    zalo: "https://zalo.me/0908123456",
    youtube: "https://youtube.com/@axhome_architecture",
    instagram: "https://instagram.com/axhome.architecture",
  },

  // Floating metrics in Hero section
  metrics: [
    { value: "150+", label: "Biệt thự cao cấp", subLabel: "Đã bàn giao" },
    {
      value: "100%",
      label: "Đúng tiến độ thi công",
      subLabel: "Cam kết hợp đồng",
    },
    { value: "0%", label: "Chi phí phát sinh", subLabel: "Dự toán chuẩn xác" },
    {
      value: "10 Năm",
      label: "Bảo hành kết cấu",
      subLabel: "Bảo dưỡng trọn đời",
    },
  ] as MetricRibbonItem[],
} as const;
