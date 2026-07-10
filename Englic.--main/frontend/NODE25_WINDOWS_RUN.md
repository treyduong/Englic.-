# Chạy frontend trên Windows Node 25.9.0 / npm 11.12.1

Bản này đã được chỉnh để phù hợp hơn với môi trường của bạn:

- Giữ Next.js ở `16.2.4` theo lockfile hiện tại.
- Thêm `@next/swc-wasm-nodejs@16.2.4` làm fallback khi native SWC Windows bị lỗi.
- Đổi `next.config.ts` thành `next.config.mjs` để Next không cần SWC chỉ để đọc config.
- Thêm `.npmrc` để npm cài optional dependencies.

## Cách chạy sạch

Mở PowerShell trong thư mục `frontend`:

```powershell
npm run reinstall
npm run dev
```

Hoặc chạy thủ công:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm install --include=optional
npm run dev
```

## Nếu vẫn còn lỗi SWC

Lỗi `not a valid Win32 application` thường do `node_modules/@next/swc-win32-x64-msvc` đã bị tải/cài hỏng từ lần trước. Không copy `node_modules` từ máy khác hoặc từ zip cũ. Hãy xóa `node_modules` và cài lại bằng các lệnh trên.

## Clerk

Tạo file `.env.local` trong thư mục `frontend`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
