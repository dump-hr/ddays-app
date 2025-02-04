import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  controllers: [JobController],
  providers: [JobService, PrismaService],
})
export class JobModule {}
