import {
  PotentialSponsorDto,
  PotentialSponsorModifyDto,
} from '@ddays-app/types';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';

import { PotentialSponsorService } from './potential-sponsor.service';

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

  @UseGuards(AdminGuard)
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PotentialSponsorDto> {
    return await this.potentialSponsorService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PotentialSponsorModifyDto,
  ): Promise<PotentialSponsorDto> {
    return await this.potentialSponsorService.update(id, dto);
  }
}
