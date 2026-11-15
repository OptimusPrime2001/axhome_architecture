# Axhome Frontend Rules

Bộ quy tắc Frontend bằng tiếng Việt.

## Cài đặt
Sao chép `AGENTS.md` vào thư mục `frontend/` và sao chép thư mục `.agents/` vào cùng cấp:

```text
frontend/
├── AGENTS.md
└── .agents/
    └── rules/
        └── ...
```

## Các quyết định đã áp dụng
- Sass Modules là styling mặc định; inline style chỉ được phép cho giá trị runtime dynamic có giải thích.
- Không dùng Tailwind CSS.
- API functions ở `src/apis/`.
- TanStack Query hooks ở `src/hooks/`, gọi API functions từ `apis/`.
- Shared types ở `src/shared-types/`, phân chia theo module.
- File TSX không vượt quá 400 dòng trong điều kiện thông thường; cần đánh giá tách file từ khoảng 350 dòng.

## Lưu ý
Đây là bộ rule cho AI coding agent, không phải cấu hình tự động enforce. Nên bổ sung lint/CI hoặc review checklist để kiểm tra các quy tắc có thể tự động hóa.
