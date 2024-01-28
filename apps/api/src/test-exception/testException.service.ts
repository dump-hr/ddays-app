import { CompanyDto, CompanyModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { company } from 'db/schema';
import { BlobService } from 'src/blob/blob.service';
import { InterestService } from 'src/interest/interest.service';
@Injectable()
export class TestExceptionService {
  constructor(
    private readonly blobService: BlobService,
    private readonly interestService: InterestService,
  ) {}

  async create(dto: CompanyModifyDto): Promise<CompanyDto> {
    const [createdCompany] = await db
      .insert(company)
      .values({
        id: 1,
        category: dto.category,
        description: dto.description,
        name: dto.name,
        username: dto.username,
        password: 'neki1234',
      })
      .returning();

    return { ...createdCompany };
  }
}
