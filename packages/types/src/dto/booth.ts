import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CompanyCategory } from 'src/enum';

export class AvailabilityUpdateDto {
  id: number;
  isAvailable: boolean;
}

export class BoothDto {
  id: number;
  name: string;
  isTaken: boolean;
}

export class AdminBoothDto {
  id: number;
  name: string;
  companyId?: number;
  category: CompanyCategory;
}

export class CreateBoothDto {
  @IsEnum(CompanyCategory)
  category: CompanyCategory;
  @IsOptional()
  @IsString()
  name?: string;
}

export class CreateManyBoothsDto {
  @IsEnum(CompanyCategory)
  category: CompanyCategory;
  @IsNumber()
  amount: number;
}

export class ModifyBoothDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(CompanyCategory)
  category?: CompanyCategory;

  @IsOptional()
  @IsNumber()
  companyId?: number;
}

export class ModifyBoothForm {
  name?: string;
  category?: CompanyCategory;
  companyId?: string;
}
