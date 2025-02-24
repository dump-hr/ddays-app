import { AchievementDto, AchievementModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AchievementService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: AchievementModifyDto): Promise<AchievementDto> {
    const createdAchievement = await this.prisma.achievement.create({
      data: dto,
    });

    return createdAchievement;
  }

  async getAll(): Promise<AchievementDto[]> {
    const achievements = await this.prisma.achievement.findMany({
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
