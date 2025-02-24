import {
  CompanyCategory,
  CompanyDto,
  CompanyModifyDescriptionDto,
  CompanyModifyDto,
  CompanyPublicDto,
} from '@ddays-app/types';
import { Injectable, NotFoundException } from '@nestjs/common';
<<<<<<< HEAD
import { db } from 'db';
import { booth, company } from 'db/schema';
import { eq, sql } from 'drizzle-orm';
=======
>>>>>>> main
import { BlobService } from 'src/blob/blob.service';
import { InterestService } from 'src/interest/interest.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blobService: BlobService,
    private readonly interestService: InterestService,
  ) {}

  async create(dto: CompanyModifyDto): Promise<CompanyDto> {
    const generatedPassword = Math.random().toString(36).slice(-8);

    const createdCompany = await this.prisma.company.create({
      data: {
        ...{ ...dto, interestIds: undefined },
        password: generatedPassword,
      },
    });

    const interests = await this.interestService.connectToCompany(
      createdCompany.id,
      dto.interestIds,
    );

    return { ...createdCompany, interests };
  }

  async getAllPublic(): Promise<CompanyPublicDto[]> {
    const companies = await this.prisma.company.findMany({
      include: {
        booth: {
          select: { name: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return companies.map((company) => ({
      ...company,
      booth: company.booth?.name || null,
    }));
  }

  async getTopRatedCompanies(): Promise<CompanyPublicDto[]> {
    const companies = await db.execute(
      sql`
     SELECT
       c.id,
       c.category,
       c.name,
       c.description,
       c.opportunities_description,
       c.website_url,
       c.instagram_url,
       c.linkedin_url,
       b.name AS booth,
       COALESCE(AVG((r.grades->>'value')::NUMERIC), 0) AS average_rating
     FROM company c
     INNER JOIN booth b ON b.company_id = c.id
     LEFT JOIN rating r ON r.booth_id = b.id
     GROUP BY
       c.id, b.id
     ORDER BY average_rating DESC
     LIMIT 5
   `,
    );

    return companies.map((row) => ({
      id: Number(row.id),
      category: row.category as CompanyCategory,
      name: String(row.name),
      description: String(row.description),
      opportunitiesDescription: String(row.opportunities_description),
      website: String(row.website_url),
      instagram: String(row.instagram_url),
      linkedin: String(row.linkedin_url),
      booth: String(row.booth),
      averageRating: parseFloat(String(row.average_rating)),
    }));
  }

  async getOne(id: number): Promise<CompanyDto> {
    const foundCompany = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!foundCompany) {
      throw new NotFoundException('Company not found');
    }

    const interests = await this.interestService.getForCompany(id);

    return { ...foundCompany, interests };
  }

  async getOnePublic(id: number): Promise<CompanyPublicDto> {
    const foundCompany = await this.prisma.company.findUnique({
      where: { id },
      include: {
        booth: { select: { name: true } },
      },
    });

    if (!foundCompany) {
      throw new NotFoundException('Company not found');
    }

    const interests = await this.interestService.getForCompany(id);

    return {
      ...foundCompany,
      booth: foundCompany.booth?.name || null,
      interests,
    };
  }

  async remove(id: number): Promise<CompanyDto> {
    const removedCompany = await this.prisma.company.delete({
      where: { id },
    });

    return removedCompany;
  }

  async removeLandingImage(id: number): Promise<void> {
    await this.prisma.company.update({
      where: { id },
      data: { landingImage: null },
    });
  }

  async removeLandingImageCompanyCulture(id: number): Promise<void> {
    await this.prisma.company.update({
      where: { id },
      data: { landingImageCompanyCulture: null },
    });
  }

  async removeLogoImage(id: number): Promise<void> {
    await this.prisma.company.update({
      where: { id },
      data: { logoImage: null },
    });
  }

  async removeBookOfStandards(id: number): Promise<void> {
    await this.prisma.company.update({
      where: { id },
      data: { bookOfStandards: null },
    });
  }

  async removeVideo(id: number): Promise<void> {
    await this.prisma.company.update({
      where: { id },
      data: { video: null },
    });
  }

  async update(id: number, dto: CompanyModifyDto): Promise<CompanyDto> {
    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: {
        category: dto.category,
        name: dto.name,
        username: dto.username,
        description: dto.description,
        websiteUrl: dto.websiteUrl,
        instagramUrl: dto.instagramUrl,
        linkedinUrl: dto.linkedinUrl,
        codeId: dto.codeId,
      },
    });

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
    const updatedCompany = await this.prisma.company.update({
      where: { id: companyId },
      data: {
        description: data.description,
        websiteUrl: data.websiteUrl,
        instagramUrl: data.instagramUrl,
        linkedinUrl: data.linkedinUrl,
        opportunitiesDescription: data.opportunitiesDescription,
      },
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

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: { landingImage },
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

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: { landingImageCompanyCulture },
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

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: { bookOfStandards },
    });

    return updatedCompany;
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

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: { logoImage },
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

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: { video },
    });

    return updatedCompany;
  }
}
