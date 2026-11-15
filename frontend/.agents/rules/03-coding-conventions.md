# 03 — Coding conventions

## 1. TypeScript

- Dùng TypeScript cho mã nguồn ứng dụng.
- Ưu tiên type rõ ràng; tránh `any`.
- Không dùng type assertion (`as`) để che lỗi nếu chưa hiểu nguyên nhân.
- Dùng `unknown` và narrowing khi dữ liệu thực sự chưa xác định.
- Không bỏ qua lỗi TypeScript bằng `@ts-ignore`; nếu bắt buộc, ghi chú lý do và phạm vi.
- Ưu tiên `const`; chỉ dùng `let` khi cần gán lại.
- Xử lý `null`/`undefined` có chủ đích; không dùng optional chaining để che lỗi logic.

## 2. Giới hạn kích thước file

- File `.tsx` không được vượt quá **400 dòng** trong điều kiện thông thường.
- Khi file đạt khoảng 350 dòng, chủ động đánh giá khả năng tách component, hook hoặc phần cấu hình.
- Không tách file máy móc chỉ để giảm số dòng.
- Nếu có lý do kỹ thuật khiến file cần vượt 400 dòng, phải báo cáo rõ lý do và xin xác nhận trước khi giữ nguyên.
- Ưu tiên giảm độ phức tạp và số trách nhiệm trước khi chỉ đếm dòng.

## 3. Naming conventions

- Thư mục Frontend (đặc biệt là components): `kebab-case` (chữ thường): `footer/`, `container/`, `section-header/`, `mobile-drawer/`.
- React component: `PascalCase`.
- Function, variable, custom hook: `camelCase`; hook bắt đầu bằng `use`.
- Type/interface: `PascalCase`.
- Constant thực sự bất biến và mang ý nghĩa cấu hình: `UPPER_SNAKE_CASE`.
- Component file: `PascalCase.tsx`.
- Hook file: `use-<purpose>.ts`.
- API file: `<module>.api.ts`.
- Sass module: `<Component>.module.scss` hoặc `<name>.module.scss`, nhất quán với component.
- Tránh tên chung chung như `data`, `item`, `handle` khi có thể đặt tên mô tả rõ nghĩa.

## 4. Function và readability

- Một function nên có một trách nhiệm chính.
- Ưu tiên early return khi giúp giảm nesting.
- Tách logic phức tạp khỏi JSX.
- Không lặp code đáng kể; chỉ tạo abstraction khi có nhu cầu tái sử dụng hoặc giúp làm rõ domain.
- Không tạo component/hook chỉ để bọc một dòng code nếu không đem lại giá trị.
- Tránh nested ternary khó đọc.

## 5. Imports

- Dùng alias path nếu dự án đã cấu hình.
- Gom và sắp xếp imports nhất quán với formatter/linter hiện có.
- Không để unused imports, biến hoặc exports.
- Tránh circular dependencies.
- Không import từ internal path sâu của thư viện nếu có public API phù hợp.
- Luôn luôn import thông qua aliases như : @utils, @lib, @constants
- Không import kiểu nested như : ../../utils/video/files bên trong components
- Hãy giữ cho các lệnh import động trỏ đến các khối `@lib/@utils` thay vì các tệp riêng lẻ, để việc đóng gói được nhất quán.

## 6. Comments

- Viết comment để giải thích lý do hoặc constraint khó hiểu, không diễn giải lại code.
- TODO phải mô tả việc cần làm; không để TODO mơ hồ.
- Không để code chết hoặc comment-out code trong commit.
