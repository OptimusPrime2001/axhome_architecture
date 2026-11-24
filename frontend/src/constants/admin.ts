import type { AdminNavItem, DashboardMonthlyStat } from "@shared-types";

export const ADMIN_DASHBOARD_MONTHLY_STATS: DashboardMonthlyStat[] = [
  { monthLabel: "Tháng 6", projectViews: 2450, consultationLeads: 14 },
  { monthLabel: "Tháng 7", projectViews: 2890, consultationLeads: 18 },
  { monthLabel: "Tháng 8", projectViews: 2620, consultationLeads: 16 },
  { monthLabel: "Tháng 9", projectViews: 3340, consultationLeads: 22 },
  { monthLabel: "Tháng 10", projectViews: 3780, consultationLeads: 26 },
  { monthLabel: "Tháng 11", projectViews: 4120, consultationLeads: 31 },
];

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Tổng quan",
    href: "/admin/dashboard",
    iconKey: "dashboard",
  },
  {
    label: "Quản lý dự án",
    href: "/admin/projects",
    iconKey: "projects",
  },
  {
    label: "Yêu cầu tư vấn",
    href: "/admin/contacts",
    iconKey: "contacts",
  },
  {
    label: "Quản lý tài khoản",
    href: "/admin/accounts",
    iconKey: "accounts",
  },
];

export const ADMIN_ROUTE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Không gian làm việc",
  "/admin/projects": "Quản lý dự án",
  "/admin/projects/create": "Tạo dự án mới",
  "/admin/contacts": "Yêu cầu tư vấn",
  "/admin/accounts": "Quản lý tài khoản",
  "/admin/settings": "Tài khoản của tôi",
};

export const ADMIN_LOGIN_COPY = {
  topEyebrow: "ADMINISTRATIVE MANAGEMENT ARCHITECTURE",
  portalLabel: "INTERNAL PORTAL",
  studioLocation: "Axhome Architecture · HQ Hanoi",
  heroBadge: "HẠ TẦNG QUẢN TRỊ TINH TUYỂN",
  heroTitleLine1: "Kiến tạo Không gian,",
  heroTitleLine2: "Định hình Đẳng cấp.",
  heroDescription:
    "Nền tảng kiểm soát đồ án, phê duyệt bản vẽ kỹ thuật và điều hành công trình biệt thự nghỉ dưỡng cao cấp theo tiêu chuẩn Haute Architecture.",
  heroStatTitle: "142 Dự án Biệt thự",
  heroStatSubtitle: "HỒ SƠ ĐỒNG BỘ 2024",
  heroComplianceTag: "ISO 27001",
  formEyebrow: "HỆ THỐNG PHÂN QUYỀN CẤP CAO",
  formTitle: "Cổng Quản Trị Hệ Thống",
  formSubtitle: "Đăng nhập dành cho Ban Quản trị & Kiến trúc sư trưởng",
  serverStatus:
    "TRẠNG THÁI MÁY CHỦ: VẬN HÀNH BÌNH THƯỜNG (HANOI DATA CENTER 01)",
  versionText: "PHIÊN BẢN ERP-ARCH v2.4.8 • QUY CHUẨN DỮ LIỆU",
} as const;
