import { Module } from '@nestjs/common';
import { AchievementService } from 'src/achievement/achievement.service';
import { PrismaService } from 'src/prisma.service';

import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService, AchievementService],
})
export class EventModule {}
