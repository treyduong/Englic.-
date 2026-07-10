import { Module } from '@nestjs/common';
import { ExamsController } from './exams.controller';
import { ExamsRepository } from './exams.repository';
import { ExamsService } from './exams.service';
import { ExamNormalizerService } from '../parser/exam-normalizer.service';

@Module({
  controllers: [ExamsController],
  providers: [ExamsRepository, ExamsService, ExamNormalizerService],
  exports: [ExamsRepository, ExamsService, ExamNormalizerService],
})
export class ExamsModule {}
