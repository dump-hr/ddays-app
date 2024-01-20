import { NotificationDto, NotificationModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { notification } from 'db/schema';
import { desc, eq, lte } from 'drizzle-orm';

@Injectable()
export class NotificationService {
  async activate(id: number): Promise<NotificationDto> {
    const [activatedNotification] = await db
      .update(notification)
      .set({
        activatedAt: new Date(),
      })
      .where(eq(notification.id, id))
      .returning();

    return activatedNotification;
  }

  async create(dto: NotificationModifyDto): Promise<NotificationDto> {
    const [createdNotification] = await db
      .insert(notification)
      .values(dto)
      .returning();

    return createdNotification;
  }

  async deactivate(id: number): Promise<NotificationDto> {
    const [deactivatedNotification] = await db
      .update(notification)
      .set({
        activatedAt: null,
      })
      .where(eq(notification.id, id))
      .returning();

    return deactivatedNotification;
  }

  async getActive(): Promise<NotificationDto[]> {
    const notifications = await db
      .select({
        id: notification.id,
        title: notification.title,
        content: notification.content,
        activatedAt: notification.activatedAt,
      })
      .from(notification)
      .where(lte(notification.activatedAt, new Date()))
      .orderBy(desc(notification.activatedAt));

    return notifications;
  }

  async getAll(): Promise<NotificationDto[]> {
    const notifications = await db
      .select({
        id: notification.id,
        title: notification.title,
        content: notification.content,
        activatedAt: notification.activatedAt,
      })
      .from(notification)
      .orderBy(desc(notification.activatedAt));

    return notifications;
  }

  async remove(id: number): Promise<NotificationDto> {
    const [deletedNotification] = await db
      .delete(notification)
      .where(eq(notification.id, id))
      .returning();

    return deletedNotification;
  }

  async update(
    id: number,
    dto: NotificationModifyDto,
  ): Promise<NotificationDto> {
    const [updatedNotification] = await db
      .update(notification)
      .set(dto)
      .where(eq(notification.id, id))
      .returning();

    return updatedNotification;
  }
}
