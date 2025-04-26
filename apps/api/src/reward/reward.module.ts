import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';

@Module({
  controllers: [RewardController],
  providers: [RewardService, PrismaService],
})
export class RewardModule {}
