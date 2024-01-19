import {
  InterestConnectToCompanyDto,
  InterestDto,
  InterestModifyDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { companyToInterest, interest } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class InterestService {
  async connectToCompany(
    companyId: number,
    { interestIds }: InterestConnectToCompanyDto,
  ): Promise<void> {
    // TODO: optimize so we only delete unused and insert new interests
    await db
      .delete(companyToInterest)
      .where(eq(companyToInterest.companyId, companyId));

    const newInterests = interestIds.map((interestId) => ({
      companyId,
      interestId,
    }));

    if (interestIds.length)
      await db.insert(companyToInterest).values(newInterests);
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
