import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

import { AchievementModule } from './achievement/achievement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { BlobModule } from './blob/blob.module';
import { BoothModule } from './booth/booth.module';
import { CodeModule } from './code/code.module';
import { CompanyModule } from './company/company.module';
import { EmailModule } from './email/email.module';
import { EventModule } from './event/event.module';
import { FrequentlyAskedQuestionModule } from './frequently-asked-question/frequently-asked-question.module';
import { InterestModule } from './interest/interest.module';
import { JobModule } from './job/job.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { MetricsModule } from './metrics/metrics.module';
import { NotificationModule } from './notification/notification.module';
import { PotentialSponsorModule } from './potential-sponsor/potential-sponsor.module';
import { PrinterModule } from './printer/printer.module';
import { PrismaService } from './prisma.service';
import { RatingModule } from './rating/rating.module';
import { RewardModule } from './reward/reward.module';
import { ShopModule } from './shop/shop.module';
import { SpeakerModule } from './speaker/speaker.module';
import { SponsorContractModule } from './sponsor-contract/sponsor-contract.module';
import { SponsorMaterialsModule } from './sponsor-materials/sponsor-materials.module';
import { SurveyQuestionModule } from './survey-question/survey-question.module';
import { SwagBagModule } from './swag-bag/swag-bag.module';
import { CustomThrottlerGuard } from './throttler/throttler.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    CodeModule,
    EmailModule,
    AvatarModule,
    RatingModule,
    PotentialSponsorModule,
    SponsorMaterialsModule,
    SponsorContractModule,
    MetricsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 30000,
        limit: 100,
      },
    ]),

    ...(process.env.NODE_ENV !== 'dev'
      ? [
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'web', 'dist'),
            exclude: ['/api/(.*)', '/app/(.*)', '/sponsor/(.*)', '/admin/(.*)'],
          }),
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'app', 'dist'),
            serveRoot: '/app',
          }),
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'sponsor', 'dist'),
            serveRoot: '/sponsor',
          }),
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'admin', 'dist'),
            serveRoot: '/admin',
          }),
        ]
      : []),

    BoothModule,
    ShopModule,
    UserModule,
    LeaderboardModule,
    RewardModule,
    PrinterModule,
    SwagBagModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
