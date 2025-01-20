import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AchievementModule } from './achievement/achievement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlobModule } from './blob/blob.module';
import { BoothModule } from './booth/booth.module';
import { CompanyModule } from './company/company.module';
import { EventModule } from './event/event.module';
import { FrequentlyAskedQuestionModule } from './frequently-asked-question/frequently-asked-question.module';
import { InterestModule } from './interest/interest.module';
import { JobModule } from './job/job.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaService } from './prisma.service';
import { SpeakerModule } from './speaker/speaker.module';
import { SurveyQuestionModule } from './survey-question/survey-question.module';

@Module({
  imports: [
    BlobModule,
    AuthModule,
    AchievementModule,
    CompanyModule,
    EventModule,
    FrequentlyAskedQuestionModule,
    InterestModule,
    SurveyQuestionModule,
    NotificationModule,
    JobModule,
    SpeakerModule,

    ...(process.env.NODE_ENV !== 'dev'
      ? [
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'web', 'dist'),
            exclude: ['/api/(.*)', '/app/(.*)', '/sponsor/(.*)', '/admin/(.*)'],
          }),
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'app', 'dist'),
            serveRoot: '/app',
          }),
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'sponsor', 'dist'),
            serveRoot: '/sponsor',
          }),
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'admin', 'dist'),
            serveRoot: '/admin',
          }),
        ]
      : []),

    BoothModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
