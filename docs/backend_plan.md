# Kế Hoạch Triển Khai Chi Tiết Backend Go, PostgreSQL & Cloudflare R2 (Giai Đoạn 5)

> **Tài liệu tham chiếu:** `architecture_construction_project_brief.md`, `docs/PLAN.md`, `AGENTS.md`  
> **Phạm vi triển khai:** Giai đoạn 5 (Tasks 5.1, 5.2, 5.3)  
> **Ngôn ngữ Backend:** Go 1.25+  
> **Cơ sở dữ liệu:** PostgreSQL 16+ (hỗ trợ JSONB, UUID, Partial Indexes)  
> **Lưu trữ tệp & hình ảnh:** Cloudflare R2 (tương thích AWS S3 SDK, tối ưu chi phí 0đ egress)

---

## 1. Quyết Định Công Nghệ & Kiến Trúc (Architecture Decisions)

```mermaid
flowchart TD
    subgraph ClientLayer["Frontend Layer (Next.js 16 + React 19)"]
        PublicPages["Public Pages (SSR / ISR / Client)<br/>- Home, About, Contact<br/>- Projects Catalogue & Detail"]
        AdminCMS["Admin CMS (Client-side Spa)<br/>- Dashboard, Projects CRUD<br/>- Leads CRM, Settings"]
    end

    subgraph GatewayAuth["Security & Network"]
        CORS["CORS Middleware (Allow Credentials)"]
        AuthMid["JWT / HttpOnly Cookie Middleware"]
    end

    subgraph BackendGo["Go REST API Service (backend/)"]
        Router["HTTP Router (Gin / Chi)"]
        Handler["Handlers (Auth, Projects, Leads, Media)"]
        Service["Services (Business Logic & Transactions)"]
        Repo["Repositories (pgxpool / SQL queries)"]
    end

    subgraph StorageInfra["Infrastructure & Storage"]
        Postgres[("PostgreSQL DB<br/>- users<br/>- projects & galleries<br/>- floor_plans & milestones<br/>- consultation_leads")]
        CloudflareR2["Cloudflare R2 Bucket<br/>(S3 API - Zero Egress Fees)<br/>cdn.axhome.vn / r2.dev"]
    end

    PublicPages -->|GET Projects / POST Contact| CORS
    AdminCMS -->|Admin Auth & CRUD / Upload| CORS
    CORS --> Router
    Router --> AuthMid
    AuthMid --> Handler
    Handler --> Service
    Service --> Repo
    Service -->|PutObject (WebP/Image)| CloudflareR2
    Repo -->|Connection Pool| Postgres
```

### Các nguyên tắc kỹ thuật cốt lõi:
1. **Kiến trúc Layered Clean (Không Over-engineering):**
   - `handler` (HTTP routing, request binding, response encoding, status codes).
   - `service` (Logic nghiệp vụ, transaction điều phối lưu dự án kèm ảnh/mặt bằng, mã hóa mật khẩu, kiểm tra quyền).
   - `repository` (Truy vấn PostgreSQL qua `pgxpool` với raw SQL chuẩn hóa, tối ưu index).
   - Không lạm dụng interface trừ khi phục vụ test hoặc swap implementation (R2 Storage).
2. **PostgreSQL Driver: `pgx/v5` với `pgxpool`:**
   - Hiệu năng cao nhất trong hệ sinh thái Go, hỗ trợ native mapping kiểu dữ liệu UUID, JSONB và transaction mượt mà.
3. **Cơ chế Upload & Lưu trữ Cloudflare R2:**
   - Dùng AWS SDK for Go v2 (`aws-sdk-go-v2/service/s3`) kết nối Cloudflare R2 qua Endpoint S3.
   - Endpoint: `POST /api/v1/admin/media/upload` nhận multipart/form-data trực tiếp từ Admin, kiểm tra định dạng ảnh (JPEG/PNG/WebP), giới hạn dung lượng (< 10MB), sinh unique slug/UUID và đẩy lên R2. Khớp 100% với contract adapter `frontend/src/lib/media-upload.ts` đã viết ở Task 4.4.
4. **Bảo mật & Quản lý Phiên (Authentication):**
   - Sử dụng **JWT token** lưu trong **HttpOnly Cookie** (`SameSite=Lax`, `Secure` khi production) kết hợp header fallback `Authorization: Bearer <token>` để tương thích tốt với Next.js SSR lẫn Client calls.
   - Mật khẩu mã hóa bằng `bcrypt` (cost 12).
   - Seed sẵn tài khoản Super Admin mặc định (`admin@axhome.vn`) khi chạy migration ban đầu.

---

## 2. Cấu Trúc Thư Mục Go Backend (`backend/`)

Toàn bộ mã nguồn backend nằm độc lập trong thư mục `backend/`:

```
backend/
├── cmd/
│   └── server/
│       └── main.go                 # Entrypoint khởi chạy HTTP Server, gracefull shutdown
├── config/
│   └── config.go                   # Đọc biến môi trường (.env / ENV vars): PORT, DB_URL, R2_*, JWT_SECRET
├── internal/
│   ├── database/
│   │   ├── postgres.go             # Khởi tạo pgxpool.Pool, ping DB, cấu hình connection pool
│   │   └── seeder.go               # Seed tài khoản admin ban đầu nếu DB rỗng
│   ├── model/                      # Các struct ánh xạ bảng DB
│   │   ├── user.go
│   │   ├── project.go
│   │   ├── project_image.go
│   │   ├── floor_plan.go
│   │   ├── project_milestone.go
│   │   └── consultation_lead.go
│   ├── dto/                        # Request / Response DTOs & Validation tags
│   │   ├── auth_dto.go             # LoginRequest, ChangePasswordRequest, AuthResponse, ProfileResponse
│   │   ├── project_dto.go          # CreateProjectRequest, UpdateProjectRequest, ProjectDetailResponse, ProjectListQuery
│   │   ├── lead_dto.go             # CreateLeadRequest, UpdateLeadStatusRequest, LeadFilterQuery
│   │   └── media_dto.go            # UploadMediaResponse
│   ├── repository/                 # Tầng truy vấn DB (SQL CRUD)
│   │   ├── user_repo.go
│   │   ├── project_repo.go         # Query projects, list filters, slug lookups, transaction batch inserts
│   │   └── lead_repo.go            # Leads CRUD & stats
│   ├── service/                    # Nghiệp vụ
│   │   ├── auth_service.go         # Login, Verify JWT, Change password, Hash password
│   │   ├── project_service.go      # Quản lý vòng đời dự án (draft/publish, slug unique, transactions)
│   │   ├── lead_service.go         # Tiếp nhận lead, validate số điện thoại VN, cập nhật CRM pipeline
│   │   └── storage_service.go      # Upload file lên Cloudflare R2, generate public CDN URLs
│   ├── handler/                    # HTTP Handlers
│   │   ├── auth_handler.go
│   │   ├── project_handler.go
│   │   ├── lead_handler.go
│   │   ├── media_handler.go
│   │   └── health_handler.go
│   ├── middleware/                 # Middleware
│   │   ├── auth.go                 # Kiểm tra JWT từ Cookie / Authorization header
│   │   ├── cors.go                 # Cấu hình CORS cho Next.js dev (localhost:3000) & prod domain
│   │   ├── logger.go               # Structured logging request/response
│   │   └── recovery.go             # Bắt panic, trả về 500 JSON an toàn
│   └── util/                       # Tiện ích chung
│       ├── slug.go                 # Hàm sinh slug tiếng Việt chuẩn SEO (e.g., "Biệt Thự Vườn" -> "biet-thu-vuon")
│       └── response.go             # Format chuẩn JSON response: { success, data, message, error }
├── migrations/                     # SQL migration files
│   ├── 000001_create_users_table.up.sql
│   ├── 000001_create_users_table.down.sql
│   ├── 000002_create_projects_tables.up.sql
│   ├── 000002_create_projects_tables.down.sql
│   ├── 000003_create_leads_table.up.sql
│   └── 000003_create_leads_table.down.sql
├── .env.example
├── go.mod
├── go.sum
└── Makefile                        # Lệnh chạy dev, migrate, build, seed
```

---

## 3. Thiết Kế Cơ Sở Dữ Liệu PostgreSQL (Task 5.1)

Hệ thống sử dụng PostgreSQL 16+ với 6 bảng cốt lõi (đã loại bỏ `site_settings` theo thỏa thuận giữ cấu hình tĩnh ở frontend):

### 3.1. Bảng `users` (Quản trị viên)
```sql
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'admin', -- 'admin', 'editor'
    avatar_url VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
```

### 3.2. Bảng `projects` (Dự án kiến trúc & thi công)
```sql
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    project_type VARCHAR(50) NOT NULL, -- 'concept', 'under_construction', 'completed'
    category VARCHAR(50) NOT NULL,     -- 'villa', 'townhouse', 'mansion'
    architectural_style VARCHAR(50) NOT NULL, -- 'modern', 'neoclassic', 'minimalist', 'indochine'
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    completed_year INT NOT NULL,
    client_name VARCHAR(100),
    lead_architect VARCHAR(100) NOT NULL,
    construction_duration VARCHAR(100),
    
    -- Thông số kỹ thuật
    land_area NUMERIC(10, 2) NOT NULL,
    floor_area NUMERIC(10, 2) NOT NULL,
    facade_width NUMERIC(6, 2) NOT NULL,
    floors_count INT NOT NULL,
    bedrooms_count INT NOT NULL,
    
    -- Nội dung chi tiết
    cover_image_url VARCHAR(500) NOT NULL,
    excerpt TEXT NOT NULL,
    content_html TEXT NOT NULL,
    
    -- Dữ liệu mở rộng dạng JSONB
    highlights JSONB DEFAULT '[]'::jsonb,        -- Mảng string điểm nhấn công trình
    client_testimonial JSONB,                    -- { "author": "...", "role": "...", "quote": "..." }
    
    -- Cấu hình hiển thị & SEO
    seo_title VARCHAR(255),
    seo_description TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(30) NOT NULL DEFAULT 'draft', -- 'draft', 'published'
    view_count INT NOT NULL DEFAULT 0,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status_type ON projects(status, project_type);
CREATE INDEX idx_projects_category_style ON projects(category, architectural_style);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
```

### 3.3. Bảng `project_images` (Bộ sưu tập ảnh dự án)
```sql
CREATE TABLE IF NOT EXISTS project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(255),
    image_type VARCHAR(50) NOT NULL DEFAULT 'real_photo', -- 'render_3d', 'real_photo'
    space_category VARCHAR(50), -- 'living_room', 'facade', 'bedroom', 'kitchen', 'overview'
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_project_images_project_id ON project_images(project_id, sort_order ASC);
```

### 3.4. Bảng `floor_plans` (Bản vẽ mặt bằng công năng)
```sql
CREATE TABLE IF NOT EXISTS floor_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    plan_name VARCHAR(100) NOT NULL, -- 'Mặt bằng Tầng 1', 'Mặt bằng Tầng 2', 'Tầng Tum'
    image_url VARCHAR(500) NOT NULL,
    area_square_meters NUMERIC(10, 2) NOT NULL,
    description TEXT,
    rooms JSONB DEFAULT '[]'::jsonb, -- Mảng tên phòng: ["Phòng khách", "Bếp & Ăn", "Gara"]
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_floor_plans_project_id ON floor_plans(project_id, sort_order ASC);
```

### 3.5. Bảng `project_milestones` (Nhật ký tiến độ thi công)
```sql
CREATE TABLE IF NOT EXISTS project_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL, -- 'Khảo sát & Thi công móng cọc', 'Đổ sàn tầng 1 & cất nóc'
    period VARCHAR(100) NOT NULL, -- 'Tháng 03/2024', '15 ngày'
    description TEXT,
    photo_url VARCHAR(500),
    is_completed BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_project_milestones_project_id ON project_milestones(project_id, sort_order ASC);
```

### 3.6. Bảng `consultation_leads` (Khách hàng đăng ký tư vấn - CRM)
```sql
CREATE TABLE IF NOT EXISTS consultation_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150),
    service_type VARCHAR(50) NOT NULL, -- 'design', 'construction', 'full_package'
    estimated_budget VARCHAR(50),       -- 'under_1b', '1b_2b', '2b_5b', 'over_5b'
    land_size VARCHAR(100),
    location VARCHAR(255),
    message TEXT,
    source_page VARCHAR(255),          -- '/contact', '/projects/biet-thu-tan-co-dien', '/'
    referenced_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'consulting', 'scheduled', 'contracted', 'cancelled'
    internal_notes TEXT,
    assigned_to VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_consultation_leads_status ON consultation_leads(status);
CREATE INDEX idx_consultation_leads_created_at ON consultation_leads(created_at DESC);
```

---

## 4. Đặc Tả Danh Sách REST API Endpoints (Task 5.2)

### 4.1. Nhóm API Public (Không yêu cầu xác thực)

| Phương thức | Endpoint | Mô tả | Tham số / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/public/projects` | Lấy danh sách dự án (chỉ bài `published`) | Query: `type`, `category`, `style`, `city`, `featured`, `search`, `page`, `limit` |
| `GET` | `/api/v1/public/projects/:slug` | Lấy chi tiết dự án theo slug (kèm gallery, floor_plans, milestones) và tự động tăng `view_count` | Param: `slug` |
| `GET` | `/api/v1/public/projects/related/:slug` | Lấy 3 dự án liên quan cùng phân khúc/phong cách | Param: `slug` |
| `POST` | `/api/v1/public/contacts` | Khách gửi form yêu cầu tư vấn (Trang chủ, Chi tiết dự án, Liên hệ) | Body: `{ full_name, phone, email, service_type, estimated_budget, land_size, location, message, source_page, referenced_project_id }` |
| `GET` | `/api/v1/health` | Kiểm tra trạng thái máy chủ & kết nối DB | Không |

### 4.2. Nhóm API Quản Trị - Xác Thực & Hồ Sơ (`/api/v1/admin/auth`)

| Phương thức | Endpoint | Mô tả | Yêu cầu |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/admin/auth/login` | Đăng nhập tài khoản Admin | Body: `{ email, password }` -> Trả về User info & Set HttpOnly cookie |
| `POST` | `/api/v1/admin/auth/logout` | Đăng xuất | Xóa cookie phiên làm việc |
| `GET` | `/api/v1/admin/auth/me` | Lấy thông tin tài khoản đang đăng nhập | Yêu cầu Auth Token / Cookie |
| `PATCH` | `/api/v1/admin/auth/profile` | Cập nhật họ tên, email công vụ | Body: `{ full_name, email }` (khớp form Task 4.6) |
| `PATCH` | `/api/v1/admin/auth/password` | Đổi mật khẩu Admin | Body: `{ current_password, new_password }` (khớp form Task 4.6) |

### 4.3. Nhóm API Quản Trị - Quản Lý Dự Án (`/api/v1/admin/projects`)

| Phương thức | Endpoint | Mô tả | Chi tiết xử lý |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/projects` | Lấy danh sách dự án trong Admin (gồm cả `draft` & `published`) | Hỗ trợ phân trang, lọc theo type, status, từ khóa tìm kiếm |
| `GET` | `/api/v1/admin/projects/:id` | Lấy đầy đủ dữ liệu một dự án để load vào Form Editor | Trả về thông số, content_html, gallery, floor_plans, milestones |
| `POST` | `/api/v1/admin/projects` | Tạo mới dự án | Ghi nhận thông số và lồng các mảng ảnh/mặt bằng/tiến độ trong một **Database Transaction** |
| `PUT` | `/api/v1/admin/projects/:id` | Cập nhật toàn bộ dự án | Cập nhật thông số dự án, đồng bộ gallery, floor_plans, milestones trong transaction |
| `PATCH` | `/api/v1/admin/projects/:id/status` | Bật/tắt nhanh trạng thái `draft` <-> `published` | Body: `{ status: "draft" \| "published" }` |
| `DELETE` | `/api/v1/admin/projects/:id` | Xóa vĩnh viễn dự án (Cascade xóa ảnh & bản vẽ) | Trả về 204 No Content |

### 4.4. Nhóm API Quản Trị - Yêu Cầu Tư Vấn CRM (`/api/v1/admin/contacts`)

| Phương thức | Endpoint | Mô tả | Chi tiết xử lý |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/contacts` | Lấy danh sách yêu cầu tư vấn | Hỗ trợ lọc theo trạng thái (`pending`, `consulting`, ...), search tên/SĐT |
| `GET` | `/api/v1/admin/contacts/stats` | Thống kê số lượng leads theo từng trạng thái | Dùng cho KPI Strip trên Admin Dashboard và Contacts View |
| `GET` | `/api/v1/admin/contacts/:id` | Xem chi tiết 1 lead | Chi tiết thông tin khách, dự án quan tâm |
| `PATCH` | `/api/v1/admin/contacts/:id` | Cập nhật pipeline CRM & Ghi chú nội bộ | Body: `{ status, internal_notes, assigned_to }` |
| `DELETE` | `/api/v1/admin/contacts/:id` | Xóa yêu cầu tư vấn rác / trùng lặp | Xóa bản ghi lead |

### 4.5. Nhóm API Quản Trị - Tải Ảnh Lên Cloudflare R2 (`/api/v1/admin/media`)

| Phương thức | Endpoint | Content-Type | Mô tả |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/admin/media/upload` | `multipart/form-data` | Nhận form field `file` (ảnh JPG, PNG, WebP) và `category` (`covers`, `gallery`, `floor_plans`, `milestones`). Upload lên Cloudflare R2 bucket qua AWS S3 SDK. Trả về JSON: `{ "url": "https://pub-...r2.dev/axhome/...", "key": "..." }` |

---

## 5. Kế Hoạch Tích Hợp Frontend (Task 5.3)

### 5.1. Cấu hình HTTP Client & Environment
- Thêm file `.env.local` ở `frontend/`:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
  ```
- Xây dựng Axios Client tại `frontend/src/lib/api-client.ts`:
  - `baseURL: process.env.NEXT_PUBLIC_API_URL`
  - `withCredentials: true` (tự động gửi/nhận cookie HttpOnly cho phiên làm việc an toàn).
  - Interceptor xử lý lỗi 401 tự động chuyển hướng về `/admin/login` khi hết hạn phiên.

### 5.2. Chuyển Đổi Mock Store Thành Real API Store
- Xây dựng thư mục `frontend/src/apis/`:
  - `projects.api.ts` (các hàm gọi API projects public & admin).
  - `contacts.api.ts` (các hàm gọi API contacts public & admin).
  - `auth.api.ts` (login, logout, getMe, changePassword).
- Nối `media-upload.ts`: Đã có sẵn logic kiểm tra `NEXT_PUBLIC_API_URL` để gọi endpoint `POST /api/v1/admin/media/upload`, hoạt động ngay khi backend sẵn sàng.
- Cập nhật các Store/Client:
  - `AdminProjectsView`: Nạp dữ liệu qua API thay cho mảng mock.
  - `ProjectEditorClient`: Tải dữ liệu dự án thật khi ở chế độ edit (`/admin/projects/[id]`), submit tạo/sửa gọi API Go.
  - `AdminContactsView`: Cập nhật trạng thái và ghi chú nội bộ qua API `PATCH /contacts/:id`.
  - `AdminSettingsClient`: Nối form đổi mật khẩu với `auth.api.ts`.

---

## 6. Lộ Trình Thực Hiện Từng Bước (Implementation Steps)

1. **Bước 1 (Task 5.1 - Database Setup):**
   - Viết các file SQL migrations `000001_create_users_table.up.sql`, `000002_create_projects_tables.up.sql`, `000003_create_leads_table.up.sql`.
   - Viết script Go migration runner / seeder tự động tạo database, bảng và nạp 1 tài khoản Admin mẫu kèm dữ liệu dự án mẫu.
2. **Bước 2 (Task 5.2 - Go REST API Core):**
   - Khởi tạo Go module `go mod init axhome-backend`.
   - Cài đặt các thư viện cần thiết: `gin-gonic/gin` (hoặc `chi`), `jackc/pgx/v5`, `golang-jwt/jwt/v5`, `golang.org/x/crypto/bcrypt`, `aws/aws-sdk-go-v2/service/s3`.
   - Hoàn thiện module Auth (Login, Logout, Me, Password change) với middleware bảo vệ.
   - Hoàn thiện module Media Upload kết nối Cloudflare R2.
   - Hoàn thiện module Projects (CRUD + transaction) và Leads (CRM + stats).
3. **Bước 3 (Task 5.3 - Frontend Integration):**
   - Tạo `src/lib/api-client.ts` và các file `src/apis/*.ts`.
   - Kết nối trang Public (`/projects`, `/projects/:slug`, form tư vấn).
   - Kết nối trang Admin (`/admin/login`, `/admin/dashboard`, `/admin/projects`, `/admin/contacts`, `/admin/settings`).
   - Kiểm thử toàn diện dòng dữ liệu end-to-end từ Frontend -> Go API -> PostgreSQL & Cloudflare R2.

---

## 7. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

1. Backend Go khởi động thành công, tự động kiểm tra và chạy migration nếu database chưa có bảng.
2. Đăng nhập Admin thành công với thông tin xác thực, nhận cookie/JWT hợp lệ, truy cập các route được bảo vệ an toàn.
3. Tạo mới dự án từ Form Admin, upload ảnh lên Cloudflare R2 nhận URL thật, lưu dữ liệu vào PostgreSQL và hiển thị chuẩn xác ở cả Admin List lẫn Public Catalogue `/projects` & Detail `/projects/[slug]`.
4. Gửi form yêu cầu tư vấn từ trang Public lưu đúng vào bảng `consultation_leads`, xuất hiện tức thì trong CRM Admin `/admin/contacts`.
5. Đổi mật khẩu trong `/admin/settings` hoạt động với backend, cập nhật hash bcrypt thành công.
