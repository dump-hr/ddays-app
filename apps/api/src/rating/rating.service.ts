import {
  RatingDto,
  RatingModifyDto,
  RatingQuestionDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
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

  async addRatings(
    dtos: RatingModifyDto[],
    userId: number,
  ): Promise<RatingDto[]> {
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
}
