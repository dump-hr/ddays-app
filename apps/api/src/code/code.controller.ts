import { CodeDto, CodeModifyDto } from '@ddays-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';

import { CodeService } from './code.service';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CodeModifyDto): Promise<CodeDto> {
    return await this.codeService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAll(): Promise<CodeDto[]> {
    return await this.codeService.getAll();
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CodeModifyDto,
  ): Promise<CodeDto> {
    return await this.codeService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<CodeDto> {
    return await this.codeService.remove(id);
  }
}
