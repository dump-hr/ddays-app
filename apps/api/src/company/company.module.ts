import { Module } from '@nestjs/common';
import { AchievementService } from 'src/achievement/achievement.service';
import { BlobModule } from 'src/blob/blob.module';
import { BlobService } from 'src/blob/blob.service';
import { BoothGateway } from 'src/booth/booth.gateway';
import { BoothService } from 'src/booth/booth.service';
import { InterestModule } from 'src/interest/interest.module';
import { InterestService } from 'src/interest/interest.service';
import { PrismaService } from 'src/prisma.service';
import { RatingService } from 'src/rating/rating.service';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  providers: [
    CompanyService,
    BlobService,
    InterestService,
    PrismaService,
    RatingService,
    AchievementService,
    BoothService,
    BoothGateway,
  ],
  imports: [BlobModule, InterestModule],
})
export class CompanyModule {}
