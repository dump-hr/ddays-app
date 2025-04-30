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
    const deletedCode = await this.prisma.code.delete({
      where: { id },
    });

    return deletedCode;
  }

  async markCompletedAchievementsForNewCode(
    userId: number,
    newCodeId: number,
  ): Promise<void> {
    // Step 1: Fetch all the achievements that this code contributes to
    const relevantAchievements = await this.prisma.achievementToCode.findMany({
      where: {
        codeId: newCodeId,
      },
      include: {
        achievement: true, // Get the achievements associated with this code
      },
    });

    // Step 2: For each relevant achievement, count how many codes the user has applied
    // that are linked to this achievement
    const completedAchievementsIds: number[] = [];

    for (const { achievement } of relevantAchievements) {
      // Get the count of applied codes for this achievement by the user
      const appliedCodeCount = await this.prisma.userToCode.count({
        where: {
          userId: userId,
          codeId: {
            in: relevantAchievements
              .filter((rel) => rel.achievementId === achievement.id)
              .map((rel) => rel.codeId),
          },
        },
      });

      // Step 3: Check if the applied code count meets the fulfillment threshold
      if (appliedCodeCount >= achievement.fulfillmentCodeCount) {
        // If the achievement is complete, add it to the list
        completedAchievementsIds.push(achievement.id);
      }
    }

    // Step 4: If there are any completed achievements, link them to the user
    if (completedAchievementsIds.length > 0) {
      await this.prisma.userToAchievement.createMany({
        data: completedAchievementsIds.map((achievementId) => ({
          userId,
          achievementId,
        })),
        skipDuplicates: true, // Avoid duplicates if they already exist
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
}
