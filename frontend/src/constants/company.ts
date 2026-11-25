// ==============================================================================
// Axhome Architecture - Central Company Constants
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
  value: number | string;
  label: string;
  suffix: string;
  subLabel?: string;
}
export const PROJECT_DONE_COUNT = 80;

const resolvedSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://axhome.vn"
).replace(/\/+$/, "");

export const COMPANY_INFO = {
  brandName: "AXHOME",
  shortName: "Axhome",
  tagline: "Kiến trúc & Xây dựng cao cấp",
  // Dòng phụ dưới wordmark ở Header (CSS tự uppercase)
  logoTagline: "Architecture",
  slogan: "Bản vẽ chuẩn — Tối ưu chi phí — Thi công trọn gói",
  description:
    "Văn phòng kiến trúc và tổng thầu xây dựng các công trình biệt thự, tư gia và không gian nghỉ dưỡng cao cấp tại Việt Nam. Tinh hoa kết cấu và vật liệu tự nhiên.",

  hotline: "0947712626",
  hotlineFormatted: "0947 712 626",
  email: "Kientrucaxhome@gmail.com",
  website: resolvedSiteUrl,
  workingHours: "Thứ Hai – Thứ Bảy: 08:00 – 18:00 (Hỗ trợ Hotline 24/7)",

  offices: [
    {
      title: "Văn phòng Hà Nội",
      address: "D20 TT14 Khu Đô Thị Văn Quán - Hà Đông, Hà Nội, Việt Nam",
      isMain: true,
    },
  ] as CompanyOffice[],

  // Floating metrics in Hero section
  metrics: [
    {
      value: PROJECT_DONE_COUNT,
      suffix: "+",
      label: "Công trình hoàn thiện",
      subLabel: "Đã bàn giao",
    },
    {
      value: 100,
      suffix: "%",
      label: "Đúng tiến độ thi công",
      subLabel: "Cam kết hợp đồng",
    },
    {
      value: 0,
      suffix: "%",
      label: "Chi phí phát sinh",
      subLabel: "Dự toán chuẩn xác",
    },
    {
      value: 10,
      suffix: "Năm",
      label: "Bảo hành kết cấu",
      subLabel: "Bảo dưỡng trọn đời",
    },
  ] as MetricRibbonItem[],
} as const;
