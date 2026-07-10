import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { ExamsService } from '../exams/exams.service';
import { SimpleExamParserService } from '../parser/simple-exam-parser.service';
import { AdminViewService } from './views/admin-view.service';

@Controller('admin')
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(
    private readonly examsService: ExamsService,
    private readonly parserService: SimpleExamParserService,
    private readonly view: AdminViewService,
  ) {}

  @Get()
  dashboard(@Res() res: Response) {
    res.send(this.view.dashboard(this.examsService.list()));
  }

  @Get('exams')
  exams(@Res() res: Response) {
    res.send(this.view.examList(this.examsService.list()));
  }

  @Get('exams/upload')
  uploadForm(@Res() res: Response) {
    res.send(this.view.uploadForm());
  }

  @Post('exams/upload')
  @UseInterceptors(FileInterceptor('examFile'))
  uploadExam(
    @UploadedFile() file: any,
    @Body() body: { title?: string; category?: string; timeLimit?: string; rawText?: string },
    @Res() res: Response,
  ) {
    try {
      this.persistOriginalFile(file);
      const exam = this.parserService.parseInput({
        title: body.title,
        category: body.category,
        timeLimit: body.timeLimit,
        rawText: body.rawText,
        file,
      });
      const saved = this.examsService.save(exam);
      return res.redirect(`/admin/exams/${encodeURIComponent(saved.examId)}/edit`);
    } catch (error) {
      return res.status(400).send(this.view.uploadForm(error?.message || 'Không thể upload đề.'));
    }
  }

  @Get('exams/:id/edit')
  editForm(@Param('id') id: string, @Res() res: Response) {
    try {
      const exam = this.examsService.findById(id);
      res.send(this.view.editExam(exam));
    } catch (error) {
      res.status(404).send(this.view.layout('Không tìm thấy', `<div class="card"><h1>Không tìm thấy đề</h1><p>${error?.message || ''}</p><a class="btn" href="/admin/exams">Quay lại</a></div>`));
    }
  }

  @Post('exams/:id/edit')
  updateExam(@Param('id') id: string, @Body('examJson') examJson: string, @Res() res: Response) {
    try {
      const saved = this.examsService.updateFromJson(id, examJson);
      res.send(this.view.editExam(saved, '', 'Đã lưu thay đổi thành công.'));
    } catch (error) {
      const fallback = this.examsService.findById(id);
      res.status(400).send(this.view.editExam(fallback, error?.message || 'JSON không hợp lệ.'));
    }
  }

  @Post('exams/:id/delete')
  deleteExam(@Param('id') id: string, @Res() res: Response) {
    this.examsService.delete(id);
    res.redirect('/admin/exams');
  }

  private persistOriginalFile(file?: any) {
    if (!file?.buffer) return;
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const safeName = `${Date.now()}-${String(file.originalname || 'upload')}`.replace(/[^a-zA-Z0-9._-]/g, '_');
    fs.writeFileSync(path.join(uploadDir, safeName), file.buffer);
  }
}
