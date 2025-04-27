import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { BlobService } from 'src/blob/blob.service';
import { BlobModule } from 'src/blob/blob.module';

@Module({
  controllers: [RewardController],
  providers: [RewardService, PrismaService, BlobService],
  imports: [BlobModule],
})
export class RewardModule {}
