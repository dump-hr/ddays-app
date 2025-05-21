import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';

@Module({
  controllers: [PrinterController],
  providers: [PrinterService, PrismaService],
  exports: [PrinterService],
})
export class PrinterModule {}
