import { NotificationDto, NotificationModifyDto } from '@ddays-app/types';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationStatus } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}

  // Check for upcoming events every minute
  @Cron(CronExpression.EVERY_MINUTE)
  async checkUpcomingEvents() {
    this.logger.debug('Checking for upcoming events...');

    try {
      const currentDate = new Date();

      // Add timezone offset to keep dates in local time
      const tzOffsetMs = currentDate.getTimezoneOffset() * 60 * 1000;

      const startWindow = new Date(
        currentDate.getTime() + 60 * 1000 - tzOffsetMs,
      ).toISOString();
      const endWindow = new Date(
        currentDate.getTime() + 15 * 60 * 1000 - tzOffsetMs,
      ).toISOString();

      this.logger.debug(
        `Looking for events between: ${startWindow} and ${endWindow}`,
      );

      const upcomingEvents = await this.prisma.event.findMany({
        where: {
          startsAt: {
            gte: startWindow,
            lte: endWindow,
          },
        },
      });

      if (upcomingEvents.length === 0) {
        console.log('No upcoming events found');
        return;
      }

      this.logger.debug(`Found ${upcomingEvents.length} upcoming events`);

      for (const event of upcomingEvents) {
        await this.createEventNotifications(event);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Error checking upcoming events', error.stack);
      } else {
        this.logger.error('Error checking upcoming events', String(error));
      }
    }
  }

  async createEventNotifications(event: any) {
    const existingNotification = await this.prisma.notification.findFirst({
      where: {
        eventId: event.id,
        createdAt: {
          gte: new Date(Date.now() - 30 * 60 * 1000),
        },
        title: {
          contains: 'Event Starting Soon',
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
        title: `Event Starting Soon: ${event.name}`,
        content: `Your event "${event.name}" is starting in 15 minutes!`,
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
    return this.prisma.userNotification.findMany({
      where: {
        userId,
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
