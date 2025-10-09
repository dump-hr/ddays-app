import {
  PotentialSponsorDto,
  PotentialSponsorModifyDto,
} from '@ddays-app/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PotentialSponsorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: PotentialSponsorModifyDto): Promise<PotentialSponsorDto> {
    const samePotentialSponsor = await this.prisma.potentialSponsor.findFirst({
      where: { company: dto.company },
    });

    if (samePotentialSponsor) {
      throw new NotFoundException('Potential sponsor with this name exists');
    }

    const createdPotentialSponsor = await this.prisma.potentialSponsor.create({
      data: {
        ...dto,
      },
    });

    return createdPotentialSponsor;
  }

  async getAll(): Promise<PotentialSponsorDto[]> {
    const potentialSponsors = await this.prisma.potentialSponsor.findMany({
      orderBy: [{ representative: 'asc' }, { company: 'asc' }],
    });

    return potentialSponsors;
  }

  async getOne(id: number): Promise<PotentialSponsorDto> {
    const potentialSponsor = await this.prisma.potentialSponsor.findUnique({
      where: { id },
    });

    if (!potentialSponsor) {
      throw new NotFoundException('Potential sponsor not found');
    }

    return potentialSponsor;
  }

  async update(
    id: number,
    dto: PotentialSponsorModifyDto,
  ): Promise<PotentialSponsorDto> {
    const potentialSponsor = await this.prisma.potentialSponsor.findUnique({
      where: { id },
    });

    if (!potentialSponsor) {
      throw new NotFoundException('Potential sponsor not found');
    }

    const samePotentialSponsor = await this.prisma.potentialSponsor.findFirst({
      where: { company: dto.company, NOT: { id } },
    });

    if (samePotentialSponsor) {
      throw new NotFoundException('Potential sponsor with this name exists');
    }

    const updatedPotentialSponsor = await this.prisma.potentialSponsor.update({
      where: { id },
      data: {
        ...dto,
      },
    });

    return updatedPotentialSponsor;
  }
}
