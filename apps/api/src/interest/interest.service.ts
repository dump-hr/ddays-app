import { InterestDto, InterestModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { companyToInterest, interest } from 'db/schema';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class InterestService {
  async connectToCompany(
    companyId: number,
    interestIds: number[],
  ): Promise<InterestDto[]> {
    if (!interestIds || !interestIds.length) {
      return [];
    }

    // TODO: throw error when some interestIds don't exist
    const interests = await db
      .select()
      .from(companyToInterest)
      .where(eq(companyToInterest.companyId, companyId));

    const interestIdsToRemove = interests
      .filter((interest) => !interestIds.includes(interest.interestId))
      .map((interest) => interest.interestId);

    const interestIdsToAdd = interestIds.filter(
      (interestId) =>
        !interests.map((interest) => interest.interestId).includes(interestId),
    );

    const interestsToAdd = interestIdsToAdd.map((interestId) => ({
      companyId,
      interestId,
    }));

    // TODO: stavit u db transakciju

    if (interestIdsToRemove.length > 0) {
      await db
        .delete(companyToInterest)
        .where(inArray(companyToInterest.interestId, interestIdsToRemove));
    }

    if (interestsToAdd.length > 0) {
      await db.insert(companyToInterest).values(interestsToAdd);
    }

    return this.getForCompany(companyId);
  }

  async create(dto: InterestModifyDto): Promise<InterestDto> {
    const [createdInterest] = await db.insert(interest).values(dto).returning();

    return createdInterest;
  }

  async getAll(): Promise<InterestDto[]> {
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

  async getForCompany(companyId: number): Promise<InterestDto[]> {
    const interests = await db
      .select({
        id: interest.id,
        name: interest.name,
        theme: interest.theme,
      })
      .from(companyToInterest)
      .rightJoin(interest, eq(companyToInterest.interestId, interest.id))
      .where(eq(companyToInterest.companyId, companyId));

    return interests;
  }

  async remove(id: number): Promise<InterestDto> {
    const [removedInterest] = await db
      .delete(interest)
      .where(eq(interest.id, id))
      .returning();

    return removedInterest;
  }

  async update(id: number, dto: InterestModifyDto): Promise<InterestDto> {
    const [updatedInterest] = await db
      .update(interest)
      .set(dto)
      .where(eq(interest.id, id))
      .returning();

    return updatedInterest;
  }
}
