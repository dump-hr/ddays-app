import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { BoothController } from './booth.controller';
import { BoothGateway } from './booth.gateway';
import { BoothService } from './booth.service';

@Module({
  exports: [],
  controllers: [BoothController],
  providers: [BoothService, BoothGateway, PrismaService],
})
export class BoothModule {}
