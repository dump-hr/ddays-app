import {
  CompanyDto,
  CompanyModifyDescriptionDto,
  CompanyModifyDto,
  CompanyModifyFlyTalkHoldersDto,
  CompanyPublicDto,
  FloorPlanCompanyDto,
} from '@ddays-app/types';
import { UserToCompanyDto } from '@ddays-app/types/src/dto/user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { BlobService } from 'src/blob/blob.service';
import { InterestService } from 'src/interest/interest.service';
import { PrismaService } from 'src/prisma.service';
import { RatingService } from 'src/rating/rating.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blobService: BlobService,
    private readonly interestService: InterestService,
    private readonly ratingService: RatingService,
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
      select: {
        id: true,
        name: true,
        username: true,
        booth: {
          select: { name: true },
        },
        password: false,
        campfireParticipation: true,
      },
      orderBy: { name: 'asc' },
    });

    return companies.map((company) => ({
      ...company,
      booth: company.booth?.name || null,
      flytalkHolders: (company.flytalkHolders as unknown as JSON) || null,
    }));
  }

  async getTopRatedCompanies(): Promise<CompanyPublicDto[]> {
    const companies = await this.prisma.company.findMany({
      where: {
        booth: {
          isNot: null, // Ensure the company has a booth
        },
      },
      include: {
        booth: {
          include: {
            rating: true,
          },
        },
      },
    });

    const companiesWithAvgRating = companies
      .map((company) => {
        const ratings = company.booth?.rating ?? [];

        if (ratings.length === 0) {
          return null; // Exclude companies with no ratings
        }

        const averageRating =
          ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;

        return {
          ...company,
          booth: company.booth?.name, // convert booth object to booth name
          averageRating,
        };
      })
      .filter(
        (company): company is typeof company & { averageRating: number } =>
          company !== null,
      );

    const topRated = companiesWithAvgRating
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    return topRated.map(({ ...company }) => ({
      ...company,
      flytalkHolders: (company.flytalkHolders as unknown as JSON) || null,
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
        booth: { select: { name: true, id: true } },
      },
    });

    if (!foundCompany) {
      throw new NotFoundException('Company not found');
    }

    const interests = await this.interestService.getForCompany(id);

    return {
      ...foundCompany,
      booth: foundCompany.booth?.name || null,
      boothId: foundCompany.booth?.id || null,
      flytalkHolders: (foundCompany.flytalkHolders as unknown as JSON) || null,
      interests,
    };
  }

  async getFlyTalks(id: number): Promise<string[]> {
    const flyTalks = await this.prisma.company.findUnique({
      where: { id },
      include: {
        companyToFlyTalk: {
          include: {
            event: {
              select: {
                startsAt: true,
              },
            },
          },
        },
      },
    });

    return flyTalks.companyToFlyTalk
      .map((rel) => rel.event.startsAt)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }

  async getApplicantsForCompany(id: number): Promise<UserToCompanyDto[]> {
    const applicants = await this.prisma.company.findUnique({
      where: { id },
      include: {
        companyToFlyTalk: {
          include: {
            event: {
              include: {
                userToEvent: {
                  select: {
                    eventId: true,
                    finallySelected: true,
                    linkedinProfile: true,
                    githubProfile: true,
                    portfolioProfile: true,
                    cv: true,
                    description: true,
                    user: {
                      select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                      },
                    },
                    CompanyToFlyTalkUser: {
                      select: {
                        selected: true,
                        companyId: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!applicants) {
      throw new NotFoundException('Applicants not found');
    }

    const users = applicants.companyToFlyTalk.flatMap((flyTalk) =>
      flyTalk.event.userToEvent.map((rel) => {
        const matchingCompany = rel.CompanyToFlyTalkUser.find(
          (entry) => entry.companyId === id,
        );

        return {
          ...rel.user,
          eventId: rel.eventId,
          date: flyTalk.event.startsAt,
          linkedinProfile: rel.linkedinProfile,
          githubProfile: rel.githubProfile,
          portfolioProfile: rel.portfolioProfile,
          cv: rel.cv,
          description: rel.description,
          selected: matchingCompany?.selected ?? false,
          finallySelected: rel.finallySelected,
        };
      }),
    );

    return users;
  }

  async selectApplicant(
    user: UserToCompanyDto,
    selected: boolean,
    companyId: number,
  ): Promise<void> {
    await this.prisma.companyToFlyTalkUser.upsert({
      where: {
        userId_eventId_companyId: {
          userId: user.id,
          eventId: user.eventId,
          companyId: companyId,
        },
      },
      update: {
        selected: selected,
      },
      create: {
        userId: user.id,
        eventId: user.eventId,
        companyId: companyId,
        selected: selected,
      },
    });
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
        codeId: dto.codeId ? dto.codeId : null,
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

    return {
      ...updatedCompany,
      flytalkHolders:
        (updatedCompany.flytalkHolders as unknown as JSON) || null,
    };
  }

  async updateFlyTalkHolders(
    companyId: number,
    data: CompanyModifyFlyTalkHoldersDto,
  ): Promise<CompanyPublicDto> {
    const updatedCompany = await this.prisma.company.update({
      where: { id: companyId },
      data: {
        flytalkParticipation: data.flytalkParticipation,
        flytalkHolders: data.flytalkHolders as unknown as InputJsonValue,
      },
    });

    return {
      ...updatedCompany,
      flytalkHolders:
        (updatedCompany.flytalkHolders as unknown as JSON) || null,
    };
  }

  async updateAccreditation(
    companyId: number,
    data: string[],
  ): Promise<CompanyPublicDto> {
    const updatedCompany = await this.prisma.company.update({
      where: { id: companyId },
      data: {
        peopleForAccreditation: data,
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

    return {
      ...updatedCompany,
      flytalkHolders:
        (updatedCompany.flytalkHolders as unknown as JSON) || null,
    };
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

    return {
      ...updatedCompany,
      flytalkHolders:
        (updatedCompany.flytalkHolders as unknown as JSON) || null,
    };
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

    return {
      ...updatedCompany,
      flytalkHolders:
        (updatedCompany.flytalkHolders as unknown as JSON) || null,
    };
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

    return {
      ...updatedCompany,
      flytalkHolders:
        (updatedCompany.flytalkHolders as unknown as JSON) || null,
    };
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

    return {
      ...updatedCompany,
      flytalkHolders:
        (updatedCompany.flytalkHolders as unknown as JSON) || null,
    };
  }

  async getFloorPlan(): Promise<FloorPlanCompanyDto[]> {
    const companies = await this.prisma.company.findMany({
      where: {
        booth: {
          isNot: null,
        },
      },
      select: {
        id: true,
        name: true,
        logoImage: true,
        booth: {
          select: {
            id: true,
            name: true,
          },
        },
        companyToInterest: {
          select: {
            interest: {
              select: {
                id: true,
                name: true,
                theme: true,
              },
            },
          },
        },
      },
    });

    const companiesWithRatings = await Promise.all(
      companies.map(async (company) => ({
        name: company.name,
        booth: company.booth?.name ?? '',
        boothId: company.booth?.id,
        logoImage: company.logoImage ?? undefined,
        interests: company.companyToInterest.map((cti) => ({
          id: cti.interest.id,
          name: cti.interest.name,
          theme: cti.interest.theme,
        })),
        boothRating: await this.ratingService.getCompanyRating(company.id),
      })),
    );

    return companiesWithRatings;
  }

  async getRecommendedCompanies(userId: number): Promise<CompanyPublicDto[]> {
    // Prvo dohvatimo korisnika s njegovim interesima
    const userInterests = (await this.interestService.getForUser(userId)) || [];

    if (userInterests.length === 0) {
      return [];
    }

    const allCompanies = await this.prisma.company.findMany({
      include: {
        booth: {
          select: { name: true, id: true },
        },
        companyToInterest: {
          include: {
            interest: true,
          },
        },
      },
    });

    const recommendedCompanies = allCompanies
      .map((company) => {
        const matchingInterests = company.companyToInterest.filter((cti) =>
          userInterests.some((ui) => ui.id === cti.interest.id),
        );
        return {
          ...company,
          matchingInterests,
        };
      })
      .filter((company) => company.matchingInterests.length > 0)
      .sort((a, b) => {
        const aScore = a.matchingInterests.length;
        const bScore = b.matchingInterests.length;

        if (bScore !== aScore) {
          return bScore - aScore; // Prvo po broju poklapanja, silazno
        }

        // Ako je score isti, sortiraj po manjem ukupnom broju interesa (uzlazno)
        const aTotal = a.companyToInterest.length;
        const bTotal = b.companyToInterest.length;

        return aTotal - bTotal;
      })
      .slice(0, 5);

    return recommendedCompanies.map((company) => ({
      id: company.id,
      category: null,
      name: company.name,
      username: company.username,
      description: null,
      opportunitiesDescription: null,
      websiteUrl: null,
      instagramUrl: null,
      linkedinUrl: null,
      booth: null,
      boothId: null,
      logoImage: company.logoImage || null,
      landingImage: null,
      landingImageCompanyCulture: null,
      bookOfStandards: null,
      video: null,
      interests: company.companyToInterest.map((cti) => ({
        id: cti.interest.id,
        name: cti.interest.name,
        theme: cti.interest.theme,
      })),
      jobs: null,
      averageRating: null,
      campfireParticipation: company.campfireParticipation,
    }));
  }
}
