import { JobDto, JobModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { job } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class JobService {
  async create(dto: JobModifyDto): Promise<JobDto> {
    const [addedJob] = await db.insert(job).values(dto).returning();

    return addedJob;
  }

  async getForCompany(companyId: number): Promise<JobDto[]> {
    const jobs = await db
      .select({
        id: job.id,
        companyId: job.companyId,
        position: job.position,
        location: job.location,
        details: job.details,
        createdAt: job.createdAt,
      })
      .from(job)
      .where(eq(job.companyId, companyId))
      .orderBy(job.createdAt);

    return jobs;
  }

  async remove(id: number): Promise<JobDto> {
    const [deletedjob] = await db.delete(job).where(eq(job.id, id)).returning();

    return deletedjob;
  }
}
