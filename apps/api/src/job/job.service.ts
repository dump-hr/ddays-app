import { JobDto, JobModifyDto, JobModifyForCompanyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { job } from 'db/schema';
import { eq, inArray } from 'drizzle-orm';

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

  async updateForCompany(
    companyId: number,
    dto: JobModifyForCompanyDto[],
  ): Promise<JobDto[]> {
    const existingJobs = await this.getForCompany(companyId);

    const jobsToAdd = dto.reduce((acc, jobDto) => {
      if (!jobDto.id) {
        return [...acc, { ...jobDto, companyId }];
      }

      return acc;
    }, [] as JobDto[]);

    const [jobIdsToRemove, jobsToUpdate] = dto.reduce(
      ([jobIdsToRemove, jobsToUpdate], jobDto) => {
        if (existingJobs.find((existingJob) => jobDto.id === existingJob.id)) {
          return [jobIdsToRemove, [...jobsToUpdate, jobDto]];
        }

        return [[...jobIdsToRemove, jobDto.id], jobsToUpdate];
      },
      [[] as number[], [] as JobModifyForCompanyDto[]],
    );

    await db.insert(job).values(jobsToAdd);
    await db.delete(job).where(inArray(job.id, jobIdsToRemove));

    for (const jobToUpdate of jobsToUpdate) {
      await db.update(job).set(jobToUpdate);
    }

    const companyJobs = await this.getForCompany(companyId);
    return companyJobs;
  }
}
