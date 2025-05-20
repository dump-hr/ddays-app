import {
  RatingDto,
  RatingModifyDto,
  RatingQuestionDto,
} from '@ddays-app/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

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
    const existingRatings = await this.prisma.rating.findMany({
      where: {
        userId: userId,
        boothId: {
          in: dtos.map((dto) => dto.boothId),
        },
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
