import { SponsorContractDto, SponsorContractModifyDto } from '@ddays-app/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SponsorContractService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: SponsorContractModifyDto & { sponsorId: number },
  ): Promise<SponsorContractDto> {
    const existingSponsorContract = await this.prisma.sponsorContract.findFirst(
      {
        where: { sponsorId: dto.sponsorId },
      },
    );

    if (existingSponsorContract) {
      throw new BadRequestException(
        'Sponsor contract for this sponsor already exists',
      );
    }

    const createdSponsorContract = await this.prisma.sponsorContract.create({
      data: {
        ...dto,
      },
      include: {
        potentialSponsor: {
          select: {
            company: true,
            representative: true,
          },
        },
      },
    });

    return createdSponsorContract;
  }

  async getAll(): Promise<SponsorContractDto[]> {
    const sponsorContracts = await this.prisma.sponsorContract.findMany({
      include: {
        potentialSponsor: {
          select: {
            company: true,
            representative: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    return sponsorContracts;
  }

  async getOne(id: number): Promise<SponsorContractDto> {
    const sponsorContract = await this.prisma.sponsorContract.findUnique({
      where: { id },
      include: {
        potentialSponsor: {
          select: {
            company: true,
            representative: true,
          },
        },
      },
    });

    if (!sponsorContract) {
      throw new NotFoundException('Sponsor contract not found');
    }

    return sponsorContract;
  }

  async update(
    id: number,
    dto: SponsorContractModifyDto,
  ): Promise<SponsorContractDto> {
    const sponsorContract = await this.prisma.sponsorContract.findUnique({
      where: { id },
    });

    if (!sponsorContract) {
      throw new NotFoundException('Sponsor contract not found');
    }

    const updatedSponsorContract = await this.prisma.sponsorContract.update({
      where: { id },
      data: {
        ...dto,
      },
      include: {
        potentialSponsor: {
          select: {
            company: true,
            representative: true,
          },
        },
      },
    });

    return updatedSponsorContract;
  }

  async delete(id: number): Promise<void> {
    const sponsorContract = await this.prisma.sponsorContract.findUnique({
      where: { id },
    });

    if (!sponsorContract) {
      throw new NotFoundException('Sponsor contract not found');
    }

    await this.prisma.sponsorContract.delete({
      where: { id },
    });
  }
}
