import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddSponsorJobDto } from 'src/companies/companies.dto';

import { JobsService } from './jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiBearerAuth()
  @Post()
  async async(@Body() jobDto: AddSponsorJobDto) {
    const createdJob = await this.jobsService.create(jobDto);

    return createdJob;
  }

  @Get(':id')
  async getSponsorJobs(@Param('id', ParseIntPipe) id: number) {
    const sponsorJobs = await this.jobsService.getSponsorJobs(id);

    return sponsorJobs;
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedJob = await this.jobsService.remove(id);

    return deletedJob;
  }
}
