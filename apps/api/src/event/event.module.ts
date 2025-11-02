import { Module } from '@nestjs/common';
import { BlobService } from 'src/blob/blob.service';
import { PrismaService } from 'src/prisma.service';

import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventScheduler } from './event.scheduler';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService, BlobService, EventScheduler],
})
export class EventModule {}
