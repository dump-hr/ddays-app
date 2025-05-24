import {
  BoothCreateManyDto,
  BoothModifyDto,
  BoothWithRatingDto,
  CompanyCategory,
} from '@ddays-app/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma.service';

import { BoothGateway } from './booth.gateway';

@Injectable()
export class BoothService {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly boothGateway: BoothGateway,
    private readonly prisma: PrismaService,
  ) {}

  async reserve(id: number, companyId: number) {
    const foundBooth = await this.prisma.booth.findUnique({ where: { id } });

    if (foundBooth?.companyId) {
      throw new BadRequestException('Booth already reserved');
    }

    const foundCompanyBooth = await this.prisma.booth.findFirst({
      where: { companyId },
    });

    if (foundCompanyBooth) {
      throw new BadRequestException('Company already has booth reserved');
    }

    await this.prisma.booth.update({
      where: { id },
      data: { companyId },
    });

    this.boothGateway.emitReserve(id);

    console.log(
      `${new Date()} - company id ${companyId} reserved booth id ${id}`,
    );
  }

  async clear(companyId: number) {
    const updatedBooth = await this.prisma.booth.updateMany({
      where: { companyId },
      data: { companyId: null },
    });

    if (updatedBooth.count === 0) {
      throw new BadRequestException('Booth not found');
    }

    this.boothGateway.emitClear(companyId);

    console.log(`${new Date()} - company id ${companyId} cleared booths`);
  }

  async create(dto: BoothModifyDto) {
    if (dto.companyId === -1) dto.companyId = null;

    return await this.prisma.booth.create({ data: dto });
  }

  async getAmountForCategory(category: CompanyCategory) {
    const booths = await this.prisma.booth.count({ where: { category } });
    return booths;
  }

  async createMany(createBoothDtos: BoothCreateManyDto) {
    const mainCategory =
      createBoothDtos.category === CompanyCategory.GOLD ? 'Z' : 'S';

    const amount =
      (await this.getAmountForCategory(createBoothDtos.category)) + 1;

    const booths = Array.from({ length: createBoothDtos.amount }).map(
      (_, index) => ({
        category: createBoothDtos.category,
        name: `${mainCategory}${amount + index}`,
      }),
    );

    return await this.prisma.$transaction(
      booths.map((booth) => this.prisma.booth.create({ data: booth })),
    );
  }

  async update(id: number, dto: BoothModifyDto) {
    if (dto.companyId === -1) dto.companyId = null;

    return await this.prisma.booth.update({
      where: { id },
      data: dto,
    });
  }

  async getAllForCategory(category: CompanyCategory) {
    const booths = await this.prisma.booth.findMany({
      where: { category },
      orderBy: { name: 'asc' },
    });

    return booths.map((booth) => ({
      id: booth.id,
      name: booth.name,
      isTaken: booth.companyId !== null,
    }));
  }

  async getAllForCompany(companyId: number) {
    const foundCompany = await this.prisma.company.findUnique({
      where: { id: companyId },
      select: { category: true },
    });

    if (!foundCompany) {
      throw new BadRequestException('Company not found');
    }

    return await this.getAllForCategory(
      foundCompany.category as CompanyCategory,
    );
  }

  async getAll() {
    return await this.prisma.booth.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getOne(id: number) {
    return await this.prisma.booth.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.booth.delete({
      where: { id },
    });
  }

  async getAllWithRatings(): Promise<BoothWithRatingDto[]> {
    const booths = await this.prisma.booth.findMany({
      where: { companyId: { not: null } },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    });

    const boothRatings = await this.prisma.rating.findMany({
      where: { boothId: { in: booths.map((booth) => booth.id) } },
    });

    return booths.map((booth) => ({
      id: booth.id,
      name: booth.name,
      companyName: booth.company.name,
      numberOfRatings: boothRatings.filter(
        (rating) => rating.boothId === booth.id,
      ).length,
      averageRating:
        boothRatings
          .filter((rating) => rating.boothId === booth.id)
          .reduce((acc, rating) => acc + rating.value, 0) /
        (boothRatings.filter((rating) => rating.boothId === booth.id).length ||
          1),
    }));
  }
}
