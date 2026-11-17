---
trigger: glob
globs: "**/frontend/**"
description: "Tổ chức TypeScript types và shared-types theo module nghiệp vụ trong Frontend."
---

# 07 — TypeScript types và shared-types

## 1. Vị trí

- Types/interfaces dùng chung được khai báo trong `src/shared-types/`.
- Phân chia theo module nghiệp vụ: `designs/`, `projects/`, `contacts/`, `services/`...
- Không đặt shared types rải rác trong page hoặc component.
- Type chỉ dùng nội bộ một component và không có khả năng tái sử dụng có thể đặt gần component; nếu được dùng ở nhiều nơi, chuyển về `shared-types/`.
- Không tạo type trùng lặp chỉ khác tên.

## 2. Cấu trúc tham chiếu

```text
shared-types/
├── designs/
│   ├── design.ts
│   ├── design-request.ts
│   └── index.ts
├── projects/
│   ├── project.ts
│   ├── project-request.ts
│   └── index.ts
└── contacts/
    ├── contact.ts
    ├── contact-request.ts
    └── index.ts
```

Không bắt buộc tạo đủ các file nếu module chưa cần.

## 3. Quy tắc định nghĩa

- Dùng `PascalCase` cho type và interface.
- Đặt tên thể hiện rõ domain và mục đích.
- Tách request, response và domain/UI model khi cấu trúc hoặc trách nhiệm thực sự khác nhau.
- Không tạo một type tổng quát quá rộng cho mọi use case.
- Ưu tiên `type` hoặc `interface` theo convention hiện có; không chuyển đổi tùy tiện toàn dự án.
- Dùng union types cho tập giá trị hữu hạn khi phù hợp.
- Tránh enum runtime nếu string union đáp ứng tốt hơn và phù hợp codebase.

## 4. API typing

Tên tham chiếu:
- `CreateDesignRequest`
- `UpdateDesignRequest`
- `DesignResponse`
- `DesignListResponse`

Tên trên là convention gợi ý; phải khớp API contract thực tế.

- API functions phải khai báo kiểu request/response rõ ràng.
- Query/mutation hooks phải suy luận hoặc khai báo type phù hợp.
- Không ép kiểu response để bỏ qua sự không khớp với backend.
- Không tự thêm field vào response type nếu API chưa trả field đó.
- Nếu backend trả envelope chung, định nghĩa và tái sử dụng type envelope sau khi contract được xác nhận.

## 5. Imports và exports

- Import types từ `shared-types/` bằng alias path đã cấu hình.
- Có thể dùng `import type` khi chỉ import type.
- Dùng `index.ts` để export có chọn lọc nếu giúp API module rõ ràng.
- Tránh barrel export gây circular dependency hoặc làm khó truy vết.
