import { Module } from '@nestjs/common';
import { BlobModule } from 'src/blob/blob.module';

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [BlobModule],
})
export class CompaniesModule {}
