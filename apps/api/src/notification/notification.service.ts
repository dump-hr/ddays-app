import { NotificationDto, NotificationModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async activate(id: number): Promise<NotificationDto> {
    const activatedNotification = await this.prisma.notification.update({
      where: { id },
      data: { activatedAt: new Date() },
    });

    return activatedNotification;
  }

  async create(dto: NotificationModifyDto): Promise<NotificationDto> {
    const createdNotification = await this.prisma.notification.create({
      data: dto,
    });

    return createdNotification;
  }

  async deactivate(id: number): Promise<NotificationDto> {
    const deactivatedNotification = await this.prisma.notification.update({
      where: { id },
      data: { activatedAt: null },
    });

    return deactivatedNotification;
  }

  async getActive(): Promise<NotificationDto[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        activatedAt: {
          lte: new Date(),
        },
      },
      orderBy: { activatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        activatedAt: true,
      },
    });

    return notifications;
  }

  async getAll(): Promise<NotificationDto[]> {
    const notifications = await this.prisma.notification.findMany({
      orderBy: { activatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        activatedAt: true,
      },
    });

    return notifications;
  }

  async remove(id: number): Promise<NotificationDto> {
    const deletedNotification = await this.prisma.notification.delete({
      where: { id },
    });

    return deletedNotification;
  }

  async update(
    id: number,
    dto: NotificationModifyDto,
  ): Promise<NotificationDto> {
    const updatedNotification = await this.prisma.notification.update({
      where: { id },
      data: dto,
    });

    return updatedNotification;
  }
}
