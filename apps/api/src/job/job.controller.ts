import { JobDto, JobModifyDto } from '@ddays-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { SponsorGuard } from 'src/auth/sponsor.guard';

import { JobsModifyForCompanyDto } from './job.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: JobModifyDto): Promise<JobDto> {
    return await this.jobService.create(dto);
  }

  @Get('company/:id')
  async getForCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<JobDto[]> {
    return await this.jobService.getForCompany(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<JobDto> {
    return await this.jobService.remove(id);
  }

  @UseGuards(SponsorGuard)
  @Patch('company')
  async updateForCompany(
    @Req() { user }: AuthenticatedRequest,
    @Body() { jobs }: JobsModifyForCompanyDto,
  ): Promise<JobDto[]> {
    return await this.jobService.updateForCompany(user.id, jobs);
  }
}
