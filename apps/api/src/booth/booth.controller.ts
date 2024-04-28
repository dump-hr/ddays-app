import {
  AdminBoothDto,
  BoothDto,
  CreateBoothDto,
  CreateManyBoothsDto,
  ModifyBoothDto,
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

import { BoothService } from './booth.service';

@Controller('booth')
export class BoothController {
  constructor(private readonly boothService: BoothService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateBoothDto): Promise<BoothDto> {
    return await this.boothService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Post('many')
  async createMany(@Body() dto: CreateManyBoothsDto): Promise<BoothDto[]> {
    return await this.boothService.createMany(dto);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAll(): Promise<AdminBoothDto[]> {
    return await this.boothService.getAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<AdminBoothDto> {
    return await this.boothService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async modify(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ModifyBoothDto,
  ): Promise<AdminBoothDto> {
    return await this.boothService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.boothService.remove(id);
  }
}
