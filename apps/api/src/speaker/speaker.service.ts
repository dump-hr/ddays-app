import {
  SpeakerDto,
  SpeakerModifyDto,
  SpeakerPhoto,
  SpeakerWithCompanyDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { company, speaker } from 'db/schema';
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
        instagram: speaker.instagram,
        linkedin: speaker.linkedin,
        description: speaker.description,
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
        instagram: speaker.instagram,
        linkedin: speaker.linkedin,
        description: speaker.description,
      })
      .from(speaker)
      .where(eq(speaker.id, id));

    return foundSpeaker;
  }

  async getAllSpeakersWithCompany() {
    const result = await db
      .select()
      .from(speaker)
      .leftJoin(company, eq(speaker.companyId, company.id))
      .orderBy(speaker.firstName);

    const speakersWithCompany: SpeakerWithCompanyDto[] = result.map(
      (speakerCompany) => {
        return {
          id: speakerCompany.speaker.id,
          firstName: speakerCompany.speaker.firstName,
          lastName: speakerCompany.speaker.lastName,
          title: speakerCompany.speaker.title,
          companyId: speakerCompany.speaker.companyId,
          photo: speakerCompany.speaker.photo,
          instagram: speakerCompany.speaker.instagram,
          linkedin: speakerCompany.speaker.linkedin,
          description: speakerCompany.speaker.description,
          company: { ...speakerCompany.company, password: undefined },
        };
      },
    );

    return speakersWithCompany;
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
    const uploadedPhoto = await this.blobService.upload(
      'speaker-photo',
      file.buffer,
      file.mimetype,
    );

    const photo: SpeakerPhoto = {
      mainPhotoUrl: uploadedPhoto,
      thumbnailUrl: uploadedPhoto,
    };

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
