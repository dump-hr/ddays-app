import {
  EventDto,
  EventType,
  NotificationDto,
  NotificationModifyDto,
} from '@ddays-app/types';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationStatus } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { getEventTypeText } from './notification.helper';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}


  async createEventNotifications(event: EventDto) {
    const existingNotification = await this.prisma.notification.findFirst({
      where: {
        eventId: event.id,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (existingNotification) {
      this.logger.debug(
        `Notification for event "${event.name}" already exists, skipping.`,
      );
      return;
    }

    const registrations = await this.prisma.userToEvent.findMany({
      where: { eventId: event.id },
      include: { user: true },
    });

    if (registrations.length === 0) {
      return;
    }

    const notification = await this.prisma.notification.create({
      data: {
        title: `Raspored`,
        content: `${getEventTypeText(
          event.theme as EventType,
        )} koje ste zabilježeli "${event.name}" počinje za 15 minuta!`,
        activatedAt: new Date(),
        expiresAt: new Date(Date.parse(event.startsAt) + 30 * 60 * 1000),
        isActive: true,
        eventId: event.id,
      },
    });

    const userNotifications = registrations.map((registration) => ({
      userId: registration.userId,
      notificationId: notification.id,
      status: NotificationStatus.DELIVERED,
    }));

    await this.prisma.userNotification.createMany({
      data: userNotifications,
    });

    this.logger.log(
      `Created ${userNotifications.length} notifications for event "${event.name}"`,
    );
  }

async getUserNotifications(userId: number) {
  const now = new Date();
  const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);
  
  return this.prisma.userNotification.findMany({
    where: {
      userId,
      status: NotificationStatus.DELIVERED,
      notification: {
        isActive: true,
        event: {
          startsAt: {
            gte: now.toISOString(),
            lte: fifteenMinutesFromNow.toISOString()
          }
        }
      }
    },
    include: {
      notification: {
        include: {
          event: true,
        },
      },
    },
    orderBy: {
      notification: {
        createdAt: 'desc',
      },
    },
  });
}

  async markNotificationsAsRead(userId: number, notificationIds: number[]) {
    return this.prisma.userNotification.updateMany({
      where: {
        userId,
        notificationId: {
          in: notificationIds,
        },
      },
      data: {
        status: NotificationStatus.READ,
        readAt: new Date(),
      },
    });
  }

  async markNotificationAsRead(userId: number, notificationId: number) {
    return this.prisma.userNotification.update({
      where: {
        userId_notificationId: {
          userId,
          notificationId,
        },
      },
      data: {
        status: NotificationStatus.READ,
        readAt: new Date(),
      },
    });
  }

  async markNotificationAsDelivered(userId: number, notificationId: number) {
    return this.prisma.userNotification.update({
      where: {
        userId_notificationId: {
          userId,
          notificationId,
        },
      },
      data: {
        status: NotificationStatus.DELIVERED,
        deliveredAt: new Date(),
      },
    });
  }

  async getUnreadNotificationsCount(userId: number) {
    return this.prisma.userNotification.count({
      where: {
        userId,
        status: {
          not: NotificationStatus.READ,
        },
      },
    });
  }

  async activate(id: number): Promise<NotificationDto> {
    const activatedNotification = await this.prisma.notification.update({
      where: { id },
      data: { activatedAt: new Date() },
    });

    return activatedNotification;
  }

  async create(dto: NotificationModifyDto): Promise<NotificationDto> {
    const createdNotification = await this.prisma.notification.create({
      data: {
        ...dto,
      },
    });

    return createdNotification;
  }

  async createForAllUsers(
    dto: NotificationModifyDto,
  ): Promise<NotificationDto[]> {
    const createdNotification = await this.create(dto);

    const users = await this.prisma.user.findMany({
      select: { id: true, isDeleted: true },
      where: { isDeleted: false },
    });

    const userNotifications = users.map((user) => ({
      userId: user.id,
      notificationId: createdNotification.id,
      status: NotificationStatus.DELIVERED,
    }));

    await this.prisma.userNotification.createMany({
      data: userNotifications,
    });

    return [createdNotification];
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
