---
trigger: glob
globs: "**/frontend/**/*.tsx, **/frontend/**/*.ts"
description: "Quy tắc sử dụng Animate UI (Icons, Components, Backgrounds & Effects) qua shadcn MCP."
---

# Animate UI Rules (Icons, Components, Backgrounds & Effects)

Khi xây dựng giao diện, thêm micro-interactions, hiệu ứng chuyển cảnh hoặc background động trong `frontend/`, bắt buộc ưu tiên sử dụng **Animate UI** (`@animate-ui`) thông qua **shadcn MCP** trước khi tự viết CSS/Motion thủ công.

## 1. Quy trình tra cứu & cài đặt bắt buộc (qua shadcn MCP)
Không bao giờ tự đoán tên gói hay tự tạo component giả. Khi cần dùng bất kỳ thành phần nào của Animate UI, AI phải thực hiện theo 3 bước:
1. **Tìm kiếm trong registry `@animate-ui`:** Gọi `search_items_in_registries` (hoặc `list_items_in_registries`) với registry `@animate-ui` và từ khóa liên quan để lấy danh sách item chính xác.
2. **Đọc cấu trúc & ví dụ sử dụng:** Gọi `get_item_examples_from_registries` hoặc `view_items_in_registries` để kiểm tra đúng props, wrapper và các tùy chọn hiệu ứng của item đó.
3. **Cài đặt vào dự án:** Gọi `get_add_command_for_items` để lấy lệnh cài đặt chuẩn và chạy trong thư mục `frontend/` (ví dụ: `npx shadcn@latest add @animate-ui/<item-name>` hoặc dùng package manager hiện tại của dự án).

---

## 2. Phân loại & Quy tắc sử dụng theo 4 nhóm tính năng

### A. Icons (Animated Lucide Icons)
- **Mục đích:** Dùng cho các icon có tương tác (nút bấm CTA, menu, thông báo, trạng thái loading/success, toggle).
- **Quy ước tìm kiếm:** Tìm với từ khóa `icons-lucide` hoặc tên icon tiếng Anh (ví dụ: `@animate-ui/icons-lucide-bell`).
- **Quy tắc code:**
  - Dùng `animateOnHover` hoặc `animateOnTap` cho icon trong nút/card để tránh gây rối mắt.
  - Chỉ dùng `loop` cho icon biểu thị trạng thái đang xử lý (loading, syncing).
  - Các icon tĩnh trang trí hoặc lặp lại nhiều lần trong bảng/list vẫn dùng `lucide-react` chuẩn để tối ưu hiệu năng.

### B. Components (UI Components tích hợp sẵn hiệu ứng)
- **Mục đích:** Thay thế hoặc nâng cấp các UI component tiêu chuẩn có sẵn chuyển động mượt mà (như Accordion, Alert Dialog, Carousel, Checkbox, Code Block, Collapsible, Combobox, Context Menu, Dialog, Drawer, Dropdown Menu, Hover Card, Input OTP, Menubar, Navigation Menu, Pagination, Popover, Preview Link Card, Progress, Radio Group...).
- **Quy ước tìm kiếm:** Tìm theo tên component trong registry `@animate-ui` (ví dụ: `dialog`, `carousel`, `input-otp`, `code-block`).
- **Quy tắc code:** Giữ nguyên cấu trúc compound components và props animation mặc định của Animate UI; tùy chỉnh giao diện thông qua Tailwind classes hoặc CSS variables.

### C. Backgrounds (Nền động & Hiệu ứng không gian)
- **Mục đích:** Dùng cho Hero section, Auth page, Banner nổi bật hoặc các card đặc biệt cần tạo chiều sâu thị giác.
- **Quy ước tìm kiếm:** Tìm với từ khóa `backgrounds` trong registry `@animate-ui` để xem các mẫu nền hỗ trợ sẵn (như grid, stars, particles, gradient, waves...).
- **Quy tắc code:**
  - Luôn đặt container của Background với `position: relative` và `overflow-hidden`, nội dung chính nằm trên với `z-index` cao hơn.
  - Không lạm dụng quá 1–2 animated background trên cùng một trang để tránh giật lag GPU trên thiết bị di động.

### D. Effects & Primitives (Hiệu ứng chuyển động & Chuyển trang)
- **Mục đích:** Dùng cho các hiệu ứng xuất hiện (reveal), chuyển cảnh trang (page transitions như `zoom`, `bands`, `chop`...), hiệu ứng chữ (text animations), con trỏ chuột (cursor effects) hoặc bọc hiệu ứng lên các component có sẵn.
- **Quy ước tìm kiếm:** Tìm với từ khóa `primitives`, `effects`, `text` hoặc `transition` trong registry `@animate-ui`.
- **Quy tắc code:** Ưu tiên dùng các Primitives của Animate UI để bọc ngoài các thẻ HTML/component sẵn có thay vì cài thêm thư viện animation bên ngoài.

---

## 3. Lưu ý kỹ thuật với Next.js
- **Client Boundary:** Mọi component/icon/background sử dụng animation của Animate UI đều chạy phía client. Luôn đảm bảo file chứa chúng có directive `"use client"` ở dòng đầu tiên (hoặc tách thành một Client Component con để giữ phần trang cha là Server Component).
- **Tài liệu dự phòng:** Nếu cần xem tổng quan toàn bộ danh mục mới nhất của Animate UI (bao gồm cả hướng dẫn `@animate-ui/react` hoặc `Skills`), tham chiếu thêm tại `https://animate-ui.com/llms.txt`.
