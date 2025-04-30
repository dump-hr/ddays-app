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
    // Case 1: If the achievements array is empty, delete all existing associations for the given codeId
    if (!achievementIds || achievementIds.length === 0) {
      await this.prisma.achievementToCode.deleteMany({
        where: {
          codeId: codeId,
        },
      });
      return { message: 'All achievements removed successfully' };
    }

    // Case 2: If achievements are selected, delete old associations that are not in the selected list
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

    // Case 3: Insert new associations for selected achievements
    const newAchievements = achievementIds.map((achievementId) => ({
      codeId: codeId,
      achievementId: achievementId,
    }));

    // Bulk insert new achievement associations
    await this.prisma.achievementToCode.createMany({
      data: newAchievements,
      skipDuplicates: true, // Prevent duplicates
    });

    return { message: 'Achievements updated successfully' };
  }

  async getAllWithConnectedAchievements(): Promise<
    CodeWithConnectedAchievementsDto[]
  > {
    // Step 1: Get all codes first
    const allCodes = await this.prisma.code.findMany();

    // Step 2: Get the achievements and the associated codes
    const allAchievements = await this.prisma.achievementToCode.findMany({
      include: {
        code: true,
        achievement: true,
      },
    });

    // Step 3: Reduce the results to group achievements by code
    const groupedCodes = allAchievements.reduce(
      (acc, { code, achievement }) => {
        // If the code is already in the accumulator, add the achievement
        if (!acc[code.id]) {
          acc[code.id] = {
            ...code,
            connectedAchievements: [],
          };
        }
        // Push the current achievement to the corresponding code's achievements array
        acc[code.id].connectedAchievements.push(achievement);

        return acc;
      },
      {} as Record<number, CodeWithConnectedAchievementsDto>,
    );

    // Step 4: Ensure all codes are included, even those with no achievements
    const finalResult = allCodes.map((code) => {
      if (!groupedCodes[code.id]) {
        // If no achievements for this code, add an empty array
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
