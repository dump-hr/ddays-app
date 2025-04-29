import { CodeDto, CodeModifyDto } from '@ddays-app/types';
import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new Error('Taj kod ne postoji!');
    }

    if (foundCode.expirationDate < new Date()) {
      console.log('Code expired:', foundCode);
      throw new Error('Taj kod je istekao!');
    }

    if (foundCode.isSingleUse) {
      const isAlreadyUsed = await this.prisma.userToCode.findFirst({
        where: {
          codeId: foundCode.id,
          userId: userId,
        },
      });

      if (isAlreadyUsed) {
        throw new BadRequestException('Taj kod je već iskorišten!');
      }
    }

    await this.prisma.userToCode.create({
      data: {
        codeId: foundCode.id,
        userId,
      },
    });

    return foundCode;
  }
}
