import { promises as fs } from 'fs';
import path from 'path';
import { Exam, ExamSummary, normalizeExam } from './examTypes';

const examsDir = path.join(process.cwd(), 'public', 'exams');
const indexPath = path.join(examsDir, 'index.json');

export async function getStaticExamSummaries(): Promise<ExamSummary[]> {
  try {
    const raw = await fs.readFile(indexPath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : parsed.exams || [];
  } catch {
    return [];
  }
}

export async function getStaticExamById(examId: string): Promise<Exam | null> {
  try {
    const summaries = await getStaticExamSummaries();
    const summary = summaries.find((item: any) => item.id === examId || item.examId === examId);
    const fileName = summary?.file || `${examId}.json`;
    const safeFileName = path.basename(fileName);
    const rawExam = await fs.readFile(path.join(examsDir, safeFileName), 'utf8');
    return normalizeExam(JSON.parse(rawExam));
  } catch {
    return null;
  }
}
