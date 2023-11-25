import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { achievement } from 'db/schema';
import { desc } from 'drizzle-orm';

@Injectable()
export class AchievementService {
  async getAll() {
    const achievements = await db
      .select({
        name: achievement.name,
        description: achievement.description,
        points: achievement.points,
      })
      .from(achievement)
      .orderBy(desc(achievement.points));

    return achievements;
  }

  async create() {
    const createdAchievement = await db
      .insert(achievement)
      .values({
        name: 'test',
        description: 'test',
        fulfillmentCodeCount: 0,
        points: 0,
      })
      .returning();

    return createdAchievement;
  }
}
