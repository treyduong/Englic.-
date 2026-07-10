# Backend Admin Flow Refactor

## Kiến trúc sau khi refactor

- `frontend/`: chỉ còn user-facing website, gồm trang chủ, danh sách đề thi, chi tiết đề thi, phòng làm bài, dashboard và auth user.
- `backend/`: có admin panel riêng được render trực tiếp bằng NestJS controller, không còn để `/admin` trong frontend.

## Flow chính

```txt
Admin View trong backend
→ Admin Controller
→ Parser / Normalizer Service
→ Exam Service
→ Repository / File Storage
→ Frontend user đọc đề từ backend public route
```

## Các route backend chính

### Admin routes, server-rendered HTML

```txt
GET  /admin
GET  /admin/login
POST /admin/login
GET  /admin/exams
GET  /admin/exams/upload
POST /admin/exams/upload
GET  /admin/exams/:id/edit
POST /admin/exams/:id/edit
POST /admin/exams/:id/delete
```

### Public routes cho website user đọc đề

```txt
GET /exams
GET /exams/:id
```

## Chạy local

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Admin panel chạy tại:

```txt
http://localhost:3001/admin
```

Nếu muốn bật mật khẩu admin, thêm biến môi trường:

```txt
ADMIN_PASSWORD=your-password
```

Nếu không đặt `ADMIN_PASSWORD`, backend cho phép vào admin panel ở chế độ dev.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend đọc đề từ backend qua biến:

```txt
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

Nếu không set biến này, frontend mặc định gọi `http://localhost:3001`.

## Dữ liệu đề thi

Backend lưu đề thi tại:

```txt
backend/data/exams/index.json
backend/data/exams/{examId}.json
```

File upload gốc được lưu tại:

```txt
backend/uploads/
```

## Ghi chú kỹ thuật

- Đã di chuyển `frontend/app/admin` và `frontend/app/api` ra khỏi App Router, lưu backup ở `_legacy_frontend_admin_and_api/`.
- Admin panel không còn là React page trong frontend.
- Admin upload đề bằng form backend.
- Backend hiện parse tốt nhất với JSON/TXT. Với PDF/ảnh, hệ thống tạo draft và lưu file gốc để admin chỉnh tiếp trong màn hình edit JSON.
- Frontend `/de-thi`, `/de-thi/[id]`, `/de-thi/[id]/lam-bai` đã được chỉnh để đọc đề từ backend public routes.
