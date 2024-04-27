import { Module } from '@nestjs/common';

import { BoothGateway } from './booth.gateway';
import { BoothService } from './booth.service';

@Module({
  providers: [BoothGateway, BoothService],
})
export class BoothModule {}
