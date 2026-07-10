import { Injectable } from '@nestjs/common';
import { Exam, ExamQuestion, ExamSection, OptionMap } from '../exams/exam.types';

@Injectable()
export class ExamNormalizerService {
  createSlug(input: string) {
    const base = (input || 'exam')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);

    return `${base || 'exam'}-${Date.now()}`;
  }

  normalize(raw: any, fallbackTitle = 'Đề thi mới'): Exam {
    const now = new Date().toISOString();
    const title = raw?.title || raw?.name || fallbackTitle;
    const examId = raw?.examId || raw?.id || this.createSlug(title);
    const source = raw?.source || 'Admin Upload';
    const category = raw?.category || 'Tiếng Anh';
    const timeLimit = Number(raw?.timeLimit || raw?.duration || 3600);
    const description = raw?.description || '';

    const sections = this.normalizeSections(raw);

    return {
      examId,
      title,
      category,
      source,
      description,
      timeLimit,
      sections,
      createdAt: raw?.createdAt || now,
      updatedAt: raw?.updatedAt || now,
    };
  }

  private normalizeSections(raw: any): ExamSection[] {
    if (Array.isArray(raw?.sections)) {
      return raw.sections.map((section: any, index: number) => this.normalizeSection(section, index));
    }

    if (Array.isArray(raw?.parts)) {
      return raw.parts.map((part: any, index: number) =>
        this.normalizeSection(
          {
            sectionType: part.title || part.type || `part_${index + 1}`,
            instruction: part.instruction || part.title || '',
            passage: part.passage || '',
            questions: part.questions || [],
          },
          index,
        ),
      );
    }

    if (Array.isArray(raw?.questions)) {
      return [
        this.normalizeSection(
          {
            sectionType: 'multiple_choice',
            instruction: 'Chọn đáp án đúng nhất.',
            passage: raw?.passage || '',
            questions: raw.questions,
          },
          0,
        ),
      ];
    }

    return [
      {
        sectionType: 'multiple_choice',
        instruction: 'Admin cần kiểm tra và bổ sung câu hỏi cho đề này.',
        passage: raw?.passage || '',
        questions: [],
      },
    ];
  }

  private normalizeSection(section: any, index: number): ExamSection {
    const questions = Array.isArray(section?.questions)
      ? section.questions.map((question: any, qIndex: number) => this.normalizeQuestion(question, qIndex))
      : [];

    return {
      sectionType: section?.sectionType || section?.type || `part_${index + 1}`,
      instruction: section?.instruction || '',
      passage: section?.passage || '',
      questions,
    };
  }

  private normalizeQuestion(question: any, index: number): ExamQuestion {
    const questionNumber = Number(question?.questionNumber || question?.number || index + 1);
    const id = question?.id || `q${questionNumber}`;

    return {
      id,
      questionNumber,
      questionText: question?.questionText || question?.text || question?.question || '',
      context: question?.context || '',
      options: this.normalizeOptions(question?.options),
      correctAnswer: question?.correctAnswer || question?.answer || '',
      explanation: question?.explanation || question?.explain || '',
    };
  }

  private normalizeOptions(options: any): OptionMap {
    if (!options) return { A: '', B: '', C: '', D: '' };

    if (Array.isArray(options)) {
      return options.reduce((acc: OptionMap, item: string, index: number) => {
        const key = ['A', 'B', 'C', 'D'][index] || String.fromCharCode(65 + index);
        acc[key] = String(item).replace(/^[A-D][.)]\s*/i, '').trim();
        return acc;
      }, {});
    }

    return Object.entries(options).reduce((acc: OptionMap, [key, value]) => {
      acc[key] = String(value ?? '').trim();
      return acc;
    }, {});
  }
}
