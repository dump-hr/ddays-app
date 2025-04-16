import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserModifyDto } from '@ddays-app/types/src/dto/user';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserProfile(userId: number, data: Partial<UserModifyDto>) {

    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async updateUserPassword(userId: number, password: string) {
    const newPasswordHash = await bcrypt.hash(password, 10);

    return this.prisma.user.update({
      where: { id: userId },
      data: { password: newPasswordHash },
    });
  }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
