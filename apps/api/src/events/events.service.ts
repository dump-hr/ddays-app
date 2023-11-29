import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { db } from 'db';
import { event, eventPlace, eventTheme } from 'db/schema';

@Injectable()
export class EventsService {
  async create(createEventDto: CreateEventDto) {
    const createdEvent = await db
      .insert(event)
      .values({
        name: createEventDto.name,
        description: createEventDto.description,
        endsAt: createEventDto.endsAt,
        codeId: createEventDto.codeId,
        footageLink: createEventDto.footageLink,
        requirements: createEventDto.requirements,
        eventPlace: createEventDto.eventPlace,
        eventType: createEventDto.eventType,
        eventTheme: createEventDto.eventTheme,
        maxParticipants: createEventDto.maxParticipants,
        startsAt: createEventDto.startsAt,
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
