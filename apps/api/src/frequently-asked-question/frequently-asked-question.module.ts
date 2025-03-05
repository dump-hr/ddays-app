import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { FrequentlyAskedQuestionController } from './frequently-asked-question.controller';
import { FrequentlyAskedQuestionService } from './frequently-asked-question.service';

@Module({
  imports: [],
  controllers: [FrequentlyAskedQuestionController],
  providers: [FrequentlyAskedQuestionService, PrismaService],
})
export class FrequentlyAskedQuestionModule {}
