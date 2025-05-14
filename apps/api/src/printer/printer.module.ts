import { Module } from '@nestjs/common';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PrinterController],
  providers: [PrinterService, PrismaService],
  exports: [PrinterService],
})
export class PrinterModule {}