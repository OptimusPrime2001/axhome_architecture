// ==============================================================================
// Axhome Architecture - Navigation Links
// ==============================================================================

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới Thiệu", href: "/about" },
  { label: "Dự Án", href: "/projects" },
  { label: "Liên Hệ", href: "/contact" },
];

export const FOOTER_SERVICES_LINKS: NavItem[] = [
  { label: "Thiết Kế Kiến Trúc Biệt Thự", href: "/projects?type=concept" },
  { label: "Thiết Kế Nội Thất Cao Cấp", href: "/projects?style=interior" },
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
