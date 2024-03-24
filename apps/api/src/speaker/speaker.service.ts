import { SpeakerDto, SpeakerModifyDto } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { speaker } from 'db/schema';
import { eq } from 'drizzle-orm';
import { BlobService } from 'src/blob/blob.service';

@Injectable()
export class SpeakerService {
  constructor(private readonly blobService: BlobService) {}

  async create(dto: SpeakerModifyDto): Promise<SpeakerDto> {
    if (dto.companyId === 0) {
      dto.companyId = null;
    }

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

  async update(id: number, dto: SpeakerModifyDto) {
    if (dto.companyId === 0) {
      dto.companyId = null;
    }

    const [updatedSpeaker] = await db
      .update(speaker)
      .set(dto)
      .where(eq(speaker.id, id))
      .returning();

    return updatedSpeaker;
  }

  async updatePhoto(
    id: number,
    file: Express.Multer.File,
  ): Promise<SpeakerDto> {
    const photo = await this.blobService.upload(
      'speaker-photo',
      file.buffer,
      file.mimetype,
    );

    const [updatedSpeaker] = await db
      .update(speaker)
      .set({
        photo,
      })
      .where(eq(speaker.id, id))
      .returning({
        id: speaker.id,
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        title: speaker.title,
        companyId: speaker.companyId,
        photo: speaker.photo,
      });

    return updatedSpeaker;
  }

  async removePhoto(id: number): Promise<void> {
    await db
      .update(speaker)
      .set({
        photo: null,
      })
      .where(eq(speaker.id, id));
  }
}
