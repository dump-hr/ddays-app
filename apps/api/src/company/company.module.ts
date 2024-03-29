import { Module } from '@nestjs/common';
import { BlobModule } from 'src/blob/blob.module';
import { BlobService } from 'src/blob/blob.service';
import { InterestModule } from 'src/interest/interest.module';
import { InterestService } from 'src/interest/interest.service';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, BlobService, InterestService],
  imports: [BlobModule, InterestModule],
})
export class CompanyModule {}
