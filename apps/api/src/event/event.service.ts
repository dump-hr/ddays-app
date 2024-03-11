import { EventDto, EventModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { event } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventService {
  async create(dto: EventModifyDto): Promise<EventDto> {
    if (dto.codeId === 0) {
      dto.codeId = null;
    }
    const [createdEvent] = await db.insert(event).values(dto).returning();

    return createdEvent;
  }

  async getAll() {
    const events = await db
      .select({
        id: event.id,
        name: event.name,
        description: event.description,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        maxParticipants: event.maxParticipants,
        requirements: event.requirements,
        footageLink: event.footageLink,
        type: event.type,
        theme: event.theme,
        codeId: event.codeId,
      })
      .from(event)
      .orderBy(event.name);

    return events;
  }

  async getOne(id: number) {
    const [foundEvent] = await db
      .select({
        id: event.id,
        name: event.name,
        description: event.description,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        maxParticipants: event.maxParticipants,
        requirements: event.requirements,
        footageLink: event.footageLink,
        type: event.type,
        theme: event.theme,
        codeId: event.codeId,
      })
      .from(event)
      .where(eq(event.id, id));

    return foundEvent;
  }

  async remove(id: number) {
    const [deletedEvent] = await db
      .delete(event)
      .where(eq(event.id, id))
      .returning();

    return deletedEvent;
  }

  async update(id: number, dto: EventModifyDto) {
    const [updatedEvent] = await db
      .update(event)
      .set(dto)
      .where(eq(event.id, id))
      .returning();

    return updatedEvent;
  }
}
