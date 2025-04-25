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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post('apply-to-flytalk')
  async applyToFlyTalk(@Body() dto: UserToEventDto): Promise<UserToEventDto> {
    return await this.eventService.applyToFlyTalk(dto);
  }

  @Post('upload-cv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCV(@UploadedFile() file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return await this.eventService.uploadCV(file);
  }

  @Get('with-speaker')
  async getAllWithSpeakerAnd(): Promise<EventWithSpeakerDto[]> {
    return await this.eventService.getAllWithSpeaker();
  }

  @Get('with-company')
  async GetAllWithCompany(): Promise<EventWithCompanyDto[]> {
    return await this.eventService.getAllWithCompany();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EventDto> {
    return await this.eventService.getOne(id);
  }

  @Get()
  async getAll(): Promise<EventDto[]> {
    return await this.eventService.getAll();
  }

  @Delete('delete-flytalk-application')
  async deleteFlyTalkApplication(
    @Body() { userId, eventId }: UserToEventDto,
  ): Promise<UserToEventDto> {
    return await this.eventService.deleteFlyTalkApplication(userId, eventId);
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
}
