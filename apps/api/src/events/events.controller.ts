import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
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
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.getOne(+id);

    return event;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const updatedEvent = await this.eventsService.update(+id, updateEventDto);

    return updatedEvent;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedEvent = await this.eventsService.remove(+id);

    return deletedEvent;
  }
}
