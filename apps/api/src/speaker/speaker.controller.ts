import {
  SpeakerDto,
  SpeakerModifyDto,
  SpeakerWithCompanyDto,
} from '@ddays-app/types';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';

import { SpeakerService } from './speaker.service';

@Controller('speaker')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: SpeakerModifyDto): Promise<SpeakerDto> {
    return await this.speakerService.create(dto);
  }

  @Get()
  async getAll(): Promise<SpeakerDto[]> {
    return await this.speakerService.getAll();
  }

  @Get('with-company')
  async getAllSpeakersWithCompany(): Promise<SpeakerWithCompanyDto[]> {
    return await this.speakerService.getAllSpeakersWithCompany();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SpeakerDto> {
    return await this.speakerService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<SpeakerDto> {
    return await this.speakerService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SpeakerModifyDto,
  ): Promise<SpeakerDto> {
    return await this.speakerService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch('/photo/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateSpeakerPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<SpeakerDto> {
    return await this.speakerService.updatePhoto(id, file);
  }

  @UseGuards(AdminGuard)
  @Delete('/photo/:id')
  async removePhoto(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.speakerService.removePhoto(id);
  }
}
