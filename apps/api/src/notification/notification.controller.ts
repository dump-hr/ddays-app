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
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';

import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AdminGuard)
  @Patch('activate/:id')
  async activate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NotificationDto> {
    return await this.notificationService.activate(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: NotificationModifyDto): Promise<NotificationDto> {
    return await this.notificationService.create(dto);
  }

  @Get('active')
  async getActive(): Promise<NotificationDto[]> {
    return await this.notificationService.getActive();
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAll(): Promise<NotificationDto[]> {
    return await this.notificationService.getAll();
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NotificationDto> {
    return await this.notificationService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: NotificationModifyDto,
  ): Promise<NotificationDto> {
    return await this.notificationService.update(id, dto);
  }
}
