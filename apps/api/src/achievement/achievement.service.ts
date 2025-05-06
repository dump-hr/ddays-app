import {
  AchievementDto,
  AchievementModifyDto,
  AchievementWithUuidDto,
} from '@ddays-app/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AchievementService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: AchievementModifyDto): Promise<AchievementDto> {
    const createdAchievement = await this.prisma.achievement.create({
      data: dto,
    });

    if (!createdAchievement) {
      throw new HttpException(
        'Failed to create achievement.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return createdAchievement;
  }

  async getAll(): Promise<AchievementDto[]> {
    const achievements = await this.prisma.achievement.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        points: true,
        fulfillmentCodeCount: true,
        isHidden: true,
        createdAt: true,
      },
      orderBy: {
        points: 'desc',
      },
    });

    return achievements;
  }

  async getAllPublic(): Promise<AchievementDto[]> {
    const achievements = await this.prisma.achievement.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        points: true,
        fulfillmentCodeCount: true,
        isHidden: true,
        createdAt: true,
      },
      where: {
        isHidden: false,
      },
      orderBy: {
        points: 'desc',
      },
    });

    return achievements;
  }

  async getOne(uuid: string): Promise<AchievementDto> {
    if (!uuid) {
      throw new HttpException('UUID is required.', HttpStatus.BAD_REQUEST);
    }

    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (!regex.test(uuid)) {
      throw new HttpException(
        'Invalid UUID format: ' + uuid,
        HttpStatus.BAD_REQUEST,
      );
    }

    const achievement = await this.prisma.achievement.findUnique({
      where: {
        uuid: uuid,
      },
    });

    if (!achievement) {
      throw new HttpException('Achievement not found.', HttpStatus.NOT_FOUND);
    }
    return achievement;
  }

  async getCompletedAchievements(userId: number): Promise<AchievementDto[]> {
    const completedAchievements = await this.prisma.userToAchievement.findMany({
      where: {
        userId,
      },
      include: {
        achievement: true,
      },
    });

    return completedAchievements.map((userToAchievement) => ({
      ...userToAchievement.achievement,
    }));
  }

  async completeAchievement(
    userId: number,
    uuid: string,
    options: { surpressDuplicate?: boolean } = {},
  ): Promise<AchievementDto> {
    const achievement = await this.getOne(uuid);

    if (!achievement) {
      throw new HttpException('Achievement not found.', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.$transaction(async (prisma) => {
      if (!options.surpressDuplicate) {
        const existing = await prisma.userToAchievement.findFirst({
          where: {
            userId,
            achievementId: achievement.id,
          },
        });

        if (existing) {
          throw new HttpException(
            'Achievement already completed.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const completedAchievementConnector =
        await prisma.userToAchievement.upsert({
          where: {
            userId_achievementId: {
              userId,
              achievementId: achievement.id,
            },
          },
          create: {
            userId,
            achievementId: achievement.id,
            timeOfAchievement: new Date(),
          },
          update: {},
        });

      const completedAchievementDetails = await prisma.achievement.findUnique({
        where: {
          id: completedAchievementConnector.achievementId,
        },
      });

      if (!completedAchievementDetails) {
        throw new HttpException(
          'Completed achievement details not found.',
          HttpStatus.NOT_FOUND,
        );
      }

      const currentPoints = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          points: true,
        },
      });

      if (currentPoints) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            points: { increment: completedAchievementDetails.points },
          },
        });
      }
      return completedAchievementDetails;
    });
  }

  async update(id: number, dto: AchievementModifyDto): Promise<AchievementDto> {
    const existingAchievement = await this.prisma.achievement.findUnique({
      where: { id },
    });

    if (!existingAchievement) {
      throw new HttpException('Achievement not found.', HttpStatus.NOT_FOUND);
    }

    const updatedAchievement = await this.prisma.achievement.update({
      where: { id },
      data: dto,
    });

    if (existingAchievement.isHidden && !dto.isHidden) {
      await this.prisma.user.updateMany({
        where: {
          userToAchievement: {
            some: {
              achievementId: id,
            },
          },
        },
        data: {
          points: { increment: dto.points },
        },
      });
    }

    if (dto.isHidden && !existingAchievement.isHidden) {
      await this.prisma.user.updateMany({
        where: {
          userToAchievement: {
            some: {
              achievementId: id,
            },
          },
        },
        data: {
          points: { decrement: dto.points },
        },
      });
    }

    if (dto.points !== existingAchievement.points) {
      await this.prisma.user.updateMany({
        where: {
          userToAchievement: {
            some: {
              achievementId: id,
            },
          },
        },
        data: {
          points: {
            increment: dto.points - existingAchievement.points,
          },
        },
      });
    }

    if (!updatedAchievement) {
      throw new HttpException(
        'Failed to update achievement.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return updatedAchievement;
  }

  async remove(id: number): Promise<AchievementDto> {
    const achievement = await this.prisma.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      throw new HttpException('Achievement not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.$transaction(async (prisma) => {
      const users = await prisma.userToAchievement.findMany({
        where: { achievementId: id },
        select: { user: true },
      });

      const userIds = users.map((user) => user.user.id);

      await prisma.user.updateMany({
        where: {
          id: { in: userIds },
        },
        data: {
          points: { decrement: achievement.points },
        },
      });

      await prisma.userToAchievement.deleteMany({
        where: { achievementId: id },
      });

      const deletedAchievement = await prisma.achievement.delete({
        where: { id },
      });

      if (!deletedAchievement) {
        throw new HttpException(
          'Failed to delete achievement.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return deletedAchievement;
    });
  }

  async getOneWithUuid(id: number): Promise<AchievementWithUuidDto> {
    const achievement = await this.prisma.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      throw new HttpException('Achievement not found.', HttpStatus.NOT_FOUND);
    }

    return achievement;
  }

  async getAllWithUuid(): Promise<AchievementWithUuidDto[]> {
    const achievements = await this.prisma.achievement.findMany({
      select: {
        id: true,
        uuid: true,
        name: true,
        description: true,
        points: true,
        fulfillmentCodeCount: true,
        isHidden: true,
        createdAt: true,
      },
      orderBy: {
        points: 'asc',
      },
    });

    return achievements;
  }

  async completeAchievementByName(
    userId: number,
    name: string,
  ): Promise<AchievementDto> {
    const achievement = await this.prisma.achievement.findFirst({
      where: { name },
    });

    if (!achievement) {
      throw new HttpException('Achievement not found.', HttpStatus.BAD_REQUEST);
    }

    return await this.completeAchievement(userId, achievement.uuid, {
      surpressDuplicate: true,
    });
  }
}
