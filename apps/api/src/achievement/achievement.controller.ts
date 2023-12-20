import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MemberGuard } from 'src/auth/azure-ad.guard';

import { AchievementService } from './achievement.service';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @UseGuards(MemberGuard)
  @Get()
  async getAll() {
    const achievements = await this.achievementService.getAll();

    return achievements;
  }

  @Post()
  async create() {
    const createdAchievement = await this.achievementService.create();

    return createdAchievement;
  }
}
