import { Module } from '@nestjs/common';
import { FrequentlyAskedQuestionService } from './frequentlyAskedQuestion.service';
import { FrequentlyAskedQuestionController } from './frequentlyAskedQuestion.controller';

@Module({
  imports: [],
  controllers: [FrequentlyAskedQuestionController],
  providers: [FrequentlyAskedQuestionService],
})
export class FrequentlyAskedQuestionModule {}
