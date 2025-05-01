import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';

@Module({
  controllers: [AvatarController],
  providers: [AvatarService],
})
export class AvatarModule {}
