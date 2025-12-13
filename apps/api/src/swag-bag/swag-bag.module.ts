import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { SwagBagController } from './swag-bag.controller';
import { SwagBagService } from './swag-bag.service';

@Module({
  controllers: [SwagBagController],
  providers: [PrismaService, SwagBagService],
})
export class SwagBagModule {}
