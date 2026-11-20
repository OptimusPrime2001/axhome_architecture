---
trigger: glob
globs: "**/frontend/**"
description: "Bối cảnh sản phẩm, phạm vi route, định hướng UI/UX và design tokens cho Frontend Axhome."
---

# 01 — Bối cảnh sản phẩm và định hướng giao diện

## 1. Mục tiêu sản phẩm

Axhome xây dựng website giới thiệu công ty kiến trúc & xây dựng, tập trung vào thiết kế nhà ở, nhà phố, biệt thự và thi công công trình.

Thông điệp thương hiệu:
**“Bản vẽ chuẩn — Tối ưu chi phí — Thi công trọn gói”.**

Website giúp khách hàng:
- Hiểu công ty, năng lực và dịch vụ.
- Xem mẫu thiết kế kiến trúc/bản vẽ.
- Xem công trình thực tế đã hoàn thành hoặc đang thi công.
- Tìm hiểu quy trình làm việc.
- Gửi yêu cầu tư vấn/liên hệ.

Admin CMS phục vụ cập nhật nội dung. Đây không phải hệ thống thương mại điện tử.

## 2. Phạm vi route dự kiến

Public:
- `/`
- `/about`
- `/designs`
- `/designs/:slug`
- `/projects`
- `/projects/:slug`
- `/contact`

Admin:
- `/admin/login`
- `/admin/dashboard`
- `/admin/designs`
- `/admin/projects`
- `/admin/contacts`
- Các route tạo/sửa/chi tiết tương ứng khi được triển khai.

Đây là sitemap định hướng; kiểm tra route thực tế và quyết định đã chốt trước khi thêm hoặc đổi route.

## 3. Định hướng UI/UX

Phong cách: **Warm Minimalist Architecture / Minimalist Luxury**.

Cảm giác:
- Tinh tế, sang trọng nhưng gần gũi.
- Chuyên nghiệp, ấm áp, tự nhiên.
- Hình ảnh kiến trúc là trọng tâm.
- Nền sáng, warm neutral, nhiều khoảng trắng.
- Bố cục editorial, phân cấp nội dung rõ ràng.

Tránh:
- Màu quá rực, gradient không cần thiết.
- Shadow nặng, bo góc quá nhiều.
- Quá nhiều card/dashboard pattern không cần thiết.
- Trang trí gây nhiễu, animation ảnh hưởng hiệu năng.
- Ảnh stock không liên quan hoặc lặp ảnh thiếu chủ đích.

## 4. Design tokens tham chiếu (Option 1: Blueprint Navy & Concrete Slate)

Hệ thống màu chủ đạo đã được phê duyệt theo định hướng **Công ty Thiết kế & Thi công Công trình (Design & Build)** tại `src/styles/utils/_variables.scss`:

| Token | Giá trị | Vai trò |
|---|---|---|
| `$color-brand-primary` | `#1b365d` | Xanh Thép Kỹ Thuật (Blueprint Navy — Buttons, highlights, active nav) |
| `$color-brand-light` | `#3b5b8c` | Xanh Lam Thép Sáng (Steel Blue — Hover states, badges, viền nhấn) |
| `$color-brand-dark` | `#0f213a` | Xanh Đen Kết Cấu (Structural Midnight — Khối đậm, active state) |
| `$color-surface-bg` | `#f8fafc` | Nền chính toàn trang (Technical Alabaster) |
| `$color-surface-card` | `#ffffff` | Nền card, form, modal |
| `$color-surface-hover` | `#f4f7fb` | Nền card sáng khi hover |
| `$color-surface-muted` | `#f1f5f9` | Nền section xen kẽ / Xám Bê Tông Sáng (Concrete Mist) |
| `$color-surface-muted-hover` | `#e6edf5` | Nền card muted khi hover |
| `$color-surface-border` | `#e2e8f0` | Viền ngăn cách 1px (Steel Hairline) |
| `$color-surface-dark` | `#0f172a` | Bề mặt tối (Slate Obsidian — Footer, CTA banner) |
| `$color-text-primary` | `#0f172a` | Chữ chính sắc nét |
| `$color-text-secondary` | `#475569` | Chữ mô tả xám đá kỹ thuật |
| `$color-text-muted` | `#94a3b8` | Placeholder, ghi chú nhỏ |
| `$color-text-inverse` | `#f8fafc` | Chữ trên nền tối |

Semantic colors tham chiếu:
- Success: `#66836B`
- Warning: `#C49A5A`
- Error: `#B66B60`
- Info: `#7B8E9B`

Typography:
- Heading: Playfair Display nếu glyph tiếng Việt đầy đủ; nếu không, đánh giá Lora hoặc serif tương thích tiếng Việt.
- Body/UI: Be Vietnam Pro.
- Admin ưu tiên Be Vietnam Pro.

Không tự ý đổi palette/font đã được người dùng duyệt. Kiểm tra đầy đủ dấu tiếng Việt trước khi chốt font.

## 5. Layout và responsive

- Max content width tham chiếu: khoảng 1280px.
- Padding ngang: desktop 80px, tablet 32px, mobile 16px.
  (Khớp `@mixin container` trong `styles/utils/_mixins.scss` và thiết kế Figma — node Container `px-[80px]`, max-width 1280px.)
- Spacing tham chiếu: 4, 8, 16, 24, 32, 48, 64, 80, 96, 120px.
- Breakpoint QA: 1440, 1280, 1024, 768, 430, 390, 375px.
- Không chỉ thu nhỏ desktop; phải điều chỉnh layout theo ngữ cảnh thiết bị.
- Không có horizontal overflow ngoài vùng cuộn được chủ đích.

## 6. Nội dung và dữ liệu

- Không dùng Lorem Ipsum.
- Không tự tạo thông tin công ty, hotline, địa chỉ, số liệu, dự án, đánh giá khách hàng hoặc hình ảnh được mô tả như dữ liệu thật.
- Chỉ hiển thị testimonial khi có dữ liệu thật.
- Không hardcode dữ liệu giả trong production.
- Nội dung chưa có phải để trạng thái placeholder được nhận diện rõ hoặc hỏi người dùng cung cấp.
