import {
  CompanyDto,
  CompanyModifyDto,
  CompanyPublicDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { company } from 'db/schema';
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

    const [createdComapny] = await db
      .insert(company)
      .values({
        ...dto,
        password: generatedPassword,
      })
      .returning();

    const interests = await this.interestService.connectToCompany(
      createdComapny.id,
      dto.interestIds,
    );

    return { ...createdComapny, interests };
  }

  async getAllPublic(): Promise<CompanyPublicDto[]> {
    const companies = await db
      .select({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        video: company.video,
      })
      .from(company)
      .orderBy(company.name);

    return companies;
  }

  async getOne(id: number): Promise<CompanyDto> {
    const [foundCompany] = await db
      .select()
      .from(company)
      .where(eq(company.id, id));

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
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        video: company.video,
      })
      .from(company)
      .where(eq(company.id, id));

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

  async removeLogo(id: number): Promise<void> {
    await db
      .update(company)
      .set({
        logoImage: null,
      })
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
        websiteUrl: dto.websiteUrl,
        boothLocation: dto.boothLocation,
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
    description: string,
  ): Promise<CompanyPublicDto> {
    const [updatedCompany] = await db
      .update(company)
      .set({
        description,
      })
      .where(eq(company.id, companyId))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
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
    const imageUrl = await this.blobService.upload(
      'company-landing-image',
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    const [updatedCompany] = await db
      .update(company)
      .set({
        landingImage: imageUrl,
      })
      .where(eq(company.id, id))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        video: company.video,
      });

    return updatedCompany;
  }

  async updateLogo(
    id: number,
    file: Express.Multer.File,
  ): Promise<CompanyPublicDto> {
    const imageUrl = await this.blobService.upload(
      'company-logo',
      file.filename,
      file.buffer,
      file.mimetype,
    );

    const [updatedCompany] = await db
      .update(company)
      .set({
        logoImage: imageUrl,
      })
      .where(eq(company.id, id))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
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
    const videoUrl = await this.blobService.upload(
      'company-video',
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    const [updatedCompany] = await db
      .update(company)
      .set({
        video: videoUrl,
      })
      .where(eq(company.id, id))
      .returning({
        id: company.id,
        category: company.category,
        name: company.name,
        description: company.description,
        websiteUrl: company.websiteUrl,
        boothLocation: company.boothLocation,
        logoImage: company.logoImage,
        landingImage: company.landingImage,
        video: company.video,
      });

    return updatedCompany;
  }
}