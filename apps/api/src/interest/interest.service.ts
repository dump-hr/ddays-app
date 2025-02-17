import { InterestDto, InterestModifyDto } from '@ddays-app/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterestService {
  constructor(private readonly prisma: PrismaService) {}

  async connectToCompany(
    companyId: number,
    interestIds: number[],
  ): Promise<InterestDto[]> {
    if (!interestIds || interestIds?.length === 0) {
      // If no interestIds are provided, remove all interests for the company
      await this.prisma.companyToInterest.deleteMany({
        where: { companyId },
      });
      return [];
    }

    // Fetch current company interests
    const currentInterests = await this.prisma.companyToInterest.findMany({
      where: { companyId },
    });

    const interestIdsToRemove = currentInterests
      .filter((interest) => !interestIds.includes(interest.interestId))
      .map((interest) => interest.interestId);

    const interestIdsToAdd = interestIds.filter(
      (interestId) =>
        !currentInterests.some(
          (interest) => interest.interestId === interestId,
        ),
    );

    // Add and remove interests in a transaction
    await this.prisma.$transaction(async (prisma) => {
      if (interestIdsToRemove.length > 0) {
        await prisma.companyToInterest.deleteMany({
          where: {
            companyId,
            interestId: { in: interestIdsToRemove },
          },
        });
      }

      if (interestIdsToAdd.length > 0) {
        const interestsToAdd = interestIdsToAdd.map((interestId) => ({
          companyId,
          interestId,
        }));
        await prisma.companyToInterest.createMany({ data: interestsToAdd });
      }
    });

    return this.getForCompany(companyId);
  }

  async create(dto: InterestModifyDto): Promise<InterestDto> {
    const createdInterest = await this.prisma.interest.create({
      data: dto,
    });

    return createdInterest;
  }

  async getOne(id: number): Promise<InterestDto> {
    const foundInterest = await this.prisma.interest.findUnique({
      where: { id },
    });

    if (!foundInterest) {
      throw new NotFoundException('Interest not found');
    }

    return foundInterest;
  }

  async getAll(): Promise<InterestDto[]> {
    return await this.prisma.interest.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        theme: true,
      },
    });
  }

  async getForCompany(companyId: number): Promise<InterestDto[]> {
    const interests = await this.prisma.companyToInterest.findMany({
      where: { companyId },
      include: {
        interest: {
          select: {
            id: true,
            name: true,
            theme: true,
          },
        },
      },
    });

    return interests.map((relation) => relation.interest);
  }

  async remove(id: number): Promise<InterestDto> {
    const removedInterest = await this.prisma.interest.delete({
      where: { id },
    });

    return removedInterest;
  }

  async update(id: number, dto: InterestModifyDto): Promise<InterestDto> {
    const updatedInterest = await this.prisma.interest.update({
      where: { id },
      data: dto,
    });

    return updatedInterest;
  }
}
