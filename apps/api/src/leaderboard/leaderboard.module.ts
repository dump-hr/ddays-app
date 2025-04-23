import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LeaderboardController],
  providers: [LeaderboardService, PrismaService],
})
export class LeaderboardModule {}
