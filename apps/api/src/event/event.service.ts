import {
  EventDto,
  EventModifyDto,
  EventWithSpeakerDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { EventType, UserToEvent } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserToEventDto } from '@ddays-app/types/src/dto/user';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: EventModifyDto): Promise<EventDto> {
    const createdEvent = await this.prisma.event.create({
      data: dto,
    });

    return createdEvent;
  }

  async getAll(): Promise<EventDto[]> {
    const events = await this.prisma.event.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        startsAt: true,
        endsAt: true,
        maxParticipants: true,
        requirements: true,
        footageLink: true,
        type: true,
        theme: true,
        codeId: true,
      },
    });

    return events;
  }

  async getOne(id: number): Promise<EventDto> {
    const foundEvent = await this.prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        startsAt: true,
        endsAt: true,
        maxParticipants: true,
        requirements: true,
        footageLink: true,
        type: true,
        theme: true,
        codeId: true,
      },
    });

    return foundEvent;
  }

  async getAllWithSpeaker(): Promise<EventWithSpeakerDto[]> {
    const events = await this.prisma.event.findMany({
      include: {
        speakerToEvent: {
          include: {
            speaker: {
              include: {
                company: {
                  select: {
                    id: true,
                    name: true,
                    category: true,
                    websiteUrl: true,
                    instagramUrl: true,
                    linkedinUrl: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { startsAt: 'asc' },
    });

    return events.map((event) => ({
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
      speakers: event.speakerToEvent.map((speakerRelation) => {
        const speaker = speakerRelation.speaker;
        return {
          id: speaker.id,
          firstName: speaker.firstName,
          lastName: speaker.lastName,
          title: speaker.title,
          companyId: speaker.companyId,
          photo: speaker.photo,
          instagram: speaker.instagramUrl,
          linkedin: speaker.linkedinUrl,
          description: speaker.description,
          company: speaker.company
            ? { ...speaker.company, password: undefined }
            : null,
        };
      }),
    }));
  }

  async remove(id: number): Promise<EventDto> {
    const deletedEvent = await this.prisma.event.delete({
      where: { id },
    });

    return deletedEvent;
  }

  async update(id: number, dto: EventModifyDto): Promise<EventDto> {
    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: dto,
    });

    return updatedEvent;
  }

  async joinEvent(eventId: number, dto: UserToEventDto): Promise<UserToEvent> {
    return await this.prisma.userToEvent.create({
      data: {
        userId: dto.userId,
        eventId: eventId,
        linkedinProfile: dto.linkedinProfile,
        githubProfile: dto.githubProfile,
        portfolioProfile: dto.portfolioProfile,
        cv: dto.cv,
        description: dto.description,
      },
    });
  }

  async getEventsInMySchedule(userId: number): Promise<EventDto[]> {
    const events = await this.prisma.userToEvent.findMany({
      where: {
        userId,
      },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            description: true,
            startsAt: true,
            endsAt: true,
            maxParticipants: true,
            requirements: true,
            footageLink: true,
            type: true,
            theme: true,
            codeId: true,
          },
        },
      },
      orderBy: {
        event: {
          startsAt: 'asc',
        },
      },
    });

    return events.map((event) => event.event);
  }
}
