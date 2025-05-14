import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  controllers: [RatingController],
  providers: [RatingService, PrismaService],
})
export class RatingModule {}
