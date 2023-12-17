import { Module } from '@nestjs/common';

import { FrequentlyAskedQuestionController } from './frequentlyAskedQuestion.controller';
import { FrequentlyAskedQuestionService } from './frequentlyAskedQuestion.service';

@Module({
  imports: [],
  controllers: [FrequentlyAskedQuestionController],
  providers: [FrequentlyAskedQuestionService],
})
export class FrequentlyAskedQuestionModule {}
