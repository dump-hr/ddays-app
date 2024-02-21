import { JobModifyForCompanyDto } from '@ddays-app/types';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class JobsModifyForCompanyDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JobModifyForCompanyDto)
  jobs: JobModifyForCompanyDto[];
}
