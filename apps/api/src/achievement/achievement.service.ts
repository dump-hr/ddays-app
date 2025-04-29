import {
  AchievementDto,
  AchievementModifyDto,
  AchievementWithUuidDto,
} from '@ddays-app/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AchievementService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: AchievementModifyDto): Promise<AchievementDto> {
    const createdAchievement = await this.prisma.achievement.create({
      data: dto,
    });

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

  async getOne(uuid: string): Promise<AchievementDto> {
    if (!uuid) {
      throw new BadRequestException('UUID is required');
    }

    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (!regex.test(uuid)) {
      throw new BadRequestException('Invalid UUID format: ' + uuid);
    }

    const achievement = await this.prisma.achievement.findUnique({
      where: {
        uuid: uuid,
      },
    });

    if (!achievement) {
      throw new NotFoundException('Achievement not found');
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
  ): Promise<AchievementDto> {
    const achievement = await this.getOne(uuid);

    if (!achievement) {
      throw new NotFoundException('Achievement not found.');
    }

    const completedAchievementConnector =
      await this.prisma.userToAchievement.create({
        data: {
          userId,
          achievementId: achievement.id,
          timeOfAchievement: new Date(),
        },
      });

    const completedAchievementDetails =
      await this.prisma.achievement.findUnique({
        where: {
          id: completedAchievementConnector.achievementId,
        },
      });

    if (!completedAchievementDetails) {
      throw new NotFoundException('Completed achievement details not found.');
    }

    return completedAchievementDetails;
  }

  async update(id: number, dto: AchievementModifyDto): Promise<AchievementDto> {
    const updatedAchievement = await this.prisma.achievement.update({
      where: { id },
      data: dto,
    });

    return updatedAchievement;
  }

  async remove(id: number): Promise<AchievementDto> {
    const deletedAchievement = await this.prisma.achievement.delete({
      where: { id },
    });

    return deletedAchievement;
  }

  async getOneWithUuid(id: number): Promise<AchievementWithUuidDto> {
    const achievement = await this.prisma.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      throw new NotFoundException('Achievement not found');
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

    if (!achievements) {
      throw new NotFoundException('Achievements not found');
    }

    return achievements;
  }
}
