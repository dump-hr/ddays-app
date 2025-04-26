import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RewardService {
  constructor(private readonly prisma: PrismaService) {}
}
