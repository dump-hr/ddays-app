import { IsString } from 'class-validator';

export type RewardDto = {
  id: number;
  name?: string;
  imageUrl?: string;
  description?: string;
};

export class RewardModifyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
