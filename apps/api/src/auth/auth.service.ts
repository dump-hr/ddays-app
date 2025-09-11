import {
  AchievementNames,
  JwtResponseDto,
  RegistrationDto,
} from '@ddays-app/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
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
        isFromGoogleAuth: true,
      },
    });

    if (!loginUser) {
      throw new BadRequestException('Korisnik nije pronađen!');
    }

    const passwordsMatch = await compare(password, loginUser.password);

    if (loginUser.isFromGoogleAuth) {
      throw new BadRequestException('Korisnik je prijavljen putem Google-a!');
    }

    if (!passwordsMatch && !loginUser.isFromGoogleAuth) {
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

  async userRegister(
    register: RegistrationDto,
    isFromGoogleAuth: boolean,
  ): Promise<JwtResponseDto> {
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
        isConfirmed: isFromGoogleAuth ? true : false,
        isFromGoogleAuth,
      },
    });

    await this.prisma.userToInterest.createMany({
      data: register.interests.map((interest) => ({
        userId: newUser.id,
        interestId: interest.id,
      })),
    });

    if (!isFromGoogleAuth) {
      await this.emailService.sendEmailConfirmation(newUser.email);
    }

    const accessToken = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });

    await this.achievementService.completeAchievementByName(
      newUser.id,
      AchievementNames.FirstSteps,
    );

    const EARLY_BIRD_CUTOFF = new Date('2025-05-10T22:00:00.000Z'); // 10.5.2024 00:00 CEST
    const currentTime = new Date();

    const isEarlyBird = currentTime < EARLY_BIRD_CUTOFF;

    if (isEarlyBird) {
      await this.achievementService.completeAchievementByName(
        newUser.id,
        AchievementNames.EarlyBird,
      );
    }

    if (register.newsletterEnabled) {
      await this.achievementService.completeAchievementByName(
        newUser.id,
        AchievementNames.WhatsNew,
      );
    }

    return { accessToken };
  }

  async getUserById(id: number) {
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

  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async verifyGoogleToken(
    idToken: string,
  ): Promise<RegistrationDto | JwtResponseDto> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new Error('Google token has no email');
    }

    const email = payload.email;

    const existingUser = await this.prisma.user.findFirst({
      where: { email, isDeleted: false },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (existingUser) {
      const accessToken = this.jwtService.sign({
        id: existingUser.id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
      });

      return { accessToken };
    }

    const plainRandomPassword = randomBytes(12).toString('hex');

    const newUserData: RegistrationDto = {
      email: payload.email,
      firstName: payload.given_name || '',
      lastName: payload.family_name || '',
      profilePhotoUrl: null,
      password: plainRandomPassword,
      phoneNumber: '',
      birthYear: null,
      educationDegree: null,
      occupation: null,
      newsletterEnabled: false,
      companiesNewsEnabled: false,
      termsAndConditionsEnabled: false,
      interests: [],
      isFromGoogleAuth: true,
    };

    return newUserData;
  }

  // async handleGoogleCallback(
  //   idToken: string,
  // ): Promise<{ redirectUrl: string }> {
  //   if (!idToken) {
  //     return { redirectUrl: '/app/login?error=missing_token' };
  //   }

  //   try {
  //     const userData = await this.verifyGoogleToken(idToken);

  //     if ('accessToken' in userData) {
  //       // Existing user → redirect to home with JWT
  //       return { redirectUrl: `/app?accessToken=${userData.accessToken}` };
  //     } else {
  //       // New user → redirect to registration with Google data
  //       const encodedUserData = encodeURIComponent(JSON.stringify(userData));
  //       return {
  //         redirectUrl: `/app/register?googleAuth=true&userData=${encodedUserData}`,
  //       };
  //     }
  //   } catch (err) {
  //     console.error('Google Auth Callback Error:', err);
  //     return { redirectUrl: '/app/login?error=google_auth_failed' };
  //   }
  // }
}
