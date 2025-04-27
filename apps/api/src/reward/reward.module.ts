import { Module } from '@nestjs/common';
import { BlobModule } from 'src/blob/blob.module';
import { BlobService } from 'src/blob/blob.service';
import { PrismaService } from 'src/prisma.service';

import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';

@Module({
  controllers: [RewardController],
  providers: [RewardService, PrismaService, BlobService],
  imports: [BlobModule],
})
export class RewardModule {}
