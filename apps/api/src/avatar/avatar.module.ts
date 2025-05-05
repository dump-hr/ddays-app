import { Module } from '@nestjs/common';
import { BlobModule } from 'src/blob/blob.module';
import { BlobService } from 'src/blob/blob.service';
import { PrismaService } from 'src/prisma.service';

import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';

@Module({
  controllers: [AvatarController],
  providers: [AvatarService, PrismaService, BlobService],
  imports: [BlobModule],
})
export class AvatarModule {}
