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
import { ApiTags } from '@nestjs/swagger';

import { EventService } from './event.service';
import { CreateEventDto } from './events.dto';
import { UpdateEventDto } from './events.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const createdEvent = await this.eventService.create(createEventDto);

    return createdEvent;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const event = await this.eventService.getOne(id);

    return event;
  }
  @Get()
  async getAll() {
    const events = await this.eventService.getAll();

    return events;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedEvent = await this.eventService.remove(id);

    return deletedEvent;
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const updatedEvent = await this.eventService.update(id, updateEventDto);

    return updatedEvent;
  }
}
