import { EventTheme } from '@src/model';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

export type eventThemeType = 'dev' | 'design' | 'tech' | 'marketing';

export const getInterestDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class InterestDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsEnum(EventTheme)
    theme: eventThemeType;
  }

  return InterestDto;
};

export const getSponsorInterestDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class SponsorInterestDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsEnum(EventTheme)
    theme: EventTheme;

    @IsBoolean()
    isActive: boolean;
  }

  return SponsorInterestDto;
};
