import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { SurveyQuestionController } from './survey-question.controller';
import { SurveyQuestionService } from './survey-question.service';

@Module({
  controllers: [SurveyQuestionController],
  providers: [SurveyQuestionService, PrismaService],
})
export class SurveyQuestionModule {}
