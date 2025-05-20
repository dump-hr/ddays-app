import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CompanyCategory } from '../enum';

export class BoothAvailabilityUpdateDto {
  id: number;
  isAvailable: boolean;
}

export class BoothPublicDto {
  id: number;
  name: string;
  isTaken: boolean;
}

export class BoothDto {
  id: number;
  name: string;
  companyId?: number;
  category: `${CompanyCategory}`;
}

export class BoothCreateManyDto {
  @IsEnum(CompanyCategory)
  category: CompanyCategory;

  @IsNumber()
  amount: number;
}

export class BoothModifyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(CompanyCategory)
  category?: CompanyCategory;

  @IsOptional()
  @IsNumber()
  companyId?: number;
}

export class BoothModifyFormDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(CompanyCategory)
  category?: CompanyCategory;

  @IsOptional()
  @IsString()
  companyName?: string;
}
