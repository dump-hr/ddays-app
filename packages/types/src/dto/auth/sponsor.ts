import { IsNotEmpty, IsString } from 'class-validator';

export const getSponsorLoginDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class SponsorLoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    // @IsStrongPassword()
    password: string;
  }

  return SponsorLoginDto;
};
