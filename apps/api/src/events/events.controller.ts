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

import { CreateEventDto } from './events.dto';
import { UpdateEventDto } from './events.dto';
import { EventsService } from './events.service';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const createdEvent = await this.eventsService.create(createEventDto);

    return createdEvent;
  }

  @Get()
  async getAll() {
    const events = await this.eventsService.getAll();

    return events;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const event = await this.eventsService.getOne(id);

    return event;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const updatedEvent = await this.eventsService.update(id, updateEventDto);

    return updatedEvent;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedEvent = await this.eventsService.remove(id);

    return deletedEvent;
  }
}
