import { Module } from '@nestjs/common';
import { BlobModule } from 'src/blob/blob.module';
import { BlobService } from 'src/blob/blob.service';
import { InterestModule } from 'src/interest/interest.module';
import { InterestService } from 'src/interest/interest.service';

import { TestExceptionController } from './testException.controller';
import { TestExceptionService } from './testException.service';

@Module({
  controllers: [TestExceptionController],
  providers: [TestExceptionService, BlobService, InterestService],
  imports: [BlobModule, InterestModule],
})
export class TestExceptionModule {}
