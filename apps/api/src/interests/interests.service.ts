import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { interest } from 'db/schema';
import { eq } from 'drizzle-orm';

import { CreateInterestDto, UpdateInterestDto } from './interests.dto';

@Injectable()
export class InterestsService {
  async create(createInterestDto: CreateInterestDto) {
    const createdInterest = await db
      .insert(interest)
      .values({
        name: createInterestDto.name,
        theme: createInterestDto.theme,
      })
      .returning();

    return createdInterest;
  }

  async getAll() {
    const interests = await db
      .select({
        id: interest.id,
        name: interest.name,
        theme: interest.theme,
      })
      .from(interest)
      .orderBy(interest.name);

    return interests;
  }

  async getOne(id: number) {
    const interestToFind = await db
      .select({
        name: interest.name,
        theme: interest.theme,
        id: interest.id,
      })
      .from(interest)
      .where(eq(interest.id, id));

    return interestToFind;
  }

  async update(id: number, updateInterestDto: UpdateInterestDto) {
    const updatedInterest = await db
      .update(interest)
      .set({
        name: updateInterestDto.name,
        theme: updateInterestDto.theme,
      })
      .where(eq(interest.id, id))
      .returning();

    return updatedInterest;
  }

  async remove(id: number) {
    const deletedUser = await db
      .delete(interest)
      .where(eq(interest.id, id))
      .returning();

    return deletedUser;
  }
}
