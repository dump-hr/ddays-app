import {
  BoothCreateManyDto,
  BoothModifyDto,
  CompanyCategory,
} from '@ddays-app/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { db } from 'db';
import { booth, company } from 'db/schema';
import { asc, eq } from 'drizzle-orm';
import { Server } from 'socket.io';

import { BoothGateway } from './booth.gateway';

@Injectable()
export class BoothService {
  @WebSocketServer()
  server: Server;

  constructor(private readonly boothGateway: BoothGateway) {}

  async reserve(id: number, companyId: number) {
    const [foundBooth] = await db.select().from(booth).where(eq(booth.id, id));

    if (!!foundBooth.companyId) {
      throw new BadRequestException('Booth already reserved');
    }

    const [foundCompanyBooth] = await db
      .select()
      .from(booth)
      .where(eq(booth.companyId, companyId));

    if (!!foundCompanyBooth) {
      throw new BadRequestException('Company already has booth reserved');
    }

    await db
      .update(booth)
      .set({ companyId })
      .where(eq(booth.id, id))
      .returning();

    this.boothGateway.emitReserve(id);

    console.log(
      `${new Date()} - company id ${companyId} reserved booth id ${id}`,
    );
  }

  async clear(companyId: number) {
    const [updatedBooth] = await db
      .update(booth)
      .set({ companyId: null })
      .where(eq(booth.companyId, companyId))
      .returning();

    if (!updatedBooth) {
      throw new BadRequestException('Booth not found');
    }

    this.boothGateway.emitClear(updatedBooth.id);

    console.log(
      `${new Date()} - company id ${companyId} cleared booth id ${
        updatedBooth.id
      }`,
    );
  }

  async create(dto: BoothModifyDto) {
    if (dto.companyId === -1) dto.companyId = null;

    const [foundBooth] = await db.insert(booth).values(dto);

    return foundBooth;
  }

  async getAmountForCategory(category: CompanyCategory) {
    const booths = await db
      .select()
      .from(booth)
      .where(eq(booth.category, category));

    return booths.length;
  }

  async createMany(createBoothDtos: BoothCreateManyDto) {
    const mainCategory =
      createBoothDtos.category === CompanyCategory.Gold ? 'Z' : 'S';

    const amount =
      (await this.getAmountForCategory(createBoothDtos.category)) + 1;

    const booths = Array.from({ length: createBoothDtos.amount }).map(
      (_, index) => ({
        category: createBoothDtos.category,
        name: `${mainCategory}${amount + index}`,
      }),
    );

    const data = await db.insert(booth).values(booths).returning();

    return data;
  }

  async update(id: number, dto: BoothModifyDto) {
    if (dto.companyId === -1) dto.companyId = null;

    const [foundBooth] = await db
      .update(booth)
      .set(dto)
      .where(eq(booth.id, id));

    return foundBooth;
  }

  async getAllForCategory(category: CompanyCategory) {
    const booths = await db
      .select({
        companyId: booth.companyId,
        name: booth.name,
        id: booth.id,
      })
      .from(booth)
      .where(eq(booth.category, category))
      .orderBy(asc(booth.name));

    return booths.map((booth) => ({
      id: booth.id,
      name: booth.name,
      isTaken: booth.companyId !== null,
    }));
  }

  async getAllForCompany(companyId: number) {
    const [foundCompany] = await db
      .select({
        category: company.category,
      })
      .from(company)
      .where(eq(company.id, companyId));

    return await this.getAllForCategory(
      foundCompany.category as CompanyCategory,
    );
  }

  async getAll() {
    const booths = await db
      .select({
        companyId: booth.companyId,
        name: booth.name,
        category: booth.category,
        id: booth.id,
      })
      .from(booth)
      .orderBy(booth.name);

    return booths;
  }

  async getOne(id: number) {
    const [foundBooth] = await db
      .select({
        companyId: booth.companyId,
        name: booth.name,
        category: booth.category,
        id: booth.id,
      })
      .from(booth)
      .where(eq(booth.id, id));

    return foundBooth;
  }

  async remove(id: number) {
    return await db.delete(booth).where(eq(booth.id, id));
  }
}
