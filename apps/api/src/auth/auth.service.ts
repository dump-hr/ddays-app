import {
  AchievementNames,
  ISO,
  JwtResponseDto,
  RegistrationDto,
} from '@ddays-app/types';
import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
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

  private readonly logger = new Logger(AuthService.name);

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
      this.logger.warn(
        `Company login failed - company not found for username: ${username}`,
      );
      throw new BadRequestException('Company not found');
    }

    if (password !== loginCompany.password) {
      this.logger.warn(
        `Company login failed - invalid password for username: ${username}`,
      );
      throw new BadRequestException('Password does not match');
    }

    const accessToken = this.jwtService.sign({
      id: loginCompany.id,
      username: loginCompany.username,
      name: loginCompany.name,
    });

    this.logger.log(
      `Company login success for username: ${username}, ID: ${loginCompany.id}`,
    );

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
      this.logger.warn(
        `User login failed - user not found for email: ${email}`,
      );
      throw new BadRequestException('Korisnik nije pronađen!');
    }

    const passwordsMatch = await compare(password, loginUser.password);

    if (loginUser.isFromGoogleAuth) {
      this.logger.warn(
        `User login failed - user is from Google Auth for email: ${email}`,
      );
      throw new BadRequestException('Korisnik je prijavljen putem Google-a!');
    }

    if (!passwordsMatch && !loginUser.isFromGoogleAuth) {
      this.logger.warn(
        `User login failed - invalid password for email: ${email}`,
      );
      throw new BadRequestException('Neispravna lozinka!');
    }

    const accessToken = this.jwtService.sign({
      id: loginUser.id,
      email: loginUser.email,
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
    });

    this.logger.log(
      `User login success for email: ${email}, ID: ${loginUser.id}`,
    );

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
      this.logger.warn(
        `User register failed for ${register.email} - phone collision: ${register.phoneNumber}`,
      );
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
      this.logger.warn(
        `User register failed for ${register.email} - email collision: ${register.email}`,
      );
      throw new BadRequestException('Korisnik sa ovim emailom već postoji!');
    }

    if (register.inviteCode?.length > 0) {
      const inviteCode = await this.prisma.user.findFirst({
        select: {
          inviteCode: true,
        },
        where: {
          inviteCode: register.inviteCode,
        },
      });

      if (!inviteCode) {
        this.logger.warn(
          `User register failed for ${register.email} - invalid invite code: ${register.inviteCode}`,
        );
        throw new BadRequestException('Uneseni kod nije validan!');
      }

      register.isInvited = true;
    } else register.isInvited = false;

    const saltRounds = 10;
    const hashedPassword = await hash(register.password, saltRounds);

    let retryCount = 0;
    const maxRetries = 10;
    let newUser;

    while (retryCount < maxRetries) {
      try {
        newUser = await this.prisma.user.create({
          data: {
            email: register.email,
            firstName: register.firstName,
            lastName: register.lastName,
            profilePhotoUrl: register.profilePhotoUrl,
            phoneNumber: register.phoneNumber,
            birthYear: register.birthYear,
            educationDegree: register.educationDegree,
            occupation: register.occupation,
            newsletterEnabled: register.newsletterEnabled,
            companiesNewsEnabled: register.companiesNewsEnabled,
            isDeleted: false,
            password: hashedPassword,
            isConfirmed: isFromGoogleAuth ? true : false,
            isFromGoogleAuth,
            inviteCode: this.generateInviteCode(),
            isInvited: register.isInvited,
          },
        });

        break;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            const target = error.meta?.target as string[];
            if (target && target.includes('inviteCode')) {
              retryCount++;
              this.logger.warn(
                `Invite code collision detected for code: ${newUser?.inviteCode}. Retrying... (${retryCount})`,
              );
              continue;
            }
          }
        }
        throw error;
      }
    }

    if (!newUser) {
      this.logger.error(
        `User register failed for ${register.email} - could not create user (max retries exceeded for invite code)`,
      );
      throw new ServiceUnavailableException(
        'Trenutno se nije moguće registrirati, pokušajte ponovno malo kasnije.',
      );
    }

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

    if (newUser.isInvited && register.inviteCode) {
      const referrer = await this.prisma.user.update({
        where: { inviteCode: register.inviteCode },
        data: {
          numberOfInvitations: {
            increment: 1,
          },
        },
        select: {
          id: true,
          numberOfInvitations: true,
        },
      });

      try {
        if (referrer?.numberOfInvitations == 1) {
          await this.achievementService.completeAchievementByName(
            referrer.id,
            AchievementNames.Invite1,
            true,
          );
        }

        if (referrer?.numberOfInvitations == 3) {
          await this.achievementService.completeAchievementByName(
            referrer.id,
            AchievementNames.Invite3,
            true,
          );
        }

        if (referrer?.numberOfInvitations == 5) {
          await this.achievementService.completeAchievementByName(
            referrer.id,
            AchievementNames.Invite5,
            true,
          );
        }
      } catch (error) {
        this.logger.error(
          `Failed to award invite code achievements: ${error}, referrer id: ${referrer?.id}`,
        );
      }
    }

    await this.achievementService.completeAchievementByName(
      newUser.id,
      AchievementNames.FirstSteps,
    );

    const EARLY_BIRD_CUTOFF = new Date(ISO.EARLY_BIRD_CUTOFF_API);
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

    this.logger.log(
      `User register success for email: ${newUser.email}, ID: ${newUser.id}`,
    );

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
        inviteCode: true,
        isFromGoogleAuth: true,
        avatar: {
          select: {
            color: true,
            face: true,
            accessory: true,
            body: true,
          },
        },
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
      this.logger.warn('Google token has no email in payload');
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

      this.logger.log('Login with google success for: ' + existingUser.email);

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

    this.logger.log('Google registration initiated for: ' + newUserData.email);

    return newUserData;
  }

  async handleGoogleCallback(
    idToken: string,
  ): Promise<{ redirectUrl: string }> {
    if (!idToken) {
      this.logger.warn('Google callback failed - missing token');
      return { redirectUrl: '/app/login?error=missing_token' };
    }

    try {
      const userData = await this.verifyGoogleToken(idToken);

      if ('accessToken' in userData) {
        this.logger.log(
          `Google login success for email: ${(userData as any).email || 'unknown'}`,
        );
        return { redirectUrl: `/app?accessToken=${userData.accessToken}` };
      } else {
        this.logger.log(
          `Google registration initiated (redirecting to form) for email: ${userData.email}`,
        );
        const encodedUserData = encodeURIComponent(JSON.stringify(userData));
        return {
          redirectUrl: `/app/register?googleAuth=true&userData=${encodedUserData}`,
        };
      }
    } catch (err) {
      this.logger.error('Google Auth Callback Error:', err);
      return { redirectUrl: '/app/login?error=google_auth_failed' };
    }
  }

  generateInviteCode(): string {
    return randomBytes(3).toString('hex').toUpperCase();
  }
}
