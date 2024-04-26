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
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';

import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AdminGuard)
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

  // @Get('with-speaker-and-company')
  // async getAllWithSpeakerAnd(): Promise<EventWithSpeakerDto[]> {
  //   return await this.eventService.getAllWithSpeaker();
  // }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<EventDto> {
    return await this.eventService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EventModifyDto,
  ): Promise<EventDto> {
    return await this.eventService.update(id, dto);
  }
}
