import { Module } from '@nestjs/common';

import { InterestsController } from './interests.controller';
import { InterestsService } from './interests.service';

@Module({
  controllers: [InterestsController],
  providers: [InterestsService],
})
export class InterestsModule {}
