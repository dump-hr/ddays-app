import { JobDto, JobModifyDto } from '@ddays-app/types';
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

import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiBearerAuth()
  @Post()
  async async(@Body() dto: JobModifyDto): Promise<JobDto> {
    return await this.jobService.create(dto);
  }

  @Get(':id')
  async getForCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<JobDto[]> {
    return await this.jobService.getForCompany(id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<JobDto> {
    return await this.jobService.remove(id);
  }
}
