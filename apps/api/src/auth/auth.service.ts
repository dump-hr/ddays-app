import { JwtResponseDto } from '@ddays-app/types';
import { UserDto } from '@ddays-app/types/src/dto/user';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
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

  async userPasswordLogin(
    email: string,
    password: string,
  ): Promise<JwtResponseDto> {
    const loginUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        password: true,
      },
    });

    if (!loginUser) {
      throw new BadRequestException('User not found');
    }

    const passwordsMatch = await compare(password, loginUser.password);

    if (!passwordsMatch) {
      throw new BadRequestException('Password does not match');
    }

    const accessToken = this.jwtService.sign({
      email: loginUser.email,
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
    });

    return { accessToken };
  }

  async userRegister(register: UserDto): Promise<JwtResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: register.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await hash(register.password, saltRounds);

    const newUser = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...register,
      },
    });

    const accessToken = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });

    return { accessToken };
  }
}
