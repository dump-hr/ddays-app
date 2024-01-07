import { IsEnum, IsNumber, IsString } from 'class-validator';

type EventThemeType = 'dev' | 'design' | 'tech' | 'marketing';

export const getInterestDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class InterestDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    theme: EventThemeType;

    @IsNumber()
    @ApiProperty()
    id: number;
  }

  return InterestDto;
};
