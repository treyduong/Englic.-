import { Injectable } from '@nestjs/common';
import { ExamNormalizerService } from './exam-normalizer.service';
import { Exam } from '../exams/exam.types';

@Injectable()
export class SimpleExamParserService {
  constructor(private readonly normalizer: ExamNormalizerService) {}

  parseInput(params: {
    title?: string;
    category?: string;
    timeLimit?: string | number;
    rawText?: string;
    file?: any;
  }): Exam {
    const title = params.title || params.file?.originalname || 'Đề thi mới';
    const rawText = (params.rawText || '').trim();
    const fileText = this.tryReadFileAsText(params.file);
    const content = rawText || fileText;

    if (content) {
      const parsedJson = this.tryParseJson(content);
      if (parsedJson) {
        return this.normalizer.normalize(
          {
            ...parsedJson,
            title: parsedJson.title || title,
            category: parsedJson.category || params.category,
            timeLimit: parsedJson.timeLimit || Number(params.timeLimit) * 60 || 3600,
          },
          title,
        );
      }

      return this.normalizer.normalize(
        {
          title,
          category: params.category || 'Tiếng Anh',
          timeLimit: Number(params.timeLimit || 60) * 60,
          source: params.file?.originalname ? `Uploaded file: ${params.file.originalname}` : 'Admin raw text',
          description: 'Đề được tạo từ nội dung admin upload. Admin cần kiểm tra lại câu hỏi, đáp án và giải thích trước khi publish.',
          sections: [this.parsePlainTextToSection(content)],
        },
        title,
      );
    }

    return this.normalizer.normalize(
      {
        title,
        category: params.category || 'Tiếng Anh',
        timeLimit: Number(params.timeLimit || 60) * 60,
        source: params.file?.originalname ? `Uploaded file: ${params.file.originalname}` : 'Admin manual upload',
        description: params.file?.originalname
          ? `Đã upload file ${params.file.originalname}. Chưa parse được nội dung tự động, admin cần nhập/chỉnh JSON đề trong màn hình edit.`
          : 'Đề được tạo thủ công từ backend admin.',
      },
      title,
    );
  }

  private tryReadFileAsText(file?: any): string {
    if (!file?.buffer) return '';
    const mimetype = String(file.mimetype || '').toLowerCase();
    const originalname = String(file.originalname || '').toLowerCase();

    if (mimetype.includes('json') || originalname.endsWith('.json') || mimetype.startsWith('text/') || originalname.endsWith('.txt')) {
      return file.buffer.toString('utf8');
    }

    return '';
  }

  private tryParseJson(content: string): any | null {
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  private parsePlainTextToSection(content: string) {
    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const questions: any[] = [];
    let current: any = null;

    for (const line of lines) {
      const questionMatch = line.match(/^(?:Câu|Question)?\s*(\d+)[\.:\)]\s*(.*)$/i);
      const optionMatch = line.match(/^([A-D])[\.:\)]\s*(.*)$/i);

      if (questionMatch) {
        if (current) questions.push(current);
        const number = Number(questionMatch[1]);
        current = {
          id: `q${number}`,
          questionNumber: number,
          questionText: questionMatch[2] || '',
          options: {},
        };
      } else if (optionMatch && current) {
        current.options[optionMatch[1].toUpperCase()] = optionMatch[2];
      } else if (current) {
        current.questionText = `${current.questionText} ${line}`.trim();
      }
    }

    if (current) questions.push(current);

    return {
      sectionType: 'multiple_choice',
      instruction: 'Chọn đáp án đúng nhất.',
      passage: questions.length ? '' : content.slice(0, 5000),
      questions,
    };
  }
}
