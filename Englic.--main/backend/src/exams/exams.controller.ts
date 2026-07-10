import { Controller, Get, Param } from '@nestjs/common';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  listExams() {
    return { exams: this.examsService.list() };
  }

  @Get(':id')
  getExam(@Param('id') id: string) {
    return this.examsService.findById(id);
  }
}
