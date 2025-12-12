import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { SwagBagService } from './swag-bag.service';

@Module({
  controllers: [],
  providers: [PrismaService, SwagBagService],
})
export class SwagBagModule {}
