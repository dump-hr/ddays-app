import {
  SponsorMaterialsDto,
  SponsorMaterialsModifyDto,
} from '@ddays-app/types';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SponsorMaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: SponsorMaterialsModifyDto & { sponsorId: number },
  ): Promise<SponsorMaterialsDto> {
    const existingSponsorMaterials =
      await this.prisma.sponsorMaterials.findFirst({
        where: { sponsorId: dto.sponsorId },
      });

    if (existingSponsorMaterials) {
      throw new BadRequestException(
        'Sponsor materials for this sponsor already exist',
      );
    }

    const createdSponsorMaterials = await this.prisma.sponsorMaterials.create({
      data: {
        ...dto,
      },
      include: {
        potentialSponsor: {
          select: {
            tier: true,
            company: true,
            representative: true,
          },
        },
      },
    });

    return createdSponsorMaterials;
  }

  async getAll(): Promise<SponsorMaterialsDto[]> {
    const sponsorMaterials = await this.prisma.sponsorMaterials.findMany({
      include: {
        potentialSponsor: {
          select: {
            tier: true,
            company: true,
            representative: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    return sponsorMaterials;
  }

  async getOne(id: number): Promise<SponsorMaterialsDto> {
    const sponsorMaterials = await this.prisma.sponsorMaterials.findUnique({
      where: { id },
      include: {
        potentialSponsor: {
          select: {
            tier: true,
            company: true,
            representative: true,
          },
        },
      },
    });

    if (!sponsorMaterials) {
      throw new NotFoundException('Sponsor materials not found');
    }

    return sponsorMaterials;
  }

  async update(
    id: number,
    dto: SponsorMaterialsModifyDto,
  ): Promise<SponsorMaterialsDto> {
    const sponsorMaterials = await this.prisma.sponsorMaterials.findUnique({
      where: { id },
    });

    if (!sponsorMaterials) {
      throw new NotFoundException('Sponsor materials not found');
    }

    const updatedSponsorMaterials = await this.prisma.sponsorMaterials.update({
      where: { id },
      data: {
        ...dto,
      },
      include: {
        potentialSponsor: {
          select: {
            tier: true,
            company: true,
            representative: true,
          },
        },
      },
    });

    return updatedSponsorMaterials;
  }

  async delete(id: number): Promise<void> {
    const sponsorMaterials = await this.prisma.sponsorMaterials.findUnique({
      where: { id },
    });

    if (!sponsorMaterials) {
      throw new NotFoundException('Sponsor materials not found');
    }

    await this.prisma.sponsorMaterials.delete({
      where: { id },
    });
  }
}
