import {
  LeaderboardQueryDto,
  LeaderboardResponseDto,
  UserRankResponseDto,
} from '@ddays-app/types/src/dto/leaderboard';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UserGuard } from '../auth/user.guard';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @UseGuards(UserGuard)
  async getLeaderboard(
    @Query() query: LeaderboardQueryDto,
  ): Promise<LeaderboardResponseDto> {
    return this.leaderboardService.getLeaderboard(query);
  }

  @Get('user/:id')
  @UseGuards(UserGuard)
  async getUserRank(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserRankResponseDto> {
    return this.leaderboardService.getUserRank(userId);
  }

  @Get('me')
  @UseGuards(UserGuard)
  async getCurrentUserRank(@Req() { user }): Promise<UserRankResponseDto> {
    return this.leaderboardService.getUserRank(user.id);
  }
}
