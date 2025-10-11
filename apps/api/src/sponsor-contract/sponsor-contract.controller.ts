import { SponsorContractDto, SponsorContractModifyDto } from '@ddays-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';

import { SponsorContractService } from './sponsor-contract.service';

@Controller('sponsor-contracts')
export class SponsorContractController {
  constructor(
    private readonly sponsorContractService: SponsorContractService,
  ) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @Body() dto: SponsorContractModifyDto & { sponsorId: number },
  ): Promise<SponsorContractDto> {
    return await this.sponsorContractService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAll(): Promise<SponsorContractDto[]> {
    return await this.sponsorContractService.getAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SponsorContractDto> {
    return await this.sponsorContractService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SponsorContractModifyDto,
  ): Promise<SponsorContractDto> {
    return await this.sponsorContractService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.sponsorContractService.delete(id);
  }
}
