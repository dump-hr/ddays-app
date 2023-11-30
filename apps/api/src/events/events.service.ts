import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { db } from 'db';
import { event, eventPlace, eventTheme, eventType } from 'db/schema';

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
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
