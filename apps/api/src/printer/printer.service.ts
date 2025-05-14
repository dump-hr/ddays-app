import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrinterAssignmentDto, UserToPrinterDto } from './printer.dto';

@Injectable()
export class PrinterService {
  constructor(private prisma: PrismaService) {}

  async assignUserToPrinter(
    dto: PrinterAssignmentDto,
  ): Promise<UserToPrinterDto> {
    await this.prisma.userToPrinter.deleteMany({
      where: {
        printerId: dto.printerId,
      },
    });

    const assignment = await this.prisma.userToPrinter.create({
      data: {
        userId: dto.userId,
        printerId: dto.printerId,
      },
    });

    return assignment;
  }

  async getCurrentPrinterAssignments(): Promise<UserToPrinterDto[]> {
    return this.prisma.userToPrinter.findMany();
  }

  async getCurrentPrintData(printerId: number): Promise<UserToPrinterDto> {
    return this.prisma.userToPrinter.findFirst({
      where: {
        printerId,
      },
      include: {
        user: true,
      },
    });
  }
}
