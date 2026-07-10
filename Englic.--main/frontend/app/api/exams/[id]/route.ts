import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const examsDir = path.join(process.cwd(), 'public', 'exams');
const indexPath = path.join(examsDir, 'index.json');

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const rawIndex = await fs.readFile(indexPath, 'utf8');
    const parsedIndex = JSON.parse(rawIndex);
    const exams = Array.isArray(parsedIndex) ? parsedIndex : parsedIndex.exams || [];
    const summary = exams.find((item: any) => item.id === id || item.examId === id);
    const fileName = summary?.file || `${id}.json`;
    const safeFileName = path.basename(fileName);
    const rawExam = await fs.readFile(path.join(examsDir, safeFileName), 'utf8');

    return NextResponse.json(JSON.parse(rawExam));
  } catch (error) {
    return NextResponse.json({ error: 'Không tìm thấy đề thi trong frontend/public/exams.' }, { status: 404 });
  }
}
