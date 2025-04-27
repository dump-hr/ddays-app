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
import { RewardService } from './reward.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { RewardDto } from '@ddays-app/types/src/dto/reward';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { RewardModifyDto, SpeakerModifyDto } from '@ddays-app/types';

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

  //TODO
  //   @UseGuards(AdminGuard)
  //   @Patch(':id')
  //   async updateReward(
  //     @Param('id', ParseIntPipe) id:number,
  //     @Body() dto:
  //   )

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
}
