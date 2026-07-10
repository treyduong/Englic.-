import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [AdminModule, ExamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
