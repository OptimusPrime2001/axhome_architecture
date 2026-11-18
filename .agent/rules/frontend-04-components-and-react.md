---
trigger: glob
globs: "**/frontend/**"
description: "Quy tắc về React components, Server/Client Components, hooks, props, state và shadcn/ui."
---

# 04 — React components và hooks

## 1. Component responsibility

- Mỗi component có một trách nhiệm rõ ràng.
- Ưu tiên component nhỏ, có tên phản ánh đúng chức năng.
- Không để page component chứa toàn bộ UI và business logic của trang.
- Tách component con khi có cấu trúc/logic riêng, tái sử dụng hoặc giúp page dễ đọc hơn.
- Không chia nhỏ quá mức thành nhiều component không có ý nghĩa.

## 2. Server và Client Components

- Tuân thủ mô hình Server/Client Components của phiên bản Next.js đang cài.
- Mặc định không thêm `"use client"` nếu component không cần state, event handler hoặc browser API.
- Đặt `"use client"` ở ranh giới nhỏ nhất có thể.
- Không truy cập `window`, `document` hoặc browser API trong quá trình render phía server.
- Không biến toàn bộ page/layout thành Client Component chỉ để xử lý một tương tác nhỏ.

## 3. Hooks

- Chỉ gọi React hooks ở top-level của function component hoặc custom hook.
- Không gọi hooks trong điều kiện, vòng lặp hoặc nested function.
- Custom hook phải bắt đầu bằng `use` và thể hiện mục đích rõ ràng.
- Không đặt TanStack Query hooks trong `apis/`; chúng thuộc `hooks/`.

## 4. Props và state

- Khai báo props type rõ ràng; ưu tiên type đặt trong `shared-types/` nếu được dùng chung.
- Không truyền props không cần thiết qua nhiều tầng; cân nhắc composition hoặc giải pháp state phù hợp.
- State đặt ở component thấp nhất có thể nhưng vẫn đảm bảo các consumer cần thiết truy cập được.
- Không tạo state trùng lặp cho dữ liệu đã có thể suy ra.
- Không mutate props, state hoặc dữ liệu cache trực tiếp.

## 5. Rendering

- Dùng `key` ổn định khi render list; không dùng array index nếu danh sách có thể thay đổi thứ tự hoặc phần tử.
- Có trạng thái loading, error, empty và success khi phù hợp.
- Không render dữ liệu chưa được kiểm tra như thể luôn tồn tại.
- Tránh tính toán nặng trong render; chỉ tối ưu memoization khi có lý do đo được hoặc rõ ràng.

## 6. Sử dụng thư viện shadcn/ui (Bắt buộc ưu tiên)

- **Luôn ưu tiên sử dụng component của shadcn/ui** trong `src/components/ui/` (`Button`, `Input`, `Label`, `Select`, `Textarea`, `Badge`, `Card`, `Table`, `Dialog`, `Combobox`, `Tabs`, `Skeleton`, `Spinner`...) thay vì tự viết thẻ HTML thuần (`<input>`, `<select>`, `<textarea>`, `<button>`, `<table>`, modal/drawer tự dựng).
- Nếu tính năng mới cần một UI primitive chưa có trong `src/components/ui/` (như Accordion, AlertDialog, Popover, Tooltip...), kiểm tra `package.json` (`@base-ui/react`, `@radix-ui/*`) hoặc dùng **shadcn MCP** để bổ sung component vào `src/components/ui/<component-name>/` (style bằng Sass Modules theo rule `05-styling.md §6`) và re-export tại `src/components/ui/index.ts` trước khi viết feature UI.
- Sử dụng utility `cn()` (`@lib/utils`) để gộp và xử lý conditional class names.
- Phần style mặc định nếu chưa khớp với approved design trong Figma thì bổ sung hoặc override bằng Sass Module class để đảm bảo chuẩn xác theo thiết kế.
