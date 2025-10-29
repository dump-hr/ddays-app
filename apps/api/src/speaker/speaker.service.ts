import {
  SpeakerDto,
  SpeakerModifyDto,
  SpeakerWithCompanyDto,
} from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { BlobService } from 'src/blob/blob.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SpeakerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blobService: BlobService,
  ) {}

  async create(dto: SpeakerModifyDto): Promise<SpeakerDto> {
    if (dto.companyId === 0) {
      dto.companyId = undefined;
    }

    const createdSpeaker = await this.prisma.speaker.create({
      data: dto,
    });

    return createdSpeaker;
  }

  async getAll(): Promise<SpeakerDto[]> {
    return await this.prisma.speaker.findMany({
      orderBy: { firstName: 'asc' },
    });
  }

  async getOne(id: number): Promise<SpeakerDto> {
    const foundSpeaker = await this.prisma.speaker.findUnique({
      where: { id },
    });

    if (!foundSpeaker) {
      throw new Error('Speaker not found');
    }

    return foundSpeaker;
  }

  async getAllSpeakersWithCompany(): Promise<SpeakerWithCompanyDto[]> {
    const speakersWithCompany = await this.prisma.speaker.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
            username: true,
            category: true,
            websiteUrl: true,
            instagramUrl: true,
            linkedinUrl: true,
            campfireParticipation: true,
          },
        },
      },
      orderBy: { firstName: 'asc' },
    });

    return speakersWithCompany;
  }

  async remove(id: number): Promise<SpeakerDto> {
    try {
      const deletedSpeaker = await this.prisma.speaker.delete({
        where: { id },
      });

      return deletedSpeaker;
    } catch (error) {
      console.error(error);
      throw new Error('Speaker not found');
    }
  }

  async update(id: number, dto: SpeakerModifyDto): Promise<SpeakerDto> {
    if (dto.companyId === 0) {
      dto.companyId = null;
    }

    const updatedSpeaker = await this.prisma.speaker.update({
      where: { id },
      data: dto,
    });

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

    const updatedSpeaker = await this.prisma.speaker.update({
      where: { id },
      data: { photoUrl: uploadedPhoto },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        title: true,
        companyId: true,
        photo: true,
      },
    });

    return updatedSpeaker;
  }

  async updateSmallPhoto(
    id: number,
    file: Express.Multer.File,
  ): Promise<SpeakerDto> {
    const uploadedPhoto = await this.blobService.upload(
      'speaker-small-photo',
      file.buffer,
      file.mimetype,
    );

    const updatedSpeaker = await this.prisma.speaker.update({
      where: { id },
      data: { smallPhotoUrl: uploadedPhoto },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        title: true,
        companyId: true,
        photo: true,
      },
    });

    return updatedSpeaker;
  }

  async removePhoto(id: number): Promise<void> {
    await this.prisma.speaker.update({
      where: { id },
      data: { photoUrl: null },
    });
  }

  async removeSmallPhoto(id: number): Promise<void> {
    await this.prisma.speaker.update({
      where: { id },
      data: { smallPhotoUrl: null },
    });
  }
}
