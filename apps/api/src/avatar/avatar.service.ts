import { AchievementNames, AvatarUpdateDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { AchievementService } from 'src/achievement/achievement.service';
import { BlobService } from 'src/blob/blob.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AvatarService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blobService: BlobService,
    private readonly achievementService: AchievementService,
  ) {}

  async updateAvatar(
    userId: number,
    imageBuffer: Buffer,
    mimeType: string,
    avatarData: AvatarUpdateDto,
  ) {
    const profilePhotoUrl = await this.blobService.upload(
      'avatars',
      imageBuffer,
      mimeType,
    );

    const existingAvatar = await this.prisma.avatar.findFirst({
      where: { userId },
    });

    if (existingAvatar) {
      await this.prisma.avatar.update({
        where: { id: existingAvatar.id },
        data: {
          color: avatarData.color,
          face: avatarData.face,
          accessory: avatarData.accessory,
          body: avatarData.body,
        },
      });
      await this.achievementService.completeAchievementByName(
        userId,
        AchievementNames.NewFitWhoThis,
      );
    } else {
      await this.prisma.avatar.create({
        data: {
          userId,
          color: avatarData.color,
          face: avatarData.face,
          accessory: avatarData.accessory,
          body: avatarData.body,
        },
      });
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { profilePhotoUrl },
    });
  }

  async createTemporaryAvatar(imageBuffer: Buffer, mimeType: string) {
    const profilePhotoUrl = await this.blobService.upload(
      'avatars',
      imageBuffer,
      mimeType,
    );

    return { profilePhotoUrl };
  }
}
