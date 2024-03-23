import { SpeakerDto, SpeakerModifyDto } from '@ddays-app/types';
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

import { SpeakerService } from './speaker.service';

@Controller('speaker')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: SpeakerModifyDto): Promise<SpeakerDto> {
    return await this.speakerService.create(dto);
  }

  @Get()
  async getAll(): Promise<SpeakerDto[]> {
    return await this.speakerService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SpeakerDto> {
    return await this.speakerService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<SpeakerDto> {
    return await this.speakerService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SpeakerModifyDto,
  ): Promise<SpeakerDto> {
    return await this.speakerService.update(id, dto);
  }
}
