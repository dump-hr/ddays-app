import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService],
})
export class NotificationModule {}
