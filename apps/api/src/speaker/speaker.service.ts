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

  async getAll() {
    const speakers = await db
      .select({
        id: speaker.id,
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        title: speaker.title,
        companyId: speaker.companyId,
        photo: speaker.photo,
      })
      .from(speaker)
      .orderBy(speaker.firstName);

    return speakers;
  }
}