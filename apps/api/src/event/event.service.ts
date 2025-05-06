import {
  EventDto,
  EventModifyDto,
  EventWithSpeakerDto,
} from '@ddays-app/types';
import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventType, UserToEvent } from '@prisma/client';
import ical from 'ical-generator';
import { AchievementService } from 'src/achievement/achievement.service';
import { PrismaService } from 'src/prisma.service';

export class AlreadyJoinedEventException extends HttpException {
  constructor() {
    super('Ovaj je događaj već dodan u tvoj raspored.', HttpStatus.BAD_REQUEST);
  }
}

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly achievementService: AchievementService,
  ) {}

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
    const existingEntry = await this.prisma.userToEvent.findFirst({
      where: {
        userId: dto.userId,
        eventId: eventId,
      },
    });

    if (existingEntry) {
      throw new AlreadyJoinedEventException();
    }

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

  async leaveEvent(eventId: number, dto: UserToEventDto): Promise<void> {
    const existingEntry = await this.prisma.userToEvent.findFirst({
      where: {
        userId: dto.userId,
        eventId: eventId,
      },
    });

    if (!existingEntry) {
      throw new NotFoundException('You are not currently joined to this event');
    }

    await this.prisma.userToEvent.delete({
      where: {
        userId_eventId: {
          userId: dto.userId,
          eventId: eventId,
        },
      },
    });
  }

  async getEventsInMySchedule(userId: number): Promise<EventWithSpeakerDto[]> {
    const mySchedule = await this.prisma.userToEvent.findMany({
      where: { userId },
      include: {
        event: {
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
        },
      },
    });

    return mySchedule.map((entry) => ({
      id: entry.event.id,
      name: entry.event.name,
      description: entry.event.description,
      startsAt: entry.event.startsAt,
      endsAt: entry.event.endsAt,
      maxParticipants: entry.event.maxParticipants,
      requirements: entry.event.requirements,
      footageLink: entry.event.footageLink,
      type: entry.event.type,
      theme: entry.event.theme,
      codeId: entry.event.codeId,
      speakers: entry.event.speakerToEvent.map((speakerRelation) => {
        const speaker = speakerRelation.speaker;
        return {
          id: speaker.id,
          firstName: speaker.firstName,
          lastName: speaker.lastName,
          title: speaker.title,
          companyId: speaker.companyId,
          photo: speaker.photo,
          instagramUrl: speaker.instagramUrl,
          linkedinUrl: speaker.linkedinUrl,
          description: speaker.description,
          company:
            speaker.company?.id !== null
              ? { ...speaker.company, password: undefined }
              : null,
        };
      }),
    }));
  }

  async generateIcal(userId: number): Promise<string> {
    try {
      const mySchedule = await this.getEventsInMySchedule(userId);
      const calendar = ical({ name: 'DUMP Days 2025.' });

      mySchedule.forEach((event) => {
        let location = '';
        if (event.type === EventType.LECTURE) location = 'A100';
        else if (event.type === EventType.WORKSHOP) location = 'A101';

        calendar.createEvent({
          start: event.startsAt,
          end: event.endsAt,
          summary: event.name,
          description: event.description,
          location: location,
        });
      });

      return calendar.toString();
    } catch {
      throw new HttpException(
        'Raspored korisnika nije pronađen',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
