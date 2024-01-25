import { Module } from '@nestjs/common';

import { SurveyQuestionController } from './survey-question.controller';
import { SurveyQuestionService } from './survey-question.service';

@Module({
  controllers: [SurveyQuestionController],
  providers: [SurveyQuestionService],
})
export class SurveyQuestionModule {}
