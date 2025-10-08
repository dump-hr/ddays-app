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
    const createdPotentialSponsor = await this.prisma.potentialSponsor.create({
      data: {
        ...dto,
      },
    });

    return createdPotentialSponsor;
  }

  async getAll(): Promise<PotentialSponsorDto[]> {
    const potentialSponsors = await this.prisma.potentialSponsor.findMany();

    return potentialSponsors;
  }
}
