# Project Brief --- Website công ty kiến trúc & xây dựng

> Tài liệu tổng hợp bối cảnh, yêu cầu, định hướng UI/UX, kiến trúc kỹ
> thuật và kế hoạch chia nhỏ công việc đã thảo luận. Dùng làm tài liệu
> nền khi tạo Project trong ChatGPT và tiếp tục phân tích/triển khai
> code.
>
> **Trạng thái:** Định hướng và thiết kế đã được thảo luận; chưa xác
> nhận rằng code, database hoặc backend đã được triển khai. **Ngôn
> ngữ:** Trao đổi kỹ thuật bằng tiếng Việt; nội dung hiển thị trên
> website bằng tiếng Việt.

------------------------------------------------------------------------

## 1. Tổng quan dự án

### 1.1. Mục tiêu

Xây dựng website giới thiệu cho một **công ty cổ phần kiến trúc và xây
dựng**, tập trung vào thiết kế nhà ở, nhà phố, biệt thự và thi công công
trình.

Thông điệp thương hiệu đã thống nhất:

**"Bản vẽ chuẩn -- Tối ưu chi phí -- Thi công trọn gói"**

Website cần giúp khách hàng:

-   Hiểu công ty làm gì, năng lực và thế mạnh ra sao.
-   Xem các mẫu thiết kế kiến trúc/bản vẽ.
-   Xem công trình thực tế đã hoàn thành hoặc đang thi công.
-   Tìm hiểu dịch vụ và quy trình làm việc.
-   Gửi yêu cầu tư vấn/liên hệ nhanh chóng.

Công ty cần một khu vực quản trị để tự cập nhật nội dung mà không cần
sửa code.

### 1.2. Loại sản phẩm

Mô hình phù hợp: **Company Website + Portfolio/Catalogue + Admin CMS mức
cơ bản**.

Đây không phải website thương mại điện tử. MVP không cần giỏ hàng, thanh
toán hoặc quản lý đơn hàng.

### 1.3. Đối tượng sử dụng

-   **Khách hàng/visitor:** người đang có nhu cầu thiết kế nhà, xây nhà,
    tham khảo mẫu thiết kế hoặc tìm đơn vị thi công.
-   **Admin/nhân viên nội dung:** quản lý mẫu thiết kế, công trình, dịch
    vụ và yêu cầu liên hệ.
-   **Quản trị viên:** quản lý tài khoản/quyền truy cập và cấu hình hệ
    thống khi cần.

### 1.4. Nguyên tắc phạm vi MVP

Ưu tiên: 1. Website public đầy đủ nội dung và responsive. 2. Quản trị
CRUD cho Designs và Projects. 3. Form Contact lưu yêu cầu tư vấn. 4.
Quản lý trạng thái yêu cầu liên hệ. 5. SEO cơ bản, tối ưu ảnh và hiệu
năng.

Chưa mặc định đưa vào MVP: - Thanh toán/đặt cọc trực tuyến. - CRM phức
tạp. - Quản lý tiến độ thi công nội bộ. - Báo giá tự động. - Đa ngôn
ngữ. - Phân quyền nhiều cấp phức tạp.

Các tính năng này chỉ bổ sung khi có yêu cầu cụ thể.

------------------------------------------------------------------------

## 2. Sitemap và chức năng

### 2.1. Public website

  -----------------------------------------------------------------------
  Route                   Trang                   Mục tiêu
  ----------------------- ----------------------- -----------------------
  `/`                     Home                    Giới thiệu tổng quan,
                                                  dẫn khách đến dịch vụ,
                                                  mẫu thiết kế, công
                                                  trình và liên hệ

  `/about`                Giới thiệu              Câu chuyện, năng lực,
                                                  tầm nhìn, sứ mệnh, giá
                                                  trị

  `/designs`              Mẫu thiết kế            Danh sách mẫu thiết kế,
                                                  lọc theo danh mục

  `/designs/:slug`        Chi tiết mẫu thiết kế   Hình ảnh, thông tin, mô
                                                  tả, bản vẽ và CTA

  `/projects`             Công trình              Danh sách công trình
                                                  thực tế

  `/projects/:slug`       Chi tiết công trình     Thông tin, hình ảnh và
                                                  quá trình triển khai

  `/contact`              Liên hệ                 Thông tin công ty và
                                                  form yêu cầu tư vấn
  -----------------------------------------------------------------------

### 2.2. Admin

Các route gợi ý:

  Route                        Trang/chức năng
  ---------------------------- ---------------------------
  `/admin/login`               Đăng nhập
  `/admin/dashboard`           Tổng quan
  `/admin/designs`             Danh sách mẫu thiết kế
  `/admin/designs/new`         Tạo mẫu thiết kế
  `/admin/designs/:id/edit`    Chỉnh sửa mẫu thiết kế
  `/admin/projects`            Danh sách công trình
  `/admin/projects/new`        Tạo công trình
  `/admin/projects/:id/edit`   Chỉnh sửa công trình
  `/admin/services`            Quản lý dịch vụ
  `/admin/contacts`            Danh sách yêu cầu liên hệ
  `/admin/contacts/:id`        Chi tiết yêu cầu liên hệ
  `/admin/settings`            Cấu hình website

Admin là phần cần thiết vì công ty phải tự cập nhật mẫu thiết kế, hình
ảnh công trình và xử lý lead.

### 2.3. Nội dung từng trang public

#### Home

Các section dự kiến theo thứ tự:

1.  Header: logo, menu, hotline và CTA.
2.  Hero: hình ảnh kiến trúc/biệt thự chất lượng cao, slogan và CTA.
3.  Giới thiệu ngắn về công ty.
4.  Dịch vụ chính:
    -   Thiết kế kiến trúc.
    -   Tối ưu chi phí.
    -   Thi công trọn gói.
5.  Mẫu thiết kế nổi bật.
6.  Công trình tiêu biểu.
7.  Lý do khách hàng lựa chọn công ty.
8.  Quy trình làm việc.
9.  Đánh giá/cảm nhận khách hàng (chỉ hiển thị khi có dữ liệu thật).
10. CTA tư vấn.
11. Footer: thông tin, liên hệ, điều hướng.

Không nhồi nhét section chỉ để làm trang dài. Mỗi block phải có mục đích
rõ ràng.

#### About

-   Hero/tiêu đề giới thiệu.
-   Tổng quan công ty.
-   Câu chuyện hoặc quá trình hình thành (nếu có dữ liệu).
-   Tầm nhìn, sứ mệnh, giá trị cốt lõi.
-   Năng lực và thế mạnh.
-   Đội ngũ (nếu có dữ liệu).
-   Quy trình làm việc.
-   CTA liên hệ.

#### Designs listing --- `/designs`

-   Tiêu đề và phần giới thiệu ngắn.
-   Bộ lọc danh mục, dự kiến:
    -   Tất cả.
    -   Nhà phố.
    -   Biệt thự.
    -   Nhà cấp 4.
    -   Nhà vườn.
-   Card mẫu thiết kế:
    -   Ảnh cover.
    -   Tên thiết kế.
    -   Loại hình/phong cách.
    -   Diện tích.
    -   Số tầng.
-   Pagination hoặc cơ chế tải thêm.
-   Empty state khi không có kết quả.

#### Design detail --- `/designs/:slug`

-   Breadcrumb.
-   Tên thiết kế và phần giới thiệu.
-   Ảnh phối cảnh 3D/cover.
-   Thông tin: loại hình, phong cách, diện tích, số tầng, kích thước/lô
    đất nếu có.
-   Gallery ảnh.
-   Mô tả ý tưởng và giải pháp thiết kế.
-   Hình ảnh bản vẽ mặt bằng/kỹ thuật.
-   Link tải PDF bản vẽ nếu được phép công khai.
-   Mẫu thiết kế liên quan.
-   CTA yêu cầu tư vấn.

#### Projects listing --- `/projects`

-   Tiêu đề và giới thiệu.
-   Bộ lọc loại công trình (nếu cần).
-   Bộ lọc trạng thái:
    -   Hoàn thành.
    -   Đang thi công.
-   Card công trình:
    -   Ảnh thực tế.
    -   Tên công trình.
    -   Địa điểm.
    -   Năm.
    -   Diện tích.
    -   Trạng thái.
-   Pagination hoặc tải thêm.

#### Project detail --- `/projects/:slug`

-   Breadcrumb.
-   Tên công trình.
-   Tóm tắt/overview.
-   Ảnh hero.
-   Thông tin công trình: địa điểm, năm, diện tích, quy mô, trạng thái.
-   Gallery ảnh thực tế.
-   Quá trình thi công/các giai đoạn nếu có dữ liệu.
-   Giải pháp thiết kế/thi công.
-   Kết quả.
-   Công trình liên quan.
-   CTA liên hệ.

#### Contact --- `/contact`

-   Hotline.
-   Email.
-   Địa chỉ.
-   Bản đồ Google Maps (nếu có địa chỉ chính xác).
-   Form gồm:
    -   Họ và tên.
    -   Số điện thoại.
    -   Email (có thể không bắt buộc tùy quyết định).
    -   Nhu cầu/dịch vụ quan tâm.
    -   Diện tích dự kiến (nếu phù hợp).
    -   Nội dung chi tiết.
-   Trạng thái gửi thành công/thất bại và validation rõ ràng.

### 2.4. Admin --- chức năng chi tiết

#### Dashboard

-   Tổng số mẫu thiết kế.
-   Tổng số công trình.
-   Số yêu cầu liên hệ mới.
-   Số yêu cầu đang xử lý.
-   Một số yêu cầu liên hệ gần đây.
-   Không tạo số liệu giả trong môi trường production.

#### Designs management

CRUD mẫu thiết kế. Các trường dữ liệu dự kiến:

-   `name`
-   `slug`
-   `category`
-   `style`
-   `area`
-   `floors`
-   `short_description`
-   `description`
-   `cover_image`
-   `gallery`
-   `drawings` hoặc file PDF
-   `status`: draft/published
-   `seo_title`
-   `seo_description`
-   `created_at`, `updated_at`

Cần xác định thêm: kích thước đất, chiều ngang/dài, hướng nhà, giá tham
khảo có thực sự cần hay không. Không tự thêm tất cả vào MVP.

#### Projects management

CRUD công trình. Các trường dự kiến:

-   `name`
-   `slug`
-   `category`
-   `location`
-   `year`
-   `area`
-   `floors`
-   `status`: đang thi công/hoàn thành (trạng thái công trình)
-   `short_description`
-   `description`
-   `cover_image`
-   `gallery`
-   `seo_title`
-   `seo_description`
-   `publication_status`: draft/published
-   `created_at`, `updated_at`

Lưu ý: trạng thái thi công và trạng thái xuất bản là hai khái niệm khác
nhau, nên cân nhắc tách thành hai field.

#### Contacts management

-   Danh sách yêu cầu tư vấn.
-   Tìm kiếm theo tên/số điện thoại.
-   Lọc theo trạng thái và thời gian.
-   Xem chi tiết nội dung.
-   Ghi chú nội bộ.
-   Cập nhật trạng thái:
    -   Mới.
    -   Đang xử lý.
    -   Đã liên hệ.
    -   Hoàn thành.
-   Có thể lưu người phụ trách nếu nghiệp vụ cần.

#### Services và Settings

Có thể đưa vào MVP hoặc làm sau tùy nhu cầu:

-   Services: CRUD nội dung dịch vụ.
-   Settings: logo, hotline, email, địa chỉ, liên kết mạng xã hội, SEO
    mặc định, thông tin footer.

------------------------------------------------------------------------

## 3. Định hướng UI/UX và Design System

### 3.1. Phong cách

Tên định hướng: **Warm Minimalist Architecture / Minimalist Luxury**.

Cảm giác mong muốn: - Tinh tế. - Sang trọng nhưng gần gũi. - Chuyên
nghiệp. - Ấm áp, tự nhiên. - Tập trung vào hình ảnh kiến trúc.

Đặc trưng: - Ảnh kiến trúc lớn, chất lượng cao. - Ánh sáng tự nhiên. -
Nền sáng, beige/warm neutral. - Khoảng trắng rộng. - Bố cục editorial,
rõ cấp bậc nội dung. - Thành phần UI đơn giản, nhất quán.

Tránh: - Màu quá rực. - Gradient không cần thiết. - Shadow nặng. - Bo
góc quá nhiều. - Quá nhiều card giống dashboard SaaS. - Trang trí gây
nhiễu. - Hiệu ứng chuyển động làm giảm hiệu năng. - Dùng ảnh stock không
liên quan hoặc lặp ảnh thiếu chủ đích.

### 3.2. Color palette

  Token         Hex
  ------------- -----------
  Primary 900   `#594638`
  Primary 800   `#705A46`
  Primary 700   `#8A7159`
  Primary 600   `#A58B70`
  Primary 500   `#BBA58C`
  Neutral 950   `#302C28`
  Neutral 800   `#514A43`
  Neutral 600   `#81776D`
  Neutral 400   `#B9B0A5`
  Neutral 200   `#E7E1D9`
  Neutral 100   `#F2EFEA`
  Neutral 50    `#FAF9F6`

Sử dụng: - Main background: `#FAF9F6`. - Secondary background:
`#F2EFEA`. - Card background: `#FFFFFF`. - Warm section: `#EDE6DC`. -
Text chính: `#302C28`. - Text phụ: `#81776D`. - Border: `#E7E1D9`.

Semantic colors: - Success: `#66836B`. - Warning: `#C49A5A`. - Error:
`#B66B60`. - Info: `#7B8E9B`.

### 3.3. Typography

-   Heading: **Playfair Display** nếu hỗ trợ đầy đủ tiếng Việt; cần kiểm
    tra dấu và glyph.
-   Phương án serif thay thế: **Lora** hoặc font serif tương thích tiếng
    Việt.
-   Body/UI: **Be Vietnam Pro**.
-   Admin ưu tiên Be Vietnam Pro để dễ đọc và nhất quán.

Scale tham khảo:

  Style        Size / Line height
  ------------ --------------------
  Display      64 / 72
  H1           48 / 58
  H2           36 / 44
  H3           28 / 36
  H4           22 / 30
  Body Large   18 / 28
  Body         16 / 26
  Small        14 / 22
  Caption      12 / 18

Responsive typography phải được điều chỉnh theo breakpoint. Không ép
heading lớn trên mobile.

### 3.4. Layout, spacing và component

-   Spacing system: 8px base; dùng các mức 4, 8, 16, 24, 32, 48, 64, 80,
    96, 120.
-   Max content width: khoảng 1280px.
-   Desktop horizontal padding: 64px.
-   Tablet: 32px.
-   Mobile: 20px.
-   Section spacing desktop: khoảng 80--120px, điều chỉnh theo mật độ
    nội dung.
-   Grid gap: 24--32px.
-   Border radius: 4/8/12/16px; không lạm dụng.
-   Ảnh hero: tỷ lệ tham khảo 16:9.
-   Portfolio: 4:3.
-   Gallery: 3:2.
-   Ảnh vuông: 1:1 khi phù hợp.

Component dùng chung: - Header và responsive navigation. - Footer. -
Primary/secondary/text buttons. - Image/project/design/service cards. -
Testimonial card (nếu có dữ liệu thật). - Stats. - Form input, select,
textarea. - Badge/status. - Breadcrumb. - Pagination. - Modal/dialog. -
Dropdown. - Empty/loading/error states. - Admin sidebar/topbar. - Data
table và filter toolbar.

### 3.5. Responsive QA bắt buộc

Kiểm tra tối thiểu: - Desktop: 1440px và 1280px. - Tablet: 1024px và
768px. - Mobile: 430px, 390px và 375px.

Checklist: - Không xuất hiện horizontal overflow. - Không tràn chữ, cắt
chữ hoặc sai font. - Tiếng Việt hiển thị đầy đủ dấu. - Heading tự wrap
tự nhiên, không có dòng quá xấu. - Ảnh đúng aspect ratio, không méo. -
Grid chuyển cột hợp lý. - Menu mobile hoạt động và dễ dùng. - CTA không
bị che hoặc quá nhỏ. - Form dễ nhập liệu trên mobile. - Bảng admin có
cách xử lý mobile phù hợp (scroll có chủ đích hoặc chuyển thành card). -
Touch target đủ lớn. - Không chỉ thu nhỏ desktop mà phải thiết kế lại
layout khi cần.

------------------------------------------------------------------------

## 4. Công nghệ và kiến trúc kỹ thuật dự kiến

> Đây là stack đã được đề xuất trong quá trình trao đổi, chưa phải quyết
> định triển khai cuối cùng. Khi bắt đầu code, cần chốt version và cách
> tổ chức repository.

### 4.1. Stack đề xuất

  -----------------------------------------------------------------------
  Layer                               Công nghệ
  ----------------------------------- -----------------------------------
  Frontend                            Next.js

  Styling                             Tailwind CSS

  UI components                       shadcn/ui

  Backend                             Go

  HTTP framework                      Gin

  Database                            PostgreSQL

  Data access                         `database/sql` + pgx hoặc GORM; cân
                                      nhắc sqlc

  Image/file storage                  Cloudinary hoặc S3-compatible
                                      storage

  Authentication                      Session hoặc JWT

  Deployment                          Vercel cho frontend + VPS/container
                                      cho backend và database (hoặc
                                      managed PostgreSQL)
  -----------------------------------------------------------------------

### 4.2. Các quyết định cần chốt trước khi triển khai

1.  Monorepo hay tách frontend/backend repositories.
2.  Next.js App Router và chiến lược render (SSR/SSG/ISR) cho nội dung
    public.
3.  REST API conventions và versioning, ví dụ `/api/v1`.
4.  `database/sql` + pgx hay GORM hay sqlc. Tránh dùng nhiều abstraction
    không cần thiết.
5.  Session cookie hay JWT. Với admin web cùng hệ thống, cân nhắc cookie
    `HttpOnly`, `Secure`, `SameSite` và CSRF strategy.
6.  Cloudinary hay S3 cho ảnh và PDF.
7.  Cách lưu gallery: bảng media riêng hay JSON/quan hệ tùy nhu cầu.
8.  Cơ chế migration.
9.  Cách deploy, backup database, quản lý secrets và logging.
10. Có cần nhiều admin role hay chỉ một loại admin ở MVP.

### 4.3. Kiến trúc logic gợi ý

Backend có thể chia layer:

-   `handler` / `controller`: nhận HTTP request, parse input, trả
    response.
-   `service`: nghiệp vụ và điều phối.
-   `repository`: truy vấn dữ liệu.
-   `model` / `entity`: cấu trúc dữ liệu nội bộ.
-   `dto` / `request` / `response`: dữ liệu vào/ra API.
-   `middleware`: authentication, authorization, logging, recovery,
    request ID.
-   `config`: cấu hình.
-   `database`: kết nối DB.
-   `migration`: schema changes.

Không để handler chứa toàn bộ nghiệp vụ hoặc SQL phức tạp. Không tạo
layer/interface chỉ để tăng số file; abstraction phải có lý do.

Frontend: - Public layout và Admin layout tách biệt. - Component dùng
chung cho card, form, table, status, pagination. - Tách API client,
types, validation schema và feature modules. - Quản lý
loading/error/empty/success states. - Form create/edit cần tái sử dụng
khi cấu trúc tương đồng.

### 4.4. Các nhóm API dự kiến

Tên endpoint chỉ là gợi ý ban đầu, cần thống nhất trước khi implement.

**Public** - `GET /api/v1/public/designs` -
`GET /api/v1/public/designs/:slug` - `GET /api/v1/public/projects` -
`GET /api/v1/public/projects/:slug` - `GET /api/v1/public/services` -
`POST /api/v1/public/contacts`

**Admin --- Designs** - `GET /api/v1/admin/designs` -
`POST /api/v1/admin/designs` - `GET /api/v1/admin/designs/:id` -
`PATCH /api/v1/admin/designs/:id` - `DELETE /api/v1/admin/designs/:id`

**Admin --- Projects** - `GET /api/v1/admin/projects` -
`POST /api/v1/admin/projects` - `GET /api/v1/admin/projects/:id` -
`PATCH /api/v1/admin/projects/:id` - `DELETE /api/v1/admin/projects/:id`

**Admin --- Contacts** - `GET /api/v1/admin/contacts` -
`GET /api/v1/admin/contacts/:id` - `PATCH /api/v1/admin/contacts/:id`
(status, notes, assignee nếu có)

**Admin --- Auth** - `POST /api/v1/admin/auth/login` -
`POST /api/v1/admin/auth/logout` - `GET /api/v1/admin/auth/me`

**Media** - Endpoint upload cần thiết kế theo lựa chọn Cloudinary/S3.
Không nên mặc định cho phép backend nhận file lớn không giới hạn.

### 4.5. Data model sơ bộ

Các entity có thể cần:

-   `admins` / `users`
-   `designs`
-   `design_categories` (hoặc enum/lookup nếu danh mục cố định)
-   `projects`
-   `services`
-   `contacts`
-   `media` (nếu cần quản lý media tập trung)
-   `site_settings` (nếu cần chỉnh sửa qua admin)

Quan hệ và kiểu dữ liệu cần thiết kế sau khi chốt nghiệp vụ. Ví dụ: -
Một design có một cover và nhiều gallery images. - Một design có thể có
nhiều file bản vẽ. - Một project có một cover và nhiều ảnh. - Contact
độc lập, không bắt buộc phải liên kết với design/project. - Slug cần
unique. - Tách `publication_status` khỏi `project_status`.

### 4.6. Những yêu cầu kỹ thuật quan trọng

-   Validate input ở backend, không chỉ frontend.
-   Dùng parameterized queries/ORM an toàn, chống SQL injection.
-   Pagination/filter/sort có giới hạn và whitelist field sort.
-   Có index cho slug, status, created_at và các field filter thực sự
    dùng.
-   Xử lý unique constraint và lỗi database rõ ràng.
-   Dùng context cho DB query và timeout.
-   Upload kiểm tra MIME/type, dung lượng và quyền truy cập.
-   Không public file bản vẽ nếu công ty không cho phép.
-   Authentication và authorization cho toàn bộ admin API.
-   Password phải hash bằng thuật toán phù hợp; không lưu plaintext.
-   Secrets nằm trong environment/secret manager, không commit.
-   CORS, CSRF/cookie, rate limit cho contact/login theo thiết kế bảo
    mật.
-   Logging có request ID; không log password/token hoặc dữ liệu nhạy
    cảm.
-   Có migrations, backup và quy trình deploy/rollback.
-   SEO: metadata, canonical, sitemap, robots, Open Graph, slug thân
    thiện.
-   Ảnh: resize, responsive images, lazy loading, alt text, định dạng
    tối ưu.
-   Có trạng thái draft/published và chỉ public nội dung published.

------------------------------------------------------------------------

## 5. User flows

### 5.1. Public customer journey

**Flow A --- Tìm mẫu thiết kế**

`Home → Featured Designs → Designs listing → Design detail → CTA tư vấn → Contact form → Success`

**Flow B --- Xem công trình thực tế**

`Home → Projects listing → Project detail → Related projects → CTA liên hệ → Contact form`

**Flow C --- Liên hệ trực tiếp**

`Header/Hotline/Contact CTA → Contact → Submit form → Success`

Các điểm cần kiểm tra: - Navigation link đúng. - Breadcrumb đúng. - CTA
dẫn đến đúng trang hoặc form. - Có thể quay lại listing từ detail. -
Form có validation và phản hồi sau khi submit.

### 5.2. Admin journey

**Quản lý thiết kế**

`Login → Dashboard → Designs → Create/Edit → Upload media → Save draft/Publish → Public detail`

**Quản lý công trình**

`Login → Dashboard → Projects → Create/Edit → Upload gallery → Save/Publish → Public detail`

**Xử lý lead**

`Login → Dashboard/Contacts → Filter new → View detail → Add note → Update status`

**Cấu hình**

`Login → Settings → Edit information → Save → Verify public footer/contact information`

------------------------------------------------------------------------

## 6. Kế hoạch chia task nhỏ để triển khai

Đây là roadmap đề xuất. Không nên yêu cầu ChatGPT sinh toàn bộ dự án
trong một lần. Mỗi task cần có scope, acceptance criteria, file/code
liên quan và test.

### Phase 0 --- Chốt yêu cầu và nền tảng

-   [ ] 0.1. Chốt MVP và loại bỏ tính năng ngoài scope.
-   [ ] 0.2. Chốt sitemap và quyền của từng nhóm người dùng.
-   [ ] 0.3. Chốt stack/version.
-   [ ] 0.4. Chọn monorepo hay multi-repo.
-   [ ] 0.5. Chốt API conventions, response format và error format.
-   [ ] 0.6. Chốt cách auth và media storage.
-   [ ] 0.7. Viết acceptance criteria tổng thể.

**Deliverable:** Technical decisions document + scope MVP.

### Phase 1 --- Khởi tạo project và môi trường

-   [ ] 1.1. Tạo repository và cấu trúc thư mục.
-   [ ] 1.2. Khởi tạo Next.js app.
-   [ ] 1.3. Cấu hình TypeScript, lint/format và Tailwind.
-   [ ] 1.4. Cài đặt/cấu hình shadcn/ui.
-   [ ] 1.5. Khởi tạo Go module và Gin server.
-   [ ] 1.6. Tạo health check endpoint.
-   [ ] 1.7. Cấu hình environment variables.
-   [ ] 1.8. Tạo Docker Compose cho local dependencies nếu chọn dùng
    Docker.
-   [ ] 1.9. Viết README cách chạy dự án.

**Deliverable:** Frontend và backend chạy local ổn định.

### Phase 2 --- Database và backend foundation

-   [ ] 2.1. Chọn database access strategy (pgx/sqlc/GORM).
-   [ ] 2.2. Thiết kế ERD.
-   [ ] 2.3. Thiết lập PostgreSQL connection pool.
-   [ ] 2.4. Thiết lập migrations.
-   [ ] 2.5. Tạo schema admin/users.
-   [ ] 2.6. Tạo schema designs.
-   [ ] 2.7. Tạo schema projects.
-   [ ] 2.8. Tạo schema contacts.
-   [ ] 2.9. Tạo seed data phục vụ local development.
-   [ ] 2.10. Chuẩn hóa API response/error.
-   [ ] 2.11. Thêm logging, recovery, request ID và graceful shutdown.

**Deliverable:** Database schema và backend foundation có thể test.

### Phase 3 --- Authentication và authorization

-   [ ] 3.1. Thiết kế auth flow.
-   [ ] 3.2. Implement login.
-   [ ] 3.3. Hash và verify password.
-   [ ] 3.4. Implement session/JWT theo quyết định đã chốt.
-   [ ] 3.5. Implement logout/current-user endpoint.
-   [ ] 3.6. Middleware authentication.
-   [ ] 3.7. Middleware authorization/role nếu cần.
-   [ ] 3.8. Bảo vệ admin routes.
-   [ ] 3.9. Test các trường hợp unauthorized/forbidden/expired session.

**Deliverable:** Admin API được bảo vệ.

### Phase 4 --- Backend Designs

-   [ ] 4.1. Define model/entity và DTO.
-   [ ] 4.2. Repository interface/implementation.
-   [ ] 4.3. Service và business rules.
-   [ ] 4.4. Create design.
-   [ ] 4.5. Update design.
-   [ ] 4.6. Get design by ID.
-   [ ] 4.7. Delete design (xác định soft/hard delete).
-   [ ] 4.8. List designs: pagination, filter, sort, search.
-   [ ] 4.9. Public list chỉ trả published.
-   [ ] 4.10. Get public design by slug.
-   [ ] 4.11. Validate slug uniqueness và field constraints.
-   [ ] 4.12. Unit/integration tests.

**Deliverable:** Designs API hoàn chỉnh.

### Phase 5 --- Backend Projects

-   [ ] 5.1. Define model/entity và DTO.
-   [ ] 5.2. Repository.
-   [ ] 5.3. Service.
-   [ ] 5.4. Create/update/get/delete project.
-   [ ] 5.5. List projects: pagination/filter/sort/search.
-   [ ] 5.6. Tách publication status và construction status.
-   [ ] 5.7. Public list/detail chỉ trả published.
-   [ ] 5.8. Unit/integration tests.

**Deliverable:** Projects API hoàn chỉnh.

### Phase 6 --- Backend Contacts

-   [ ] 6.1. Thiết kế contact schema.
-   [ ] 6.2. Public submit contact.
-   [ ] 6.3. Validate và normalize dữ liệu.
-   [ ] 6.4. Admin list/search/filter/pagination.
-   [ ] 6.5. Admin get detail.
-   [ ] 6.6. Update status và internal notes.
-   [ ] 6.7. Rate limit/anti-spam cơ bản.
-   [ ] 6.8. Tests.

**Deliverable:** Contact/lead workflow hoạt động.

### Phase 7 --- Media upload

-   [ ] 7.1. Chọn Cloudinary hoặc S3.
-   [ ] 7.2. Thiết kế upload flow và quyền truy cập.
-   [ ] 7.3. Upload cover image.
-   [ ] 7.4. Upload gallery images.
-   [ ] 7.5. Upload PDF drawings nếu được phép.
-   [ ] 7.6. Xóa/thay media và xử lý file mồ côi.
-   [ ] 7.7. Validate MIME, extension, size.
-   [ ] 7.8. Tối ưu ảnh và lưu metadata.

**Deliverable:** Media workflow an toàn và dùng được trong admin.

### Phase 8 --- Frontend foundation và Design System

-   [ ] 8.1. Tổ chức app routes/layouts.
-   [ ] 8.2. Setup fonts có hỗ trợ tiếng Việt.
-   [ ] 8.3. Khai báo color/spacing/typography tokens.
-   [ ] 8.4. Xây dựng Button, Input, Select, Textarea.
-   [ ] 8.5. Xây dựng Header, Footer, Breadcrumb.
-   [ ] 8.6. Xây dựng card design/project.
-   [ ] 8.7. Xây dựng Pagination, Badge, Empty state.
-   [ ] 8.8. Xây dựng loading/error states.
-   [ ] 8.9. Kiểm tra responsive component-level.

**Deliverable:** UI foundation tái sử dụng được.

### Phase 9 --- Public pages

-   [ ] 9.1. Home page.
-   [ ] 9.2. About page.
-   [ ] 9.3. Designs listing.
-   [ ] 9.4. Design detail.
-   [ ] 9.5. Projects listing.
-   [ ] 9.6. Project detail.
-   [ ] 9.7. Contact page.
-   [ ] 9.8. Kết nối public APIs.
-   [ ] 9.9. Implement filters/pagination.
-   [ ] 9.10. Implement contact form và success/error states.
-   [ ] 9.11. SEO metadata, sitemap và Open Graph.

**Deliverable:** Website public hoàn chỉnh theo thiết kế Stitch.

### Phase 10 --- Admin frontend

-   [ ] 10.1. Admin layout/sidebar/topbar.
-   [ ] 10.2. Login page.
-   [ ] 10.3. Dashboard.
-   [ ] 10.4. Designs table/list.
-   [ ] 10.5. Create/edit design form.
-   [ ] 10.6. Projects table/list.
-   [ ] 10.7. Create/edit project form.
-   [ ] 10.8. Contacts list/filter.
-   [ ] 10.9. Contact detail/status/notes.
-   [ ] 10.10. Services management nếu nằm trong MVP.
-   [ ] 10.11. Settings nếu nằm trong MVP.
-   [ ] 10.12. Protected routes và session handling.
-   [ ] 10.13. Loading/empty/error/confirmation states.

**Deliverable:** Admin CMS dùng được cho nội dung MVP.

### Phase 11 --- Integration và QA

-   [ ] 11.1. Kiểm tra toàn bộ API contract FE/BE.
-   [ ] 11.2. Kiểm tra validation hai phía.
-   [ ] 11.3. Kiểm tra auth và quyền truy cập.
-   [ ] 11.4. Kiểm tra CRUD end-to-end.
-   [ ] 11.5. Kiểm tra contact submission và xử lý lead.
-   [ ] 11.6. Kiểm tra upload và hiển thị media.
-   [ ] 11.7. Kiểm tra responsive tại 1440/1280/1024/768/430/390/375.
-   [ ] 11.8. Kiểm tra font, tiếng Việt, overflow và text wrapping.
-   [ ] 11.9. Kiểm tra accessibility cơ bản: keyboard, focus, labels,
    contrast.
-   [ ] 11.10. Kiểm tra performance và image optimization.
-   [ ] 11.11. Kiểm tra SEO.
-   [ ] 11.12. E2E smoke tests cho customer/admin flows.

**Deliverable:** Release candidate đã qua QA.

### Phase 12 --- Deployment và vận hành

-   [ ] 12.1. Chuẩn bị production environment.
-   [ ] 12.2. Cấu hình secrets.
-   [ ] 12.3. Deploy backend.
-   [ ] 12.4. Provision PostgreSQL và backup.
-   [ ] 12.5. Deploy frontend.
-   [ ] 12.6. Cấu hình domain/HTTPS/CORS/cookie.
-   [ ] 12.7. Chạy migrations production.
-   [ ] 12.8. Tạo admin account an toàn.
-   [ ] 12.9. Logging/monitoring/error tracking.
-   [ ] 12.10. Kiểm tra backup/restore và quy trình rollback.

**Deliverable:** Website production có thể vận hành.

------------------------------------------------------------------------

## 7. Quy tắc làm việc khi dùng ChatGPT để triển khai

Sử dụng tài liệu này làm **Project Context**. Khi bắt đầu một task, yêu
cầu ChatGPT làm theo quy tắc:

1.  Không sinh toàn bộ hệ thống trong một câu trả lời.
2.  Chỉ xử lý task đang được yêu cầu; không tự ý mở rộng scope.
3.  Trước khi code, nêu mục tiêu, assumptions, file dự kiến thay đổi và
    acceptance criteria.
4.  Nếu thiếu quyết định ảnh hưởng kiến trúc, hỏi một câu làm rõ quan
    trọng nhất; không tự bịa nghiệp vụ.
5.  Ưu tiên code rõ ràng, dễ bảo trì, phù hợp production nhưng không
    over-engineering.
6.  Giải thích lý do chọn cách làm, nhất là các quyết định về Go,
    database, API, auth và frontend architecture.
7.  Khi sửa code hiện có, yêu cầu người dùng cung cấp cấu trúc thư mục
    và file liên quan; không giả định nội dung file.
8.  Không thay đổi convention đã thống nhất nếu chưa giải thích lý do.
9.  Với backend Go: phân biệt rõ value và pointer, interface và concrete
    type; giải thích ownership/mutation khi có liên quan.
10. Với database: giải thích schema, constraint, index, migration và
    trade-off.
11. Với API: thống nhất request/response/error format và status code.
12. Mỗi task phải có hướng dẫn test cụ thể, bao gồm happy path và edge
    cases.
13. Không đánh dấu task hoàn thành khi chưa có bằng chứng test hoặc xác
    nhận của người dùng.
14. Cập nhật trạng thái task và ghi lại quyết định kỹ thuật sau mỗi phần
    hoàn thành.
15. Nội dung website phải bằng tiếng Việt tự nhiên, đúng chính tả và có
    dấu.
16. Giữ UI theo Warm Minimalist Architecture đã mô tả; không tự ý đổi
    palette/typography.
17. Ưu tiên tái sử dụng component nhưng không gom các component khác
    trách nhiệm vào một component quá lớn.

### Template yêu cầu thực hiện một task

``` text
Hãy thực hiện task [ID — Tên task] trong project.

Trước khi code:
1. Tóm tắt mục tiêu và phạm vi.
2. Liệt kê assumptions và các quyết định cần xác nhận.
3. Đề xuất các file cần tạo/sửa.
4. Nêu acceptance criteria.
5. Chỉ ra các test cần chạy.

Sau đó hướng dẫn/triển khai từng bước nhỏ.
Không làm sang task tiếp theo nếu tôi chưa yêu cầu.
Giải thích các quyết định kỹ thuật quan trọng và trade-off.
```

### Template review code

``` text
Review phần triển khai task [ID].

Kiểm tra:
- Đúng yêu cầu và acceptance criteria chưa?
- Có bug/edge case nào không?
- Có vấn đề security hoặc data integrity không?
- Có over-engineering hoặc abstraction thừa không?
- Naming, folder structure và responsibility có hợp lý không?
- Error handling và validation đã đầy đủ chưa?
- Test có bao phủ các trường hợp quan trọng chưa?

Phân loại finding theo Critical / High / Medium / Low.
Đưa ra hướng sửa cụ thể, không rewrite toàn bộ nếu không cần.
```

------------------------------------------------------------------------

## 8. UI/UX audit cuối cùng đã định hướng cho Google Stitch

Sau khi tạo các màn hình, thực hiện một vòng audit tổng thể:

### 8.1. Screen inventory

Đối chiếu tối thiểu các màn hình: - Home. - About. - Designs
listing/detail. - Projects listing/detail. - Contact. - Admin
dashboard. - Design management và create/edit. - Project management và
create/edit. - Contacts. - Services. - Settings. - Login.

### 8.2. Responsive audit

Kiểm tra desktop, tablet, mobile theo các kích thước đã nêu. Sửa layout
thực sự, không chỉ scale nhỏ.

### 8.3. Typography/content audit

-   Kiểm tra font và glyph tiếng Việt.
-   Không lỗi dấu.
-   Không text overflow/clipping.
-   Không line break bất thường.
-   Không dùng Lorem Ipsum.
-   Heading/body hierarchy nhất quán.

### 8.4. Layout audit

-   Xóa section trùng lặp hoặc không có giá trị.
-   Xóa card/decoration không cần thiết.
-   Cân đối whitespace.
-   Kiểm tra hierarchy và CTA.
-   Không thêm feature ngoài scope.

### 8.5. Flow audit

Public: - Home → Designs → Design detail → Contact. - Home → Projects →
Project detail → Contact. - Navigation, breadcrumb, CTA đều dẫn đúng.

Admin: - Login → Dashboard. - Dashboard → Designs → Create/Edit. -
Dashboard → Projects → Create/Edit. - Dashboard → Contacts → Detail →
Update status. - Settings → Save.

### 8.6. Interaction states

Cần có trạng thái: - Default, hover, active, focus, disabled, loading. -
Form empty, focused, filled, invalid, valid, submitting, success,
error. - Draft/published. - Search no-result. - Uploading/upload
success/upload failure. - Delete confirmation. - Save success/failure.

Lưu ý: Stitch giúp thiết kế/prototype và thể hiện flow UI; không thay
thế việc triển khai backend, API, auth hoặc kiểm thử runtime thực tế.

------------------------------------------------------------------------

## 9. Các câu hỏi còn mở --- cần quyết định trước hoặc trong quá trình code

Không tự xem các mục này là đã chốt:

### Product/business

-   Tên công ty, logo, hotline, email, địa chỉ chính thức?
-   Công ty có những dịch vụ chính xác nào?
-   Danh mục thiết kế cuối cùng?
-   Công trình có cần phân loại theo loại nhà, tỉnh/thành, năm?
-   Bản vẽ PDF có public hay chỉ gửi theo yêu cầu?
-   Có testimonials/dữ liệu khách hàng thật không?
-   Có cần form yêu cầu báo giá riêng hay chỉ contact form?

### Admin

-   Chỉ một admin hay nhiều tài khoản?
-   Có role admin/editor không?
-   Có cần soft delete và audit log không?
-   Có cần preview nội dung draft trước khi publish?
-   Có cần lưu người phụ trách lead?

### Technical

-   Monorepo hay tách repo?
-   Phiên bản Next.js, Go, Gin, PostgreSQL?
-   pgx/sqlc hay GORM?
-   Session cookie hay JWT?
-   Cloudinary hay S3?
-   Có dùng Docker cho local và production không?
-   Hosting backend/database cụ thể?
-   Có cần email notification khi có contact mới không?

### Content/SEO

-   Nội dung và hình ảnh thật đã có chưa?
-   Có cần sitemap tự động?
-   Có cần structured data cho LocalBusiness/Organization?
-   Có cần redirect/slug history khi đổi slug?

------------------------------------------------------------------------

## 10. Definition of Done tổng thể

MVP chỉ được xem là hoàn thành khi:

-   [ ] Các public routes hoạt động và có nội dung thực tế.
-   [ ] Designs và Projects được đọc từ backend/database, không hardcode
    dữ liệu production.
-   [ ] Admin đăng nhập được và admin APIs được bảo vệ.
-   [ ] Admin có thể CRUD/publish Designs và Projects.
-   [ ] Visitor gửi contact form được.
-   [ ] Admin xem và cập nhật trạng thái contact được.
-   [ ] Upload ảnh và file hoạt động theo quyền đã thiết kế.
-   [ ] Responsive tốt ở desktop/tablet/mobile.
-   [ ] Font tiếng Việt và nội dung không lỗi.
-   [ ] Không có overflow hoặc broken layout nghiêm trọng.
-   [ ] Có validation, error/loading/empty/success states.
-   [ ] SEO cơ bản và tối ưu ảnh đã thực hiện.
-   [ ] Có migrations, cấu hình production, backup và hướng dẫn deploy.
-   [ ] Các customer/admin flows chính đã được kiểm thử.

------------------------------------------------------------------------

## 11. Trạng thái ban đầu khi bắt đầu Project ChatGPT

  Hạng mục                       Trạng thái
  ------------------------------ -----------------------------------
  Ý tưởng và mục tiêu sản phẩm   Đã thảo luận
  Sitemap public                 Đã đề xuất
  Sitemap admin                  Đã đề xuất
  Nội dung các trang             Đã phác thảo
  Design direction               Đã thống nhất định hướng
  Color palette/typography       Đã đề xuất
  Google Stitch phases           Đã xây dựng prompt theo giai đoạn
  Prompt final UI audit          Đã xây dựng
  Stack kỹ thuật                 Đã đề xuất, cần chốt
  Database schema                Chưa thiết kế chi tiết
  API contract                   Chưa chốt
  Backend implementation         Chưa xác nhận bắt đầu
  Frontend implementation        Chưa xác nhận bắt đầu
  Deployment                     Chưa thực hiện

**Điểm bắt đầu khuyến nghị:** tạo Project ChatGPT bằng tài liệu này, sau
đó bắt đầu ở **Phase 0 --- Chốt yêu cầu và quyết định kỹ thuật**. Tiếp
theo mới khởi tạo repository và chia task theo từng phase. Không nên
code trước khi thống nhất API contract, data model, auth strategy và
media storage.
