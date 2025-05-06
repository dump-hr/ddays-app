import {
  AchievementNames,
  JwtResponseDto,
  RegistrationDto,
} from '@ddays-app/types';
import { UserPublicDto } from '@ddays-app/types/src/dto/user';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { compare } from 'bcrypt';
import { AchievementService } from 'src/achievement/achievement.service';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly achievementService: AchievementService,
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
    const loginUser = await this.prisma.user.findFirst({
      where: {
        email,
        isDeleted: false,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        isDeleted: true,
      },
    });

    if (!loginUser) {
      throw new BadRequestException('Korisnik nije pronađen!');
    }

    const passwordsMatch = await compare(password, loginUser.password);

    if (!passwordsMatch) {
      throw new BadRequestException('Neispravna lozinka!');
    }

    const accessToken = this.jwtService.sign({
      id: loginUser.id,
      email: loginUser.email,
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
    });

    return { accessToken };
  }

  async userRegister(register: RegistrationDto): Promise<JwtResponseDto> {
    const existingActivePhoneUser = await this.prisma.user.findFirst({
      where: {
        phoneNumber: register.phoneNumber,
        isDeleted: false,
      },
    });

    if (existingActivePhoneUser) {
      throw new BadRequestException(
        'Korisnik sa ovim brojem telefona već postoji!',
      );
    }

    const existingActiveEmailUser = await this.prisma.user.findFirst({
      where: {
        email: register.email,
        isDeleted: false,
      },
    });

    if (existingActiveEmailUser) {
      throw new BadRequestException('Korisnik sa ovim emailom već postoji!');
    }

    const saltRounds = 10;
    const hashedPassword = await hash(register.password, saltRounds);

    const registerWithoutInterests = { ...register };
    delete registerWithoutInterests.interests;

    const newUser = await this.prisma.user.create({
      data: {
        ...registerWithoutInterests,
        isDeleted: false,
        password: hashedPassword,
        isConfirmed: false,
      },
    });

    await this.prisma.userToInterest.createMany({
      data: register.interests.map((interest) => ({
        userId: newUser.id,
        interestId: interest.id,
      })),
    });

    await this.emailService.sendEmailConfirmation(newUser.email);

    const accessToken = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });

    const EARLY_BIRD_CUTOFF = new Date('2025-05-09T22:00:00.000Z'); // 10.5.2024 00:00 CEST
    const currentTime = new Date();

    const isEarlyBird = currentTime < EARLY_BIRD_CUTOFF;

    console.log('isEarlyBird', isEarlyBird, currentTime, EARLY_BIRD_CUTOFF);

    if (isEarlyBird) {
      await this.achievementService.completeAchievementByName(
        newUser.id,
        AchievementNames.EarlyBird,
      );
    }

    return { accessToken };
  }

  async getUserById(id: number): Promise<UserPublicDto> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        birthYear: true,
        educationDegree: true,
        occupation: true,
        newsletterEnabled: true,
        companiesNewsEnabled: true,
        isConfirmed: true,
        isDeleted: true,
        points: true,
        profilePhotoUrl: true,
      },
    });
  }
}
