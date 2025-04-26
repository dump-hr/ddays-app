import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { RewardDto } from '@ddays-app/types/src/dto/reward';
import { UserGuard } from 'src/auth/user.guard';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('create')
  @UseGuards(AdminGuard)
  createReward(@Body() rewardDto: RewardDto) {
    return this.rewardService.createReward(rewardDto);
  }

  @Get()
  @UseGuards(UserGuard)
  getAllRewards() {
    return this.rewardService.getAllRewards();
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  removeReward(@Param('id', ParseIntPipe) id: number) {
    return this.rewardService.removeReward(id);
  }
}
