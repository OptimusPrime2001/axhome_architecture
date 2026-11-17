---
trigger: glob
globs: "**/frontend/**"
description: "Cấu trúc thư mục và quy tắc đặt vị trí file trong Frontend Axhome."
---

# 02 — Cấu trúc thư mục Frontend

## 1. Nguyên tắc

- Đặt file đúng trách nhiệm; không tạo file tùy tiện ở root `src/`.
- Tách riêng API functions, TanStack Query hooks và shared types theo convention dự án.
- Không tạo hai nguồn định nghĩa cho cùng một type hoặc API function.
- Trước khi thêm thư mục mới, kiểm tra cấu trúc hiện tại và tìm vị trí phù hợp.
- Không di chuyển hàng loạt file chỉ để khớp một sơ đồ mẫu nếu chưa có yêu cầu.

## 2. Cấu trúc tham chiếu

```text
src/
├── app/
│   ├── (public)/
│   └── admin/
├── components/
│   ├── common/
│   ├── layout/
│   └── [component-groups]/
├── apis/
│   ├── designs.ts
│   ├── projects.ts
│   ├── contacts.ts
│   └── services.ts
├── hooks/
│   ├── designs/
│   ├── projects/
│   ├── contacts/
│   └── services/
├── shared-types/
│   ├── designs/
│   ├── projects/
│   ├── contacts/
│   └── services/
├── lib/
│   ├── axios.ts
│   └── query-client.ts
├── styles/
│   ├── variables.scss
│   └── global.scss
└── [other-existing-folders]/
```

Đây là cấu trúc mục tiêu tham chiếu, không phải yêu cầu tạo tất cả thư mục rỗng ngay lập tức.

## 3. Quy tắc vị trí

- `app/`: route, layout và page theo Next.js App Router.
- `components/`: component giao diện dùng chung hoặc component có phạm vi sử dụng rõ ràng.
- `apis/`: hàm giao tiếp với backend; không chứa React component hoặc UI state.
- `hooks/`: custom hooks, đặc biệt là TanStack Query queries/mutations; gọi API functions từ `apis/`.
- `shared-types/`: TypeScript types/interfaces dùng chung, phân nhóm theo module nghiệp vụ.
- `lib/`: hạ tầng dùng chung như Axios instance, QueryClient và helper nền tảng.
- `styles/`: global stylesheet, Sass variables/mixins/tokens dùng chung.

## 4. Module naming

Dùng tên module nhất quán với nghiệp vụ, ví dụ `designs`, `projects`, `contacts`, `services`.

Tên file API theo mẫu `<module>.ts`, ví dụ `designs.ts`.
Tên hook mô tả hành động/dữ liệu, ví dụ `use-designs.ts`, `use-create-design.ts`.
Tên type file theo module, ví dụ `design.types.ts`, `design-request.types.ts`.

## 5. Không được

- Không khai báo API function bên trong component.
- Không tạo Axios instance riêng trong từng module.
- Không đặt shared type rải rác trong page/component.
- Không import ngược từ `apis/` hoặc `hooks/` vào `shared-types/`.
- Không tạo thư mục `utils` hoặc `helpers` chung để chứa mọi thứ không biết đặt ở đâu.

## 6. Quy tắc đặt tên thư mục Frontend (Folder naming)

- Toàn bộ thư mục ở Frontend (đặc biệt là thư mục component trong `components/`) PHẢI đặt tên theo kiểu **kebab-case / chữ thường (lowercase)**.
- Ví dụ đúng: `footer/`, `container/`, `section-header/`, `mobile-drawer/`, `button/`, `badge/`.
- Tuyệt đối không đặt tên thư mục theo kiểu `PascalCase` (như `Footer/`, `Container/`, `SectionHeader/`, `MobileDrawer/`).
