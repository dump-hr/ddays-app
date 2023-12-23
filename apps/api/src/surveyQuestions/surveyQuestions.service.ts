import { HttpException, Injectable } from '@nestjs/common';
import { db } from 'db';
import { surveyQuestion } from 'db/schema';
import { eq } from 'drizzle-orm';
import {
  CreateSurveyQuestionDto,
  UpdateSurveyQuestionDto,
} from './surveyQuestions.dto';

import { SurveyQuestionType } from '@ddays-app/types';

@Injectable()
export class SurveyQuestionsService {
  async getAll() {
    const surveyQuestions = await db
      .select({
        id: surveyQuestion.id,
        question: surveyQuestion.question,
        description: surveyQuestion.description,
        inputLabel: surveyQuestion.inputLabel,
        surveyQuestionInputType: surveyQuestion.surveyQuestionInputType,
        surveyQuestionType: surveyQuestion.surveyQuestionType,
      })
      .from(surveyQuestion)
      .orderBy(surveyQuestion.inputLabel);

    return surveyQuestions;
  }

  async getOne(id: number) {
    const surveyQuestionsToFind = await db
      .select({
        id: surveyQuestion.id,
        question: surveyQuestion.question,
        description: surveyQuestion.description,
        inputLabel: surveyQuestion.inputLabel,
        surveyQuestionInputType: surveyQuestion.surveyQuestionInputType,
        surveyQuestionType: surveyQuestion.surveyQuestionType,
      })
      .from(surveyQuestion)
      .where(eq(surveyQuestion.id, id));

    if (!surveyQuestionsToFind.length) {
      return null;
    }

    const surveyQuestionToFind = surveyQuestionsToFind[0];

    return surveyQuestionToFind;
  }

  async getAllOfType(type: SurveyQuestionType) {
    const surveyQuestions = await db
      .select({
        id: surveyQuestion.id,
        question: surveyQuestion.question,
        description: surveyQuestion.description,
        inputLabel: surveyQuestion.inputLabel,
        surveyQuestionInputType: surveyQuestion.surveyQuestionInputType,
        surveyQuestionType: surveyQuestion.surveyQuestionType,
      })
      .from(surveyQuestion)
      .where(eq(surveyQuestion.surveyQuestionType, type))
      .orderBy(surveyQuestion.inputLabel);

    return surveyQuestions;
  }

  async create(createSurveyQuestionDto: CreateSurveyQuestionDto) {
    if (createSurveyQuestionDto.question.trim() === '') {
      throw new HttpException('Question cannot be empty', 400);
    }

    const surveyQuestionsToFind = await db
      .select({
        question: surveyQuestion.question,
      })
      .from(surveyQuestion)
      .where(eq(surveyQuestion.question, createSurveyQuestionDto.question));

    if (surveyQuestionsToFind.length) {
      throw new HttpException('Question already exists', 400);
    }

    const createdSurveyQuestions = await db
      .insert(surveyQuestion)
      .values({
        question: createSurveyQuestionDto.question,
        description: createSurveyQuestionDto.description,
        inputLabel: createSurveyQuestionDto.inputLabel,
        surveyQuestionInputType:
          createSurveyQuestionDto.surveyQuestionInputType,
        surveyQuestionType: createSurveyQuestionDto.surveyQuestionType,
      })
      .returning();

    const createdSurveyQuestion = createdSurveyQuestions[0];

    return createdSurveyQuestion;
  }

  async update(id: number, updateSurveyQuestionDto: UpdateSurveyQuestionDto) {
    if (updateSurveyQuestionDto.question.trim() === '') {
      throw new HttpException('Question cannot be empty', 400);
    }

    const surveyQuestionsToFind = await db
      .select({
        question: surveyQuestion.question,
      })
      .from(surveyQuestion)
      .where(eq(surveyQuestion.question, updateSurveyQuestionDto.question));

    if (surveyQuestionsToFind.length) {
      throw new HttpException('Question already exists', 400);
    }

    const updatedSurveyQuestions = await db
      .update(surveyQuestion)
      .set({
        question: updateSurveyQuestionDto.question,
        description: updateSurveyQuestionDto.description,
        inputLabel: updateSurveyQuestionDto.inputLabel,
        surveyQuestionInputType:
          updateSurveyQuestionDto.surveyQuestionInputType,
        surveyQuestionType: updateSurveyQuestionDto.surveyQuestionType,
      })
      .where(eq(surveyQuestion.id, id))
      .returning();

    if (!updatedSurveyQuestions.length) {
      throw new HttpException('Survey question not found', 404);
    }

    const updatedSurveyQuestion = updatedSurveyQuestions[0];

    return updatedSurveyQuestion;
  }

  async remove(id: number) {
    const deletedSurveyQuestions = await db
      .delete(surveyQuestion)
      .where(eq(surveyQuestion.id, id))
      .returning();

    if (!deletedSurveyQuestions.length) {
      throw new HttpException('Survey question not found', 404);
    }

    const deletedSurveyQuestion = deletedSurveyQuestions[0];

    return deletedSurveyQuestion;
  }
}
