import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    pages: {
      exams: '/de-thi',
      examDetail: '/de-thi/:id',
      examRoom: '/de-thi/:id/lam-bai',
      dashboard: '/dashboard',
      history: '/dashboard/lich-su',
      admin: '/admin',
      adminExamList: '/admin/de-thi',
      adminUpload: '/admin/de-thi/upload',
    },
    api: {
      examList: '/api/exams',
      examDetail: '/api/exams/:id',
      routeMap: '/api/route-map',
    },
    vercelNote:
      'Các route public đọc dữ liệu từ frontend/public/exams để deploy độc lập trên Vercel, không cần Nest backend.',
  });
}
