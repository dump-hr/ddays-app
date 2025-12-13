import {
  SwagBagDto,
  SwagBagModifyDto,
  SwagBagModifyToCompanyDto,
  SwagBagWithCompanyDto,
  Tier,
} from '@ddays-app/types';
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

  async getByCompany(companyId: number): Promise<SwagBagDto[]> {
    const swagBags = await this.prisma.swagBag.findMany({
      where: { companyId },
    });
    return swagBags;
  }

  async remove(id: number): Promise<SwagBagDto> {
    const deletedSwagBag = await this.prisma.swagBag.delete({
      where: { id },
    });
    return deletedSwagBag;
  }

  async updateForCompany(
    companyId: number,
    dto: SwagBagModifyToCompanyDto[],
  ): Promise<SwagBagDto[]> {
    const existingSwagBags = await this.getByCompany(companyId);

    const swagBagsToAdd = dto
      .filter((swagBag) => !swagBag.id)
      .map((swagBag) => ({ ...swagBag, companyId }));

    const swagBagsToUpdate = dto.filter((swagBag) =>
      existingSwagBags.find(
        (existingSwagBag) => swagBag.id === existingSwagBag.id,
      ),
    );

    const swagBagIdsToRemove = existingSwagBags
      .filter(
        (existingSwagBag) =>
          !dto.find((swagBag) => swagBag.id === existingSwagBag.id),
      )
      .map((swagBag) => swagBag.id);

    if (swagBagsToAdd.length > 0) {
      await this.prisma.swagBag.createMany({
        data: swagBagsToAdd,
      });
    }

    if (swagBagIdsToRemove.length > 0) {
      await this.prisma.swagBag.deleteMany({
        where: {
          id: {
            in: swagBagIdsToRemove,
          },
        },
      });
    }

    for (const swagBagToUpdate of swagBagsToUpdate) {
      const { id, ...data } = swagBagToUpdate;
      await this.prisma.swagBag.update({
        where: { id },
        data,
      });
    }

    const companySwagBags = await this.getByCompany(companyId);
    return companySwagBags;
  }

  async getAllWithCompany(): Promise<SwagBagWithCompanyDto[]> {
    const swagBags = await this.prisma.swagBag.findMany({
      include: { company: { select: { name: true, category: true } } },
    });

    return swagBags.map(({ id, companyId, name, quantity, company }) => ({
      id,
      companyId,
      name,
      quantity,
      companyName: company.name,
      companyTier: company.category as Tier,
    }));
  }
}
