import { Module } from '@nestjs/common';

import { AchievementModule } from './achievement/achievement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { EventsModule } from './events/events.module';
import { FrequentlyAskedQuestionModule } from './frequentlyAskedQuestion/frequentlyAskedQuestion.module';
import { SurveyQuestionsModule } from './surveyQuestions/surveyQuestions.module';

@Module({
  imports: [
    AchievementModule,
    CompaniesModule,
    EventsModule,
    FrequentlyAskedQuestionModule,
    SurveyQuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
