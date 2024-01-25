import {
  SurveyQuestionDto,
  SurveyQuestionModifyDto,
  SurveyQuestionType,
} from '@ddays-app/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'db';
import { surveyQuestion } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SurveyQuestionService {
  async create(dto: SurveyQuestionModifyDto): Promise<SurveyQuestionDto> {
    const [createdSurveyQuestion] = await db
      .insert(surveyQuestion)
      .values(dto)
      .returning();

    return createdSurveyQuestion;
  }

  async getAll(): Promise<SurveyQuestionDto[]> {
    const surveyQuestions = await db
      .select({
        id: surveyQuestion.id,
        question: surveyQuestion.question,
        description: surveyQuestion.description,
        inputLabel: surveyQuestion.inputLabel,
        inputType: surveyQuestion.inputType,
        type: surveyQuestion.type,
      })
      .from(surveyQuestion)
      .orderBy(surveyQuestion.inputLabel);

    return surveyQuestions;
  }

  async getAllOfType(type: SurveyQuestionType): Promise<SurveyQuestionDto[]> {
    const surveyQuestions = await db
      .select({
        id: surveyQuestion.id,
        question: surveyQuestion.question,
        description: surveyQuestion.description,
        inputLabel: surveyQuestion.inputLabel,
        inputType: surveyQuestion.inputType,
        type: surveyQuestion.type,
      })
      .from(surveyQuestion)
      .where(eq(surveyQuestion.type, type))
      .orderBy(surveyQuestion.inputLabel);

    return surveyQuestions;
  }

  async remove(id: number): Promise<SurveyQuestionDto> {
    const [deletedSurveyQuestion] = await db
      .delete(surveyQuestion)
      .where(eq(surveyQuestion.id, id))
      .returning();

    if (!deletedSurveyQuestion) {
      throw new NotFoundException('Survey question not found');
    }

    return deletedSurveyQuestion;
  }

  async update(
    id: number,
    dto: SurveyQuestionModifyDto,
  ): Promise<SurveyQuestionDto> {
    const [updatedSurveyQuestion] = await db
      .update(surveyQuestion)
      .set(dto)
      .where(eq(surveyQuestion.id, id))
      .returning();

    if (!updatedSurveyQuestion) {
      throw new NotFoundException('Survey question not found');
    }

    return updatedSurveyQuestion;
  }
}
