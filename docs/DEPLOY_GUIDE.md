# Hướng Dẫn Deploy Miễn Phí (0đ/tháng) & Tách Biệt Môi Trường Dev / Production

Tài liệu này hướng dẫn chi tiết từng bước triển khai hệ thống **Axhome Architecture** (Next.js 16 + Go `axhome_server` + PostgreSQL + Cloudflare R2) trên các nền tảng miễn phí, đồng thời đảm bảo **Database Dev và Database Production tách biệt hoàn toàn**.

---

## 1. Tổng Quan Stack Miễn Phí (0đ/tháng)

| Thành phần | Nền tảng | Miễn phí |
| :--- | :--- | :--- |
| **Frontend (Next.js)** | **Vercel (Hobby)** | 100GB băng thông/tháng, Auto SSL, Edge CDN |
| **Backend (Go API)** | **Render Free** hoặc **Koyeb Free** | Chạy qua `backend/Dockerfile` (~15MB RAM) |
| **Database (PostgreSQL)** | **Neon.tech (Free)** hoặc **Supabase (Free)** | 500MB PostgreSQL Managed, SSL bắt buộc |
| **Lưu trữ Ảnh (Storage)** | **Cloudflare R2 (Free)** | 10GB lưu trữ, **0đ phí băng thông (Egress)** |
| **Giữ Server luôn ấm** | **UptimeRobot / cron-job.org (Free)** | Ping `GET /api/v1/health` mỗi 10 phút |

---

## 2. Nguyên Tắc Tách Biệt Database Dev & Production

| Tiêu chí | Local Development (`APP_ENV=development`) | Production (`APP_ENV=production`) |
| :--- | :--- | :--- |
| **Nơi lưu cấu hình** | File `backend/.env` & `frontend/.env.local` (trên máy bạn, nằm trong `.gitignore`) | Dashboard **Environment Variables** của Render/Koyeb & Vercel |
| **Kết nối Database** | `DB_HOST=localhost`, `DB_NAME=axhome_dev`, `DB_SSLMODE=disable` | Biến **`DATABASE_URL`** từ Neon/Supabase (`sslmode=require`) |
| **Cơ chế ưu tiên trong Code** | `config.go` tự động dùng `DB_HOST/...` khi không có `DATABASE_URL` | `config.go` tự động ưu tiên dùng `DATABASE_URL` và biến `PORT` của Cloud |
| **Lưu trữ Ảnh** | Fallback lưu local `backend/uploads/` (hoặc dùng bucket R2 dev riêng) | Bucket **Cloudflare R2** (`axhome-media`) |

> **An toàn tuyệt đối:** Vì `backend/.env` không bao giờ được commit lên Git, việc bạn code/xóa/reset bảng ở Local (`axhome_dev`) **không bao giờ ảnh hưởng** tới dữ liệu thật trên Production (`Neon/Supabase`).

---

## 3. Hướng Dẫn Deploy Từng Bước

### Bước 1: Tạo Database PostgreSQL Production (Neon.tech — Free)
1. Đăng ký tài khoản miễn phí tại [neon.tech](https://neon.tech) → tạo Project mới tên `axhome-prod`, chọn Region **Singapore (`ap-southeast-1`)** cho tốc độ nhanh nhất từ Việt Nam.
2. Copy chuỗi **Connection String** (dạng `postgres://neondb_owner:...@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`).
3. *(Không cần chạy migration thủ công lần đầu!)* Khi Backend Go khởi động, `db.EnsureSchemaAndSeed` sẽ tự động tạo đầy đủ 7 bảng (`users`, `refresh_tokens`, `projects`, `project_images`, `floor_plans`, `project_milestones`, `consultation_leads`) và seed tài khoản Super Admin từ biến `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

---

### Bước 2: Cấu Hình Cloudflare R2 Lưu Ảnh Miễn Phí (10GB, 0đ Egress)
1. Vào [Cloudflare Dashboard](https://dash.cloudflare.com) → **R2 Object Storage** → tạo Bucket tên `axhome-media`.
2. Trong tab **Settings** của Bucket:
   - Bật **Public Development URL** (`https://pub-xxx.r2.dev`) HOẶC gắn Custom Domain (`https://cdn.axhome.vn`).
3. Vào **Manage R2 API Tokens** → tạo token quyền **Object Read & Write** chỉ cho bucket `axhome-media`.
4. Lưu lại 4 thông số: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_PUBLIC_BASE_URL`.

---

### Bước 3: Deploy Go Backend Lên Render Free (hoặc Koyeb Free)
1. Push code lên GitHub.
2. Đăng nhập [render.com](https://render.com) → **New + → Web Service** (hoặc **Blueprint** để đọc tự động file `backend/render.yaml`):
   - **Root Directory:** `backend`
   - **Runtime:** `Docker` (tự nhận `backend/Dockerfile`)
   - **Region:** `Singapore`
   - **Health Check Path:** `/api/v1/health`
3. Khai báo **Environment Variables** trên Render:
   ```env
   APP_ENV=production
   DATABASE_URL=postgres://... (từ Bước 1)
   JWT_SECRET=<tạo chuỗi ngẫu nhiên 64 ký tự>
   CORS_ALLOWED_ORIGINS=https://axhome.vn,https://your-app.vercel.app
   R2_ACCOUNT_ID=...
   R2_ACCESS_KEY_ID=...
   R2_SECRET_ACCESS_KEY=...
   R2_BUCKET_NAME=axhome-media
   R2_PUBLIC_BASE_URL=https://pub-xxx.r2.dev
   ADMIN_EMAIL=admin@axhome.vn
   ADMIN_PASSWORD=<mật khẩu mạnh cho production>
   ADMIN_FULL_NAME=Quản trị viên Axhome
   ```
4. Bấm **Deploy** → kiểm tra `https://<your-backend>.onrender.com/api/v1/health` trả `{"status":"ok"}`.
5. **Chống ngủ (Keep-Alive miễn phí):** Đăng ký [uptimerobot.com](https://uptimerobot.com) hoặc [cron-job.org](https://cron-job.org) → tạo HTTP Monitor ping `https://<your-backend>.onrender.com/api/v1/health` mỗi **10 phút**.

---

### Bước 4: Deploy Frontend Next.js Lên Vercel (Free)
1. Đăng nhập [vercel.com](https://vercel.com) → **Add New Project** → chọn repo GitHub.
2. Cấu hình:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Next.js`
3. Thêm **Environment Variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://<your-backend>.onrender.com
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Bấm **Deploy**. Sau khi có URL Vercel (hoặc tên miền riêng `https://axhome.vn`), nhớ quay lại Bước 3 cập nhật `CORS_ALLOWED_ORIGINS` trên Render khớp chính xác domain Frontend!

---

### Bước 5: Lưu Ý Khi Gắn Tên Miền Riêng Qua Cloudflare DNS (Khuyên Dùng)
- Trỏ `axhome.vn` → Vercel (`A / CNAME`).
- Trỏ `api.axhome.vn` → Render/Koyeb (`CNAME`).
- Trỏ `cdn.axhome.vn` → Cloudflare R2 Bucket.
- Khi Frontend (`axhome.vn`) và Backend (`api.axhome.vn`) dùng chung root domain, Cookie `HttpOnly` (`access_token`, `refresh_token`) hoạt động ổn định trên mọi trình duyệt (kể cả Safari iOS) với bảo mật tối đa.
