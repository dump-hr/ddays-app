import { Module } from '@nestjs/common';

import { AchievementModule } from './achievement/achievement.module';
import { FrequentlyAskedQuestionModule } from './frequentlyAskedQuestion/frequentlyAskedQuestion.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { EventsModule } from './events/events.module';

@Module({
<<<<<<< HEAD
  imports: [AchievementModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})

@Module({
  imports: [AchievementModule, EventsModule],
=======
  imports: [AchievementModule, FrequentlyAskedQuestionModule],
>>>>>>> 091cd81 (added module, just created service and controller)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
