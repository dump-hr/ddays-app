import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PrinterService } from './printer.service';
import { PrinterAssignmentDto, UserToPrinterDto } from './printer.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('printers')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Post('assign')
  @UseGuards(AdminGuard)
  async assignUserToPrinter(
    @Body() dto: PrinterAssignmentDto,
  ): Promise<UserToPrinterDto> {
    return this.printerService.assignUserToPrinter(dto);
  }

  @Get(':id/print-data')
  @UseGuards(AdminGuard)
  async getCurrentPrintData(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserToPrinterDto> {
    return this.printerService.getCurrentPrintData(id);
  }
}
