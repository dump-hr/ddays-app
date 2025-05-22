import {
  RatingDto,
  RatingModifyDto,
  RatingQuestionDto,
} from '@ddays-app/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyCategory, EventType } from '@prisma/client';
import { AchievementService } from 'src/achievement/achievement.service';
import { BoothService } from 'src/booth/booth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RatingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly achievementService: AchievementService,
    private readonly boothService: BoothService,
  ) {}

  async getQuestions(): Promise<RatingQuestionDto[]> {
    const ratingQuestions = await this.prisma.ratingQuestion.findMany({
      select: {
        id: true,
        question: true,
        subtitle: true,
        type: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return ratingQuestions.map((question) => ({
      id: question.id,
      question: question.question,
      subtitle: question.subtitle,
      type: question.type,
    }));
  }

  async getRatings(userId: number): Promise<RatingDto[]> {
    const ratings = await this.prisma.rating.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        boothId: true,
        eventId: true,
        value: true,
        ratingQuestionId: true,
        comment: true,
      },
    });

    return ratings.map((rating) => ({
      userId: rating.userId,
      id: rating.id,
      ratingQuestionId: rating.ratingQuestionId,
      value: rating.value,
      boothId: rating.boothId,
      comment: rating.comment,
      eventId: rating.eventId,
    }));
  }

  async addRatings(
    dtos: RatingModifyDto[],
    userId: number,
  ): Promise<RatingDto[]> {
    const boothIds = dtos.map((dto) => dto.boothId).filter((id) => id != null);
    const eventIds = dtos.map((dto) => dto.eventId).filter((id) => id != null);

    const existingRatings = await this.prisma.rating.findMany({
      where: {
        userId: userId,
        OR: [{ boothId: { in: boothIds } }, { eventId: { in: eventIds } }],
      },
    });

    if (existingRatings.length > 0) {
      throw new HttpException(
        'You have already submitted ratings for these questions.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newRatings = await Promise.all(
      dtos.map(async (dto) => {
        return await this.prisma.rating.create({
          data: {
            ...dto,
            userId: userId,
          },
        });
      }),
    );

    const completedAchievements =
      await this.achievementService.getCompletedAchievements(userId);

    // Booth related achievements
    const ratedBooths = await this.prisma.rating.findMany({
      where: {
        userId: userId,
      },
      select: {
        boothId: true,
      },
      distinct: ['boothId'],
    });

    const allSilverBooths = await this.prisma.booth.findMany({
      where: {
        company: {
          category: {
            equals: CompanyCategory.SILVER,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const allGoldBooths = await this.prisma.booth.findMany({
      where: {
        company: {
          category: {
            equals: CompanyCategory.GOLD,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const numberOfRatedSilverBooths = ratedBooths.filter((ratedBooth) =>
      allSilverBooths.some((booth) => booth.id === ratedBooth.boothId),
    ).length;

    const numberOfRatedGoldBooths = ratedBooths.filter((ratedBooth) =>
      allGoldBooths.some((booth) => booth.id === ratedBooth.boothId),
    ).length;

    const allBooths = await this.boothService.getAll();

    if (
      ratedBooths.length >= 1 &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Curious cat',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Curious cat',
        true,
      );
    }

    if (
      ratedBooths.length >= allBooths.length &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Lead extrovert',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Lead extrovert',
        true,
      );
    }

    if (
      numberOfRatedSilverBooths >= 7 &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Magnificent Seven',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Magnificent Seven',
        true,
      );
    }

    if (
      numberOfRatedSilverBooths === allSilverBooths.length &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Silver shine',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Silver shine',
        true,
      );
    }

    if (
      numberOfRatedGoldBooths === allGoldBooths.length &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Golden rush',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Golden rush',
        true,
      );
    }

    // Event related achievements
    const ratedEvents = await this.prisma.rating.findMany({
      where: {
        userId: userId,
      },
      select: {
        eventId: true,
      },
      distinct: ['eventId'],
    });

    const allWorkshops = await this.prisma.event.findMany({
      where: {
        type: EventType.WORKSHOP,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const numberOfRatedWorkshops = ratedEvents.filter((ratedEvent) =>
      allWorkshops.some((event) => event.id === ratedEvent.eventId),
    ).length;

    const allCampfireTalks = await this.prisma.event.findMany({
      where: {
        type: EventType.CAMPFIRE_TALK,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const numberOfRatedCampfireTalks = ratedEvents.filter((ratedEvent) =>
      allCampfireTalks.some((event) => event.id === ratedEvent.eventId),
    ).length;

    const allLectures = await this.prisma.event.findMany({
      where: {
        type: EventType.LECTURE,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const numberOfRatedLectures = ratedEvents.filter((ratedEvent) =>
      allLectures.some((event) => event.id === ratedEvent.eventId),
    ).length;

    if (
      ratedEvents.length >= 1 &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Novice attender',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Novice attender',
        true,
      );
    }

    if (
      numberOfRatedWorkshops >= 1 &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Hard at work',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Hard at work',
        true,
      );
    }

    if (
      numberOfRatedCampfireTalks >= 1 &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Ring of fire',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Ring of fire',
        true,
      );
    }

    if (
      (numberOfRatedLectures >= 1 || numberOfRatedWorkshops >= 1) &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Quality Assurance',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Quality Assurance',
        true,
      );
    }

    if (
      numberOfRatedLectures >= 5 &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Intermediate attender',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Intermediate attender',
        true,
      );
    }

    if (
      numberOfRatedWorkshops >= 2 &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Extra hard at work',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Extra hard at work',
        true,
      );
    }

    if (
      numberOfRatedLectures >= 10 &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Advanced attender',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Advanced attender',
        true,
      );
    }

    if (
      numberOfRatedLectures >= allLectures.length &&
      !completedAchievements.some(
        (achievement) => achievement.name === 'Master attender',
      )
    ) {
      await this.achievementService.completeAchievementByName(
        userId,
        'Master attender',
        true,
      );
    }

    return newRatings;
  }

  async getCompanyRating(companyId: number): Promise<number | null> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      select: { booth: { select: { id: true } } },
    });

    if (!company?.booth) {
      return null;
    }

    const result = await this.prisma.rating.aggregate({
      _avg: {
        value: true,
      },
      where: {
        boothId: company.booth.id,
      },
    });

    return result._avg.value ?? null;
  }
}
