import { JwtResponseDto } from '@ddays-app/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { db } from 'db';
import { company } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async companyPasswordLogin(
    username: string,
    password: string,
  ): Promise<JwtResponseDto> {
    const [loginCompany] = await db
      .select({
        id: company.id,
        username: company.username,
        name: company.name,
        password: company.password,
      })
      .from(company)
      .where(eq(company.username, username));

    if (!loginCompany) {
      throw new BadRequestException('Company not found');
    }

    if (password !== loginCompany.password) {
      throw new BadRequestException('Password does not match');
    }

    const accessToken = this.jwtService.sign({
      id: loginCompany.id,
      username: loginCompany.username,
      name: loginCompany.name,
    });

    return { accessToken };
  }
}
