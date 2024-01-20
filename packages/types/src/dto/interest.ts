import { Theme } from '../enum';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export type InterestDto = {
  id: number;
  name: string;
  theme: `${Theme}`;
};

export class InterestModifyDto {
  @IsString()
  name: string;

  @IsEnum(Theme)
  theme: Theme;
}

export class InterestConnectToCompanyDto {
  @IsArray()
  @IsNumber(null, { each: true })
  interestIds: number[];
}
