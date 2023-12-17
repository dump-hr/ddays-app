import { SurveyQuestionType } from '../../../../packages/types/src/model/surveyQuestion';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { surveyQuestion } from 'db/schema';
import { eq } from 'drizzle-orm';

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

  async getAllOfType(type: string) {
    const surveyQuestions = await db
      .select({
        id: surveyQuestion.id,
        question: surveyQuestion.question,
        description: surveyQuestion.description,
        inputLabel: surveyQuestion.inputLabel,
        surveyQuestionInputType: surveyQuestion.surveyQuestionInputType,
        surveyQuestionType: surveyQuestion.surveyQuestionType,
      })
      .from(surveyQuestion);
    // .where(eq(surveyQuestion.surveyQuestionType, type));

    return surveyQuestions;
  }
}
