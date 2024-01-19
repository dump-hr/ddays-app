import { AchievementCreateReqDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { achievement } from 'db/schema';
import { desc } from 'drizzle-orm';

@Injectable()
export class AchievementService {
  async getAll() {
    const achievements = await db
      .select()
      .from(achievement)
      .orderBy(desc(achievement.points));

    return achievements;
  }

  async create(body: AchievementCreateReqDto) {
    const [createdAchievement] = await db
      .insert(achievement)
      .values(body)
      .returning();

    return createdAchievement;
  }
}
