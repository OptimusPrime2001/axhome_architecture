---
trigger: glob
globs: "**/frontend/**"
description: "Quy chuẩn quản lý state và cấu trúc thư mục Zustand Store (store-base pattern) trong Frontend."
---

# 10 — Quản lý State và Cấu trúc Zustand Store

## 1. Khi nào bắt buộc dùng Zustand Store thay vì `useState` rời rạc

Ưu tiên tạo hoặc mở rộng Zustand Store trong `src/store/` thay vì đặt nhiều `useState` cục bộ trong component khi rơi vào **một trong các trường hợp sau**:

1. **Màn hình phức tạp có nhiều state:** Component/Page quản lý từ **4 state liên quan đến nghiệp vụ, bộ lọc, tìm kiếm, phân trang, chọn nhiều dòng (selection) hoặc đóng/mở modal** trở lên.
2. **Trao đổi và đồng bộ dữ liệu liên màn hình:** Dữ liệu cần được đọc/cập nhật giữa nhiều màn hình hoặc khu vực UI khác nhau (ví dụ: Danh sách dự án `/admin/projects` ↔ Tạo/Sửa dự án `/admin/projects/create` ↔ Thống kê `/admin/dashboard`; hoặc Quản lý Yêu cầu tư vấn `/admin/contacts` ↔ Badge số lượng mới trên `AdminSidebar` ↔ KPI trên Dashboard).
3. **Bảo toàn trạng thái điều hướng:** Cần giữ nguyên bộ lọc, từ khóa tìm kiếm và trang hiện tại khi người dùng chuyển từ trang Danh sách sang trang Chi tiết rồi quay lại.

Chỉ dùng `useState` cục bộ cho các trạng thái UI thuần túy, phạm vi hẹp bên trong một component đơn lẻ (ví dụ: ẩn/hiện mật khẩu, mở/đóng một popover nhỏ, trạng thái hover/drag).

---

## 2. Cấu trúc thư mục chuẩn cho mỗi Store (`store-base` pattern)

Mỗi domain store trong `src/store/` **bắt buộc** đặt trong một thư mục `kebab-case` riêng và tuân thủ cấu trúc 5 phần như sau:

```text
src/store/<store-name>/
├── index.ts                # Re-export ./selectors, ./store, ./types
├── store.ts                # Khởi tạo store với devtools + subscribeWithSelector
├── selectors/
│   └── index.ts            # Các hàm selector thuần túy & tính toán dữ liệu phái sinh (derived state)
├── slices/
│   └── <name>Slice.ts      # StateCreator khai báo state khởi tạo & các actions
└── types/
    └── index.ts            # Khai báo Slice interface & State interface
```

Tất cả các store được re-export tập trung tại `src/store/index.ts` và import thông qua alias `@store`.

---

## 3. Quy ước triển khai code trong Store

- **Middleware bắt buộc:** Luôn bọc `devtools(subscribeWithSelector(...), { name: "...", enabled: process.env.NODE_ENV !== "production" })` trong `store.ts`.
- **Action naming cho DevTools:** Mọi lệnh `set(...)` trong `slices/<name>Slice.ts` phải truyền tham số thứ 3 là tên action theo format `"<domain>/<actionName>"` (ví dụ: `set({ currentPage: page }, false, "adminProjects/setCurrentPage")`).
- **Selectors:** Tách các phép lọc (filter), sắp xếp (sort), thống kê KPI ra `selectors/index.ts` để tái sử dụng giữa nhiều màn hình và giữ cho component gọn nhẹ.
- **Tương thích Server State:** Khi ghép Backend API ở giai đoạn sau, Zustand quản lý **Client/UI State** (filters, pagination, selection, active modals, draft state) hoặc dữ liệu đồng bộ tạm thời, còn TanStack Query quản lý **Server Cache**.
