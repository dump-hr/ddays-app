import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Tier } from 'src/enum';

export type SwagBagDto = {
  id: number;
  companyId: number;
  name: string;
  quantity: number;
};

export type SwagBagWithCompanyDto = SwagBagDto & {
  companyName: string;
  companyTier: Tier;
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
