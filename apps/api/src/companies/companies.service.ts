import { SponsorCategory } from '@ddays-app/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'db';
import {
  company,
  companyInterests,
  companyInterests,
  interest,
} from 'db/schema';
import { and, eq, inArray } from 'drizzle-orm';

import {
  AddSponsorDescriptionDto,
  AddSponsorLandingImageDto,
  AddSponsorLogoDto,
  AddSponsorVideoDto,
  CompanyDto,
  CreateCompanyDto,
  UpdateCompanyDto,
} from './companies.dto';

@Injectable()
export class CompaniesService {
  async create(createCompanyDto: CreateCompanyDto) {
    const generatedPassword = Math.random().toString(36).slice(-8);

    const createdComapny = await db
      .insert(company)
      .values({
        email: createCompanyDto.email,
        password: generatedPassword,
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

  async getAll(): Promise<CompanyDto[]> {
    //TODO: Implement backend mapping and fix drizzle bugs
    const companies = await db
      .select({
        id: company.id,
        name: company.name,
        description: company.description,
        sponsorCategory: company.sponsorCategory,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
        codeId: company.codeId,
        url: company.websiteUrl,
        email: company.email,
      })
      .from(company)
      .orderBy(company.name);

    return companies;
  }

  async getOne(id: number): Promise<CompanyDto | undefined> {
    const companyToGet = await db
      .select({
        id: company.id,
        name: company.name,
        description: company.description,
        sponsorCategory: company.sponsorCategory,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
        codeId: company.codeId,
        email: company.email,
        url: company.websiteUrl,
      })
      .from(company)
      .where(eq(company.id, id));

    return companyToGet[0];
  }

  async getOneByEmail(email: string): Promise<CompanyDto | undefined> {
    const companyToGet = await db
      .select({
        id: company.id,
        name: company.name,
        description: company.description,
        sponsorCategory: company.sponsorCategory,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
        codeId: company.codeId,
        email: company.email,
        url: company.websiteUrl,
      })
      .from(company)
      .where(eq(company.email, email));

    return companyToGet[0];
  }

  async login(email: string, password: string) {
    const companyToLogin = await db
      .select({
        id: company.id,
        name: company.name,
        password: company.password,
      })
      .from(company)
      .where(eq(company.email, email))
      .limit(1);

    if (!companyToLogin.length) {
      throw new NotFoundException('Company not found');
    }

    const passwordMatch = password === companyToLogin[0].password;

    return passwordMatch && companyToLogin[0];
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
    const removedCompany = await db
      .delete(company)
      .where(eq(company.id, id))
      .returning();

    return removedCompany;
  }

  async addDescription(
    id: number,
    addSponsorDescriptionDto: AddSponsorDescriptionDto,
  ) {
    const addedDescription = await db
      .update(company)
      .set({
        description: addSponsorDescriptionDto.description,
      })
      .where(eq(company.id, id))
      .returning();

    return addedDescription;
  }

  async addLogo(id: number, addSponsorLogoDto: AddSponsorLogoDto) {
    const addedLogo = await db
      .update(company)
      .set({
        logoImage: addSponsorLogoDto.imageUrl,
      })
      .where(eq(company.id, id))
      .returning();

    return addedLogo;
  }

  async addVideo(id: number, addSponsorVideoDto: AddSponsorVideoDto) {
    const addedVideo = await db
      .update(company)
      .set({
        companyVideo: addSponsorVideoDto.videoUrl,
      })
      .where(eq(company.id, id))
      .returning();

    return addedVideo;
  }

  async addLandingImage(
    id: number,
    addSponsorLandingImageDto: AddSponsorLandingImageDto,
  ) {
    const addedLandingImage = await db
      .update(company)
      .set({
        landingImage: addSponsorLandingImageDto.imageUrl,
      })
      .where(eq(company.id, id))
      .returning();

    return addedLandingImage;
  }

  async removeDescription(id: number) {
    const removedDescription = await db
      .update(company)
      .set({
        description: null,
      })
      .where(eq(company.id, id))
      .returning();

    return removedDescription;
  }

  async removeLogo(id: number) {
    const removedLogo = await db
      .update(company)
      .set({
        logoImage: null,
      })
      .where(eq(company.id, id))
      .returning();

    return removedLogo;
  }

  async removeVideo(id: number) {
    const removedVideo = await db
      .update(company)
      .set({
        companyVideo: null,
      })
      .where(eq(company.id, id))
      .returning();

    return removedVideo;
  }

  async removeLandingImage(id: number) {
    const removedLandingImage = await db
      .update(company)
      .set({
        landingImage: null,
      })
      .where(eq(company.id, id))
      .returning();

    return removedLandingImage;
  }

  async addInterest(companyId: number, interestId: number) {
    const addedInterest = await db
      .insert(companyInterests)
      .values({
        interestId: interestId,
        companyId: companyId,
      })
      .returning();

    return addedInterest;
  }

  async removeInterest(companyId: number, interestId: number) {
    const removedInterest = await db
      .delete(companyInterests)
      .where(
        and(
          eq(companyInterests.companyId, companyId),
          eq(companyInterests.interestId, interestId),
        ),
      )
      .returning();

    return removedInterest;
  }

  async interestExists(companyId: number, interestId: number) {
    const interest = await db
      .select()
      .from(companyInterests)
      .where(
        and(
          eq(companyInterests.companyId, companyId),
          eq(companyInterests.interestId, interestId),
        ),
      );

    return interest.length > 0;
  }

  async setInterests(companyId: number, interestIds: number[]) {
    const interests = await db
      .select()
      .from(companyInterests)
      .where(eq(companyInterests.companyId, companyId));

    const interestsToRemove = interests.filter(
      (interest) => !interestIds.includes(interest.interestId),
    );

    const interestIdsToAdd = interestIds.filter(
      (interestId) =>
        !interests.map((interest) => interest.interestId).includes(interestId),
    );

    const interestsToAdd = interestIdsToAdd.map((interestId) => ({
      companyId,
      interestId,
    }));

    await db
      .delete(companyInterests)
      .where(inArray(companyInterests, interestsToRemove));

    await db.insert(companyInterests).values(interestsToAdd);
  }

  async toggleInterest(companyId: number, interestId: number) {
    const interestExists = await this.interestExists(companyId, interestId);

    const action = interestExists
      ? await this.removeInterest(companyId, interestId)
      : await this.addInterest(companyId, interestId);

    return action;
  }

  async getInterests(companyId: number) {}
}
