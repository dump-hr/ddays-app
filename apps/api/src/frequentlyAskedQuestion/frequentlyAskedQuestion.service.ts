import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { frequentlyAskedQuestion } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable
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

	async remove(id: number) {
    const deletedFrequentlyAskedQuestion = await db
      .delete(frequentlyAskedQuestion)
      .where(eq(frequentlyAskedQuestion.id, id))
      .returning();

    return deletedFrequentlyAskedQuestion;
	}
}
