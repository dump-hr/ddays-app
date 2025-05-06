import { Module } from '@nestjs/common';
import { AchievementService } from 'src/achievement/achievement.service';
import { PrismaService } from 'src/prisma.service';

import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, PrismaService, AchievementService],
  exports: [EmailService],
})
export class EmailModule {}
