import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { job } from 'db/schema';
import { eq } from 'drizzle-orm';
import { AddSponsorJobDto } from 'src/companies/companies.dto';

@Injectable()
export class JobsService {
  async create(addSponsorJob: AddSponsorJobDto) {
    const addedJob = await db
      .insert(job)
      .values({
        companyId: addSponsorJob.companyId,
        position: addSponsorJob.position,
        location: addSponsorJob.location,
        details: addSponsorJob.details,
      })
      .returning();

    return addedJob;
  }

  async getSponsorJobs(sponsorId: number) {
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
      .where(eq(job.companyId, sponsorId))
      .orderBy(job.createdAt);

    return jobs;
  }

  async remove(id: number) {
    const deletedjob = await db.delete(job).where(eq(job.id, id)).returning();

    return deletedjob;
  }
}
