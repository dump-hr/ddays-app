import { Module } from '@nestjs/common';

import { AchievementModule } from './achievement/achievement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlobModule } from './blob/blob.module';
import { CompaniesModule } from './companies/companies.module';
import { EventsModule } from './events/events.module';
import { FrequentlyAskedQuestionModule } from './frequentlyAskedQuestion/frequentlyAskedQuestion.module';
import { InterestsModule } from './interests/interests.module';
import { JobsModule } from './jobs/jobs.module';
import { NotificationModule } from './notification/notification.module';
import { SurveyQuestionsModule } from './surveyQuestions/surveyQuestions.module';

@Module({
  imports: [
    BlobModule,
    AuthModule,
    AchievementModule,
    CompaniesModule,
    EventsModule,
    FrequentlyAskedQuestionModule,
    InterestsModule,
    SurveyQuestionsModule,
    AuthModule,
    NotificationModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
