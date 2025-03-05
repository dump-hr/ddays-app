import {
  FrequentlyAskedQuestionDto,
  FrequentlyAskedQuestionModifyDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FrequentlyAskedQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: FrequentlyAskedQuestionModifyDto,
  ): Promise<FrequentlyAskedQuestionDto> {
    const createdFrequentlyAskedQuestion =
      await this.prisma.frequentlyAskedQuestion.create({
        data: dto,
      });

    return createdFrequentlyAskedQuestion;
  }

  async getAll(): Promise<FrequentlyAskedQuestionDto[]> {
    const frequentlyAskedQuestions =
      await this.prisma.frequentlyAskedQuestion.findMany({
        orderBy: { id: 'asc' },
        select: {
          id: true,
          question: true,
          answer: true,
        },
      });

    return frequentlyAskedQuestions;
  }

  async remove(id: number): Promise<FrequentlyAskedQuestionDto> {
    const deletedFrequentlyAskedQuestion =
      await this.prisma.frequentlyAskedQuestion.delete({
        where: { id },
      });

    return deletedFrequentlyAskedQuestion;
  }

  async update(
    id: number,
    dto: FrequentlyAskedQuestionModifyDto,
  ): Promise<FrequentlyAskedQuestionDto> {
    const updatedFrequentlyAskedQuestion =
      await this.prisma.frequentlyAskedQuestion.update({
        where: { id },
        data: dto,
      });

    return updatedFrequentlyAskedQuestion;
  }
}
