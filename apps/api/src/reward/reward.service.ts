import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RewardDto } from '@ddays-app/types/src/dto/reward';

@Injectable()
export class RewardService {
  constructor(private readonly prisma: PrismaService) {}

  async createReward(createRewardDto: RewardDto) {
    await this.prisma.reward.create({
      data: createRewardDto,
    });
  }

  async getAllRewards() {
    return await this.prisma.reward.findMany({});
  }

  async removeReward(id: number) {
    return await this.prisma.reward.delete({
      where: {
        id,
      },
    });
  }
}
