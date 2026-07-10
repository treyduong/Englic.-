import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Exam, ExamSummary } from './exam.types';

@Injectable()
export class ExamsRepository {
  private readonly examsDir = path.join(process.cwd(), 'data', 'exams');
  private readonly indexPath = path.join(this.examsDir, 'index.json');

  constructor() {
    this.ensureStorage();
  }

  private ensureStorage() {
    if (!fs.existsSync(this.examsDir)) {
      fs.mkdirSync(this.examsDir, { recursive: true });
    }

    if (!fs.existsSync(this.indexPath)) {
      fs.writeFileSync(this.indexPath, JSON.stringify({ exams: [] }, null, 2), 'utf8');
    }
  }

  private readIndex(): ExamSummary[] {
    this.ensureStorage();
    try {
      const raw = fs.readFileSync(this.indexPath, 'utf8');
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed.exams) ? parsed.exams : [];
    } catch {
      return [];
    }
  }

  private writeIndex(exams: ExamSummary[]) {
    this.ensureStorage();
    fs.writeFileSync(this.indexPath, JSON.stringify({ exams }, null, 2), 'utf8');
  }

  listSummaries(): ExamSummary[] {
    return this.readIndex().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  findById(examId: string): Exam | null {
    this.ensureStorage();
    const filePath = path.join(this.examsDir, `${examId}.json`);
    if (!fs.existsSync(filePath)) return null;

    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Exam;
    } catch {
      return null;
    }
  }

  save(exam: Exam): Exam {
    this.ensureStorage();
    const now = new Date().toISOString();
    const existing = this.findById(exam.examId);
    const normalized: Exam = {
      ...exam,
      createdAt: existing?.createdAt || exam.createdAt || now,
      updatedAt: now,
    };

    fs.writeFileSync(
      path.join(this.examsDir, `${normalized.examId}.json`),
      JSON.stringify(normalized, null, 2),
      'utf8',
    );

    const index = this.readIndex().filter((item) => item.id !== normalized.examId);
    index.unshift(this.toSummary(normalized));
    this.writeIndex(index);

    return normalized;
  }

  delete(examId: string) {
    const filePath = path.join(this.examsDir, `${examId}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    this.writeIndex(this.readIndex().filter((item) => item.id !== examId));
  }

  toSummary(exam: Exam): ExamSummary {
    const totalQuestions = exam.sections.reduce((sum, section) => sum + section.questions.length, 0);
    return {
      id: exam.examId,
      title: exam.title,
      category: exam.category || 'Tiếng Anh',
      time: `${Math.round((exam.timeLimit || 3600) / 60)} Phút`,
      questions: totalQuestions,
      attempts: 0,
      rating: 5,
      reviews: 0,
      createdAt: exam.createdAt,
      updatedAt: exam.updatedAt,
    };
  }
}
