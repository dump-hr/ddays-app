import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';

@Module({
  imports: [],
  controllers: [AchievementController],
  providers: [AchievementService, PrismaService],
})
export class AchievementModule {}
