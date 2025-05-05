import {
  EventDto,
  EventModifyDto,
  EventWithCompanyDto,
  EventWithSpeakerDto,
  UserToEventDto,
} from '@ddays-app/types';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserToEvent } from '@prisma/client';
import { Response } from 'express';
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

  @Post('apply-to-flytalk')
  @UseGuards(UserGuard)
  async applyToFlyTalk(@Body() dto: UserToEventDto): Promise<UserToEventDto> {
    return await this.eventService.applyToFlyTalk(dto);
  }

  @Post('upload-cv')
  @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadCV(@UploadedFile() file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return await this.eventService.uploadCV(file);
  }

  @Get('with-speaker')
  @UseGuards(UserGuard)
  async getAllWithSpeaker(): Promise<EventWithSpeakerDto[]> {
    return await this.eventService.getAllWithSpeaker();
  }

  @Get('with-company')
  @UseGuards(UserGuard)
  async GetAllWithCompany(): Promise<EventWithCompanyDto[]> {
    return await this.eventService.getAllWithCompany();
  }

  @UseGuards(UserGuard)
  @Get('my-schedule')
  async getEventsInMySchedule(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<EventWithSpeakerDto[]> {
    return this.eventService.getEventsInMySchedule(user.id);
  }

  @Get(':id')
  @UseGuards(UserGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EventDto> {
    return await this.eventService.getOne(id);
  }

  @Get('schedule-ical/:userId.ics')
  @UseGuards(UserGuard)
  async generateIcal(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    res.header('Content-Type', 'text/calendar'); // MIME type for iCal files
    res.header(
      'Content-Disposition',
      `attachment; filename=schedule-${userId}.ics`,
    );
    const icalData = await this.eventService.generateIcal(userId);
    res.send(icalData);
  }

  @Get()
  @UseGuards(UserGuard)
  async getAll(): Promise<EventDto[]> {
    return await this.eventService.getAll();
  }

  @UseGuards(UserGuard)
  @Delete('delete-flytalk-application')
  async deleteFlyTalkApplication(
    @Body() { eventId: eventId }: { eventId: number },
    @Req() { user }: AuthenticatedRequest,
  ): Promise<UserToEventDto> {
    return await this.eventService.deleteFlyTalkApplication(user.id, eventId);
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
  @UseGuards(UserGuard)
  async joinEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() dto: UserToEventDto,
  ): Promise<UserToEvent> {
    return await this.eventService.joinEvent(eventId, dto);
  }

  @Delete(':id/leave')
  @UseGuards(UserGuard)
  async leaveEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() dto: UserToEventDto,
  ): Promise<void> {
    return await this.eventService.leaveEvent(eventId, dto);
  }
}
