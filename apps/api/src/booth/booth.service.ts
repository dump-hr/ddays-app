import {
  CompanyCategory,
  CreateBoothDto,
  CreateManyBoothsDto,
  ModifyBoothDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { boothLocation } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class BoothService {
  async checkValidity(id: number, company: number) {
    const [booth] = await db
      .select()
      .from(boothLocation)
      .where(eq(boothLocation.id, id));

    if (!booth || booth.companyId !== null) {
      return false;
    }

    const [boothCompany] = await db
      .select()
      .from(boothLocation)
      .where(eq(boothLocation.companyId, company));

    return (
      booth.category === boothCompany.category && !boothCompany.boothLocationId
    );
  }

  async create(createBoothDto: CreateBoothDto) {
    const [booth] = await db
      .insert(boothLocation)
      .values(createBoothDto)
      .execute();

    return booth;
  }

  async getAmountForCategory(category: CompanyCategory) {
    const booths = await db
      .select()
      .from(boothLocation)
      .where(eq(boothLocation.category, category));

    return booths.length;
  }

  async createMany(createBoothDtos: CreateManyBoothsDto) {
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

    const data = await db.insert(boothLocation).values(booths).returning();

    return data;
  }

  async update(id: number, modifyBoothDto: ModifyBoothDto) {
    const [booth] = await db
      .update(boothLocation)
      .set(modifyBoothDto)
      .where(eq(boothLocation.id, id));

    return booth;
  }

  async getAllForCategory(category?: string) {
    const booths = await db
      .select()
      .from(boothLocation)
      .where(eq(boothLocation.category, category))
      .orderBy(boothLocation.name.asc());

    return booths;
  }

  async getAll() {
    const booths = await db
      .select({
        companyId: boothLocation.companyId,
        name: boothLocation.name,
        category: boothLocation.category,
        id: boothLocation.id,
      })
      .from(boothLocation)
      .orderBy(boothLocation.name);

    return booths;
  }

  async getOne(id: number) {
    const [booth] = await db
      .select({
        companyId: boothLocation.companyId,
        name: boothLocation.name,
        category: boothLocation.category,
        id: boothLocation.id,
      })
      .from(boothLocation)
      .where(eq(boothLocation.id, id));

    return booth;
  }

  async remove(id: number) {
    return await db
      .delete(boothLocation)
      .where(eq(boothLocation.id, id))
      .execute();
  }
}
