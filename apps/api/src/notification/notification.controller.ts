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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';

import { UserGuard } from '../auth/user.guard';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(UserGuard)
  async getUserNotifications(@Req() { user }) {
    return this.notificationService.getUserNotifications(user.id);
  }

  @Get('unread-count')
  @UseGuards(UserGuard)
  async getUnreadCount(@Req() { user }) {
    return {
      count: await this.notificationService.getUnreadNotificationsCount(
        user.id,
      ),
    };
  }

  @Patch('read')
  @UseGuards(UserGuard)
  async markNotificationsAsRead(
    @Req() { user },
    @Body() notificationIds: number[],
  ) {
    return this.notificationService.markNotificationsAsRead(
      user.id,
      notificationIds,
    );
  }

  @Patch(':id/read')
  @UseGuards(UserGuard)
  async markAsRead(@Req() { user }, @Param('id', ParseIntPipe) id: number) {
    return this.notificationService.markNotificationAsRead(user.id, id);
  }

  @Patch(':id/delivered')
  @UseGuards(UserGuard)
  async markAsDelivered(
    @Req() { user },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.notificationService.markNotificationAsDelivered(user.id, id);
  }

  @UseGuards(AdminGuard)
  @Patch('activate/:id')
  async activate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NotificationDto> {
    return await this.notificationService.activate(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() dto: NotificationModifyDto): Promise<NotificationDto> {
    return await this.notificationService.create(dto);
  }

  @Post('all-users')
  @UseGuards(AdminGuard)
  async createForAllUsers(
    @Body() dto: NotificationModifyDto,
  ): Promise<NotificationDto[]> {
    return await this.notificationService.createForAllUsers(dto);
  }

  @Get('active')
  async getActive(): Promise<NotificationDto[]> {
    return await this.notificationService.getActive();
  }

  @Get()
  @UseGuards(AdminGuard)
  async getAll(): Promise<NotificationDto[]> {
    return await this.notificationService.getAll();
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NotificationDto> {
    return await this.notificationService.remove(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: NotificationModifyDto,
  ): Promise<NotificationDto> {
    return await this.notificationService.update(id, dto);
  }
}
