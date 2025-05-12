import { Module } from '@nestjs/common';
import { AchievementService } from 'src/achievement/achievement.service';
import { PrismaService } from 'src/prisma.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, AchievementService],
})
export class UserModule {}
