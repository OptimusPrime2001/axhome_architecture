import type {
  AdminNavItem,
  AdminNotificationItem,
  AdminUserProfile,
  ConsultationLead,
  DashboardMonthlyStat,
} from "@shared-types";

export const ADMIN_ARCHITECT_OPTIONS: string[] = [
  "KTS. Trần Hoàng Lâm",
  "KTS. Nguyễn Minh Quân",
  "KTS. Phạm Quang Huy",
  "KS. Lê Đức Thành",
];

export const ADMIN_MOCK_LEADS: ConsultationLead[] = [
  {
    id: "lead-01",
    code: "CS-2024-06",
    fullName: "Nguyễn Văn Hùng",
    phone: "0918 245 892",
    email: "hung.nguyen@gmail.com",
    serviceType: "full_package",
    serviceLabel: "Thi công biệt thự trọn gói Thảo Điền (650m²)",
    estimatedBudget: "Từ 6 tỷ – 12 tỷ VNĐ",
    landSize: "650 m²",
    location: "TP. Thủ Đức, TP.HCM",
    message:
      "Gia đình mong muốn tư vấn phương án thiết kế và thi công trọn gói biệt thự ven sông 3 tầng.",
    sourcePage: "/projects/villa-thao-dien-riverside",
    referencedProjectId: "proj-01",
    referencedProjectTitle: "Villa Thảo Điền Riverside",
    leadStatus: "pending",
    assignedArchitect: "KTS. Trần Hoàng Lâm",
    createdAt: "2024-11-18T08:30:00Z",
    relativeTime: "15 phút trước",
  },
  {
    id: "lead-02",
    code: "CS-2024-05",
    fullName: "Lê Thị Mai Phương",
    phone: "0903 612 114",
    email: "maiphuong.le@gmail.com",
    serviceType: "design",
    serviceLabel: "Thiết kế kiến trúc Indochine Ecopark (380m²)",
    estimatedBudget: "Từ 3 tỷ – 6 tỷ VNĐ",
    landSize: "380 m²",
    location: "Văn Giang, Hưng Yên",
    message:
      "Cần khảo sát hiện trạng lô góc và lên concept phong cách Đông Dương.",
    sourcePage: "/contact",
    leadStatus: "pending",
    createdAt: "2024-11-18T07:45:00Z",
    relativeTime: "1 giờ trước",
  },
  {
    id: "lead-03",
    code: "CS-2024-04",
    fullName: "Trần Đình Quý",
    phone: "0982 410 670",
    serviceType: "full_package",
    serviceLabel: "Tư vấn bóc tách dự toán dinh thự Văn Quán (520m²)",
    estimatedBudget: "Trên 12 tỷ VNĐ",
    landSize: "520 m²",
    location: "Hà Đông, Hà Nội",
    message: "Muốn đặt lịch hẹn trực tiếp với KTS Trưởng vào sáng thứ Bảy.",
    sourcePage: "/",
    leadStatus: "in_progress",
    assignedArchitect: "KTS. Trần Hoàng Lâm",
    internalNotes: "Đã gọi lần 1, khách hẹn gửi sổ đỏ qua Zalo.",
    createdAt: "2024-11-17T15:20:00Z",
    relativeTime: "Hôm qua",
  },
  {
    id: "lead-04",
    code: "CS-2024-03",
    fullName: "Phạm Thanh Tuấn",
    phone: "0912 889 556",
    email: "tuan.pham@outlook.com",
    serviceType: "construction",
    serviceLabel: "Thi công nhà phố hiện đại 4 tầng Cầu Giấy (160m²)",
    estimatedBudget: "Từ 3 tỷ – 6 tỷ VNĐ",
    landSize: "160 m²",
    location: "Cầu Giấy, Hà Nội",
    message:
      "Đã có hồ sơ thiết kế sơ bộ, cần báo giá thi công phần thô và hoàn thiện.",
    sourcePage: "/projects",
    leadStatus: "won",
    assignedArchitect: "KS. Lê Đức Thành",
    internalNotes: "Đã ký hợp đồng thi công trọn gói.",
    createdAt: "2024-11-16T10:00:00Z",
    relativeTime: "2 ngày trước",
  },
  {
    id: "lead-05",
    code: "CS-2024-02",
    fullName: "Vũ Hoàng Nam",
    phone: "0945 771 230",
    serviceType: "design",
    serviceLabel: "Thiết kế biệt thự nghỉ dưỡng Ciputra (450m²)",
    estimatedBudget: "Từ 6 tỷ – 12 tỷ VNĐ",
    landSize: "450 m²",
    location: "Tây Hồ, Hà Nội",
    message: "Quan tâm giải pháp thông tầng và sân vườn hồ cá Koi.",
    sourcePage: "/contact",
    leadStatus: "pending",
    createdAt: "2024-11-15T14:10:00Z",
    relativeTime: "3 ngày trước",
  },
  {
    id: "lead-06",
    code: "CS-2024-01",
    fullName: "Đặng Thu Hà",
    phone: "0977 334 901",
    email: "thuha.dang@gmail.com",
    serviceType: "full_package",
    serviceLabel: "Cải tạo & nâng cấp biệt thự Vinhomes Riverside",
    estimatedBudget: "Từ 6 tỷ – 12 tỷ VNĐ",
    landSize: "410 m²",
    location: "Long Biên, Hà Nội",
    message: "Cần khảo sát kết cấu hiện hữu và tư vấn cải tạo nội ngoại thất.",
    sourcePage: "/about",
    leadStatus: "scheduled",
    assignedArchitect: "KTS. Nguyễn Minh Quân",
    internalNotes: "Lịch khảo sát thực địa 09:30 Thứ Năm.",
    createdAt: "2024-11-14T09:00:00Z",
    relativeTime: "4 ngày trước",
  },
];

export const ADMIN_DASHBOARD_MONTHLY_STATS: DashboardMonthlyStat[] = [
  { monthLabel: "Tháng 6", projectViews: 2450, consultationLeads: 14 },
  { monthLabel: "Tháng 7", projectViews: 2890, consultationLeads: 18 },
  { monthLabel: "Tháng 8", projectViews: 2620, consultationLeads: 16 },
  { monthLabel: "Tháng 9", projectViews: 3340, consultationLeads: 22 },
  { monthLabel: "Tháng 10", projectViews: 3780, consultationLeads: 26 },
  { monthLabel: "Tháng 11", projectViews: 4120, consultationLeads: 31 },
];

const pendingLeadsCount = ADMIN_MOCK_LEADS.filter(
  (lead) => lead.leadStatus === "pending",
).length;

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
    badge: `${pendingLeadsCount} Mới`,
  },
  {
    label: "Tài khoản & Bảo mật",
    href: "/admin/settings",
    iconKey: "settings",
  },
];

export const ADMIN_ROUTE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Không gian làm việc",
  "/admin/projects": "Quản lý dự án",
  "/admin/projects/create": "Tạo dự án mới",
  "/admin/contacts": "Yêu cầu tư vấn",
  "/admin/settings": "Tài khoản & Bảo mật",
};

export const ADMIN_MOCK_USER: AdminUserProfile = {
  name: "KTS. Trần Hoàng Lâm",
  role: "KTS Trưởng • Quản trị",
  accountTitle: "Admin Studio",
  permissionLabel: "TOÀN QUYỀN",
  initials: "TL",
  email: "admin@axhome.vn",
};

export const ADMIN_MOCK_NOTIFICATIONS: AdminNotificationItem[] = [
  {
    id: "notif-1",
    title: "Yêu cầu tư vấn mới",
    description: "Nguyễn Văn Hùng quan tâm gói thi công biệt thự trọn gói.",
    timeLabel: "15 phút trước",
    isUnread: true,
    href: "/admin/contacts",
  },
  {
    id: "notif-2",
    title: "Hồ sơ thiết kế chờ duyệt",
    description: "Brutalist Courtyard (AC-H05) đã cập nhật bản vẽ mặt bằng.",
    timeLabel: "1 giờ trước",
    isUnread: true,
    href: "/admin/projects",
  },
  {
    id: "notif-3",
    title: "Cập nhật tiến độ công trình",
    description: "The Waterfront Pavilion hoàn thành hạng mục kính Panorama.",
    timeLabel: "Hôm qua",
    isUnread: false,
    href: "/admin/projects",
  },
];

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
