import { Module } from '@nestjs/common';
import { AchievementModule } from './achievement/achievement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [AchievementModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
