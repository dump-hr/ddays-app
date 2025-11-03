import { Module } from '@nestjs/common';
import { BlobService } from 'src/blob/blob.service';
import { PrismaService } from 'src/prisma.service';

import { EventController } from './event.controller';
import { EventScheduler } from './event.scheduler';
import { EventService } from './event.service';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService, BlobService, EventScheduler],
})
export class EventModule {}
