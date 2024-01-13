import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export const getSponsorLoginDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class SponsorLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsString()
    // @IsStrongPassword()
    @ApiProperty()
    password: string;
  }

  return SponsorLoginDto;
};
