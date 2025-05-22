import {
  AchievementDto,
  AchievementModifyDto,
  AchievementWithUuidDto,
} from '@ddays-app/types';
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

import { AchievementService } from './achievement.service';
import { AchievementNameValidationPipe } from './achievement.validator';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: AchievementModifyDto): Promise<AchievementDto> {
    return await this.achievementService.create(dto);
  }

  @UseGuards(UserGuard)
  @Get('completed')
  async getCompletedAchievements(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<AchievementDto[]> {
    return await this.achievementService.getCompletedAchievements(user.id);
  }

  @UseGuards(UserGuard)
  @Get('public')
  async getAllPublic(): Promise<AchievementDto[]> {
    return await this.achievementService.getAllPublic();
  }

  @UseGuards(AdminGuard)
  @Get('with-uuid')
  async getAllWithUuid(): Promise<AchievementWithUuidDto[]> {
    return await this.achievementService.getAllWithUuid();
  }

  @UseGuards(AdminGuard)
  @Get('with-uuid/:id')
  async getAchievementWithUuid(
    @Param('id') id: number,
  ): Promise<AchievementWithUuidDto> {
    return await this.achievementService.getOneWithUuid(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AchievementModifyDto,
  ): Promise<AchievementDto> {
    return await this.achievementService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<AchievementDto> {
    return await this.achievementService.remove(id);
  }

  @UseGuards(UserGuard)
  @Post('complete/:uuid')
  async completeAchievement(
    @Req() { user }: AuthenticatedRequest,
    @Param('uuid') uuid: string,
  ): Promise<AchievementDto> {
    return await this.achievementService.completeAchievement(user.id, uuid);
  }

  @UseGuards(UserGuard)
  @Post('complete-by-name/:name')
  async completeAchievementByName(
    @Req() { user }: AuthenticatedRequest,
    @Param('name', AchievementNameValidationPipe) name: string,
  ): Promise<AchievementDto> {
    const suppressDuplicate = false;
    return await this.achievementService.completeAchievementByName(
      user.id,
      name,
      suppressDuplicate,
    );
  }

  @UseGuards(UserGuard)
  @Get(':uuid')
  async getOne(@Param('uuid') uuid: string): Promise<AchievementDto> {
    return await this.achievementService.getOne(uuid);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAll(): Promise<AchievementDto[]> {
    return await this.achievementService.getAll();
  }
}
