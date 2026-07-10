import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const examsDir = path.join(process.cwd(), 'public', 'exams');
const indexPath = path.join(examsDir, 'index.json');

export async function GET() {
  try {
    const raw = await fs.readFile(indexPath, 'utf8');
    const parsed = JSON.parse(raw);
    const exams = Array.isArray(parsed) ? parsed : parsed.exams || [];

    return NextResponse.json({
      exams,
      count: exams.length,
      storage: 'frontend/public/exams',
    });
  } catch (error) {
    return NextResponse.json(
      { exams: [], count: 0, error: 'Không đọc được frontend/public/exams/index.json.' },
      { status: 500 },
    );
  }
}
