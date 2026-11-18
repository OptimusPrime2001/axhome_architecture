---
trigger: glob
globs: "**/frontend/**"
description: "Cấu trúc thư mục và quy tắc đặt vị trí file trong Frontend Axhome."
---

# 02 — Cấu trúc thư mục Frontend

## 1. Nguyên tắc

- Đặt file đúng trách nhiệm; không tạo file tùy tiện ở root `src/`.
- Tách riêng API functions, TanStack Query hooks, Zustand stores và shared types theo convention dự án.
- Không tạo hai nguồn định nghĩa cho cùng một type hoặc API function.
- Trước khi thêm thư mục mới, kiểm tra cấu trúc hiện tại và tìm vị trí phù hợp.
- Không di chuyển hàng loạt file chỉ để khớp một sơ đồ mẫu nếu chưa có yêu cầu.

## 2. Cấu trúc chuẩn

```text
src/
├── app/
│   ├── (public)/          # Public website routes & layout
│   └── admin/             # Admin login & (panel) routes
├── components/
│   ├── admin/
│   │   ├── layout/        # AdminShell, AdminSidebar, AdminTopbar
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── contacts/
│   │   ├── settings/
│   │   └── login/
│   ├── animate-ui/        # Motion wrappers & animated icons
│   ├── common/            # Header, Footer, Logo, MobileDrawer, ChatWidget, BackToTop
│   ├── sections/          # Phân nhóm theo trang/module nghiệp vụ (KHÔNG để phẳng ở root sections/)
│   │   ├── home/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── projects/
│   │   └── project-detail/
│   └── ui/                # Mỗi shadcn/ui primitive đặt trong 1 thư mục kebab-case riêng kèm index.ts
├── store/                 # Cấu trúc store-base (types/, slices/, selectors/, store.ts, index.ts)
│   ├── admin-projects/
│   ├── admin-contacts/
│   └── projects-catalogue/
├── constants/             # Hằng số tĩnh & mock data (gom nhóm home/ và các file domain)
├── shared-types/          # Mỗi domain đặt trong 1 thư mục riêng (about/, admin/, contact/, home/, project/)
├── apis/                  # API functions giao tiếp với Backend
├── hooks/                 # Custom hooks & TanStack Query hooks
├── lib/                   # Hạ tầng dùng chung (utils.ts, media-upload.ts, axios, query-client)
└── styles/                # reset.scss, globals.scss, utils/ (_variables.scss, _mixins.scss)
```

## 3. Quy tắc vị trí

- `app/`: route, layout, page và các file hệ thống (`not-found.tsx`, `error.tsx`, `loading.tsx`) theo Next.js App Router.
- `components/ui/`: mỗi primitive của `shadcn/ui` phải nằm trong thư mục `kebab-case/` riêng (kèm `ComponentName.tsx`, `ComponentName.module.scss` nếu có custom style, và `index.ts`). Không để file `.tsx` lẻ ở trực tiếp `components/ui/`.
- `components/sections/`: phải phân nhóm theo trang hoặc phân hệ nghiệp vụ (`home/`, `about/`, `contact/`, `projects/`, `project-detail/`...). Tuyệt đối không đặt hàng chục section phẳng trực tiếp dưới `components/sections/`.
- `components/admin/`: phần khung giao diện đặt trong `admin/layout/`, các màn hình tính năng đặt theo thư mục nghiệp vụ (`dashboard/`, `projects/`, `contacts/`, `settings/`, `login/`).
- `store/`: mọi Zustand store phải tuân thủ cấu trúc `store-base` (`types/`, `slices/`, `selectors/`, `store.ts`, `index.ts`) theo rule `frontend-10-state-and-zustand.md`.
- `apis/`: hàm giao tiếp với backend; không chứa React component hoặc UI state.
- `hooks/`: custom hooks, đặc biệt là TanStack Query queries/mutations; gọi API functions từ `apis/`.
- `shared-types/`: TypeScript types/interfaces dùng chung, mỗi domain đặt trong thư mục con riêng có `index.ts` và re-export tại `shared-types/index.ts`.
- `lib/`: hạ tầng dùng chung như `cn()`, media upload helper, Axios instance, QueryClient.
- `styles/`: global stylesheet, Sass variables/mixins/tokens dùng chung.

## 4. Module naming

Dùng tên module nhất quán với nghiệp vụ, ví dụ `projects`, `contacts`, `services`, `about`, `home`.

Tên file API theo mẫu `<module>.ts`, ví dụ `projects.ts`.
Tên hook mô tả hành động/dữ liệu, ví dụ `use-projects.ts`, `use-create-project.ts`.

## 5. Không được

- Không khai báo API function bên trong component.
- Không tạo Axios instance riêng trong từng module.
- Không đặt shared type rải rác trong page/component.
- Không import ngược từ `apis/` hoặc `hooks/` vào `shared-types/`.
- Không tạo thư mục `utils` hoặc `helpers` chung ở `src/` (đã có `src/lib/`).

## 6. Quy tắc đặt tên thư mục Frontend (Folder naming)

- Toàn bộ thư mục ở Frontend (đặc biệt là thư mục component trong `components/`) PHẢI đặt tên theo kiểu **kebab-case / chữ thường (lowercase)**.
- Ví dụ đúng: `footer/`, `container/`, `section-header/`, `mobile-drawer/`, `button/`, `badge/`.
- Tuyệt đối không đặt tên thư mục theo kiểu `PascalCase` (như `Footer/`, `Container/`, `SectionHeader/`, `MobileDrawer/`).
