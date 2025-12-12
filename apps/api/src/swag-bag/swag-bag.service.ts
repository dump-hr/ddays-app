import { SwagBagDto, SwagBagModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SwagBagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: SwagBagModifyDto): Promise<SwagBagDto> {
    const swagBag = await this.prisma.swagBag.create({
      data: dto,
    });
    return swagBag;
  }
}
