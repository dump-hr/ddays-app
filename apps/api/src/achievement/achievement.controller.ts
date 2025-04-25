import { AchievementDto, AchievementModifyDto } from '@ddays-app/types';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { UserGuard } from 'src/auth/user.guard';

import { AchievementService } from './achievement.service';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: AchievementModifyDto): Promise<AchievementDto> {
    return await this.achievementService.create(dto);
  }

  @Get()
  async getAll(): Promise<AchievementDto[]> {
    return await this.achievementService.getAll();
  }

  @UseGuards(UserGuard)
  @Get('completed')
  async getCompletedAchievements(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<AchievementDto[]> {
    return await this.achievementService.getCompletedAchievements(user.id);
  }
}
