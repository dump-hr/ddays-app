import {
  SurveyQuestionDto,
  SurveyQuestionModifyDto,
  SurveyQuestionType,
} from '@ddays-app/types';
import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SurveyQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: SurveyQuestionModifyDto): Promise<SurveyQuestionDto> {
    const createdSurveyQuestion = await this.prisma.surveyQuestion.create({
      data: dto,
    });

    return createdSurveyQuestion;
  }

  async getAll(): Promise<SurveyQuestionDto[]> {
    const surveyQuestions = await this.prisma.surveyQuestion.findMany({
      orderBy: { inputLabel: 'asc' },
    });

    return surveyQuestions;
  }

  async getAllOfType(type: SurveyQuestionType): Promise<SurveyQuestionDto[]> {
    const surveyQuestions = await this.prisma.surveyQuestion.findMany({
      where: { type },
      orderBy: { inputLabel: 'asc' },
    });

    return surveyQuestions;
  }

  async remove(id: number): Promise<SurveyQuestionDto> {
    try {
      const deletedSurveyQuestion = await this.prisma.surveyQuestion.delete({
        where: { id },
      });

      return deletedSurveyQuestion;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async update(
    id: number,
    dto: SurveyQuestionModifyDto,
  ): Promise<SurveyQuestionDto> {
    try {
      const updatedSurveyQuestion = await this.prisma.surveyQuestion.update({
        where: { id },
        data: dto,
      });

      return updatedSurveyQuestion;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
