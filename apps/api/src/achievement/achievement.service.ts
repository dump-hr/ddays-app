import { AchievementDto, AchievementModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';

@Injectable()
export class AchievementService {
  async create(dto: AchievementModifyDto): Promise<AchievementDto> {
    const createdAchievement = await prisma.achievement.create({ data: dto });

    return createdAchievement;
  }

  async getAll(): Promise<AchievementDto[]> {
    const achievements = await prisma.achievement.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        points: true,
        fulfillmentCodeCount: true,
        isHidden: true,
        createdAt: true,
      },
      orderBy: {
        points: 'desc',
      },
    });

    return achievements;
  }
}
