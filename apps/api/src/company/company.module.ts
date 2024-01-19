import { Module } from '@nestjs/common';
import { BlobModule } from 'src/blob/blob.module';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [BlobModule],
})
export class CompanyModule {}
