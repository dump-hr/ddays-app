import { RewardModifyDto } from '@ddays-app/types';
import { RewardDto } from '@ddays-app/types/src/dto/reward';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';

import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  @UseGuards(AdminGuard)
  async createReward(@Body() rewardDto: RewardModifyDto) {
    return this.rewardService.createReward(rewardDto);
  }

  @Get()
  async getAllRewards() {
    return this.rewardService.getAllRewards();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<RewardDto> {
    return await this.rewardService.getOne(id);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async removeReward(@Param('id', ParseIntPipe) id: number) {
    return this.rewardService.removeReward(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RewardModifyDto,
  ): Promise<RewardDto> {
    return await this.rewardService.updateReward(id, dto);
  }

  @UseGuards(AdminGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch('/photo/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateRewardImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<RewardDto> {
    return await this.rewardService.updateImage(id, file);
  }

  @UseGuards(AdminGuard)
  @Delete('/photo/:id')
  async removeImage(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.rewardService.removeImage(id);
  }
}
