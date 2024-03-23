import { Injectable } from '@nestjs/common';

@Injectable()
export class SpeakerService {
  async create(dto: SpeakerModifyDto);
}
