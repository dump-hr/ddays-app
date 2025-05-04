import {
  AchievementDto,
  CodeDto,
  CodeModifyDto,
  CodeWithConnectedAchievementsDto,
} from '@ddays-app/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Helper } from 'src/helper';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CodeModifyDto): Promise<CodeDto> {
    if (dto.value.length !== 6)
      throw new HttpException(
        'Code must be 6 characters long!',
        HttpStatus.BAD_REQUEST,
      );

    const createdCode = await this.prisma.code.create({
      data: {
        ...dto,
        expirationDate: Helper.formatISO8601DateTime(dto.expirationDate),
      },
    });

    if (!createdCode) {
      throw new HttpException('Failed to create code.', HttpStatus.BAD_REQUEST);
    }

    return createdCode;
  }

  async getAll(): Promise<CodeDto[]> {
    const codes = await this.prisma.code.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return codes;
  }

  async update(id: number, dto: CodeModifyDto): Promise<CodeDto> {
    const updatedCode = await this.prisma.code.update({
      where: { id },
      data: {
        ...dto,
        expirationDate: Helper.formatISO8601DateTime(dto.expirationDate),
      },
    });

    if (!updatedCode) {
      throw new HttpException('Failed to update code.', HttpStatus.BAD_REQUEST);
    }

    return updatedCode;
  }

  async remove(id: number): Promise<CodeDto> {
    return this.prisma.$transaction(async (tx) => {
      const code = await tx.code.findUnique({
        where: { id },
        select: { points: true },
      });

      if (!code) {
        throw new HttpException('Code not found.', HttpStatus.NOT_FOUND);
      }

      const userToCodeRelations = await tx.userToCode.findMany({
        where: { codeId: id },
      });

      // Bulk update user points in a single operation to avoid race conditions
      const userIds = userToCodeRelations.map((relation) => relation.userId);
      if (userIds.length > 0) {
        await tx.user.updateMany({
          where: { id: { in: userIds } },
          data: {
            points: { decrement: code.points },
          },
        });
      }

      await tx.userToCode.deleteMany({
        where: { codeId: id },
      });

      const deletedCode = await tx.code.delete({
        where: { id },
      });

      return deletedCode;
    });
  }

  async markCompletedAchievementsForNewCode(userId: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { points: true },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const appliedCodesWithAchievements = await this.prisma.userToCode.findMany({
      where: { userId },
      include: {
        code: {
          include: {
            achievementToCode: {
              include: {
                achievement: true,
              },
            },
          },
        },
      },
    });

    const achievementCountMap: Record<number, number> = {};

    appliedCodesWithAchievements.forEach((userCode) => {
      userCode.code.achievementToCode.forEach(({ achievement }) => {
        if (!achievementCountMap[achievement.id]) {
          achievementCountMap[achievement.id] = 0;
        }
        achievementCountMap[achievement.id] += 1;
      });
    });

    const completedAchievements: AchievementDto[] = [];

    for (const achievementId in achievementCountMap) {
      const achievement = await this.prisma.achievement.findUnique({
        where: { id: parseInt(achievementId) },
      });

      if (achievement) {
        const count = achievementCountMap[achievementId];

        if (count >= achievement.fulfillmentCodeCount) {
          completedAchievements.push(achievement);
        }
      }
    }

    const additionalPoints = completedAchievements.reduce(
      (acc, achievement) => acc + achievement.points,
      0,
    );

    // If we have achievements to add, use a transaction
    if (completedAchievements.length > 0) {
      await this.prisma.$transaction(async (tx) => {
        await tx.userToAchievement.createMany({
          data: completedAchievements.map((achievement) => ({
            userId,
            achievementId: achievement.id,
          })),
          skipDuplicates: true,
        });

        if (additionalPoints > 0) {
          await tx.user.update({
            where: { id: userId },
            data: {
              points: { increment: additionalPoints },
            },
          });
        }
      });
    }
  }

  async apply(code: string, userId: number): Promise<CodeDto> {
    const currentPoints = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        points: true,
      },
    });

    if (!currentPoints) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const foundCode = await this.prisma.code.findUnique({
      where: { value: code, isActive: true },
    });

    if (!foundCode) {
      throw new HttpException(
        'Ne izmišljaj kodove, unesi pravi.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (foundCode.isSingleUse) {
      const existingCode = await this.prisma.userToCode.findFirst({
        where: {
          codeId: foundCode.id,
        },
      });

      if (existingCode) {
        throw new HttpException(
          'Taj kod je već iskorišten!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (foundCode.expirationDate < new Date()) {
      throw new HttpException('Taj je kod istekao!', HttpStatus.BAD_REQUEST);
    }

    const isAlreadyUsed = await this.prisma.userToCode.findFirst({
      where: {
        codeId: foundCode.id,
        userId: userId,
      },
    });

    if (isAlreadyUsed) {
      throw new HttpException(
        'Taj kod je već iskorišten!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.userToCode.create({
        data: {
          codeId: foundCode.id,
          userId,
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          points: { increment: foundCode.points },
        },
      });
    });

    await this.markCompletedAchievementsForNewCode(userId);

    return foundCode;
  }

  async updateAchievementsForCode(codeId: number, achievementIds: number[]) {
    return this.prisma.$transaction(async (tx) => {
      if (!achievementIds || achievementIds.length === 0) {
        await tx.achievementToCode.deleteMany({
          where: { codeId },
        });
        return { message: 'All achievements removed successfully' };
      }

      await tx.achievementToCode.deleteMany({
        where: {
          codeId,
          NOT: {
            achievementId: { in: achievementIds },
          },
        },
      });

      if (achievementIds.length > 0) {
        await tx.achievementToCode.createMany({
          data: achievementIds.map((achievementId) => ({
            codeId,
            achievementId,
          })),
          skipDuplicates: true,
        });
      }

      return { message: 'Achievements updated successfully' };
    });
  }

  async getAllWithConnectedAchievements(): Promise<
    CodeWithConnectedAchievementsDto[]
  > {
    const allCodes = await this.prisma.code.findMany();

    const allAchievements = await this.prisma.achievementToCode.findMany({
      include: {
        code: true,
        achievement: true,
      },
    });

    const groupedCodes = allAchievements.reduce(
      (acc, { code, achievement }) => {
        if (!acc[code.id]) {
          acc[code.id] = {
            ...code,
            connectedAchievements: [],
          };
        }
        acc[code.id].connectedAchievements.push(achievement);

        return acc;
      },
      {} as Record<number, CodeWithConnectedAchievementsDto>,
    );

    const finalResult = allCodes.map((code) => {
      if (!groupedCodes[code.id]) {
        return {
          ...code,
          connectedAchievements: [],
        };
      }
      return groupedCodes[code.id];
    });

    return finalResult;
  }

  async getApplied(userId: number): Promise<CodeDto[]> {
    const appliedCodes = await this.prisma.userToCode.findMany({
      where: { userId },
      include: { code: true },
    });

    return appliedCodes.map((userToCode) => userToCode.code);
  }

  async getOne(value: string): Promise<CodeDto> {
    const code = await this.prisma.code.findUnique({
      where: { value },
    });

    if (!code) {
      throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
    }

    return code;
  }
}
