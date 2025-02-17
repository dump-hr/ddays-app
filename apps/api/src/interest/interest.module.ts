import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';

@Module({
  controllers: [InterestController],
  providers: [InterestService, PrismaService],
})
export class InterestModule {}
