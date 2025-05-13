import { JobDto, JobModifyDto, JobModifyForCompanyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: JobModifyDto): Promise<JobDto> {
    const addedJob = await this.prisma.job.create({
      data: dto,
    });

    return addedJob;
  }

  async getForCompany(companyId: number): Promise<JobDto[]> {
    const jobs = await this.prisma.job.findMany({
      where: { companyId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        companyId: true,
        position: true,
        location: true,
        details: true,
        createdAt: true,
        link: true,
      },
    });

    return jobs;
  }

  async remove(id: number): Promise<JobDto> {
    const deletedJob = await this.prisma.job.delete({
      where: { id },
    });

    return deletedJob;
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

    const jobIdsToRemove = existingJobs
      .filter((existingJob) => !dto.find((job) => job.id === existingJob.id))
      .map((job) => job.id);

    // Add new jobs
    if (jobsToAdd.length > 0) {
      await this.prisma.job.createMany({
        data: jobsToAdd,
      });
    }

    // Remove jobs not in the new DTO
    if (jobIdsToRemove.length > 0) {
      await this.prisma.job.deleteMany({
        where: {
          id: {
            in: jobIdsToRemove,
          },
        },
      });
    }

    // Update existing jobs
    for (const jobToUpdate of jobsToUpdate) {
      const { id, ...data } = jobToUpdate;
      await this.prisma.job.update({
        where: { id },
        data,
      });
    }

    // Return the updated list of jobs for the company
    const companyJobs = await this.getForCompany(companyId);
    return companyJobs;
  }
}
