import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CompanyCategory } from 'src/enum';

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

export class BoothCreateDto {
  @IsEnum(CompanyCategory)
  category: CompanyCategory;

  @IsString()
  name: string;
}

export class BoothCreateManyDto {
  @IsEnum(CompanyCategory)
  category: CompanyCategory;

  @IsNumber()
  amount: number;
}

export class BoothUpdateDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(CompanyCategory)
  category?: CompanyCategory;

  @IsOptional()
  @IsNumber()
  companyId?: number;
}
