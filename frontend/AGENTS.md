# Quy tắc làm việc — Frontend Axhome

> File điều phối quy tắc dành cho toàn bộ mã nguồn Frontend trong thư mục `frontend/`.

## 1. Vai trò và phạm vi

Frontend là website công ty kiến trúc & xây dựng Axhome, gồm:
- Website public giới thiệu công ty, dịch vụ, mẫu thiết kế, công trình và form liên hệ.
- Admin CMS mức cơ bản để quản lý nội dung và yêu cầu liên hệ.

Đây là website giới thiệu và portfolio/catalogue, không phải website thương mại điện tử. Không tự thêm giỏ hàng, thanh toán hoặc quản lý đơn hàng.

## 2. Ngôn ngữ và nguyên tắc chung

- Trao đổi, phân tích và giải thích kỹ thuật bằng tiếng Việt.
- Nội dung hiển thị trên website dùng tiếng Việt tự nhiên, đúng chính tả và đầy đủ dấu.
- Tên file, biến, hàm, component, type, API field và identifier trong code dùng tiếng Anh.
- Ưu tiên code rõ ràng, dễ bảo trì, đúng phạm vi; tránh over-engineering.
- Không tự bịa nghiệp vụ, dữ liệu công ty, dự án, khách hàng, testimonial hoặc API contract.
- Khi yêu cầu chưa rõ và ảnh hưởng kiến trúc/nghiệp vụ, hỏi lại trước khi triển khai.

## 3. Quy trình bắt buộc trước khi sửa code

1. Đọc file rule liên quan trong `.agents/rules/`.
2. Kiểm tra cấu trúc thư mục, convention và code hiện có; ưu tiên tái sử dụng.
3. Tóm tắt mục tiêu, phạm vi, giả định và các điểm chưa rõ.
4. Liệt kê file dự kiến tạo/sửa và acceptance criteria.
5. Chỉ triển khai task được yêu cầu; không tự ý làm sang task khác.
6. Sau khi sửa, chạy các kiểm tra phù hợp và báo cáo kết quả thực tế.

Không tuyên bố test/build thành công nếu chưa chạy hoặc chưa có bằng chứng.

## 4. Bộ quy tắc chi tiết

Đọc và tuân thủ các tài liệu sau tùy theo task:

- `.agents/rules/01-project-context.md` — Bối cảnh sản phẩm, định hướng UI/UX.
- `.agents/rules/02-folder-structure.md` — Cấu trúc thư mục và nơi đặt file.
- `.agents/rules/03-coding-conventions.md` — Quy ước TypeScript, naming, giới hạn file.
- `.agents/rules/04-components-and-react.md` — Component, hooks và trách nhiệm UI.
- `.agents/rules/05-styling.md` — Sass Modules và ngoại lệ inline style.
- `.agents/rules/06-api-and-tanstack-query.md` — API functions, Axios và TanStack Query.
- `.agents/rules/07-typescript-types.md` — Tổ chức types tập trung theo module.
- `.agents/rules/08-forms-and-validation.md` — Form và validation.
- `.agents/rules/09-quality-and-testing.md` — Chất lượng, accessibility, responsive và kiểm thử.

Nếu task liên quan nhiều mảng, phải đọc tất cả rule tương ứng, không chỉ đọc một file.

## 5. Công nghệ và trạng thái quyết định

Theo bối cảnh hiện tại, Frontend đang sử dụng Next.js, TypeScript, Sass, shadcn/ui, TanStack Query và Axios. Trước khi thay đổi package hoặc cấu hình, kiểm tra `package.json` và code thực tế.

Quy ước styling của dự án được chốt riêng trong `.agents/rules/05-styling.md`: Sass Modules là cách styling mặc định; inline style chỉ được dùng trong ngoại lệ có kiểm soát. Không dùng Tailwind CSS.

Không tự nâng cấp framework, thay thư viện, thêm dependency hoặc thay đổi kiến trúc nếu chưa nêu lý do và được chấp thuận.

## 6. Xử lý xung đột

- Nếu rule mâu thuẫn với yêu cầu mới của người dùng, nêu rõ xung đột và hỏi xác nhận khi cần.
- Nếu rule mâu thuẫn với code hiện tại, không tự ý rewrite diện rộng; báo cáo hiện trạng và đề xuất cách chuyển đổi từng bước.
- Nếu API contract hoặc backend chưa được xác nhận, không tự suy đoán response/request. Có thể đề xuất contract nhưng phải đánh dấu là đề xuất.

## 7. Báo cáo sau mỗi task

Báo cáo ngắn gọn:
- Đã thay đổi gì.
- File nào được tạo/sửa.
- Các quyết định kỹ thuật đáng chú ý.
- Lệnh kiểm tra đã chạy và kết quả.
- Việc chưa làm, giới hạn hoặc rủi ro còn lại.
