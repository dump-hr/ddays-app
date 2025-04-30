import {
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

    return updatedCode;
  }

  async remove(id: number): Promise<CodeDto> {
    // REMOVE ALL FROM usertocode relation and remove points equal to the deleted code for all users
    const code = await this.prisma.code.findUnique({
      where: { id },
      select: { points: true },
    });

    if (!code) {
      throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
    }

    const userToCodeRelations = await this.prisma.userToCode.findMany({
      where: { codeId: id },
    });

    const userIds = userToCodeRelations.map((relation) => relation.userId);
    for (const userId of userIds) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { points: true },
      });

      if (user) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            points: user.points - code.points,
          },
        });
      }
    }

    await this.prisma.userToCode.deleteMany({
      where: { codeId: id },
    });

    const deletedCode = await this.prisma.code.delete({
      where: { id },
    });

    return deletedCode;
  }

  async markCompletedAchievementsForNewCode(userId: number): Promise<void> {
    // Query to get all the user's applied codes and the associated achievements
    const appliedCodesWithAchievements = await this.prisma.userToCode.findMany({
      where: { userId }, // Filter by the userId
      include: {
        code: {
          include: {
            achievementToCode: {
              include: {
                achievement: true, // Include the achievements related to the code
              },
            },
          },
        },
      },
    });

    console.log(
      'Applied Codes with Achievements:',
      appliedCodesWithAchievements,
    );

    // Step 1: Count occurrences of each achievement (how many times it's linked to the user's codes)
    const achievementCountMap: Record<number, number> = {};

    appliedCodesWithAchievements.forEach((userCode) => {
      // Loop through the achievementToCode relation (which contains all the linked achievements for the code)
      userCode.code.achievementToCode.forEach(({ achievement }) => {
        if (!achievementCountMap[achievement.id]) {
          achievementCountMap[achievement.id] = 0;
        }
        achievementCountMap[achievement.id] += 1; // Increment count for the achievement
      });
    });

    console.log('Achievement Count Map:', achievementCountMap);

    // Step 2: Check if the count of each achievement meets the required fulfillmentCodeCount
    const completedAchievements: any[] = [];

    for (const achievementId in achievementCountMap) {
      const achievement = await this.prisma.achievement.findUnique({
        where: { id: parseInt(achievementId) },
      });

      if (achievement) {
        const count = achievementCountMap[achievementId];

        // Check if the applied count meets or exceeds the fulfillment requirement
        if (count >= achievement.fulfillmentCodeCount) {
          console.log(`Achievement "${achievement.name}" is completed!`);
          completedAchievements.push(achievement);
        }
      }
    }

    // Log completed achievements
    console.log('Completed Achievements:', completedAchievements);
    await this.prisma.userToAchievement.createMany({
      data: completedAchievements.map((achievement) => ({
        userId,
        achievementId: achievement.id,
      })),
      skipDuplicates: true,
    });

    const currentPoints = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        points: true,
      },
    });

    if (currentPoints) {
      const additionalPoints = completedAchievements.reduce(
        (acc, achievement) => acc + achievement.points,
        0,
      );

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          points: currentPoints.points + additionalPoints,
        },
      });
    }
  }

  async apply(code: string, userId: number): Promise<CodeDto> {
    const foundCode = await this.prisma.code.findUnique({
      where: { value: code },
    });

    if (!foundCode) {
      throw new HttpException(
        'Ne izmišljaj kodove, unesi pravi.',
        HttpStatus.BAD_REQUEST,
      );
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

    await this.prisma.userToCode.create({
      data: {
        codeId: foundCode.id,
        userId,
      },
    });

    this.markCompletedAchievementsForNewCode(userId);

    const currentPoints = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        points: true,
      },
    });

    if (currentPoints) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          points: currentPoints.points + foundCode.points,
        },
      });
    }

    return foundCode;
  }

  async updateAchievementsForCode(codeId: number, achievementIds: number[]) {
    if (!achievementIds || achievementIds.length === 0) {
      await this.prisma.achievementToCode.deleteMany({
        where: {
          codeId: codeId,
        },
      });
      return { message: 'All achievements removed successfully' };
    }

    await this.prisma.achievementToCode.deleteMany({
      where: {
        codeId: codeId,
        NOT: {
          achievementId: {
            in: achievementIds,
          },
        },
      },
    });

    const newAchievements = achievementIds.map((achievementId) => ({
      codeId: codeId,
      achievementId: achievementId,
    }));

    await this.prisma.achievementToCode.createMany({
      data: newAchievements,
      skipDuplicates: true,
    });

    return { message: 'Achievements updated successfully' };
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
