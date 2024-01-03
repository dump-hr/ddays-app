import { Module } from '@nestjs/common';

import { AchievementModule } from './achievement/achievement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { EventsModule } from './events/events.module';
import { FrequentlyAskedQuestionModule } from './frequentlyAskedQuestion/frequentlyAskedQuestion.module';
import { InterestsModule } from './interests/interests.module';
import { NotificationModule } from './notification/notification.module';
import { SurveyQuestionsModule } from './surveyQuestions/surveyQuestions.module';

@Module({
  imports: [
    AuthModule,
    AchievementModule,
    CompaniesModule,
    EventsModule,
    FrequentlyAskedQuestionModule,
    InterestsModule,
    SurveyQuestionsModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
