import { FormSteps, SponsorCategory, StepStatus } from '@ddays-app/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from 'db';
import { code, company, companyInterests } from 'db/schema';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { BlobService } from 'src/blob/blob.service';

import {
  CompanyDetailsDto,
  CompanyDto,
  CreateCompanyDto,
  SponsorDescriptionDto,
  UpdateCompanyDto,
  UpdateSponsorDescriptionDto,
} from './companies.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly blobService: BlobService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const generatedPassword = Math.random().toString(36).slice(-8);

    const generatedCode = await this.generateCodeForCompany(createCompanyDto);

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
        codeId: generatedCode[0].id,
      })
      .returning();

    const numericalInterests = createCompanyDto.interests.map(
      (interest) => +interest,
    );

    await this.setInterests(createdComapny[0].id, numericalInterests);

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
        url: company.websiteUrl,
        email: company.email,
      })
      .from(company)
      .orderBy(company.name);

    return companies;
  }

  async generateCodeForCompany(company: CreateCompanyDto) {
    const codeValue = Math.random().toString(36).slice(-8);
    const newCode = {
      value: codeValue,
      description: `Code for ${company.name}`,
      points: 0, //TODO: Set this for later and other required things
      isSingleUse: false,
      isActive: true,
    };

    const createdCode = await db.insert(code).values(newCode).returning();

    return createdCode;
  }

  async getOne(id: number): Promise<CompanyDetailsDto | undefined> {
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
        companyVideo: company.companyVideo,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
      })
      .from(company)
      .where(eq(company.id, id));

    if (!companyToGet.length) throw new NotFoundException('Company not found');

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
      })
      .where(eq(company.id, id))
      .returning();

    const numericalInterests = updateCompanyDto.interests.map(
      (interest) => +interest,
    );

    await this.setInterests(updatedCompany[0].id, numericalInterests);

    return updatedCompany;
  }

  async remove(id: number) {
    const removedCompany = await db
      .delete(company)
      .where(eq(company.id, id))
      .returning();

    return removedCompany;
  }

  async getDescription(companyId: number): Promise<SponsorDescriptionDto> {
    const description = await db
      .select({
        description: company.description,
      })
      .from(company)
      .where(eq(company.id, companyId));

    return description[0] ?? null;
  }

  private validateWordCount(str: string, limit: number, deviation: number) {
    const lowerBound = limit - deviation;
    const upperBound = limit + deviation;

    const wc = str.match(/\S+/g)?.length || 0;

    return wc >= lowerBound && wc <= upperBound;
  }

  async updateDescription(
    companyId: number,
    { description }: UpdateSponsorDescriptionDto,
  ) {
    if (!this.validateWordCount(description, 70, 5)) {
      throw new BadRequestException('Description text out of bounds');
    }

    const updatedCompany = await db
      .update(company)
      .set({
        description,
      })
      .where(eq(company.id, companyId))
      .returning();

    return updatedCompany[0] ?? null;
  }

  async addLogo(id: number, file: Express.Multer.File) {
    const imageUrl = await this.blobService.upload(
      'companies-logos',
      file.filename,
      file.buffer,
      file.mimetype,
    );

    const addedLogo = await db
      .update(company)
      .set({
        logoImage: imageUrl,
      })
      .where(eq(company.id, id))
      .returning();

    return addedLogo;
  }

  async addVideo(id: number, file: Express.Multer.File) {
    const videoUrl = await this.blobService.upload(
      'companies-videos',
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    const addedVideo = await db
      .update(company)
      .set({
        companyVideo: videoUrl,
      })
      .where(eq(company.id, id))
      .returning();

    return addedVideo;
  }

  async addLandingImage(id: number, file: Express.Multer.File) {
    const imageUrl = await this.blobService.upload(
      'companies-landing-images',
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    const addedLandingImage = await db
      .update(company)
      .set({
        landingImage: imageUrl,
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
    //TODO: implement error handling for ids that do not extistž
    console.log(interestIds, companyId);

    if (!interestIds) {
      return;
    }

    const interests = await db
      .select()
      .from(companyInterests)
      .where(eq(companyInterests.companyId, companyId));

    const interestsToRemove = interests
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

    if (interestsToRemove.length)
      await db
        .delete(companyInterests)
        .where(inArray(companyInterests.interestId, interestsToRemove));

    if (interestsToAdd.length)
      await db.insert(companyInterests).values(interestsToAdd);
  }

  async toggleInterest(companyId: number, interestId: number) {
    const interestExists = await this.interestExists(companyId, interestId);

    const action = interestExists
      ? await this.removeInterest(companyId, interestId)
      : await this.addInterest(companyId, interestId);

    return action;
  }

  async getSponsorFormStatus(companyId: number) {
    const company = await this.getOne(companyId);
    const status = {};

    status[FormSteps.Description] = company?.description.length
      ? StepStatus.Good
      : StepStatus.Pending;

    const {
      0: { count: interestsCount },
    } = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(companyInterests)
      .where(eq(companyInterests.companyId, companyId));

    status[FormSteps.Interests] = interestsCount
      ? StepStatus.Good
      : StepStatus.Pending;

    status[FormSteps.Logo] = StepStatus.Pending;
    status[FormSteps.Photos] = StepStatus.Pending;
    status[FormSteps.Videos] =
      !!company.companyVideo && company.companyVideo !== ''
        ? StepStatus.Good
        : StepStatus.Pending;
    status[FormSteps.Jobs] = StepStatus.Pending;
    status[FormSteps.SwagBag] = StepStatus.Pending;

    return { status };
  }
}
