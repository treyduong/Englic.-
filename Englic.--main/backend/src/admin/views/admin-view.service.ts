import { Injectable } from '@nestjs/common';
import { Exam, ExamSummary } from '../../exams/exam.types';

@Injectable()
export class AdminViewService {
  layout(title: string, content: string) {
    return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${this.escape(title)} | Englic Admin</title>
  <style>
    :root { color-scheme: light; --primary:#7c3aed; --border:#e5e7eb; --text:#111827; --muted:#6b7280; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Inter, Arial, sans-serif; background:#f8fafc; color:var(--text); }
    a { color:inherit; text-decoration:none; }
    .shell { min-height:100vh; display:grid; grid-template-columns:260px 1fr; }
    .sidebar { background:#111827; color:#fff; padding:24px; }
    .brand { font-size:26px; font-weight:900; margin-bottom:28px; }
    .brand span { color:#a78bfa; }
    .nav a { display:block; padding:12px 14px; border-radius:12px; color:#e5e7eb; margin-bottom:8px; }
    .nav a:hover { background:#1f2937; }
    .content { padding:32px; }
    .top { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; gap:16px; }
    .card { background:#fff; border:1px solid var(--border); border-radius:18px; box-shadow:0 10px 30px rgba(15,23,42,.05); padding:24px; margin-bottom:20px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; }
    .stat { padding:20px; border-radius:16px; background:linear-gradient(135deg,#faf5ff,#eff6ff); border:1px solid #ede9fe; }
    .stat strong { display:block; font-size:30px; }
    .stat span { color:var(--muted); font-size:14px; }
    .btn { border:0; display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:11px 16px; border-radius:12px; background:var(--primary); color:#fff; font-weight:700; cursor:pointer; }
    .btn.secondary { background:#111827; }
    .btn.danger { background:#dc2626; }
    .btn.ghost { background:#fff; color:#111827; border:1px solid var(--border); }
    .field { margin-bottom:16px; }
    label { display:block; font-weight:700; margin-bottom:8px; }
    input, select, textarea { width:100%; border:1px solid var(--border); border-radius:12px; padding:12px 14px; font:inherit; background:#fff; }
    textarea { min-height:360px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size:13px; line-height:1.55; }
    table { width:100%; border-collapse:collapse; }
    th, td { text-align:left; border-bottom:1px solid var(--border); padding:14px 10px; vertical-align:top; }
    th { color:var(--muted); font-size:13px; text-transform:uppercase; letter-spacing:.04em; }
    .muted { color:var(--muted); }
    .pill { display:inline-block; padding:5px 9px; border-radius:999px; background:#f3e8ff; color:#6d28d9; font-size:12px; font-weight:800; }
    .actions { display:flex; flex-wrap:wrap; gap:8px; }
    .notice { padding:14px 16px; border-radius:14px; background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; margin-bottom:16px; }
    .error { padding:14px 16px; border-radius:14px; background:#fef2f2; color:#991b1b; border:1px solid #fecaca; margin-bottom:16px; }
    @media (max-width: 800px) { .shell { grid-template-columns:1fr; } .sidebar { position:relative; } .content { padding:20px; } }
  </style>
</head>
<body>
  <div class="shell">
    <aside class="sidebar">
      <div class="brand">Englic<span>.</span> Admin</div>
      <nav class="nav">
        <a href="/admin">Dashboard</a>
        <a href="/admin/exams">Quản lý đề thi</a>
        <a href="/admin/exams/upload">Upload đề</a>
        <a href="/exams" target="_blank">Public exams JSON</a>
      </nav>
      <p class="muted" style="font-size:13px;margin-top:32px;color:#9ca3af">Admin panel được render trực tiếp từ backend NestJS, không còn nằm trong frontend.</p>
    </aside>
    <main class="content">${content}</main>
  </div>
</body>
</html>`;
  }

  login(error = '') {
    return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Đăng nhập Admin | Englic</title>
  <style>
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#eef2ff,#faf5ff);font-family:Inter,Arial,sans-serif;color:#111827}
    .card{width:min(420px,92vw);background:#fff;border:1px solid #e5e7eb;border-radius:22px;padding:30px;box-shadow:0 20px 50px rgba(15,23,42,.12)}
    h1{margin:0 0 8px;font-size:28px}.muted{color:#6b7280;margin-bottom:22px}label{display:block;font-weight:700;margin-bottom:8px}input{width:100%;border:1px solid #e5e7eb;border-radius:12px;padding:12px 14px;font:inherit;margin-bottom:16px}.btn{width:100%;border:0;border-radius:12px;background:#7c3aed;color:#fff;font-weight:800;padding:13px;cursor:pointer}.error{padding:12px 14px;border-radius:12px;background:#fef2f2;color:#991b1b;border:1px solid #fecaca;margin-bottom:16px}
  </style>
</head>
<body>
  <form class="card" method="post" action="/admin/login">
    <h1>Englic. Admin</h1>
    <div class="muted">Đăng nhập vào giao diện quản trị backend.</div>
    ${error ? `<div class="error">${this.escape(error)}</div>` : ''}
    <label>Mật khẩu admin</label>
    <input name="password" type="password" placeholder="Nhập ADMIN_PASSWORD" autofocus />
    <button class="btn" type="submit">Đăng nhập</button>
  </form>
</body>
</html>`;
  }

  dashboard(exams: ExamSummary[]) {
    const totalQuestions = exams.reduce((sum, item) => sum + item.questions, 0);
    return this.layout(
      'Dashboard',
      `<div class="top">
        <div>
          <h1>Dashboard Admin</h1>
          <p class="muted">Quản lý đề thi, upload đề, chỉnh JSON và publish cho website người dùng.</p>
        </div>
        <a class="btn" href="/admin/exams/upload">+ Upload đề mới</a>
      </div>
      <div class="grid">
        <div class="stat"><strong>${exams.length}</strong><span>Tổng số đề</span></div>
        <div class="stat"><strong>${totalQuestions}</strong><span>Tổng số câu hỏi</span></div>
        <div class="stat"><strong>Backend</strong><span>Admin panel server-rendered</span></div>
      </div>
      <div class="card">
        <h2>Flow backend đã áp dụng</h2>
        <p class="muted">Admin View → Admin Controller → Parser/Normalizer Service → Exam Service → Repository/File Storage → Frontend user đọc đề từ backend.</p>
      </div>`,
    );
  }

  examList(exams: ExamSummary[]) {
    const rows = exams
      .map(
        (exam) => `<tr>
          <td><strong>${this.escape(exam.title)}</strong><br><span class="muted">ID: ${this.escape(exam.id)}</span></td>
          <td><span class="pill">${this.escape(exam.category)}</span></td>
          <td>${exam.questions}</td>
          <td>${this.escape(exam.time)}</td>
          <td class="actions">
            <a class="btn ghost" href="/admin/exams/${encodeURIComponent(exam.id)}/edit">Sửa</a>
            <a class="btn ghost" href="/exams/${encodeURIComponent(exam.id)}" target="_blank">Xem JSON</a>
            <form method="post" action="/admin/exams/${encodeURIComponent(exam.id)}/delete" onsubmit="return confirm('Xóa đề này?')">
              <button class="btn danger" type="submit">Xóa</button>
            </form>
          </td>
        </tr>`,
      )
      .join('');

    return this.layout(
      'Quản lý đề thi',
      `<div class="top">
        <div><h1>Quản lý đề thi</h1><p class="muted">Danh sách đề đang lưu ở backend/data/exams.</p></div>
        <a class="btn" href="/admin/exams/upload">+ Upload đề</a>
      </div>
      <div class="card">
        <table>
          <thead><tr><th>Đề thi</th><th>Môn</th><th>Số câu</th><th>Thời gian</th><th>Thao tác</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="5" class="muted">Chưa có đề nào. Hãy upload đề đầu tiên.</td></tr>'}</tbody>
        </table>
      </div>`,
    );
  }

  uploadForm(error = '') {
    return this.layout(
      'Upload đề',
      `<div class="top"><div><h1>Upload đề</h1><p class="muted">Có thể upload file JSON/TXT hoặc dán nội dung đề. Với PDF, hệ thống sẽ lưu file và tạo draft để admin chỉnh tiếp.</p></div></div>
      <div class="card">
        ${error ? `<div class="error">${this.escape(error)}</div>` : ''}
        <form method="post" action="/admin/exams/upload" enctype="multipart/form-data">
          <div class="grid">
            <div class="field"><label>Tên đề thi</label><input name="title" placeholder="VD: Đề thi thử THPTQG môn Tiếng Anh 2026" required /></div>
            <div class="field"><label>Môn học</label><select name="category"><option>Tiếng Anh</option><option>Toán</option><option>Vật lý</option><option>Hóa học</option><option>Sinh học</option><option>Lịch sử</option><option>Địa lý</option><option>GDCD (KT - PL)</option></select></div>
            <div class="field"><label>Thời gian làm bài, phút</label><input name="timeLimit" type="number" min="1" value="60" /></div>
          </div>
          <div class="field"><label>File đề, hỗ trợ tốt nhất: .json, .txt</label><input name="examFile" type="file" accept=".json,.txt,.pdf,image/*" /></div>
          <div class="field"><label>Hoặc dán JSON / text đề thi</label><textarea name="rawText" placeholder='Có thể dán JSON theo schema sections, hoặc text dạng: Câu 1. ... A. ... B. ...'></textarea></div>
          <button class="btn" type="submit">Upload và tạo draft</button>
        </form>
      </div>`,
    );
  }

  editExam(exam: Exam, error = '', success = '') {
    return this.layout(
      `Sửa ${exam.title}`,
      `<div class="top">
        <div><h1>Sửa đề thi</h1><p class="muted">Chỉnh trực tiếp JSON đề. Sau khi lưu, website user sẽ đọc phiên bản mới từ backend.</p></div>
        <a class="btn ghost" href="/admin/exams">← Danh sách đề</a>
      </div>
      <div class="card">
        ${success ? `<div class="notice">${this.escape(success)}</div>` : ''}
        ${error ? `<div class="error">${this.escape(error)}</div>` : ''}
        <form method="post" action="/admin/exams/${encodeURIComponent(exam.examId)}/edit">
          <div class="field"><label>Exam JSON</label><textarea name="examJson">${this.escape(JSON.stringify(exam, null, 2))}</textarea></div>
          <button class="btn" type="submit">Lưu thay đổi</button>
          <a class="btn ghost" href="/exams/${encodeURIComponent(exam.examId)}" target="_blank">Xem public JSON</a>
        </form>
      </div>`,
    );
  }

  private escape(value: any) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
