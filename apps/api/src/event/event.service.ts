import {
  EventDto,
  EventModifyDto,
  EventType,
  EventWithCompanyDto,
  EventWithRatingDto,
  EventWithSpeakerDto,
  EventWithUsersDto,
  NotificationStatus,
  UserToEventDto,
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

import { getEventTypeText, getTimesForNotification } from './event.helper';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blobService: BlobService,
  ) {}

  async create(dto: EventModifyDto): Promise<EventDto> {
    const createdEvent = await this.prisma.event.create({
      data: { ...dto, codeId: dto.codeId || null },
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
        isApplicationOpen: true,
      },
    });

    return events;
  }

  async getOne(id: number): Promise<EventWithSpeakerDto> {
    const event = await this.prisma.event.findUnique({
      where: { id },
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
                    logoImage: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

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
      speakers: event.speakerToEvent.map((speakerRelation) => {
        const speaker = speakerRelation.speaker;
        return {
          id: speaker.id,
          firstName: speaker.firstName,
          lastName: speaker.lastName,
          title: speaker.title,
          companyId: speaker.companyId,
          photoUrl: speaker.photoUrl,
          smallPhotoUrl: speaker.smallPhotoUrl,
          instagram: speaker.instagramUrl,
          linkedin: speaker.linkedinUrl,
          description: speaker.description,
          company: speaker.company
            ? { ...speaker.company, password: undefined }
            : null,
        };
      }),
    };
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
                    logoImage: true,
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
      isApplicationOpen: event.isApplicationOpen,
      speakers: event.speakerToEvent.map((speakerRelation) => {
        const speaker = speakerRelation.speaker;
        return {
          id: speaker.id,
          firstName: speaker.firstName,
          lastName: speaker.lastName,
          title: speaker.title,
          companyId: speaker.companyId,
          photoUrl: speaker.photoUrl,
          smallPhotoUrl: speaker.smallPhotoUrl,
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
      isApplicationOpen: event.isApplicationOpen,
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
      data: { ...dto, codeId: dto.codeId || null },
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
      throw new NotFoundException('You are already joined to this event');
    }

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

    return await this.prisma.$transaction(async (tx) => {
      // Create the user-event registration
      const userToEvent = await tx.userToEvent.create({
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

      const { now, eventStartTime, minutesUntilEvent } =
        getTimesForNotification(event.startsAt);

      let notification = await tx.notification.findFirst({
        where: {
          eventId: event.id,
          isActive: true,
          activatedAt: {
            gte: new Date(now.getTime() - 30 * 60 * 1000), // Look for notifications created/activated within the last 30 minutes
          },
        },
        include: {
          userNotification: true,
        },
      });

      if (!notification) {
        notification = await tx.notification.create({
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

      await tx.userNotification.create({
        data: {
          userId: dto.userId,
          notificationId: notification.id,
          status: NotificationStatus.DELIVERED,
          deliveredAt: now,
        },
      });

      return userToEvent;
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
                        logoImage: true,
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
      isApplicationOpen: entry.event.isApplicationOpen,
      speakers: entry.event.speakerToEvent.map((speakerRelation) => {
        const speaker = speakerRelation.speaker;
        return {
          id: speaker.id,
          firstName: speaker.firstName,
          lastName: speaker.lastName,
          title: speaker.title,
          companyId: speaker.companyId,
          smallPhotoUrl: speaker.smallPhotoUrl,
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

  async getEventParticipantsCount(eventId: number): Promise<{ count: number }> {
    const count = await this.prisma.userToEvent.count({
      where: {
        eventId,
      },
    });

    return { count };
  }

  async getWorkshopsWithUsers(): Promise<EventWithUsersDto[]> {
    const workshops = await this.prisma.event.findMany({
      where: {
        type: EventType.WORKSHOP,
      },
      include: {
        userToEvent: {
          include: {
            user: true,
          },
        },
      },
    });

    return workshops.map((workshop) => ({
      id: workshop.id,
      name: workshop.name,
      description: workshop.description,
      startsAt: workshop.startsAt,
      endsAt: workshop.endsAt,
      maxParticipants: workshop.maxParticipants,
      requirements: workshop.requirements,
      footageLink: workshop.footageLink,
      type: workshop.type,
      theme: workshop.theme,
      codeId: workshop.codeId,
      users: workshop.userToEvent.map((ue) => ue.user),
      isApplicationOpen: workshop.isApplicationOpen,
    }));
  }

  async getApplicationStatus(
    userId: number,
    flyTalkId: number,
  ): Promise<boolean | null> {
    const application = await this.prisma.userToEvent.findFirst({
      where: {
        userId,
        eventId: flyTalkId,
      },
    });

    if (!application) {
      return null;
    }

    return application.finallySelected;
  }

  async getAllWithRatings(): Promise<EventWithRatingDto[]> {
    const events = await this.prisma.event.findMany();

    const ratings = await this.prisma.rating.findMany({
      where: {
        eventId: {
          in: events.map((event) => event.id),
          not: null,
        },
      },
    });

    const applications = await this.prisma.userToEvent.findMany({
      where: {
        eventId: {
          in: events.map((event) => event.id),
          not: null,
        },
      },
    });

    return events.map((event) => ({
      id: event.id,
      name: event.name,
      type: event.type,
      theme: event.theme,
      numberOfApplications: applications.filter(
        (app) => app.eventId === event.id,
      ).length,
      averageRating:
        ratings
          .filter((rating) => rating.eventId === event.id)
          .reduce((acc, rating) => acc + rating.value, 0) /
          ratings.filter((rating) => rating.eventId === event.id).length || 0,
    }));
  }
}
