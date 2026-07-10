# Deploy & SEO checklist cho Englic

## 1. Cài env trước khi deploy

Tạo `frontend/.env.local` khi chạy local hoặc cấu hình biến môi trường trên Firebase/Vercel:

```env
NEXT_PUBLIC_SITE_URL=https://domain-that-cua-ban.vn

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_key_lay_tu_clerk_dashboard
CLERK_SECRET_KEY=sk_test_key_lay_tu_clerk_dashboard

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

Lưu ý: bản này dùng Clerk thật cho đăng nhập/đăng ký. Muốn chạy được auth ngay khi `npm run dev`, bắt buộc điền `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` và `CLERK_SECRET_KEY` thật từ Clerk Dashboard.

## 2. Cấu hình Clerk Dashboard

Trong Clerk Dashboard, kiểm tra các route sau:

- Sign-in URL: `/sign-in`
- Sign-up URL: `/sign-up`
- After sign-in URL: `/dashboard`
- After sign-up URL: `/dashboard`
- Allowed origins khi chạy local: `http://localhost:3000`
- Production domain sau deploy: domain thật của website

## 3. Chạy local

```bash
cd frontend
npm install
npm run dev
```

Mở `http://localhost:3000`.

## 4. Build production

```bash
cd frontend
npm run build
npm run start
```

## 5. Deploy lên Google/Firebase

Project đã có `firebase.json` ở root. Với Firebase App Hosting/Hosting framework-aware, deploy từ root project sau khi đã login Firebase:

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

## 6. Để Google tìm thấy website

Sau khi deploy xong:

1. Kiểm tra `https://domain-cua-ban/sitemap.xml`.
2. Kiểm tra `https://domain-cua-ban/robots.txt`.
3. Vào Google Search Console, thêm domain/property.
4. Submit sitemap: `https://domain-cua-ban/sitemap.xml`.
5. Dùng URL Inspection để yêu cầu index trang chủ và `/de-thi`.

## 7. Route đã cấu hình SEO

- `/` có metadata, Open Graph và WebSite JSON-LD.
- `/de-thi` có title/description/canonical.
- `/de-thi/[id]` có metadata động theo từng đề.
- `/sitemap.xml` tự sinh cả trang tĩnh và danh sách đề trong `public/exams/index.json`.
- `/robots.txt` cho crawl trang public và chặn admin/dashboard/API/phòng làm bài.
