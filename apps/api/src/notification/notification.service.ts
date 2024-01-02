import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { notification } from 'db/schema';
import { desc, eq } from 'drizzle-orm';

import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './notification.dto';

@Injectable()
export class NotificationService {
  async create(createNotificationDto: CreateNotificationDto) {
    const createdNotification = await db
      .insert(notification)
      .values({
        title: createNotificationDto.title,
        content: createNotificationDto.content,
        isActive: createNotificationDto.isActive,
      })
      .returning();

    return createdNotification;
  }

  async getAll() {
    const notifications = await db
      .select({
        id: notification.id,
        title: notification.title,
        content: notification.content,
        isActive: notification.isActive,
      })
      .from(notification)
      .orderBy(desc(notification.activatedAt));

    return notifications;
  }

  async getActive() {
    const notifications = await db
      .select({
        id: notification.id,
        title: notification.title,
        content: notification.content,
        isActive: notification.isActive,
      })
      .from(notification)
      .where(eq(notification.isActive, true))
      .orderBy(desc(notification.activatedAt));

    return notifications;
  }

  async update(id: number, updatedNotificationDto: UpdateNotificationDto) {
    const updatedNotification = await db
      .update(notification)
      .set({
        title: updatedNotificationDto.title,
        content: updatedNotificationDto.content,
        isActive: updatedNotificationDto.isActive,
      })
      .where(eq(notification.id, id))
      .returning();

    return updatedNotification;
  }

  async activate(id: number) {
    const activatedNotification = await db
      .update(notification)
      .set({
        isActive: true,
        activatedAt: Date.now().toString(),
      })
      .where(eq(notification.id, id))
      .returning();

    return activatedNotification;
  }

  async remove(id: number) {
    const deletedNotification = await db
      .delete(notification)
      .where(eq(notification.id, id))
      .returning();

    return deletedNotification;
  }
}
