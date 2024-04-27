import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CompanyCategory } from 'src/enum';

export class BoothDto {
  id: number;
  name: string;
  isTaken: boolean;
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
  @IsNumber()
  companyId?: number;
}
