import {
  CompanyDto,
  CompanyModifyDescriptionDto,
  CompanyModifyDto,
  CompanyPublicDto,
} from '@ddays-app/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'db';
import { booth, company } from 'db/schema';
import { eq } from 'drizzle-orm';
import { BlobService } from 'src/blob/blob.service';
import { InterestService } from 'src/interest/interest.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly blobService: BlobService,
    private readonly interestService: InterestService,
  ) {}

  async create(dto: CompanyModifyDto): Promise<CompanyDto> {
    const generatedPassword = Math.random().toString(36).slice(-8);

    const [createdCompany] = await db
      .insert(company)
      .values({
        ...dto,
        password: generatedPassword,
      })
      .returning();

    const interests = await this.interestService.connectToCompany(
      createdCompany.id,
      dto.interestIds,
    );

    return { ...createdCompany, interests };
  }

  async getAllPublic(): Promise<CompanyPublicDto[]> {
    const companies = await db
      .select({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        opportunitiesDescription: company.opportunitiesDescription,
        website: company.website,
        instagram: company.instagram,
        linkedin: company.linkedin,
        booth: booth.name,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        landingImageCompanyCulture: company.landingImageCompanyCulture,
        video: company.video,
      })
      .from(company)
      .leftJoin(booth, eq(booth.companyId, company.id))
      .orderBy(company.name);

    return companies;
  }

  async getOne(id: number): Promise<CompanyDto> {
    const [foundCompany] = await db
      .select({
        id: company.id,
        category: company.category,
        name: company.name,
        username: company.username,
        description: company.description,
        opportunitiesDescription: company.opportunitiesDescription,
        website: company.website,
        instagram: company.instagram,
        linkedin: company.linkedin,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        landingImageCompanyCulture: company.landingImageCompanyCulture,
        bookOfStandards: company.bookOfStandards,
        video: company.video,
        password: company.password,
      })
      .from(company)
      .where(eq(company.id, id));

    if (!foundCompany) {
      throw new NotFoundException('Company not found');
    }

    const interests = await this.interestService.getForCompany(id);

    return { ...foundCompany, interests };
  }

  async getOnePublic(id: number): Promise<CompanyPublicDto> {
    const [foundCompany] = await db
      .select({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        opportunitiesDescription: company.opportunitiesDescription,
        website: company.website,
        instagram: company.instagram,
        linkedin: company.linkedin,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        landingImageCompanyCulture: company.landingImageCompanyCulture,
        bookOfStandards: company.bookOfStandards,
        video: company.video,
        booth: booth.name,
      })
      .from(company)
      .leftJoin(booth, eq(booth.companyId, id))
      .where(eq(company.id, id));

    if (!foundCompany) {
      throw new NotFoundException('Company not found');
    }

    const interests = await this.interestService.getForCompany(id);

    return { ...foundCompany, interests };
  }

  async remove(id: number): Promise<CompanyDto> {
    const [removedCompany] = await db
      .delete(company)
      .where(eq(company.id, id))
      .returning();

    return removedCompany;
  }

  async removeLandingImage(id: number): Promise<void> {
    await db
      .update(company)
      .set({
        landingImage: null,
      })
      .where(eq(company.id, id));
  }

  async removeLandingImageCompanyCulture(id: number): Promise<void> {
    await db
      .update(company)
      .set({ landingImageCompanyCulture: null })
      .where(eq(company.id, id));
  }

  async removeLogoImage(id: number): Promise<void> {
    await db
      .update(company)
      .set({
        logoImage: null,
      })
      .where(eq(company.id, id));
  }

  async removeBookOfStandards(id: number): Promise<void> {
    await db
      .update(company)
      .set({ bookOfStandards: null })
      .where(eq(company.id, id));
  }

  async removeVideo(id: number): Promise<void> {
    await db
      .update(company)
      .set({
        video: null,
      })
      .where(eq(company.id, id));
  }

  async update(id: number, dto: CompanyModifyDto): Promise<CompanyDto> {
    const [updatedCompany] = await db
      .update(company)
      .set({
        category: dto.category,
        name: dto.name,
        username: dto.username,
        description: dto.description,
        website: dto.website,
        instagram: dto.instagram,
        linkedin: dto.linkedin,
        codeId: dto.codeId,
      })
      .where(eq(company.id, id))
      .returning();

    const interests = await this.interestService.connectToCompany(
      id,
      dto.interestIds,
    );

    return { ...updatedCompany, interests };
  }

  async updateDescription(
    companyId: number,
    data: CompanyModifyDescriptionDto,
  ): Promise<CompanyPublicDto> {
    const [updatedCompany] = await db
      .update(company)
      .set({
        description: data.description,
        website: data.website,
        instagram: data.instagram,
        linkedin: data.linkedin,
        opportunitiesDescription: data.opportunitiesDescription,
      })
      .where(eq(company.id, companyId))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        opportunitiesDescription: company.opportunitiesDescription,
        website: company.website,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        video: company.video,
      });

    return updatedCompany;
  }

  async updateLandingImage(
    id: number,
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    const landingImage = await this.blobService.upload(
      'company-landing-image',
      file.buffer,
      file.mimetype,
    );

    const [updatedCompany] = await db
      .update(company)
      .set({
        landingImage,
      })
      .where(eq(company.id, id))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        opportunitiesDescription: company.opportunitiesDescription,
        website: company.website,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        video: company.video,
      });

    return updatedCompany;
  }

  async updateLandingImageCompanyCulture(
    id: number,
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    const landingImageCompanyCulture = await this.blobService.upload(
      'company-landing-image-company-culture',
      file.buffer,
      file.mimetype,
    );

    const [updatedCompany] = await db
      .update(company)
      .set({
        landingImageCompanyCulture,
      })
      .where(eq(company.id, id))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        opportunitiesDescription: company.opportunitiesDescription,
        website: company.website,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        landingImageCompanyCulture: company.landingImageCompanyCulture,
        video: company.video,
      });

    return updatedCompany;
  }

  async updateBookOfStandards(
    id: number,
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    const bookOfStandards = await this.blobService.upload(
      'book-of-standards',
      file.buffer,
      file.mimetype,
    );

    const [updatedBookOfStandards] = await db
      .update(company)
      .set({
        bookOfStandards,
      })
      .where(eq(company.id, id))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        opportunitiesDescription: company.opportunitiesDescription,
        website: company.website,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        landingImageCompanyCulture: company.landingImageCompanyCulture,
        bookOfStandards: company.bookOfStandards,
        video: company.video,
      });

    return updatedBookOfStandards;
  }

  async updateLogoImage(
    id: number,
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    const logoImage = await this.blobService.upload(
      'company-logo',
      file.buffer,
      file.mimetype,
    );

    const [updatedCompany] = await db
      .update(company)
      .set({
        logoImage,
      })
      .where(eq(company.id, id))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        opportunitiesDescription: company.opportunitiesDescription,
        website: company.website,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        video: company.video,
      });

    return updatedCompany;
  }

  async updateVideo(
    id: number,
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    const video = await this.blobService.upload(
      'company-video',
      file.buffer,
      file.mimetype,
    );

    const [updatedCompany] = await db
      .update(company)
      .set({
        video,
      })
      .where(eq(company.id, id))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        opportunitiesDescription: company.opportunitiesDescription,
        website: company.website,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        video: company.video,
      });

    return updatedCompany;
  }
}
