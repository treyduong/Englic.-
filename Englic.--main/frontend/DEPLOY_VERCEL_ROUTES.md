# Deploy Vercel routes

Bản này có thể deploy frontend độc lập lên Vercel, không cần Nest backend cho luồng đề thi.

## Route người dùng

- `/` trang chủ
- `/de-thi` danh sách đề
- `/de-thi/[id]` chi tiết đề
- `/de-thi/[id]/lam-bai` phòng làm bài
- `/dashboard` thống kê kết quả làm bài
- `/dashboard/lich-su` lịch sử làm bài

## Route admin frontend

- `/admin` dashboard admin frontend
- `/admin/de-thi` quản lý đề
- `/admin/de-thi/upload` upload JSON vào localStorage trình duyệt

## API route đọc đề

- `GET /api/exams` đọc `frontend/public/exams/index.json`
- `GET /api/exams/[id]` đọc từng file JSON trong `frontend/public/exams`
- `GET /api/route-map` trả về route map phục vụ kiểm tra khi deploy

## Lưu ý lưu trữ

- Đề static dùng cho mọi user cần nằm trong `frontend/public/exams` và được liệt kê trong `index.json`.
- Đề admin upload trực tiếp trên frontend được lưu vào localStorage của trình duyệt hiện tại. Cách này phù hợp demo, test nội bộ, hoặc chạy local.
- Nếu muốn admin upload trên Vercel và tất cả user đều thấy ngay, cần thêm database/KV/blob storage vì Vercel serverless không nên ghi trực tiếp vào thư mục `public` sau khi deploy.
