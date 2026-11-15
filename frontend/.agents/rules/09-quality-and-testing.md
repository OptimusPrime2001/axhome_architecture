# 09 — Chất lượng, responsive và kiểm thử

## 1. Trước khi hoàn tất task

Chạy các lệnh phù hợp với scripts thực tế trong `package.json`, thường gồm:
- Lint.
- Type check.
- Unit/component tests nếu có.
- Build.

Không tự bịa tên script. Kiểm tra `package.json` trước khi chạy.

## 2. Responsive QA

Kiểm tra theo breakpoint dự án:
- Desktop: 1440px, 1280px.
- Tablet: 1024px, 768px.
- Mobile: 430px, 390px, 375px.

Checklist:
- Không có horizontal overflow ngoài vùng cuộn có chủ đích.
- Không tràn/cắt chữ, đặc biệt với tiếng Việt.
- Heading wrap tự nhiên.
- Ảnh không méo, đúng aspect ratio và crop hợp lý.
- Grid và navigation thích ứng theo màn hình.
- CTA dễ thao tác, không bị che.
- Form dễ nhập liệu trên mobile.
- Bảng admin có cách xử lý mobile rõ ràng.

## 3. UI states và interactions

Kiểm tra các trạng thái phù hợp:
- Default, hover, active, focus, disabled, loading.
- Form invalid, submitting, success, error.
- List loading, empty, error, populated.
- Search không có kết quả.
- Uploading, upload success, upload failure nếu có upload.
- Delete confirmation và save feedback nếu có thao tác tương ứng.

## 4. Accessibility cơ bản

- Dùng semantic HTML phù hợp.
- Ảnh có alt text có ý nghĩa; ảnh trang trí dùng alt rỗng.
- Form có label.
- Tương tác sử dụng được bằng bàn phím.
- Focus indicator rõ ràng.
- Màu chữ/nền có độ tương phản hợp lý.
- Không truyền tải trạng thái chỉ bằng màu sắc.

## 5. SEO và hiệu năng

- Public pages cần metadata phù hợp, title/description rõ ràng.
- Không tạo metadata giả hoặc nội dung SEO nhồi từ khóa.
- Tối ưu ảnh, kích thước ảnh và loading strategy.
- Dùng image optimization của Next.js theo cấu hình dự án khi phù hợp.
- Lazy-load nội dung/ảnh ngoài màn hình đầu khi hợp lý; không lazy-load ảnh LCP một cách máy móc.
- Tránh thêm JavaScript hoặc animation không đem lại giá trị.
- Không hy sinh accessibility hoặc chất lượng nội dung để tối ưu điểm số.

## 6. Báo cáo kiểm thử

Sau task, nêu:
- Lệnh đã chạy.
- Kết quả pass/fail.
- Kiểm thử thủ công đã thực hiện và viewport nếu có.
- Những phần chưa kiểm thử và lý do.
- Lỗi còn tồn tại hoặc rủi ro đã biết.

Không ghi “đã test đầy đủ” nếu chỉ chạy build hoặc lint.
