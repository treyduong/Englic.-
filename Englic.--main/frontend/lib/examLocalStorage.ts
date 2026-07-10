'use client';

import { Exam, ExamAttemptResult, ExamSummary, normalizeExam, toExamSummary } from './examTypes';

const ADMIN_EXAMS_KEY = 'englic_admin_exams_v1';
const EXAM_RESULTS_KEY = 'englic_exam_results_v1';

const safeParse = <T>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const canUseLocalStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export const loadAdminExams = (): Exam[] => {
  if (!canUseLocalStorage()) return [];
  return safeParse<any[]>(window.localStorage.getItem(ADMIN_EXAMS_KEY), [])
    .map((item) => normalizeExam(item))
    .filter((exam) => exam.sections.length > 0);
};

export const loadAdminExamSummaries = (): ExamSummary[] =>
  loadAdminExams().map((exam) => toExamSummary(exam, 'admin-local'));

export const getAdminExamById = (examId: string): Exam | null =>
  loadAdminExams().find((exam) => exam.examId === examId) || null;

export const saveAdminExam = (rawExam: any): Exam => {
  if (!canUseLocalStorage()) throw new Error('Trình duyệt chưa hỗ trợ localStorage.');
  const exam = normalizeExam({ ...rawExam, updatedAt: new Date().toISOString() });
  const exams = loadAdminExams().filter((item) => item.examId !== exam.examId);
  exams.unshift(exam);
  window.localStorage.setItem(ADMIN_EXAMS_KEY, JSON.stringify(exams));
  return exam;
};

export const deleteAdminExam = (examId: string) => {
  if (!canUseLocalStorage()) return;
  const exams = loadAdminExams().filter((item) => item.examId !== examId);
  window.localStorage.setItem(ADMIN_EXAMS_KEY, JSON.stringify(exams));
};

export const loadExamResults = (): ExamAttemptResult[] => {
  if (!canUseLocalStorage()) return [];
  return safeParse<ExamAttemptResult[]>(window.localStorage.getItem(EXAM_RESULTS_KEY), []).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
};

export const saveExamResult = (result: ExamAttemptResult) => {
  if (!canUseLocalStorage()) return;
  const results = loadExamResults();
  results.unshift(result);
  window.localStorage.setItem(EXAM_RESULTS_KEY, JSON.stringify(results.slice(0, 300)));
};

export const clearExamResults = () => {
  if (!canUseLocalStorage()) return;
  window.localStorage.removeItem(EXAM_RESULTS_KEY);
};
