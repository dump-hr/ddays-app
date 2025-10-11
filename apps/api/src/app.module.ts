import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
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
import { UserModule } from './user/user.module';

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
    CodeModule,
    EmailModule,
    AvatarModule,
    RatingModule,
    PotentialSponsorModule,
    SponsorMaterialsModule,
    SponsorContractModule,

    ...(process.env.NODE_ENV !== 'dev'
      ? [
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'web', 'dist'),
            exclude: [
              '/api/(.*)',
              '/app/(.*)',
              '/sponsor/(.*)',
              '/admin/(.*)',
              '/admin-old/(.*)',
            ],
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
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'admin-old', 'dist'),
            serveRoot: '/admin-old',
          }),
        ]
      : []),

    BoothModule,
    ShopModule,
    UserModule,
    LeaderboardModule,
    RewardModule,
    AvatarModule,
    PrinterModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
