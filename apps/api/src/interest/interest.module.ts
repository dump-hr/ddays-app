import { Module } from '@nestjs/common';

import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';

@Module({
  controllers: [InterestController],
  providers: [InterestService],
})
export class InterestModule {}
