import { Module } from '@nestjs/common';

import { BoothController } from './booth.controller';
import { BoothGateway } from './booth.gateway';
import { BoothService } from './booth.service';

@Module({
  providers: [BoothService, BoothController, BoothGateway],
  exports: [BoothService, BoothGateway],
  controllers: [BoothController],
})
export class BoothModule {}
