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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthenticatedRequest } from 'src/auth/auth.dto';
import { UserGuard } from 'src/auth/user.guard';

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

  @UseGuards(UserGuard)
  @Get('/get/:code')
  async getOne(@Param('code') code: string): Promise<CodeDto> {
    return await this.codeService.getOne(code);
  }

  @Get(':code/companyId')
  async getCompany(@Param('code') code: string): Promise<number | null> {
    return await this.codeService.getCompany(code);
  }

  @Get(':code/eventId')
  async getEvent(@Param('code') code: string): Promise<number | null> {
    return await this.codeService.getEvent(code);
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

  @UseGuards(UserGuard)
  @Post('apply/:code')
  async apply(
    @Param('code') code: string,
    @Req() { user }: AuthenticatedRequest,
  ): Promise<{ code: CodeDto; redirectUrl: string }> {
    return await this.codeService.apply(code, user.id);
  }

  @UseGuards(UserGuard)
  @Get('applied')
  async getApplied(@Req() { user }: AuthenticatedRequest): Promise<CodeDto[]> {
    return await this.codeService.getApplied(user.id);
  }

  @UseGuards(AdminGuard)
  @Post('update-achievements/:codeId')
  async updateAchievements(
    @Param('codeId', ParseIntPipe) codeId: number,
    @Body() achievements: number[], // Array of achievement IDs
  ) {
    return await this.codeService.updateAchievementsForCode(
      codeId,
      achievements,
    );
  }

  @UseGuards(AdminGuard)
  @Get('with-connected-achievements')
  async getAllWithConnectedAchievements() {
    const codeWithConnectedAchievements =
      await this.codeService.getAllWithConnectedAchievements();
    return codeWithConnectedAchievements;
  }
}
