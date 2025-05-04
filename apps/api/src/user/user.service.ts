import { UserModifyDto } from '@ddays-app/types/src/dto/user';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
