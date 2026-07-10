import { Exam, ExamSummary, normalizeExam } from './examTypes';

export const fetchExamSummaries = async (): Promise<ExamSummary[]> => {
  const response = await fetch('/api/exams', { cache: 'no-store' });
  if (!response.ok) throw new Error('Không tải được danh sách đề thi.');
  const data = await response.json();
  return Array.isArray(data?.exams) ? data.exams : [];
};

export const fetchExamById = async (examId: string): Promise<Exam | null> => {
  const response = await fetch(`/api/exams/${encodeURIComponent(examId)}`, { cache: 'no-store' });
  if (!response.ok) return null;
  const data = await response.json();
  return normalizeExam(data);
};
