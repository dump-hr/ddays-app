import { EventTheme } from '@src/model';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

export const getSponsorInterestDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class SponsorInterestDto {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    name: string;

    @IsEnum(EventTheme)
    @ApiProperty()
    theme: EventTheme;

    @IsBoolean()
    @ApiProperty()
    isActive: boolean;
  }

  return SponsorInterestDto;
};
