import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'db';
import { company, companyToInterest, interest } from 'db/schema';
import { eq } from 'drizzle-orm';

import {
  CreateInterestDto,
  InterestDto,
  UpdateCompanyInterestsDto,
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

  async getForSponsor(companyId: number) {
    const allInterests = await db
      .select({
        id: interest.id,
        theme: interest.theme,
        name: interest.name,
      })
      .from(interest);

    const sponsorInterests = await db
      .select({
        id: companyToInterest.interestId,
      })
      .from(companyToInterest)
      .where(eq(companyToInterest.companyId, companyId));

    const response = allInterests.map((interest) => ({
      ...interest,
      isActive: sponsorInterests.some((si) => si.id === interest.id),
    }));

    return response;
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
        boothLocation: company.boothLocation,
        codeId: company.codeId,
      })
      .from(companyToInterest)
      .rightJoin(company, eq(companyToInterest.interestId, company.id))
      .where(eq(companyToInterest.interestId, interestId));

    return companies;
  }

  async updateCompanyInterests(
    companyId: number,
    data: UpdateCompanyInterestsDto,
  ) {
    const { ids } = data;

    await db
      .delete(companyToInterest)
      .where(eq(companyToInterest.companyId, companyId));

    const newInterests = ids.map((interestId) => ({
      companyId,
      interestId,
    }));

    if (ids.length) await db.insert(companyToInterest).values(newInterests);

    return newInterests;
  }

  async getCompanyInterests(companyId: number) {
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
}
