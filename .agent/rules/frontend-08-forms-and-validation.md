---
trigger: glob
globs: "**/frontend/**"
description: "Quy tắc thiết kế form, validation, trạng thái submit và accessibility trong Frontend."
---

# 08 — Forms và validation

## 1. Nguyên tắc

- Form phải có label rõ ràng, trạng thái validation dễ hiểu và thông báo bằng tiếng Việt.
- Không chỉ dựa vào placeholder làm label.
- Validation phía Frontend cải thiện trải nghiệm; Backend vẫn phải validate độc lập.
- Không tự đặt quy tắc nghiệp vụ hoặc field bắt buộc nếu chưa được xác nhận.

## 2. Tổ chức

- Tách form component khỏi page khi form có nhiều field, logic hoặc được tái sử dụng.
- Tái sử dụng form create/edit khi cấu trúc và validation tương đồng.
- Đặt schema validation và types theo convention/module hiện có; shared types vẫn đặt trong `shared-types/`.
- Trước khi thêm thư viện form/validation, kiểm tra dependency hiện tại và xin xác nhận nếu cần thêm package.

## 3. Trạng thái

Cần xử lý phù hợp:
- Empty/default.
- Focused.
- Filled.
- Invalid.
- Valid (nếu UI cần).
- Submitting/disabled.
- Success.
- Error.

## 4. Submit và lỗi

- Chặn submit lặp khi request đang xử lý.
- Hiển thị lỗi gần field tương ứng khi có thể xác định field.
- Giữ lại dữ liệu người dùng đã nhập khi request thất bại, trừ trường hợp có lý do bảo mật/nghiệp vụ.
- Thông báo thành công/thất bại rõ ràng.
- Không hiển thị raw backend error hoặc stack trace.
- Không coi form thành công trước khi server xác nhận thành công.

## 5. Accessibility

- Kết nối label với input.
- Thông báo lỗi cần được công nghệ hỗ trợ tiếp cận nhận biết khi phù hợp.
- Đảm bảo thao tác bàn phím, focus-visible và thứ tự tab hợp lý.
- Nút submit, nút hủy và hành động phụ phải có tên dễ hiểu.
