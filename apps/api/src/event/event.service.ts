import {
  CompanyPublicDto,
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

    const eventIds = result.map(
      (eventWithSpeaker) => eventWithSpeaker.event.id,
    );

    const eventIdsDistinct: number[] = [];

    eventIds.forEach((id) => {
      if (!eventIdsDistinct.includes(id)) {
        eventIdsDistinct.push(id);
      }
    });

    const eventsWithSpeakers: EventWithSpeakerDto[] = eventIdsDistinct.map(
      (id) => {
        const event = result.find((r) => r.event.id === id).event;

        const speakers = result
          .filter((r) => r.event.id === id)
          .map((r) => r.speaker)
          .filter((s) => s !== null);

        const speakersWithCompany = speakers.map((speaker) => {
          const company =
            speaker.companyId === null
              ? null
              : (result.find((r) => r.company?.id === speaker.companyId)
                  .company as CompanyPublicDto);

          return {
            id: speaker.id,
            firstName: speaker.firstName,
            lastName: speaker.lastName,
            title: speaker.title,
            companyId: speaker.companyId,
            photo: speaker.photo,
            instagram: speaker.instagram,
            linkedin: speaker.linkedin,
            description: speaker.description,
            company: { ...company, password: undefined },
          };
        });

        return {
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
          speakers: speakersWithCompany,
        };
      },
    );

    return eventsWithSpeakers;
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
