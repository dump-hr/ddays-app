import { Controller, Get, Query, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { UserGuard } from '../auth/user.guard';
import { 
  LeaderboardResponseDto, 
  UserRankResponseDto, 
  LeaderboardQueryDto,
  LeaderboardEntryDto 
} from '@ddays-app/types/src/dto/leaderboard';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async getLeaderboard(
    @Query() query: LeaderboardQueryDto
  ): Promise<LeaderboardResponseDto> {
    return this.leaderboardService.getLeaderboard(query);
  }

  @Get('top')
  async getTopUsers(): Promise<LeaderboardEntryDto[]> {
    return this.leaderboardService.getTopUsers(3);
  }

  @Get('user/:id')
  @UseGuards(UserGuard)
  async getUserRank(
    @Param('id', ParseIntPipe) userId: number
  ): Promise<UserRankResponseDto> {
    return this.leaderboardService.getUserRank(userId);
  }

  @Get('me')
  @UseGuards(UserGuard)
  async getCurrentUserRank(
    @Req() { user }
  ): Promise<UserRankResponseDto> {
    return this.leaderboardService.getUserRank(user.id);
  }
}