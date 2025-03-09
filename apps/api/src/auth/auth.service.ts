import { JwtResponseDto } from '@ddays-app/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async companyPasswordLogin(
    username: string,
    password: string,
  ): Promise<JwtResponseDto> {
    const loginCompany = await this.prisma.company.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        name: true,
        password: true,
      },
    });

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
