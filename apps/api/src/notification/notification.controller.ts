import { NotificationDto, NotificationModifyDto } from '@ddays-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Patch('activate/:id')
  async activate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NotificationDto> {
    return await this.notificationService.activate(id);
  }

  @Post()
  async create(@Body() dto: NotificationModifyDto): Promise<NotificationDto> {
    return await this.notificationService.create(dto);
  }

  @Get('active')
  async getActive(): Promise<NotificationDto[]> {
    return await this.notificationService.getActive();
  }

  @Get()
  async getAll(): Promise<NotificationDto[]> {
    return await this.notificationService.getAll();
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NotificationDto> {
    return await this.notificationService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: NotificationModifyDto,
  ): Promise<NotificationDto> {
    return await this.notificationService.update(id, dto);
  }
}
