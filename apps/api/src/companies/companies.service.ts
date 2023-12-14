import { SponsorCategory } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { company } from 'db/schema';
import { eq } from 'drizzle-orm';

import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';

@Injectable()
export class CompaniesService {
  async create(createCompanyDto: CreateCompanyDto) {
    const createdComapny = await db
      .insert(company)
      .values({
        name: createCompanyDto.name,
        description: createCompanyDto.description,
        sponsorCategory: createCompanyDto.sponsorCategory as SponsorCategory,
        websiteUrl: createCompanyDto.websiteUrl,
        boothLocation: createCompanyDto.boothLocation,
        codeId: createCompanyDto.codeId,
      })
      .returning();

    return createdComapny;
  }

  async getAll() {
    const companies = await db
      .select({
        id: company.id,
        name: company.name,
        description: company.description,
        sponsorCategory: company.sponsorCategory,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
        codeId: company.codeId,
      })
      .from(company)
      .orderBy(company.name);

    return companies;
  }

  async getOne(id: number) {
    const companyToGet = await db
      .select({
        id: company.id,
        name: company.name,
        description: company.description,
        sponsorCategory: company.sponsorCategory,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
        codeId: company.codeId,
      })
      .from(company)
      .where(eq(company.id, id));

    return companyToGet;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const updatedCompany = await db
      .update(company)
      .set({
        name: updateCompanyDto.name,
        description: updateCompanyDto.description,
        sponsorCategory: updateCompanyDto.sponsorCategory as SponsorCategory,
        websiteUrl: updateCompanyDto.websiteUrl,
        boothLocation: updateCompanyDto.boothLocation,
        codeId: updateCompanyDto.codeId,
      })
      .where(eq(company.id, id))
      .returning();

    return updatedCompany;
  }

  async remove(id: number) {
    const deletedCompany = await db
      .delete(company)
      .where(eq(company.id, id))
      .returning();

    return deletedCompany;
  }
}
