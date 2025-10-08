import {
  PotentialSponsorDto,
  PotentialSponsorModifyDto,
} from '@ddays-app/types';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PotentialSponsorService } from './potential-sponsor.service';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('potential-sponsor')
export class PotentialSponsorController {
  constructor(
    private readonly potentialSponsorService: PotentialSponsorService,
  ) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @Body() dto: PotentialSponsorModifyDto,
  ): Promise<PotentialSponsorDto> {
    return await this.potentialSponsorService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAllPublic(): Promise<PotentialSponsorDto[]> {
    return await this.potentialSponsorService.getAll();
  }
}
