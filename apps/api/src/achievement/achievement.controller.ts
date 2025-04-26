import { AchievementDto, AchievementModifyDto } from '@ddays-app/types';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(UserGuard)
  @Get('completed')
  async getCompletedAchievements(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<AchievementDto[]> {
    return await this.achievementService.getCompletedAchievements(user.id);
  }

  @Get(':uuid')
  async getOne(@Param('uuid') uuid: string): Promise<AchievementDto> {
    return await this.achievementService.getOne(uuid);
  }

  @Get()
  async getAll(): Promise<AchievementDto[]> {
    return await this.achievementService.getAll();
  }

  @UseGuards(UserGuard)
  @Post('complete/:uuid')
  async completeAchievement(
    @Req() { user }: AuthenticatedRequest,
    @Param('uuid') uuid: string,
  ): Promise<AchievementDto> {
    return await this.achievementService.completeAchievement(user.id, uuid);
  }
}
