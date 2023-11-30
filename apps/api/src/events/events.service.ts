import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { db } from 'db';
import { event, eventPlace, eventTheme, eventType } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventsService {
  async create(createEventDto: CreateEventDto) {
    const createdEvent = await db
      .insert(event)
      .values({
        name: createEventDto.name,
        codeId: createEventDto.codeId,
        description: createEventDto.description,
        eventType: eventType.enumValues[createEventDto.eventType],
        eventTheme: eventTheme.enumValues[createEventDto.eventTheme],
        eventPlace: eventPlace.enumValues[createEventDto.eventPlace],
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
    
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const updatedEvent = await db
      .update(event)
      .set({
        name: updateEventDto.name,
        codeId: updateEventDto.codeId,
        description: updateEventDto.description,
        eventType: eventType.enumValues[updateEventDto.eventType],
        eventTheme: eventTheme.enumValues[updateEventDto.eventTheme],
        eventPlace: eventPlace.enumValues[updateEventDto.eventPlace],
        startsAt: updateEventDto.startsAt,
        endsAt: updateEventDto.endsAt,
        requirements: updateEventDto.requirements,
        footageLink: updateEventDto.footageLink,
        maxParticipants: updateEventDto.maxParticipants,
      })
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
