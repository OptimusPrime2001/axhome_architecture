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

## 4. Design tokens tham chiếu

Chỉ dùng các giá trị này làm token nền; nếu đã có design system/Stitch được duyệt mới hơn thì ưu tiên nguồn đã được xác nhận.

| Token | Giá trị |
|---|---|
| Primary 900 | `#594638` |
| Primary 800 | `#705A46` |
| Primary 700 | `#8A7159` |
| Primary 600 | `#A58B70` |
| Primary 500 | `#BBA58C` |
| Neutral 950 | `#302C28` |
| Neutral 800 | `#514A43` |
| Neutral 600 | `#81776D` |
| Neutral 400 | `#B9B0A5` |
| Neutral 200 | `#E7E1D9` |
| Neutral 100 | `#F2EFEA` |
| Neutral 50 | `#FAF9F6` |

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
- Padding ngang: desktop 64px, tablet 32px, mobile 20px.
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
