import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';

import { AchievementModule } from './achievement/achievement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { EventsModule } from './events/events.module';
import { FrequentlyAskedQuestionModule } from './frequentlyAskedQuestion/frequentlyAskedQuestion.module';

@Module({
  imports: [
    AchievementModule,
    CompaniesModule,
    EventsModule,
    FrequentlyAskedQuestionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
