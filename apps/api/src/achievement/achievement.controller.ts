import { AchievementDto, AchievementModifyDto } from '@ddays-app/types';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminGuard, PrinterGuard } from 'src/auth/admin.guard';

import { AchievementService } from './achievement.service';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: AchievementModifyDto): Promise<AchievementDto> {
    return await this.achievementService.create(dto);
  }

  @UseGuards(PrinterGuard)
  @Get()
  async getAll(): Promise<AchievementDto[]> {
    return await this.achievementService.getAll();
  }
}
