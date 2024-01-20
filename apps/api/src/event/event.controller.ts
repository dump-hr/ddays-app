import { EventDto, EventModifyDto } from '@ddays-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() dto: EventModifyDto): Promise<EventDto> {
    return await this.eventService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EventDto> {
    return await this.eventService.getOne(id);
  }

  @Get()
  async getAll(): Promise<EventDto[]> {
    return await this.eventService.getAll();
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<EventDto> {
    return await this.eventService.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EventModifyDto,
  ): Promise<EventDto> {
    return await this.eventService.update(id, dto);
  }
}
