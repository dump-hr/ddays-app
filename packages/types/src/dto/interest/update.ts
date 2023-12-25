import { EventTheme } from '@src/model';
import { IsEnum, IsString } from 'class-validator';

export const getUpdateInterestDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class UpdateInterestDto {
    @IsString()
    @ApiProperty({ required: false })
    name?: string;

    @IsEnum(EventTheme)
    @ApiProperty({ enum: EventTheme })
    theme?: EventTheme;
  }

  return UpdateInterestDto;
};
