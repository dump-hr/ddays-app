import { FormSteps, SponsorCategory, StepStatus } from '@ddays-app/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { db } from 'db';
import { company, companyInterests, interest } from 'db/schema';
import { and, eq } from 'drizzle-orm';
import { BlobService } from 'src/blob/blob.service';

import {
  AddSponsorLandingImageDto,
  AddSponsorLogoDto,
  AddSponsorVideoDto,
  CreateCompanyDto,
  SponsorDescriptionDto,
  UpdateCompanyDto,
  UpdateSponsorDescriptionDto,
} from './companies.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly blobService: BlobService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const createdComapny = await db
      .insert(company)
      .values({
        email: createCompanyDto.email,
        password: await bcrypt.hash(createCompanyDto.password, 10),
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
        email: company.email,
      })
      .from(company)
      .where(eq(company.id, id));

    return companyToGet[0] ?? null;
  }

  async getOneByEmail(email: string) {
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
      .where(eq(company.email, email));

    return companyToGet;
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
      file.filename,
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

  async toggleInterest(companyId: number, interestId: number) {
    const interestExists = await this.interestExists(companyId, interestId);

    const action = interestExists
      ? await this.removeInterest(companyId, interestId)
      : await this.addInterest(companyId, interestId);

    return action;
  }

  async getInterests(companyId: number) {
    const interests = await db
      .select({
        id: interest.id,
        name: interest.name,
        theme: interest.theme,
      })
      .from(companyInterests)
      .rightJoin(interest, eq(companyInterests.interestId, interest.id))
      .where(eq(companyInterests.companyId, companyId));

    return interests;
  }

  async getSponsorFormStatus(companyId: number) {
    const company = await this.getOne(companyId);
    console.log(company);
    const status = {};

    status[FormSteps.Description] = company?.description.length
      ? StepStatus.Good
      : StepStatus.Pending;

    status[FormSteps.Logo] = StepStatus.Pending;
    status[FormSteps.Photos] = StepStatus.Pending;
    status[FormSteps.Videos] = StepStatus.Pending;
    status[FormSteps.Jobs] = StepStatus.Pending;
    status[FormSteps.Interests] = StepStatus.Good;
    status[FormSteps.SwagBag] = StepStatus.Pending;

    return { status };
  }
}
