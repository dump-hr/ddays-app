import { Module } from '@nestjs/common';

import { BoothController } from './booth.controller';
import { BoothService } from './booth.service';

@Module({
  providers: [BoothService, BoothController],
  exports: [BoothService],
  controllers: [BoothController],
})
export class BoothModule {}
