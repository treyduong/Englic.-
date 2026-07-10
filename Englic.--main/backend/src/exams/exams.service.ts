import { Injectable, NotFoundException } from '@nestjs/common';
import { Exam } from './exam.types';
import { ExamsRepository } from './exams.repository';
import { ExamNormalizerService } from '../parser/exam-normalizer.service';

@Injectable()
export class ExamsService {
  constructor(
    private readonly repository: ExamsRepository,
    private readonly normalizer: ExamNormalizerService,
  ) {}

  list() {
    return this.repository.listSummaries();
  }

  findById(examId: string) {
    const exam = this.repository.findById(examId);
    if (!exam) throw new NotFoundException('Không tìm thấy đề thi');
    return exam;
  }

  save(rawExam: any): Exam {
    const exam = this.normalizer.normalize(rawExam, rawExam?.title || 'Đề thi mới');
    return this.repository.save(exam);
  }

  updateFromJson(examId: string, jsonContent: string): Exam {
    const parsed = JSON.parse(jsonContent);
    const normalized = this.normalizer.normalize({ ...parsed, examId }, parsed?.title || examId);
    return this.repository.save(normalized);
  }

  delete(examId: string) {
    this.repository.delete(examId);
  }
}
