import { SwagBagModifyToCompanyDto } from '@ddays-app/types';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class SwagBagsModifyForCompanyDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SwagBagModifyToCompanyDto)
  swagBags: SwagBagModifyToCompanyDto[];
}
