import { SpeakerDto, SpeakerModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { event, speaker } from 'db/schema';
import { eq } from 'drizzle-orm';

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

  async getOne(id: number) {
    const [foundSpeaker] = await db
      .select({
        id: speaker.id,
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        title: speaker.title,
        companyId: speaker.companyId,
        photo: speaker.photo,
      })
      .from(speaker)
      .where(eq(speaker.id, id));

    return foundSpeaker;
  }

  async remove(id: number) {
    const [deletedSpeaker] = await db
      .delete(speaker)
      .where(eq(speaker.id, id))
      .returning();

    return deletedSpeaker;
  }

  async updat(id: number, dto: SpeakerModifyDto) {
    const [updatedSpeaker] = await db
      .update(speaker)
      .set(dto)
      .where(eq(speaker.id, id))
      .returning();

    return updatedSpeaker;
  }
}
