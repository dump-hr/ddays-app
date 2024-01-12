import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'db';
import { company, companyInterests, interest } from 'db/schema';
import { eq } from 'drizzle-orm';

import {
  CreateInterestDto,
  InterestDto,
  UpdateInterestDto,
} from './interests.dto';

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

  async getOne(id: number): Promise<InterestDto> {
    const interestToFind = await db
      .select({
        name: interest.name,
        theme: interest.theme,
        id: interest.id,
      })
      .from(interest)
      .where(eq(interest.id, id));

    if (!interestToFind.length) throw new NotFoundException();

    return interestToFind[0];
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

  async getCompanies(interestId: number) {
    const companies = await db
      .select({
        id: company.id,
        name: company.name,
        logo: company.logoImage,
        description: company.description,
        website: company.websiteUrl,
        email: company.email,
        boothLocation: company.boothLocation,
        codeId: company.codeId,
      })
      .from(companyInterests)
      .rightJoin(company, eq(companyInterests.interestId, company.id))
      .where(eq(companyInterests.interestId, interestId));

    return companies;
  }
}
