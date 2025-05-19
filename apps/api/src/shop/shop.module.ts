import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { BlobModule } from 'src/blob/blob.module';
import { BlobService } from 'src/blob/blob.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService, PrismaService, BlobService],
  imports: [BlobModule]
})
export class ShopModule {}
