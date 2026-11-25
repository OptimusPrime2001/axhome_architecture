// ==============================================================================
// Architectura - Navigation Links
// ==============================================================================

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export type MobileBottomNavIconKey = "home" | "projects" | "about" | "contact";

export interface MobileBottomNavItem extends NavItem {
  iconKey: MobileBottomNavIconKey;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Trang Chủ", href: "/" },
  { label: "Dự Án", href: "/projects" },
  { label: "Giới Thiệu", href: "/about" },
  { label: "Liên Hệ", href: "/contact" },
];

export const MOBILE_BOTTOM_NAV_ITEMS: MobileBottomNavItem[] = [
  { label: "Trang chủ", href: "/", iconKey: "home" },
  { label: "Dự án", href: "/projects", iconKey: "projects" },
  { label: "Giới thiệu", href: "/about", iconKey: "about" },
  { label: "Liên hệ", href: "/contact", iconKey: "contact" },
];

export const FOOTER_SERVICES_LINKS: NavItem[] = [
  { label: "Thiết Kế Kiến Trúc Biệt Thự", href: "/projects?type=concept" },
  { label: "Thiết Kế Biệt Thự & Dinh Thự", href: "/projects?category=villa" },
  {
    label: "Thi Công Xây Dựng Trọn Gói",
    href: "/projects?type=under_construction",
  },
  { label: "Giám Sát Tác Giả & Pháp Lý", href: "/about#process" },
];

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: "Về Chúng Tôi", href: "/about" },
  { label: "Bộ Sưu Tập Dự Án", href: "/projects" },
  { label: "Quy Trình 6 Bước Chuẩn Hóa", href: "/about#process" },
  { label: "Đăng Ký Tư Vấn Trực Tiếp", href: "/contact" },
];
