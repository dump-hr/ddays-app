import { EventTheme } from '@src/model';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

export type eventThemeType = 'dev' | 'design' | 'tech' | 'marketing';

export const getInterestDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class InterestDto {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    name: string;

    @IsEnum(EventTheme)
    @ApiProperty()
    theme: eventThemeType;
  }

  return InterestDto;
};

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
