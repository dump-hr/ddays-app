import { IsNumber, IsOptional, IsString } from 'class-validator';

export type SwagBagDto = {
  id: number;
  companyId: number;
  name: string;
  quantity: number;
};

export class SwagBagModifyDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  companyId: number;
}

export class SwagBagModifyToCompanyDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  companyId?: number;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;
}
