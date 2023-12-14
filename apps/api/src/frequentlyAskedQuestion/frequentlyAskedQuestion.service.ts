import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { frequentlyAskedQuestion } from 'db/schema';
import { eq } from 'drizzle-orm';
import { CreateFrequentlyAskedQuestionDto } from './dto/create-frequentlyAskedQuestion.dto';
import { UpdateFrequentlyAskedQuestionDto } from './dto/update-frequentlyAskedQuestion.dto';

@Injectable()
export class FrequentlyAskedQuestionService {
  async getAll() {
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

  async create(
    createFrequentlyAskedQuestionDto: CreateFrequentlyAskedQuestionDto,
  ) {
    const createdFrequentlyAskedQuestion = await db
      .insert(frequentlyAskedQuestion)
      .values({
        question: createFrequentlyAskedQuestionDto.question,
        answer: createFrequentlyAskedQuestionDto.answer,
      })
      .returning();

    return createdFrequentlyAskedQuestion;
  }

  async update(
    id: number,
    updateFrequentlyAskedQuestionDto: UpdateFrequentlyAskedQuestionDto,
  ) {
    const updatedFrequentlyAskedQuestion = await db
      .update(frequentlyAskedQuestion)
      .set({
        question: updateFrequentlyAskedQuestionDto.question,
        answer: updateFrequentlyAskedQuestionDto.answer,
      })
      .where(eq(frequentlyAskedQuestion.id, id))
      .returning();

    return updatedFrequentlyAskedQuestion;
  }

  async remove(id: number) {
    const deletedFrequentlyAskedQuestion = await db
      .delete(frequentlyAskedQuestion)
      .where(eq(frequentlyAskedQuestion.id, id))
      .returning();

    return deletedFrequentlyAskedQuestion;
  }
}
