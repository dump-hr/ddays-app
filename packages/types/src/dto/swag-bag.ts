import { IsNumber, IsString } from 'class-validator';

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
