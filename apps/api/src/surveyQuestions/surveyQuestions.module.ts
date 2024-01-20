import { Module } from '@nestjs/common';

import { SurveyQuestionsController } from './surveyQuestions.controller';
import { SurveyQuestionsService } from './surveyQuestions.service';

@Module({
  controllers: [SurveyQuestionsController],
  providers: [SurveyQuestionsService],
})
export class SurveyQuestionsModule {}
