import { AchievementNames, InterestDto } from '@ddays-app/types';
import { UserModifyDto } from '@ddays-app/types/src/dto/user';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AchievementService } from 'src/achievement/achievement.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly achievementService: AchievementService,
  ) {}

  async updateUserProfile(userId: number, data: UserModifyDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
        NOT: {
          id: userId,
        },
        isDeleted: false,
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Korisnik sa tim mail-om ili brojem mobitela već postoji',
      );
    }

    try {
      if (data.newsletterEnabled) {
        await this.achievementService.completeAchievementByName(
          userId,
          AchievementNames.WhatsNew,
        );
      }
    } catch (error) {}

    return this.prisma.user.update({
      where: { id: userId },
      data: { ...data, birthYear: Number(data.birthYear) },
    });
  }

  async updateUserPassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('Korisnik nije pronađen');
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Trenutna lozinka nije ispravna');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    return this.prisma.user.update({
      where: { id: userId },
      data: { password: newPasswordHash },
    });
  }

  async softDeleteUser(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isDeleted: true },
    });
  }

  async updateUserInterests(userId: number, interests: InterestDto[]) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException('Korisnik nije pronađen');
      }

      // First, remove interests that are no longer selected
      await prisma.userToInterest.deleteMany({
        where: {
          userId,
          interestId: {
            notIn: interests.map((interest) => interest.id),
          },
        },
      });

      // Find existing user-to-interest associations
      const existingAssociations = await prisma.userToInterest.findMany({
        where: { userId },
      });

      const existingInterestIds = existingAssociations.map(
        (association) => association.interestId,
      );

      // Filter out the interests that already exist for this user
      const newInterests = interests.filter(
        (interest) => !existingInterestIds.includes(interest.id),
      );

      // Insert only the new interests that aren't already associated
      if (newInterests.length > 0) {
        await prisma.userToInterest.createMany({
          data: newInterests.map((interest) => ({
            userId,
            interestId: interest.id,
          })),
        });
      }

      return prisma.userToInterest.findMany({
        where: { userId },
      });
    });

    return result;
  }

  async resetUserPassword(newPassword: string, token: string) {
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) {
      throw new BadRequestException('Nevažeći token za resetiranje lozinke');
    }

    if (resetToken.expiresAt < new Date()) {
      throw new BadRequestException('Token za resetiranje lozinke je istekao');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: newPasswordHash },
    });

    await this.prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return { success: true };
  }
}
