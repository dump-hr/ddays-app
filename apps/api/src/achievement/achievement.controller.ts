import {
  AchievementCreateReqDto,
  AchievementCreateResDto,
  AchievementGetAllResDto,
} from '@ddays-app/types';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminGuard, PrinterGuard } from 'src/auth/admin.guard';

import { AchievementService } from './achievement.service';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @UseGuards(PrinterGuard)
  @Get()
  async getAll(): Promise<AchievementGetAllResDto> {
    return await this.achievementService.getAll();
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @Body() dto: AchievementCreateReqDto,
  ): Promise<AchievementCreateResDto> {
    return await this.achievementService.create(dto);
  }
}
