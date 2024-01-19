import { Module } from '@nestjs/common';

import { FrequentlyAskedQuestionController } from './frequently-asked-question.controller';
import { FrequentlyAskedQuestionService } from './frequently-asked-question.service';

@Module({
  imports: [],
  controllers: [FrequentlyAskedQuestionController],
  providers: [FrequentlyAskedQuestionService],
})
export class FrequentlyAskedQuestionModule {}
