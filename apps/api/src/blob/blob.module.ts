import { Module } from '@nestjs/common';

import { BlobService } from './blob.service';

@Module({
  controllers: [],
  providers: [BlobService],
  exports: [BlobService],
})
export class BlobModule {}
