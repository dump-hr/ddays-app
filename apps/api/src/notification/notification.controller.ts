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
import { ApiTags } from '@nestjs/swagger';

import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './notification.dto';
import { NotificationService } from './notification.service';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const createdNotification = await this.notificationService.create(
      createNotificationDto,
    );

    return createdNotification;
  }

  @Get()
  async getAll() {
    const notifications = await this.notificationService.getAll();

    return notifications;
  }

  @Get('active')
  async getActive() {
    const notifications = await this.notificationService.getActive();

    return notifications;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedNotificationDto: UpdateNotificationDto,
  ) {
    const updatedNotification = await this.notificationService.update(
      id,
      updatedNotificationDto,
    );

    return updatedNotification;
  }

  @Patch('activate/:id')
  async activate(@Param('id', ParseIntPipe) id: number) {
    const activatedNotification = await this.notificationService.activate(id);

    return activatedNotification;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedNotification = await this.notificationService.remove(id);

    return deletedNotification;
  }
}
