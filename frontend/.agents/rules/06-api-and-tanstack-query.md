# 06 — API, Axios và TanStack Query

## 1. Kiến trúc data flow

Luồng chuẩn:

`React Component → TanStack Query Hook (hooks/) → API Function (apis/) → Axios Instance (lib/) → Backend API`

Component không gọi Axios hoặc API function trực tiếp.

## 2. API functions — `src/apis/`

- Tất cả hàm gọi backend được khai báo trong `apis/`.
- Phân chia file theo module nghiệp vụ, ví dụ `designs.api.ts`, `projects.api.ts`, `contacts.api.ts`.
- API function chịu trách nhiệm tạo request và trả dữ liệu theo contract.
- Dùng Axios instance dùng chung trong `lib/axios.ts`.
- Không tạo Axios instance riêng trong từng module.
- Không chứa React hooks, component state hoặc UI notification trong API function.
- Request/response phải sử dụng types tương ứng từ `shared-types/`.
- Không tự suy đoán endpoint, payload, response envelope hoặc error format khi backend contract chưa được xác nhận.

## 3. TanStack Query hooks — `src/hooks/`

- Query và mutation hooks được khai báo trong `hooks/`, phân nhóm theo module.
- Hook phải sử dụng API function đã khai báo trong `apis/`.
- Dùng `useQuery` cho truy vấn dữ liệu và `useMutation` cho thao tác tạo/cập nhật/xóa hoặc action làm thay đổi dữ liệu.
- Query key phải ổn định, có cấu trúc và được tổ chức nhất quán; cân nhắc query key factory theo module.
- Khai báo `queryKey`, `queryFn`, `enabled`, stale time và các option phù hợp với nghiệp vụ.
- Sau mutation, invalidate hoặc update cache có chủ đích.
- Không gọi API bằng `useEffect` để thay thế TanStack Query cho server state.
- Không đưa UI-specific state như mở/đóng modal vào TanStack Query cache.

## 4. Component sử dụng dữ liệu

- Component gọi hook từ `hooks/` và render theo trạng thái trả về.
- Không gọi Axios trực tiếp trong component.
- Không gọi API function trực tiếp trong component.
- Không tự quản lý lại loading/error/data nếu TanStack Query đã cung cấp trạng thái tương ứng, trừ khi có lý do rõ ràng.
- Có loading, error, empty và success state phù hợp.
- Không hiển thị dữ liệu giả như dữ liệu thật trong production.

## 5. Axios instance

- Cấu hình base URL, timeout, headers và interceptors tập trung trong `lib/axios.ts`.
- Base URL lấy từ environment variables theo convention của Next.js.
- Không commit secrets hoặc token.
- Xử lý lỗi tập trung ở mức phù hợp; không nuốt lỗi.
- Không log thông tin nhạy cảm như token, mật khẩu hoặc dữ liệu cá nhân không cần thiết.
- Auth strategy (cookie/session/JWT) phải theo quyết định đã chốt; không tự chọn hoặc thay đổi.

## 6. Contract và error handling

- Backend API contract là nguồn sự thật cho request/response.
- Nếu chưa có contract, đề xuất trước và đánh dấu rõ là đề xuất; không tự triển khai giả định như quyết định cuối.
- Phân biệt lỗi validation, authentication/authorization, network và server.
- Hiển thị thông báo thân thiện bằng tiếng Việt; không expose stack trace hoặc thông tin nội bộ cho người dùng.
- Với list API, tuân thủ pagination/filter/sort contract đã xác nhận.
