import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RewardDto } from '@ddays-app/types/src/dto/reward';
// import { BlobService } from 'src/blob/blob.service';

@Injectable()
export class RewardService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly blobService: BlobService,
  ) {}

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

  //TODO
  // async updatePhoto();
}
