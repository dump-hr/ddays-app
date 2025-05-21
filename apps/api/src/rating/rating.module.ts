import { Module } from '@nestjs/common';
import { AchievementModule } from 'src/achievement/achievement.module';
import { AchievementService } from 'src/achievement/achievement.service';
import { BoothGateway } from 'src/booth/booth.gateway';
import { BoothModule } from 'src/booth/booth.module';
import { BoothService } from 'src/booth/booth.service';
import { PrismaService } from 'src/prisma.service';

import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  controllers: [RatingController],
  providers: [
    RatingService,
    PrismaService,
    BoothService,
    AchievementService,
    BoothGateway,
  ],
  exports: [RatingService],
  imports: [BoothModule, AchievementModule],
})
export class RatingModule {}
