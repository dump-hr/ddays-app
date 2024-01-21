import { IsString } from 'class-validator';

export type JwtResponseDto = {
  accessToken: string;
};

export type JwtPayload = {
  id: number;
  name: string;
  username: string;
};

export enum Role {
  User = 'User',
  Sponsor = 'Sponsor',
  Printer = 'Printer',
  Member = 'Member',
  Admin = 'Admin',
}

export class CompanyPasswordLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
