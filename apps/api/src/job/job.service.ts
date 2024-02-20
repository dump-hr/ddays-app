import { JobDto, JobModifyDto, JobModifyForCompanyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { job } from 'db/schema';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class JobService {
  isValidUrl(url: string): boolean {
    const URL_REGEX =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return URL_REGEX.test(url);
  }

  async create(dto: JobModifyDto): Promise<JobDto> {
    if (!this.isValidUrl(dto.link)) {
      throw new Error('Invalid URL');
    }

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
        link: job.link,
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

  async updateForCompany(
    companyId: number,
    dto: JobModifyForCompanyDto[],
  ): Promise<JobDto[]> {
    const existingJobs = await this.getForCompany(companyId);

    const jobsToAdd = dto
      .filter((job) => !job.id)
      .map((job) => ({ ...job, companyId }));

    const jobsToUpdate = dto.filter((job) =>
      existingJobs.find((existingJob) => job.id === existingJob.id),
    );

    [...jobsToAdd, ...jobsToUpdate].forEach((job) => {
      if (!this.isValidUrl(job.link)) {
        throw new Error('Invalid URL');
      }
    });

    const jobIdsToRemove = existingJobs
      .filter((existingJob) => !dto.find((job) => job.id === existingJob.id))
      .map((job) => job.id);

    if (jobsToAdd.length > 0) {
      await db.insert(job).values(jobsToAdd);
    }

    if (jobIdsToRemove.length > 0) {
      await db.delete(job).where(inArray(job.id, jobIdsToRemove));
    }

    for (const jobToUpdate of jobsToUpdate) {
      await db
        .update(job)
        .set({ ...jobToUpdate, createdAt: undefined })
        .where(eq(job.id, jobToUpdate.id));
    }

    const companyJobs = await this.getForCompany(companyId);
    return companyJobs;
  }
}
