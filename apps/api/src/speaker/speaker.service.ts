import { SpeakerDto, SpeakerModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { speaker } from 'db/schema';

@Injectable()
export class SpeakerService {
  async create(dto: SpeakerModifyDto): Promise<SpeakerDto> {
    const [createdSpeaker] = await db.insert(speaker).values(dto).returning();

    return createdSpeaker;
  }
}
