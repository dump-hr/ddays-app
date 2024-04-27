import {
  EventDto,
  EventModifyDto,
  EventWithSpeakerDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { company, event, speaker, speakerToEvent } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventService {
  async create(dto: EventModifyDto): Promise<EventDto> {
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

  async getAllWithSpeaker() {
    const result = await db
      .select()
      .from(event)
      .leftJoin(speakerToEvent, eq(event.id, speakerToEvent.eventId))
      .leftJoin(speaker, eq(speaker.id, speakerToEvent.speakerId))
      .leftJoin(company, eq(speaker.companyId, company.id))
      .orderBy(event.startsAt);

    const eventsWithSpeaker: EventWithSpeakerDto[] = result.map(
      (eventWithSpeaker) => {
        return {
          id: eventWithSpeaker.event.id,
          name: eventWithSpeaker.event.name,
          description: eventWithSpeaker.event.description,
          type: eventWithSpeaker.event.type,
          theme: eventWithSpeaker.event.theme,
          startsAt: eventWithSpeaker.event.startsAt,
          endsAt: eventWithSpeaker.event.endsAt,
          requirements: eventWithSpeaker.event.requirements,
          footageLink: eventWithSpeaker.event.footageLink,
          maxParticipants: eventWithSpeaker.event.maxParticipants,
          codeId: eventWithSpeaker.event.codeId,
          speaker:
            eventWithSpeaker.speaker_to_event !== null
              ? {
                  id: eventWithSpeaker.speaker.id,
                  firstName: eventWithSpeaker.speaker.firstName,
                  lastName: eventWithSpeaker.speaker.lastName,
                  title: eventWithSpeaker.speaker.title,
                  companyId: eventWithSpeaker.speaker.companyId,
                  photo: eventWithSpeaker.speaker.photo,
                  instagram: eventWithSpeaker.speaker.instagram,
                  linkedin: eventWithSpeaker.speaker.linkedin,
                  description: eventWithSpeaker.speaker.description,
                  company:
                    eventWithSpeaker.company !== null
                      ? {
                          id: eventWithSpeaker.company.id,
                          category: eventWithSpeaker.company.category,
                          name: eventWithSpeaker.company.name,
                          username: eventWithSpeaker.company.username,
                          description: eventWithSpeaker.company.description,
                          opportunitiesDescription:
                            eventWithSpeaker.company.opportunitiesDescription,
                          website: eventWithSpeaker.company.website,
                          boothLocation: eventWithSpeaker.company.boothLocation,
                          logoImage: eventWithSpeaker.company.logoImage,
                          landingImage: eventWithSpeaker.company.landingImage,
                          video: eventWithSpeaker.company.video,
                          codeId: eventWithSpeaker.company.codeId,
                        }
                      : null,
                }
              : null,
        };
      },
    );

    return eventsWithSpeaker;
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
