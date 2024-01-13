import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { event } from 'db/schema';
import { eq } from 'drizzle-orm';

import { CreateEventDto, UpdateEventDto } from './events.dto';

@Injectable()
export class EventsService {
  async create(createEventDto: CreateEventDto) {
    const createdEvent = await db
      .insert(event)
      .values({
        name: createEventDto.name,
        codeId: createEventDto.codeId,
        description: createEventDto.description,
        eventType: createEventDto.eventType,
        eventTheme: createEventDto.eventTheme,
        startsAt: createEventDto.startsAt,
        endsAt: createEventDto.endsAt,
        requirements: createEventDto.requirements,
        footageLink: createEventDto.footageLink,
        maxParticipants: createEventDto.maxParticipants,
      })
      .returning();

    return createdEvent;
  }

  async getAll() {
    const events = await db
      .select({
        name: event.name,
        description: event.description,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        maxParticipants: event.maxParticipants,
        requirements: event.requirements,
        footageLink: event.footageLink,
        eventType: event.eventType,
        eventTheme: event.eventTheme,
        codeId: event.codeId,
        id: event.id,
      })
      .from(event)
      .orderBy(event.name);

    return events;
  }

  async getOne(id: number) {
    const eventToFind = await db
      .select({
        name: event.name,
        description: event.description,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        maxParticipants: event.maxParticipants,
        requirements: event.requirements,
        footageLink: event.footageLink,
        eventType: event.eventType,
        eventTheme: event.eventTheme,
        codeId: event.codeId,
        id: event.id,
      })
      .from(event)
      .where(eq(event.id, id));

    return eventToFind;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const updatedEvent = await db
      .update(event)
      .set({
        name: updateEventDto.name,
        codeId: updateEventDto.codeId,
        description: updateEventDto.description,
        eventType: updateEventDto.eventType,
        eventTheme: updateEventDto.eventTheme,
        startsAt: updateEventDto.startsAt,
        endsAt: updateEventDto.endsAt,
        requirements: updateEventDto.requirements,
        footageLink: updateEventDto.footageLink,
        maxParticipants: updateEventDto.maxParticipants,
      })
      .where(eq(event.id, id))
      .returning();

    return updatedEvent;
  }

  async remove(id: number) {
    const deletedUser = await db
      .delete(event)
      .where(eq(event.id, id))
      .returning();

    return deletedUser;
  }
}
