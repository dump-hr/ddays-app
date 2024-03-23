import { Module } from '@nestjs/common';

import { SpeakerController } from './speaker.controller';
import { SpeakerService } from './speaker.service';

@Module({
  controllers: [SpeakerController],
  providers: [SpeakerService],
})
export class SpeakerModule {}
