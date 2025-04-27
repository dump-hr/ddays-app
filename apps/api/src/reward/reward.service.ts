import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RewardDto } from '@ddays-app/types/src/dto/reward';
import { BlobService } from 'src/blob/blob.service';
import { RewardModifyDto } from '@ddays-app/types';

@Injectable()
export class RewardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blobService: BlobService,
  ) {}

  async createReward(createRewardDto: RewardModifyDto): Promise<RewardDto> {
    const createdReward = await this.prisma.reward.create({
      data: createRewardDto,
    });

    return createdReward;
  }

  async getAllRewards() {
    return await this.prisma.reward.findMany({});
  }

  async getOne(id: number): Promise<RewardDto> {
    const foundReward = await this.prisma.reward.findUnique({
      where: { id },
    });

    if (!foundReward) {
      throw new Error('Reward not found');
    }

    return foundReward;
  }

  async removeReward(id: number) {
    return await this.prisma.reward.delete({
      where: {
        id,
      },
    });
  }

  async updateReward(id: number, dto: RewardModifyDto): Promise<RewardDto> {
    const updatedReward = await this.prisma.reward.update({
      where: { id },
      data: dto,
    });

    return updatedReward;
  }

  async updateImage(id: number, file: Express.Multer.File): Promise<RewardDto> {
    const uploadedImage = await this.blobService.upload(
      'reward-image',
      file.buffer,
      file.mimetype,
    );

    const updatedReward = await this.prisma.reward.update({
      where: { id },
      data: { imageUrl: uploadedImage },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        description: true,
      },
    });
    return updatedReward;
  }

  async removeImage(id: number): Promise<void> {
    await this.prisma.reward.update({
      where: { id },
      data: { imageUrl: null },
    });
  }
}
