import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminAuthController } from './admin-auth.controller';
import { AdminViewService } from './views/admin-view.service';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { ExamsModule } from '../exams/exams.module';
import { SimpleExamParserService } from '../parser/simple-exam-parser.service';

@Module({
  imports: [ExamsModule],
  controllers: [AdminController, AdminAuthController],
  providers: [AdminViewService, AdminAuthGuard, SimpleExamParserService],
})
export class AdminModule {}
