# 05 — Styling với Sass Modules và shadcn/ui

## 1. Quy tắc mặc định

- Tận dụng tối đa hệ thống component của **shadcn/ui** làm UI package chính của dự án.
- Sử dụng Sass Modules (`*.module.scss`) kết hợp với Tailwind CSS utility classes để viết style cho component/page.
- Khi sử dụng shadcn component, nếu phần style mặc định chưa giống với Figma design, có thể thêm class (hoặc custom class từ module/global) để điều chỉnh cho khớp 100% với design.
- Không viết CSS inline trực tiếp trong JSX/TSX (trừ các trường hợp giá trị dynamic bắt buộc).
- Không dùng styled-components, Emotion hoặc CSS-in-JS.
- Không dùng thuộc tính `style` cho các giá trị tĩnh có thể khai báo bằng class/Sass Module.
- Không tạo inline style chỉ vì tiện hoặc nhanh hơn.

## 2. Ngoại lệ inline style có kiểm soát

Chỉ cho phép `style` khi giá trị thực sự dynamic tại runtime và khó/không phù hợp để biểu diễn bằng class Sass, ví dụ:
- Giá trị phần trăm tiến độ được tính từ dữ liệu.
- CSS custom property nhận giá trị runtime từ dữ liệu hoặc tương tác.
- Vị trí/kích thước được tính toán động mà không thể xác định trước bằng class hữu hạn.

Điều kiện:
1. Phải có lý do kỹ thuật rõ ràng.
2. Chỉ truyền các giá trị dynamic tối thiểu.
3. Phần trình bày tĩnh vẫn phải nằm trong `.module.scss`.
4. Ưu tiên CSS custom properties để truyền biến runtime vào stylesheet.
5. Không dùng inline style để đặt màu, padding, margin, font, border hoặc layout cố định.

Ví dụ được chấp nhận:

```tsx
<div
  className={styles.progress}
  style={{ "--progress": `${progress}%` } as React.CSSProperties}
/>
```

```scss
.progress {
  width: var(--progress);
}
```

Ví dụ không được chấp nhận:

```tsx
<div style={{ color: "#594638", padding: 16 }} />
```

## 3. Tổ chức Sass Modules

- Style riêng của component đặt trong file `.module.scss` tương ứng.
- Class name dùng camelCase hoặc kebab-case; tuân thủ một convention thống nhất trong codebase.
- Dùng class local của Sass Modules; không phụ thuộc global class để style component.
- Không đặt style của nhiều component không liên quan vào một module stylesheet.
- Selector nên nông, rõ ràng; tránh nesting quá sâu.
- Hạn chế `!important`; nếu dùng phải giải thích lý do.
- Không tạo selector phụ thuộc cấu trúc DOM mong manh.

## 4. Global styles và tokens

Global stylesheet chỉ dành cho:
- CSS reset/normalize.
- Font-face và thiết lập typography nền.
- CSS variables/design tokens.
- Style nền tảng áp dụng toàn ứng dụng.

Không đưa style riêng của component vào global stylesheet.

Tái sử dụng màu, typography, spacing và breakpoint tokens đã được thống nhất. Không tự ý thêm màu hoặc spacing tùy tiện.

## 5. Responsive và states

- Responsive styles viết trong Sass Modules bằng media queries/mixins đã có.
- Kiểm tra tối thiểu các kích thước 1440, 1280, 1024, 768, 430, 390 và 375px khi phù hợp.
- Có style cho hover, focus-visible, active, disabled và loading khi component có các trạng thái đó.
- Không loại bỏ focus indicator nếu không có phương án thay thế dễ nhận biết.
- Đảm bảo nội dung tiếng Việt không bị tràn hoặc clipping.

## 6. shadcn/ui

- Có thể dùng shadcn/ui làm nền component theo dependency hiện có.
- Tùy biến giao diện theo design system Axhome bằng Sass Modules và cấu trúc component phù hợp.
- Không dùng utility class Tailwind do shadcn/ui thường sinh ra; nếu component được thêm vào có Tailwind class mặc định, phải chuyển đổi sang Sass Modules trước khi tích hợp.
- Không sửa trực tiếp code thư viện bên ngoài nếu có thể wrap hoặc customize ở lớp component của dự án.
