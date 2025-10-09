import {
  SponsorMaterialsDto,
  SponsorMaterialsModifyDto,
} from '@ddays-app/types';
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
import { SponsorMaterialsService } from './sponsor-materials.service';

@Controller('sponsor-materials')
export class SponsorMaterialsController {
  constructor(
    private readonly sponsorMaterialsService: SponsorMaterialsService,
  ) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @Body() dto: SponsorMaterialsModifyDto & { sponsorId: number },
  ): Promise<SponsorMaterialsDto> {
    return await this.sponsorMaterialsService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAll(): Promise<SponsorMaterialsDto[]> {
    return await this.sponsorMaterialsService.getAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SponsorMaterialsDto> {
    return await this.sponsorMaterialsService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SponsorMaterialsModifyDto,
  ): Promise<SponsorMaterialsDto> {
    return await this.sponsorMaterialsService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.sponsorMaterialsService.delete(id);
  }
}
