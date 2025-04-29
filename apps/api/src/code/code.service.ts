import { CodeDto, CodeModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CodeModifyDto): Promise<CodeDto> {
    const createdCode = await this.prisma.code.create({
      data: dto,
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
      data: dto,
    });

    return updatedCode;
  }

  async remove(id: number): Promise<CodeDto> {
    const deletedCode = await this.prisma.code.delete({
      where: { id },
    });

    return deletedCode;
  }
}
