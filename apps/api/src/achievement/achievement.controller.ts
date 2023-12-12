import { Controller, Get, Post } from '@nestjs/common';

import { AchievementService } from './achievement.service';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

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
