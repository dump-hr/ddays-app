import {
  EventDto,
  EventModifyDto,
  EventWithSpeakerDto,
} from '@ddays-app/types';
import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserToEvent } from '@prisma/client';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { UserGuard } from 'src/auth/user.guard';

import { EventService } from './event.service';
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: EventModifyDto): Promise<EventDto> {
    return await this.eventService.create(dto);
  }

  @Get('with-speaker')
  async getAllWithSpeakerAnd(): Promise<EventWithSpeakerDto[]> {
    return await this.eventService.getAllWithSpeaker();
  }

  @UseGuards(UserGuard)
  @Get('my-schedule')
  async getEventsInMySchedule(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<EventDto[]> {
    return this.eventService.getEventsInMySchedule(user.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EventDto> {
    return await this.eventService.getOne(id);
  }

  @Get()
  async getAll(): Promise<EventDto[]> {
    return await this.eventService.getAll();
  }

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

  @Post(':id/join')
  async joinEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() dto: UserToEventDto,
  ): Promise<UserToEvent> {
    return await this.eventService.joinEvent(eventId, dto);
  }

  @Delete(':id/leave')
  async leaveEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() dto: UserToEventDto,
  ): Promise<void> {
    return await this.eventService.leaveEvent(eventId, dto);
  }
}
