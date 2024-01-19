import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AddSponsorJobDto } from 'src/companies/companies.dto';

import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiBearerAuth()
  @Post()
  async async(@Body() jobDto: AddSponsorJobDto) {
    const createdJob = await this.jobService.create(jobDto);

    return createdJob;
  }

  @Get(':id')
  async getSponsorJobs(@Param('id', ParseIntPipe) id: number) {
    const sponsorJobs = await this.jobService.getSponsorJobs(id);

    return sponsorJobs;
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedJob = await this.jobService.remove(id);

    return deletedJob;
  }
}
