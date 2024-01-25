import { AchievementDto, AchievementModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { achievement } from 'db/schema';
import { desc } from 'drizzle-orm';

@Injectable()
export class AchievementService {
  async create(dto: AchievementModifyDto): Promise<AchievementDto> {
    const [createdAchievement] = await db
      .insert(achievement)
      .values(dto)
      .returning();

    return createdAchievement;
  }

  async getAll(): Promise<AchievementDto[]> {
    const achievements = await db
      .select({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        points: achievement.points,
        fulfillmentCodeCount: achievement.fulfillmentCodeCount,
        isHidden: achievement.isHidden,
        createdAt: achievement.createdAt,
      })
      .from(achievement)
      .orderBy(desc(achievement.points));

    return achievements;
  }
}
