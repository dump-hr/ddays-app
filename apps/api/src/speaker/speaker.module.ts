import { Module } from '@nestjs/common';
import { BlobModule } from 'src/blob/blob.module';
import { BlobService } from 'src/blob/blob.service';
import { PrismaService } from 'src/prisma.service';

import { SpeakerController } from './speaker.controller';
import { SpeakerService } from './speaker.service';

@Module({
  controllers: [SpeakerController],
  providers: [SpeakerService, PrismaService, BlobService],
  imports: [BlobModule],
})
export class SpeakerModule {}
