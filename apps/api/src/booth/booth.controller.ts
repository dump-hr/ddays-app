import {
  BoothCreateManyDto,
  BoothDto,
  BoothModifyDto,
  BoothPublicDto,
  BoothWithRatingDto,
  CompanyCategory,
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
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { SponsorGuard } from 'src/auth/sponsor.guard';

import { BoothService } from './booth.service';

@Controller('booth')
export class BoothController {
  constructor(private readonly boothService: BoothService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: BoothModifyDto): Promise<BoothDto> {
    return await this.boothService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Post('many')
  async createMany(@Body() dto: BoothCreateManyDto): Promise<BoothDto[]> {
    return await this.boothService.createMany(dto);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAll(): Promise<BoothDto[]> {
    return await this.boothService.getAll();
  }

  @UseGuards(SponsorGuard)
  @Get('company')
  async getAllForCompany(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<BoothPublicDto[]> {
    return await this.boothService.getAllForCompany(user.id);
  }

  @UseGuards(AdminGuard)
  @Get('all-with-ratings')
  async getAllWithRatings(): Promise<BoothWithRatingDto[]> {
    return await this.boothService.getAllWithRatings();
  }

  @UseGuards(SponsorGuard)
  @Get('category/:category')
  async getAllForCategory(
    @Param('category') category: CompanyCategory,
  ): Promise<BoothPublicDto[]> {
    return await this.boothService.getAllForCategory(category);
  }

  @UseGuards(SponsorGuard)
  @Put('reserve/:id')
  async reserve(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user }: AuthenticatedRequest,
  ) {
    return await this.boothService.reserve(id, user.id);
  }

  @UseGuards(SponsorGuard)
  @Delete('clear')
  async clear(@Req() { user }: AuthenticatedRequest) {
    return await this.boothService.clear(user.id);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<BoothDto> {
    return await this.boothService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async modify(// @
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: BoothModifyDto,
  ): Promise<BoothDto> {
    return await this.boothService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.boothService.remove(id);
  }
}
