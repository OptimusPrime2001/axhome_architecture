// ==============================================================================
// Architectura - Central Company Constants
// Easy to modify information in one centralized file
//
// Nguồn sự thật: Figma Axhome_Architecture (node Footer 1:2021, Header 1:2096)
// ==============================================================================

export interface CompanyOffice {
  title: string;
  address: string;
  isMain?: boolean;
}

export interface MetricRibbonItem {
  value: string;
  label: string;
  subLabel?: string;
}

export const COMPANY_INFO = {
  brandName: "ARCHITECTURA",
  shortName: "Architectura",
  tagline: "Kiến trúc & Xây dựng cao cấp",
  // Dòng phụ dưới wordmark ở Header (CSS tự uppercase)
  logoTagline: "Studio & Construction",
  slogan: "Bản vẽ chuẩn — Tối ưu chi phí — Thi công trọn gói",
  description:
    "Văn phòng kiến trúc và tổng thầu xây dựng các công trình biệt thự, tư gia và không gian nghỉ dưỡng cao cấp tại Việt Nam. Tinh hoa kết cấu và vật liệu tự nhiên.",

  hotline: "0908 123 456",
  hotlineFormatted: "+84 (0) 908 123 456",
  email: "contact@architectura.vn",
  website: "https://architectura.vn",
  workingHours: "Thứ Hai – Thứ Bảy: 08:00 – 18:00 (Hỗ trợ Hotline 24/7)",

  offices: [
    {
      title: "Hà Nội Studio",
      address:
        "Tầng 18, Tòa nhà Heritage Center, 68 Quang Trung, Quận Hoàn Kiếm",
      isMain: true,
    },
    {
      title: "TP. Hồ Chí Minh Atelier",
      address:
        "Villa 12, Khu Thảo Điền Riverside, Phường Thảo Điền, TP. Thủ Đức",
      isMain: false,
    },
  ] as CompanyOffice[],

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
