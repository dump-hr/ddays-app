import { IsNotEmpty, IsNumber } from 'class-validator';

export class PrinterAssignmentDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  printerId: number;
}

export class UserToPrinterDto {
  id: number;
  userId: number;
  printerId: number;
}
