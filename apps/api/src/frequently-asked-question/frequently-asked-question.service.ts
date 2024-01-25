import {
  FrequentlyAskedQuestionDto,
  FrequentlyAskedQuestionModifyDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { frequentlyAskedQuestion } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class FrequentlyAskedQuestionService {
  async create(
    dto: FrequentlyAskedQuestionModifyDto,
  ): Promise<FrequentlyAskedQuestionDto> {
    const [createdFrequentlyAskedQuestion] = await db
      .insert(frequentlyAskedQuestion)
      .values(dto)
      .returning();

    return createdFrequentlyAskedQuestion;
  }

  async getAll(): Promise<FrequentlyAskedQuestionDto[]> {
    const frequentlyAskedQuestions = await db
      .select({
        id: frequentlyAskedQuestion.id,
        question: frequentlyAskedQuestion.question,
        answer: frequentlyAskedQuestion.answer,
      })
      .from(frequentlyAskedQuestion)
      .orderBy(frequentlyAskedQuestion.id);

    return frequentlyAskedQuestions;
  }

  async remove(id: number): Promise<FrequentlyAskedQuestionDto> {
    const [deletedFrequentlyAskedQuestion] = await db
      .delete(frequentlyAskedQuestion)
      .where(eq(frequentlyAskedQuestion.id, id))
      .returning();

    return deletedFrequentlyAskedQuestion;
  }

  async update(
    id: number,
    dto: FrequentlyAskedQuestionModifyDto,
  ): Promise<FrequentlyAskedQuestionDto> {
    const [updatedFrequentlyAskedQuestion] = await db
      .update(frequentlyAskedQuestion)
      .set(dto)
      .where(eq(frequentlyAskedQuestion.id, id))
      .returning();

    return updatedFrequentlyAskedQuestion;
  }
}
