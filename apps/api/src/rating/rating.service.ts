import { RatingQuestionDto } from '@ddays-app/types';
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
        type: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return ratingQuestions.map((question) => ({
      id: question.id,
      question: question.question,
      type: question.type,
    }));
  }
}
