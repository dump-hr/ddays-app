import { Module } from '@nestjs/common';

import { BoothController } from './booth.controller';
import { BoothGateway } from './booth.gateway';
import { BoothService } from './booth.service';

@Module({
  providers: [BoothGateway, BoothService, BoothController],
  exports: [BoothService],
  controllers: [BoothController],
})
export class BoothModule {}
