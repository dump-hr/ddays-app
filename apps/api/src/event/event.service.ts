import {
  EventDto,
  EventModifyDto,
  EventType,
  EventWithCompanyDto,
  EventWithSpeakerDto,
  UserToEventDto,
  NotificationStatus,
} from '@ddays-app/types';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserToEvent } from '@prisma/client';
import ical from 'ical-generator';
import { BlobService } from 'src/blob/blob.service';
import { PrismaService } from 'src/prisma.service';

import { getEventTypeText } from './event.helper';

export class AlreadyJoinedEventException extends HttpException {
  constructor() {
    super('Ovaj je događaj već dodan u tvoj raspored.', HttpStatus.BAD_REQUEST);
  }
}

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blobService: BlobService,
  ) {}

  async create(dto: EventModifyDto): Promise<EventDto> {
    const createdEvent = await this.prisma.event.create({
      data: dto,
    });

    return createdEvent;
  }

  async applyToFlyTalk(dto: UserToEventDto): Promise<UserToEventDto> {
    const appliedFlyTalk = await this.prisma.userToEvent.create({
      data: {
        userId: dto.userId,
        eventId: dto.eventId,
        linkedinProfile: dto.linkedinProfile,
        githubProfile: dto.githubProfile,
        portfolioProfile: dto.portfolioProfile,
        cv: dto.cv,
        description: dto.description,
      },
    });

    return appliedFlyTalk;
  }

  async uploadCV(file: Express.Multer.File): Promise<string> {
    const cv = await this.blobService.upload(
      'user-cv',
      file.buffer,
      file.mimetype,
    );
    console.log(cv);
    return cv;
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

  async getFlyTalksWithCompany(): Promise<EventWithCompanyDto[]> {
    const events = await this.prisma.event.findMany({
      where: { type: EventType.FLY_TALK },
      include: {
        companyToFlyTalk: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logoImage: true,
              },
            },
          },
        },
        userToEvent: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
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
      isOnEnglish: event.isOnEnglish,
      companies: event.companyToFlyTalk.map((relation) => ({
        id: relation.company.id,
        name: relation.company.name,
        logoImage: relation.company.logoImage,
      })),
      users: event.userToEvent.map((relation) => ({
        id: relation.user.id,
      })),
    }));
  }

  async remove(id: number): Promise<EventDto> {
    const deletedEvent = await this.prisma.event.delete({
      where: { id },
    });

    return deletedEvent;
  }

  async deleteFlyTalkApplication(
    userId: number,
    eventId: number,
  ): Promise<UserToEventDto> {
    await this.prisma.companyToFlyTalkUser.deleteMany({
      where: {
        userId,
        eventId,
      },
    });

    const deletedApplication = await this.prisma.userToEvent.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    return deletedApplication;
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

    // Get the event details to use for notification
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        name: true,
        theme: true,
        startsAt: true,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Create the user-event registration
    const userToEvent = await this.prisma.userToEvent.create({
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

    // Calculate notification timing
    const eventStartTime = new Date(event.startsAt);
    const notificationTime = new Date(eventStartTime);
    notificationTime.setMinutes(eventStartTime.getMinutes() - 15); // 15 minutes before event starts

    // Current time to determine if notification should be active
    const now = new Date();
    const isActive = notificationTime <= now; // Only active if event starts in less than 15 min

    // Calculate minutes until event for the notification message
    const minutesUntilEvent = isActive
      ? Math.max(
          1,
          Math.floor((eventStartTime.getTime() - now.getTime()) / (1000 * 60)),
        )
      : 15; // Default to 15 minutes if notification will be shown later

    // Check if a notification already exists for this event
    // We only want to reuse notifications that are not yet active or were recently activated
    let notification = await this.prisma.notification.findFirst({
      where: {
        eventId: event.id,
        activatedAt: {
          gte: new Date(now.getTime() - 30 * 60 * 1000), // Look for notifications created/activated within the last 30 minutes
        },
      },
      include: {
        userNotification: true,
      },
    });

    // If no suitable notification exists, create a new one
    if (!notification) {
      notification = await this.prisma.notification.create({
        data: {
          title: `Raspored`,
          content: `${getEventTypeText(
            event.theme as EventType,
          )} koje ste zabilježeli "${
            event.name
          }" počinje za ${minutesUntilEvent} minuta!`,
          activatedAt: now,
          expiresAt: new Date(eventStartTime.getTime() + 30 * 60 * 1000), // Expires 30 min after event starts
          isActive: true,
          eventId: event.id,
        },
        include: {
          userNotification: true,
        },
      });
    }

    // Create a userNotification record linking the user to the notification
    await this.prisma.userNotification.create({
      data: {
        userId: dto.userId,
        notificationId: notification.id,
        status: NotificationStatus.DELIVERED,
        deliveredAt: now,
      },
    });

    return userToEvent;
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

    await this.prisma.$transaction(async (tx) => {
      // 1. Find notifications associated with this event
      const notifications = await tx.notification.findMany({
        where: {
          eventId: eventId,
        },
        select: {
          id: true,
        },
      });

      const notificationIds = notifications.map((n) => n.id);

      // 2. Delete user notification relationships if any exist
      if (notificationIds.length > 0) {
        await tx.userNotification.deleteMany({
          where: {
            userId: dto.userId,
            notificationId: {
              in: notificationIds,
            },
          },
        });
      }

      // 3. Delete the user-event relationship
      await tx.userToEvent.delete({
        where: {
          userId_eventId: {
            userId: dto.userId,
            eventId: eventId,
          },
        },
      });
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
